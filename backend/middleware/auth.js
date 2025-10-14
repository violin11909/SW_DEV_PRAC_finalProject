const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Protect routes
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    //Make sure token exists
    if (!token) {
        return res.status(401).json({success: false, message: 'Not authorized to access this route'});
    }
    try {
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({success: false, message: 'User no longer exists'});
        }

        next();
    } catch (err) {
        return res.status(401).json({success: false, message: 'Not authorized to access this route2'});
    }
}

exports.authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }
        
        const userRoles = req.user.role; 
        const canAccess = userRoles == roles;

        if (!canAccess) {
            return res.status(403).json({
                success: false,
                message: `User role is not authorized to access this route`
            });
        }
        next();
    };
};
