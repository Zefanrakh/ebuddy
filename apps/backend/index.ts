import { config } from "dotenv";
import app from "./core/app.js";

config();

const PORT = process.env.API_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
