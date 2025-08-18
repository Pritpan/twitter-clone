import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config(
    {
        path : '../config/.env'
    }
);

const isAuthenticated = (req, res, next) => {
    try{
        console.log("Cookies received:", req.cookies);
        const token = req.cookies.token;
        console.log("Token from cookie:", token); // 👈 log here

        if(!token){
            return res.status(401).json({
                message : "Unauthorized access, please login first",
                success: false
            }
            );
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
       console.log("Decoded token:", decoded);
        req.user = decoded.tokendata.userID;
        next();
    }catch(error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid token", success: false });
    }
}

export default isAuthenticated;