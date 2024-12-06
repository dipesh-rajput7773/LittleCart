const jwt = require('jsonwebtoken');

const ensureAdminAuth = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Remove 'Bearer ' from the token if it exists
    const jwtToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

    // Verify token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    
    // Check if the user is an admin
    // if (decoded.role !== 'admin') {
    //   return res.status(403).json({ message: 'Access denied. You are not an admin.' });
    // }

    // Attach the decoded user info to the request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = ensureAdminAuth;
