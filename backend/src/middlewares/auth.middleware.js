// NOTE: Since we only have single route, i.e. graphql, we are not throwing error
// for unauthorized access. We are just returning req.is_auth = false, which can later be checked in resolver for sensitive reoutes.

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const auth_header = req.get("Authorization");
  if (!auth_header) {
    req.is_auth = false;
    return next();
  }

  const token = auth_header.split(" ")?.[1]; // Bearer <token>
  if (!token) {
    req.is_auth = false;
    return next();
  }

  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded_token) {
      req.user_id = decoded_token.id;
      req.is_auth = true;
      return next();
    }

    req.is_auth = false;
    return next();
  } catch (err) {
    req.is_auth = false;
    return next();
  }
};
