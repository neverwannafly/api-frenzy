const { executeQuery } = require("../lib/postgres");

const fetchFnDetails = async (slug, userId) => {
  const { result: fnDetails } = await executeQuery(`
    SELECT
      functions.limits,
      functions.code,
      functions.env_vars,
      functions.user_id,
      runtimes.docker_image
    FROM
      functions
    INNER JOIN
      runtimes ON runtimes.id = functions.runtime_id 
    WHERE
      functions.slug = $1;
  `, [slug]);

  if (fnDetails.length === 0) {
    return null;
  }

  const fn = fnDetails[0];

  // If function belongs to user, and is not deleted, return it
  if (+fn.user_id === +userId && +fn.status !== 3) {
    return fn;
  }

  // If function is public and active, return it
  if (+fn.visibility === 0 && +fn.status === 1) {
    return fn;
  }

  return null;
}

module.exports = { fetchFnDetails };
