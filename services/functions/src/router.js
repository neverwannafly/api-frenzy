const express = require("express");

const { runContainer } = require('./lib/docker');

function router() {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.status(200).json({ success: true });
  });
  
  router.post('/', async (req, res) => {
    const { env, code, params } = req.body;
    const image = 'public.ecr.aws/f2o5a2c3/af.runtime.node18:v1';
  
    if (!image || !code) {
      return res.status(400).json({ error: 'Image and code are required fields.' });
    }

    if (typeof(params) !== typeof({}) || typeof(env) !== typeof({})) {
      return res.status(400).json({ error: 'Invalid type for params' });
    }

    try {
      const { stdout, stderr } = await runContainer(image, {
        userCode: code,
        userParams: params,
        userEnv: env,
        maxMemoryMb: 200,
        cpuUnits: 500,
      });

      res.status(200).json({ success: stderr.length === 0, output: { stdout, stderr } });
    } catch (error) {
      console.error('Error during container execution:', error);
      res.status(500).json({ success: false, error: 'Failed to execute code.', details: error.message });
    }
  });

  return router;
}

module.exports = { router };
