const express = require("express");

const { runContainer } = require('./lib/docker');
const { authenticateUser } = require("./lib/auth");
const { fetchFnDetails } = require("./utils/functions");

function router() {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.status(200).json({ success: true });
  });

  router.post('/:fn_slug', async (req, res) => {
    const token = req.headers['x-session-token'];

    const { fn_slug: slug } = req.params;
    const { params } = req.body;

    const { success, error, user } = authenticateUser(token);
    if (!success) {
      return res.status(403).json({ error });
    }

    const fn = await fetchFnDetails(slug, user);
    if (!fn) {
      return res.status(404).json({ error: 'Function not found' });
    }

    if (typeof(params) !== typeof({})) {
      return res.status(400).json({ error: 'Invalid type for params. Expected a json' });
    }

    try {
      const { stdout, stderr } = await runContainer(fn.docker_image, {
        userCode: fn.code,
        userParams: params,
        userEnv: fn.env_vars,
        maxMemoryMb: fn.limits.memory,
        cpuUnits: fn.limits.cpu,
        timeout: fn.limits.timeout
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
