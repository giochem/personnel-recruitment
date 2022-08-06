const { createUser, findUserByEmailOrName, findUserById, updateUser } = require('../services/user.service');

const { generateHashed, generateToken, hashCompare } = require('../helpers/security.helper');

module.exports = {
  findUserById: async (req, res, next) => {
    try {
      return res.status(200).json(await findUserById({ userId: req.auth }));
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { update } = req.body;
      if (!update) {
        return res.status(400).json({
          name: 'ClientError',
          code: 400,
          message: 'Request in body not enough data',
        });
      }
      return res.status(200).json(await updateUser({ userId: req.auth, update }));
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ name: 'ClientError', code: 400, message: 'Please add all field' });
      }
      const userExist = await findUserByEmailOrName({ email, name });

      if (userExist) {
        return res.status(400).json({
          name: 'ClientError',
          code: 400,
          message: 'User is exist',
        });
      }
      const newUser = await createUser({ name, email, password: await generateHashed(password, 10) });
      res.cookie('refreshToken', generateToken({ data: name, name: process.env.REFRESH_JWT }), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 356,
      });
      const accessToken = generateToken({ data: newUser._id, name: process.env.ACCESS_JWT });
      res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 60 * 24 * 356 });

      return res.status(201).json({ name });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ name: 'ClientError', code: 400, message: 'Please add all field' });
      }

      const userExist = await findUserByEmailOrName({ email });

      if (userExist && (await hashCompare({ password, hash: userExist.password }))) {
        res.cookie('refreshToken', generateToken({ data: userExist.name, name: process.env.REFRESH_JWT }), {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 356,
        });
        const accessToken = generateToken({ data: userExist._id, name: process.env.ACCESS_JWT });
        res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 60 * 24 * 356 });
        return res.status(201).json({ name: userExist.name });
      }

      return res.status(400).json({ name: 'ClientError', code: 400, message: 'Email or password incorrect' });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      res.cookie('accessToken', { maxAge: -1 });
      res.cookie('refreshToken', { maxAge: -1 });
      req.session.destroy();
      res.status(200).json({ status: 'success' });
    } catch (error) {
      next(error);
    }
  },
};
