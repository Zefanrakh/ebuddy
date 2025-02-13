"use client";

import { Suspense, useEffect } from "react";
import ProtectedRoute from "../../component/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchUserList } from "../../store/actions";
import { Typography } from "@mui/material";
import UsersTable from "../../component/UsersTable";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  return (
    <ProtectedRoute>
      <Suspense fallback={<p>Loading users...</p>}>
        <div>
          {error && <Typography color="error">{error}</Typography>}
          <UsersTable />
        </div>
      </Suspense>
    </ProtectedRoute>
  );
}
