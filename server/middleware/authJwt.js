const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = 'youraccesstokensecret';

const authJwt = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided!' });
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        req.userId = decoded.email;
        next();
    });
};

module.exports = authJwt;
