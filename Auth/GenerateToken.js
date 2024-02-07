import jwt from "jsonwebtoken"

const SECRET_KEY = "perfect"
export function GenerateToken(user) {
  return jwt.sign({
                id: user._id,
                username: user.username,
                email: user.email
            }, SECRET_KEY, { expiresIn: '1h' });
}
