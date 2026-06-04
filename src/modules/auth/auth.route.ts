import { Router } from "express";
import { userController } from "./auth.controller";



const router = Router()

router.post("/signup", userController.createUser);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getSingleUser );
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleUser);


export const userRoute = router