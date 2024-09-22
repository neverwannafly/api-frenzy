const useragent = require('useragent');

const fetchUserData = function(req) {
  const ipAddress = req.headers['x-forwarded-for'] || req.ip;
  const userAgent = req.headers['user-agent'];
  const referer = req.headers['referer'] || null;
  const acceptLanguage = req.headers['accept-language'] || null;
  const method = req.method;
  const url = req.originalUrl;

  const agent = useragent.parse(userAgent);
  
  return {
    ipAddress,
    userAgent: agent,
    referer,
    acceptLanguage,
    method,
    url
  };
}

module.exports = fetchUserData;