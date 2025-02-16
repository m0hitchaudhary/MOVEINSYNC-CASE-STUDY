const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  
  // Check both Authorization header and cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized, no token provided'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: 'Not authorized' });
  }
};

exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ 
      success: false,
      message: `User role ${req.user.role} is not authorized to access this route`
    });
  }
  next();
}; 