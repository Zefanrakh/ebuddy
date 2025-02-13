import { config } from "dotenv";
import admin from "firebase-admin";

config();

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: process.env.F_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: process.env.F_CLIENT_EMAIL,
    projectId: process.env.F_PROJECT_ID,
  }),
});

const db = admin.firestore();

export { db };
