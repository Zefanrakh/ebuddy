import { TableCell, TextField } from "@mui/material";
import { UserDto } from "../types/UserDto";

export default function InputTableField({
  user,
  field,
  handleChange,
  isEditMode,
}: {
  field: keyof UserDto;
  user: UserDto;
  handleChange: (id: string, field: keyof UserDto, value: any) => void;
  isEditMode: boolean;
}) {
  const value = user[field];

  return (
    <TableCell>
      {isEditMode ? (
        <TextField
          type={typeof user[field]}
          size="small"
          value={value}
          onChange={(e) => handleChange(user.id, field, e.target.value)}
        />
      ) : (
        String(value)
      )}
    </TableCell>
  );
}
