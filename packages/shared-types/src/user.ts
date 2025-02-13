export interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface User {
  id: string;
  name: string;
  totalAverageWeightRatings: number;
  numberOfRents: number;
  recentlyActive: FirestoreTimestamp;
  score?: number;
}
