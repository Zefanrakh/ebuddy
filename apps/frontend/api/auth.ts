// Import the functions you need from the SDKs you need
import { CreateUserDto } from "@repo/shared-types";
import { FirebaseOptions, getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createUser } from "./createUser";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

/**
 * Registers a new user using Firebase Authentication.
 *
 * This function creates a new user in Firebase Authentication using
 * an email and password. The user object should contain additional
 * user information, such as `name`, which might be used later for profile updates.
 *
 * @param {CreateUserDto & { email: string; password: string }} user - The user details for registration.
 * @param {string} user.email - The email address for registration.
 * @param {string} user.password - The password for the new user.
 * @param {string} user.name - The full name of the user.
 *
 * @throws {Error} Throws an error if required fields are missing or Firebase registration fails.
 */

export async function register(
  user: CreateUserDto & { email: string; password: string }
) {
  const { email, password, name } = user;
  if (!email || !password || !name)
    throw new Error("Email and password are required.");

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await createUser({ name });
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}

/**
 * Authenticates a user with Firebase and sets an authentication token in the cookies.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @throws {Error} If email or password is missing, or authentication fails.
 */

export async function login(email: string, password: string) {
  if (!email || !password) throw new Error("Email and password are required.");

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

/**
 * Logs out the user by removing the authentication token and signing out from Firebase.
 *
 * @throws {Error} If there is an issue with clearing the authentication token or signing out.
 */

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

export { app, auth };
