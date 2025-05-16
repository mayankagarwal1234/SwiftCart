import jwt from 'jsonwebtoken';

const authuser = async (req, res, next) => {
  try {
    const {token} = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized. Login again." });
    }

    

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId =  decoded.id  

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token. Please login again." });
  }
};

export default authuser;
