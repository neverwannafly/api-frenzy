const { executeQuery } = require('./lib/postgres');
const { pullContainer } = require('./lib/docker');

async function initializeRuntimes() {
  const { success, result: runtimes } = await executeQuery('SELECT "runtimes".* FROM runtimes');
  if (!success) {
    console.error('Error executing psql query');
    process.exit(1);
  }

  try {
    console.log(`Available Runtimes -> ${JSON.stringify(runtimes)}`);
    for (const runtime of runtimes) {
      await pullContainer(runtime.docker_image);
    }
    console.log('All runtimes pulled successfully.');
  } catch (error) {
    console.error('Error pulling runtimes:', error);
    process.exit(1);
  }
}

async function init() {
  await initializeRuntimes();
}

module.exports = { init };
