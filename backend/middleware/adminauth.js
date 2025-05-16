import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const {token} = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.Login Again' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: check role if needed
    if (decoded !== process.env.ADMIN_EMAIL+ process.env.ADMIN_PASSWORD) {
      return res.status(403).json({ success: false, message: 'Access forbidden. Admins only.' });
    }
    next();

  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token', error: error.message });
  }
};

export default adminAuth;
