import { Timestamp } from "firebase-admin/firestore";
import { db } from "../config/firebaseConfig.js";
import { User } from "../entities/user.js";
import { UpdateUserDto } from "../dtos/UpdateUserDto.js";
import { CreateUserDto } from "../dtos/CreateUserDto.js";

type Doc = FirebaseFirestore.DocumentSnapshot<
  FirebaseFirestore.DocumentData,
  FirebaseFirestore.DocumentData
>;

const userCollection = db.collection("users");

export const fetchUserData = async (userId: string): Promise<User | null> => {
  const doc = await userCollection.doc(userId).get();
  if (!doc.exists) return null;
  await calculateUserScore(doc);
  return doc.data() as User;
};

export const updateUserData = async (data: UpdateUserDto[]): Promise<void> => {
  const updatePromises = data.map((data) =>
    db
      .collection("users")
      .doc(data.id)
      .update({
        ...data,
        recentlyActive: data.recentlyActive
          ? Timestamp.fromDate(new Date(data.recentlyActive))
          : null,
      })
  );

  await Promise.all(updatePromises);
};

export const createUserData = async (data: CreateUserDto): Promise<void> => {
  const usersRef = db.collection("users");

  const docRef = await usersRef.add(data);
};

export const calculateUserScore = async (doc: Doc) => {
  const maxTimestampWeight = Date.now();
  const data = doc.data() as User;
  const recentlyActiveSeconds = data.recentlyActive?._seconds || 0;
  const score =
    data.totalAverageWeightRatings * 10 +
    data.numberOfRents * 2 +
    recentlyActiveSeconds / maxTimestampWeight;

  await doc.ref.update({ score });
};

export const fetchAllUsers = async (): Promise<User[]> => {
  const snapshot = await userCollection.get();
  const users = await Promise.all(
    snapshot.docs.map(async (doc) => {
      await calculateUserScore(doc);
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        recentlyActive: data.recentlyActive?.toDate().toISOString(),
      } as User;
    })
  );

  return await Promise.all(users);
};
