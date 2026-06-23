import { Router, type NextFunction, type Request, type Response } from "express";
import { userController } from "./auth.controller";
import auth from "../../middleware/auth";



const router = Router();
 


router.post("/signup", userController.createUser);

router.get('/', auth(), userController.getAllUsers);
router.get('/:id', userController.getSingleUser );
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleUser);


export const userRoute = router