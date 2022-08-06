module.exports = {
  error: async (error, req, res, next) => {
    if (error) {
      console.log('🚀 ~ file: error.middleware.js ~ line 3 ~ error: ~ error', error.stack);
      res.status(400).json({
        name: error.name || 'ServerError',
        code: error.code,
        message: error.message,
        stack: error.stack,
      });
    }
    next();
  },
};
