const jwt = require('jsonwebtoken');

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization;
    const accesstoken = token.split(' ')[1];
    if (accesstoken !== 'null') {
      jwt.verify(accesstoken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          if (err.message === 'jwt expired') {
            return res.status(403).json({
              errCode: -1,
              message: 'Token expired',
            });
          }
          res.status(403).json({
            errCode: 1,
            message: 'Token is not valid',
          });
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.status(403).json({ message: 'Bạn vui lòng đăng nhập', errCode: 3 });
    }
  },
};

export default middlewareController;
