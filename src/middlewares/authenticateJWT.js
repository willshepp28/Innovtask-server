const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

function authenticateJWT(request, response, next) {
  const authenticationHeader = request.headers.authorization;

  if (authenticationHeader) {
    const token = authenticationHeader.split(" ")[1];

    jwt.verify(token, jwtSecret, (error, user) => {
      if (error) {
        return response.sendStatus(403);
      }

      request.user = user;
      next();
    });
  } else {
    response.sendStatus(401);
  }
}

module.exports = authenticateJWT;
