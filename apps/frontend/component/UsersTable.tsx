"use client";

import { useState } from "react";
import {
  useMediaQuery,
  Box,
  Typography,
  Button,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { User } from "@repo/shared-types";
import UsersTableMobile from "./UsersTableMobile";
import UsersTableDesktop from "./UsersTableDesktop";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setUsers } from "../store/reducers";
import { fetchUserList, updateUserData } from "../store/actions";
import dayjs from "dayjs";

export default function UsersTable() {
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const isMobile = useMediaQuery("(max-width:600px)");
  const users = useSelector((state: RootState) => state.user.users);
  const loading = useSelector((state: RootState) => state.user.loading);
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateUser = (id: string) => {
    dispatch(updateUserData(id));
  };

  const handleEditClick = (id: string) => {
    setEditMode((prev) => ({ ...prev, [id]: !prev[id] }));

    if (editMode[id]) {
      handleUpdateUser(id);
    }
  };

  const handleSaveAll = () => {
    dispatch(updateUserData(null)).then(() => {
      setEditMode((eMode) =>
        Object.fromEntries(Object.keys(eMode).map((key) => [key, false]))
      );
    });
  };

  const handleChange = (id: string, field: keyof User, value: any) => {
    dispatch(
      setUsers(
        users.map((user) => {
          switch (typeof user[field]) {
            case "number":
              value = Number(value);
              break;
            case "string":
              value = String(value);
              break;
            default:
          }
          const updatedUser =
            user.id === id ? { ...user, [field]: value } : user;
          updatedUser.recentlyActive = dayjs(
            updatedUser.recentlyActive
          ).toString();
          return updatedUser;
        })
      )
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Dashboard
      </Typography>
      <Button
        style={{ marginBottom: 10 }}
        variant="contained"
        onClick={() => dispatch(fetchUserList())}
      >
        Refresh Users
      </Button>
      {loading ? (
        <Skeleton />
      ) : isMobile ? (
        <UsersTableMobile
          editMode={editMode}
          handleChange={handleChange}
          handleEditClick={handleEditClick}
        />
      ) : (
        <UsersTableDesktop
          handleSaveAll={handleSaveAll}
          editMode={editMode}
          handleChange={handleChange}
          handleEditClick={handleEditClick}
        />
      )}
    </Box>
  );
}
