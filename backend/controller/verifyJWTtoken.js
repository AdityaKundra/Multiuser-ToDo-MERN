const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    // const token = req.cookies.token; // Get token from cookies
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token
  
    try{
        if (!token) {
            return res.status(401).json({ message: 'No token provided.' });
        }
    
        jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Failed to authenticate token.' });
            }
    
            req.decode = decoded; // Attach user info to request
            next(); // Proceed to the next middleware or route handler
        });
    }
    catch(err){
        // res.clearCookie("token");
        return res.redirect("/");
    }
  };
  
  module.exports = jwtMiddleware;
  