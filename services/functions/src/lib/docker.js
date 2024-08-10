const Docker = require("dockerode");
const stream = require('stream');

const docker = new Docker({
  socketPath: '/var/run/docker.sock'
});

async function pullContainer(image) {
  imageUri = `${externalRegistry}/${image}`;
  const auth = await externalRegistryAuth();

  options['authconfig'] = {
    username: auth.username,
    password: auth.password,
  };

  const pullStream = await docker.pull(imageUri, options);

  await new Promise(res => docker.modem.followProgress(pullStream, res));
}

async function runContainer(image, env, {
  maxMemoryMb = 512,
  maxStorageGb = 2,
  cpuUnits = 700,
}) {
  const transformedEnv = Object.keys(env).map(k => `${k}=${env[k]}`);
  
  const container = await docker.createContainer({
    Image: `${registry}/${image}`,
    AttachStderr: false,
    AttachStdin: false,
    AttachStdout: false,
    OpenStdin: false,
    Env: transformedEnv,
    Tty: false,
    ExposedPorts: {},
    HostConfig: {
      AutoRemove: false,
      NetworkMode: 'bridge',
      Ulimits: [
        { "Name": "nofile", "Soft": 1024, "Hard": 2048 },
      ],
      "PortBindings": {},
      "CpuShares": parseInt(cpuUnits, 10),
      "Memory": 1024000 * maxMemoryMb,
      "MemoryReservation": 256000 * maxMemoryMb,
      "StorageOpt": { "size": `${maxStorageGb}G` },
      "PublishAllPorts": true,
    },
    "NetworkDisabled": false,
  });

  await container.start();

  return container;
}

async function execCommand(container_id, command, env = []) {
  const container = docker.getContainer(container_id);

  const options = {
    Cmd: ['sh', '-c', command],
    Env: env,
    AttachStdout: true,
    AttachStderr: true
  };

  const exec = await container.exec(options);
  const execStream = await exec.start();
  const stdoutStream = new stream.PassThrough();
  const stderrStream = new stream.PassThrough();

  container.modem.demuxStream(execStream, stdoutStream, stderrStream);

  let stdout = '';
  let stderr = '';

  stdoutStream.on('data', data => stdout += data);
  stderrStream.on('data', data => stderr += data);

  await new Promise((resolve, reject) => {
    execStream.on('end', resolve);
    execStream.on('error', reject);
    execStream.on('close', resolve);
  });

  return { stdout, stderr };
}

module.exports = {
  pullContainer,
  runContainer,
  execCommand,
}

