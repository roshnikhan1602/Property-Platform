const jwt = require("jsonwebtoken");

const optionalAuthMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = {
      id: decoded.id,
      _id: decoded.id,
      role: decoded.role,
    };
  } catch (error) {
    // Ignore invalid token and continue as guest
  }

  next();
};

module.exports = optionalAuthMiddleware;