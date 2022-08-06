const jwt = require('jsonwebtoken');
const { findUserByEmailOrName } = require('../services/user.service');
module.exports = {
  userAuth: async (req, res, next) => {
    try {
      const { accessToken, refreshToken } = Object.fromEntries(
        req.headers.cookie.split('; ').map((e) => {
          const cookie = e.split('=');
          return [cookie[0], cookie[1]];
        })
      );

      if (!accessToken || !refreshToken) {
        return res.status(400).json({
          name: 'ClientError',
          code: 400,
          message: 'Not authorized',
        });
      }
      const decode = jwt.verify(accessToken, process.env.ACCESS_JWT);
      req.auth = decode.data;

      next();
    } catch (error) {
      if (error.message === 'jwt malformed') {
        return res.status(400).json({ name: 'ClientError', code: 400, message: 'Not header authorized' });
      }
      next(error);
    }
  },
};
