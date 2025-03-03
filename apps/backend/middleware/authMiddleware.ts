import { Request, Response, NextFunction, RequestHandler } from "express";
import admin from "firebase-admin";

export const authMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.locals.userId = decodedToken.uid;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
