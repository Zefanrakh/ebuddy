import { Box, Button, Card, Paper, TextField, Typography } from "@mui/material";
import { User } from "@repo/shared-types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { capitalize } from "../utils/capitalize";

export default function UsersTableMobile({
  editMode,
  handleChange,
  handleEditClick,
}: {
  editMode: { [key: string]: boolean };
  handleChange: (id: string, field: keyof User, value: any) => void;
  handleEditClick: (id: string) => void;
}) {
  const users = useSelector((state: RootState) => state.user.users);

  return (
    <Box>
      {users.map((user) => (
        <Card key={user.id} sx={{ p: 2, mb: 2 }}>
          {Object.entries(user).map(([key, value]) =>
            key !== "id" ? (
              editMode[user.id] ? (
                <div key={key} style={{ marginBottom: 5 }}>
                  <strong>{capitalize(key)}:</strong>{" "}
                  <TextField
                    size="small"
                    value={value as string}
                    onChange={(e) =>
                      handleChange(user.id, key as keyof User, e.target.value)
                    }
                    fullWidth
                  />
                </div>
              ) : (
                <Typography key={key} sx={{ mb: 1 }}>
                  <strong>{capitalize(key)}:</strong> {String(value)}
                </Typography>
              )
            ) : null
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditClick(user.id)}
            fullWidth
          >
            {editMode[user.id] ? "Save" : "Edit"}
          </Button>
        </Card>
      ))}
    </Box>
  );
}
