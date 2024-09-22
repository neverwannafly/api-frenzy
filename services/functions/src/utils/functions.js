const { executeQuery } = require("../lib/postgres");

const fetchFnDetails = async (slug, userId) => {
  const { result: fnDetails } = await executeQuery(`
    SELECT
      functions.id,
      functions.limits,
      functions.code,
      functions.env_vars,
      functions.user_id,
      runtimes.docker_image,
      functions.status,
      functions.visibility
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

// Currently only supporting `User` invoker.
const createFunctionInvocation = async (fn, userId, userData, { stdout, stderr, success }) => {
  const { stats } = stdout || {};
  const currTime = new Date().toISOString();
  const values = [
    fn.id, +success, stats?.time, stats?.memory, stats?.cpu_system, stats?.cpu_user,
    JSON.stringify({ stdout, stderr }), currTime, currTime, JSON.stringify(userData), 'User', userId,
  ];
  const { success: querySuccess } = await executeQuery(`
    INSERT INTO function_invocations 
      (
        function_id, status, "time", memory, cpu_system, cpu_user,
        output, created_at, updated_at, user_details, invoker_type, invoker_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
  `, values);

  return querySuccess;
};

module.exports = { fetchFnDetails, createFunctionInvocation };
