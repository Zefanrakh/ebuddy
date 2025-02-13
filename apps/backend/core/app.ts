import express from "express";
import userRoutes from "../routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

export default app;
