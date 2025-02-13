import { TableCell, TextField } from "@mui/material";
import { ReadUserDto } from "@repo/shared-types";

export default function InputTableField({
  user,
  field,
  handleChange,
  isEditMode,
}: {
  field: keyof ReadUserDto;
  user: ReadUserDto;
  handleChange: (id: string, field: keyof ReadUserDto, value: any) => void;
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
