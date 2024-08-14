const vm = require('vm');
const path = require('path');
const { readFileSync } = require('fs');

const userCode = decodeURIComponent(process.env.USER_CODE);
const userParams = JSON.parse(decodeURIComponent(process.env.USER_PARAMS));

const logs = [];
const originalConsoleLog = console.log;
console.log = (...args) => { logs.push(args.join(' ')) };

// Create a custom require function that resolves modules from the specified path
function createCustomRequire() {
  const basePath = path.resolve('/usr/local/lib/node_modules');
  return async function(moduleName) {
    try {
      const modulePath = require.resolve(moduleName, { paths: [basePath] });
      const moduleText = readFileSync(modulePath, 'utf-8');

      if (moduleText.includes('export ')) {
        const module = await import(pathToFileURL(modulePath));
        return module.default || module;
      } else {
        return require(modulePath);
      }
    } catch (err) {
      throw new Error(`Error loading module '${moduleName}': ${err.message}`);
    }
  };
}

const cloneGlobal = () => Object.defineProperties(
  {...global},
  Object.getOwnPropertyDescriptors(global)
)

const script = new vm.Script(userCode);
const sandbox = {
  module: {},
  ...cloneGlobal(),
  console,
  require: createCustomRequire(),
};

const runExecution = async() => {
  const startTime = process.hrtime();
  const startCpuUsage = process.cpuUsage();
  const startMemoryUsage = process.memoryUsage();

  try {
    script.runInNewContext(sandbox);

    if (typeof sandbox.module.exports === 'function') {
      const result = await sandbox.module.exports(userParams);

      const endTime = process.hrtime(startTime);
      const endCpuUsage = process.cpuUsage(startCpuUsage);
      const endMemoryUsage = process.memoryUsage();

      // Calculate the metrics
      const executionTimeMs = endTime[0] * 1000 + endTime[1] / 1000000;
      const cpuUsageUserMs = endCpuUsage.user / 1000;
      const cpuUsageSystemMs = endCpuUsage.system / 1000;
      const memoryUsed = endMemoryUsage.heapUsed - startMemoryUsage.heapUsed;

      originalConsoleLog('[API-FRENZY] Result: ' + JSON.stringify({
        result,
        stats: {
          time: executionTimeMs.toFixed(2),
          cpu_user: cpuUsageUserMs.toFixed(2),
          cpu_system: cpuUsageSystemMs.toFixed(2),
          memory: (memoryUsed / 1024).toFixed(2)
        },
        logs,
      }));
    } else {
      console.error('No valid function export found in user code.');
      throw Error("No valid function export found in user code")
    }
  } catch (error) {
    console.error('Error executing user function:', error);
    throw Error(`Error executing user function:, ${error}`)
  }
}

runExecution();
