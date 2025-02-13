import { TableCell } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { UserDto } from "../types/UserDto";

export default function DateInputTableField({
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            slotProps={{ textField: { size: "small" } }}
            value={dayjs(String(value))}
            onChange={(v) => handleChange(user.id, field, v)}
          />
        </LocalizationProvider>
      ) : (
        dayjs(String(value)).format("DD/MM/YYYY HH:mm:ssZ[Z]")
      )}
    </TableCell>
  );
}
