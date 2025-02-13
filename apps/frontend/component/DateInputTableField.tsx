import { TableCell } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReadUserDto } from "@repo/shared-types";
import dayjs from "dayjs";

export default function DateInputTableField({
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
