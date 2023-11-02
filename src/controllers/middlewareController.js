const jwt = require('jsonwebtoken');

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization;
    const accessToken = token.split(' ')[1];
    if (!accessToken || accessToken === 'null') {
      return res.status(403).json({ message: 'Vui lòng đăng nhập', errCode: 3 });
    }

    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        if (err.message === 'jwt expired') {
          return res.status(403).json({ errCode: -1, message: 'Token hết hạn' });
        }
        return res.status(403).json({ errCode: 1, message: 'Token không hợp lệ' });
      }

      req.user = user;
      next();
    });
  },
};

export default middlewareController;
