import { Router } from "express";
import {
  createUserDataController,
  fetchUsersController,
  getUserDataController,
  updateUserDataController,
} from "../controller/api.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/fetch-user-data", getUserDataController);
router.post("/update-user-data", updateUserDataController);
router.post("/create-user-data", createUserDataController);
router.get("/fetch-users", fetchUsersController);

export default router;
