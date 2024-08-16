const Docker = require("dockerode");
const stream = require("stream");

const { ERROR_MESSAGES } = require('./constants');

const docker = new Docker({
  socketPath: '/var/run/docker.sock'
});

async function pullContainer(image) {
  const images = await docker.listImages({ filters: { reference: [image] } });
  if (images.length > 0) {
    console.log(`Image ${image} found locally.`);
    return;
  }

  const pullStream = await docker.pull(image, {});

  await new Promise(res => docker.modem.followProgress(pullStream, res));
}
async function runContainer(image, {
  maxMemoryMb,
  cpuUnits,
  userCode = '',
  userEnv = [],
  userParams = {},
  timeout,
}) {
  let container;
  let timeoutId;

  try {
    const transformedEnv = userEnv.map(row => `${row.key}=${row.value}`);

    container = await docker.createContainer({
      Image: image,
      AttachStderr: true,
      AttachStdin: false,
      AttachStdout: true,
      OpenStdin: false,
      Env: [
        ...transformedEnv,
        `USER_CODE=${encodeURIComponent(userCode)}`,
        `USER_PARAMS=${encodeURIComponent(JSON.stringify(userParams))}`,
        `TIMEOUT=${encodeURIComponent(timeout)}`
      ],
      Tty: false,
      HostConfig: {
        NetworkMode: 'bridge',
        Ulimits: [
          { "Name": "nofile", "Soft": 1024, "Hard": 2048 },
        ],
        "CpuShares": parseInt(cpuUnits, 10),
        "Memory": maxMemoryMb,
      },
      "NetworkDisabled": false,
    });

    await container.start();
    const runStream = await container.attach({
      stream: true,
      stdout: true,
      stderr: true
    });
    const stdoutStream = new stream.PassThrough();
    const stderrStream = new stream.PassThrough();

    container.modem.demuxStream(runStream, stdoutStream, stderrStream);

    let stdout = '';
    let stderr = '';

    stdoutStream.on('data', data => stdout += data);
    stderrStream.on('data', data => stderr += data);

    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(async () => {
        console.log(`Timeout reached. Stopping and removing container ${container.id}...`);
        try {
          await container.stop({ t: 5 });
          await container.remove();
          reject(new Error('Execution timed out'));
        } catch (err) {
          reject(new Error(`Error stopping/removing container: ${err.message}`));
        }
      }, timeout);
    });

    await Promise.race([
      new Promise((resolve, reject) => {
        runStream.on('end', resolve);
        runStream.on('error', reject);
        runStream.on('close', resolve);
      }),
      timeoutPromise
    ]);

    clearTimeout(timeoutId);

    const containerInfo = await container.inspect();
    const exitCode = containerInfo.State.ExitCode;

    if (exitCode in ERROR_MESSAGES) {
      stderr ||= ERROR_MESSAGES[exitCode];
    } else if (exitCode !== 0) {
      stderr ||= 'Internal Server Error';
    }

    try {
      await container.remove();
    } catch (err) {
      if (err.statusCode === 409 || err.statusCode === 404) {
        console.log('Container removal is already in progress.');
      } else {
        console.error('Error removing container:', err);
      }
    }

    return { stdout: transformStdout(stdout), stderr };
  } catch (error) {
    console.error('Error during container execution:', error);
    if (container) {
      try {
        await container.remove();
      } catch (err) {
        console.error('Error removing container after failure:', err);
      }
    }
    throw error;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

const transformStdout = (stdout) => {
  placemarkerString = '[API-FRENZY] Result: ';
  const parts = stdout.split(placemarkerString);
  try {
    return JSON.parse(parts[parts.length - 1]);
  } catch (err) {
    return stdout
  }
}

module.exports = {
  pullContainer,
  runContainer,
}
