import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import DateInputTableField from "./DateInputTableField";
import InputTableField from "./InputTableField";
import { UserDto } from "../types/UserDto";

export default function UsersTableDesktop({
  editMode,
  handleChange,
  handleEditClick,
  handleSaveAll,
}: {
  editMode: { [key: string]: boolean };
  handleChange: (id: string, field: keyof UserDto, value: any) => void;
  handleEditClick: (id: string) => void;
  handleSaveAll: () => void;
}) {
  const users = useSelector((state: RootState) => state.user.users);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Total Average Weight Ratings</TableCell>
            <TableCell>Number of Rents</TableCell>
            <TableCell>Recently Active</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>
              {Object.values(editMode).some((e) => e) ? (
                <Button
                  style={{ width: 100 }}
                  variant="contained"
                  color="primary"
                  onClick={handleSaveAll}
                >
                  Save All
                </Button>
              ) : (
                "Actions"
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <InputTableField
                handleChange={handleChange}
                field="name"
                user={user}
                isEditMode={editMode[user.id]}
              />
              <InputTableField
                handleChange={handleChange}
                field="totalAverageWeightRatings"
                user={user}
                isEditMode={editMode[user.id]}
              />
              <InputTableField
                handleChange={handleChange}
                field="numberOfRents"
                user={user}
                isEditMode={editMode[user.id]}
              />
              <DateInputTableField
                handleChange={handleChange}
                field="recentlyActive"
                user={user}
                isEditMode={editMode[user.id]}
              />
              <InputTableField
                handleChange={handleChange}
                field="score"
                user={user}
                isEditMode={editMode[user.id]}
              />
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditClick(user.id)}
                >
                  {editMode[user.id] ? "Save" : "Edit"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
