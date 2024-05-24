import jwt from 'jsonwebtoken'

export const jwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (token && user) {
      next()
    }
}