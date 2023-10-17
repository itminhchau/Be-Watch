const jwt = require('jsonwebtoken');

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token', token);
    const accesstoken = token.split(' ')[1];
    if (accesstoken !== 'null') {
      jwt.verify(accesstoken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          res.status(403).json('Token is not valid');
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
