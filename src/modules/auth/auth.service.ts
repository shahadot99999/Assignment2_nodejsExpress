import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import type { IUser } from "./auth.interface";

const createUserIntoDB = async(payLoad : IUser)=>{

    const {name, email, password, role}= payLoad;

    const hashPassword = await bcrypt.hash(password, 10);

     const result = await pool.query(`
     INSERT INTO users(name, email, password, role)
       VALUES($1, $2, $3, $4)
       RETURNING *
      `,
    [name, email, hashPassword, role] ,
    );

    delete result.rows[0].password;

    return result;
}

const getAllUsersFromDB = async()=>{
    const result = await pool.query(`
     
      SELECT * FROM users
      `);

      return result;
}


const getSingleUserFromDB = async(id : string)=>{
     const result = await pool.query(`
     SELECT * FROM users WHERE id=$1 
      `,
      [id],
     
    );
    return result;
}

const updateUserFromDB = async(payLoad : IUser, id: string)=>{

    const {name, password, role} = payLoad;

     // HASH THE PASSWORD IF IT'S BEING UPDATED
    let hashedPassword = null;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    const result = await pool.query(

    `
  UPDATE users 
  SET 
  name=COALESCE($1, name),
  password=COALESCE($2, password), 
  role=COALESCE($3, role)
 


  WHERE id=$4
   RETURNING id, name, email, role, created_at
  
  `,
    [name, hashedPassword, role, id],
  );
  return result;
}

const deleteUserFromDB = async(id: string)=>{
     const result = await pool.query(
      `
      DELETE FROM users WHERE id=$1
      `,
    [id],
  );
  return result;
}


export const userService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB
    
}