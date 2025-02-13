import { Request, Response } from "express";
import {
  createUserData,
  fetchAllUsers,
  fetchUserData,
  updateUserData,
} from "../repository/userCollection.js";

export const getUserDataController = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const user = await fetchUserData(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
};

export const updateUserDataController = async (req: Request, res: Response) => {
  try {
    const { users } = req.body;
    await updateUserData(users);
    res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user data" });
  }
};

export const createUserDataController = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    await createUserData(user);
    res.status(200).json({ message: "User data created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user data" });
  }
};

export const fetchUsersController = async (req: Request, res: Response) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
