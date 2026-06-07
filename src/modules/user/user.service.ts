
import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import jwt from "jsonwebtoken";
import config from "../../config";
// import { config } from "dotenv";


const loginUserIntoDB = async(payLoad: {
    email : string;
    password: string;
}) =>{

    const {email, password} = payLoad;

    const userData = await pool.query(
        `
        SELECT * FROM users where email = $1
        `,
        [email],
    );
    if(userData.rows.length ===0){
        throw new Error("Invalid Credentials");
    }
    const user = userData.rows[0];
    //console.log(user);

    const matchPassword = await bcrypt.compare(password, user.password);
   // const matchPassword = (password === user.password);
    console.log(matchPassword);
    if(!matchPassword){
         throw new Error("Invalid Credentials");
    }

    const JwtPayload={
        id: user.id,
        name: user.name,
        is_active: user.is_active,
        email: user.email
    }

    const accessToken = jwt.sign(JwtPayload, config.secret as string,
         {expiresIn: "1d"

         });
         return {accessToken};
}

export const authService = {
    loginUserIntoDB
}