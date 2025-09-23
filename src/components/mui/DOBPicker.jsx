import React, { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./DOBPicker.css"; // ✅ External styles

export default function DOBPicker() {
  const [value, setValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date of Birth"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        maxDate={dayjs()} // No future dates
        sx={{
          width: '45%'
        }}
        slotProps={{
          textField: {
            // fullWidth: true,
            helperText: "Select your birth date",
            className: "dob-input", // ✅ applies external CSS
          },
        }}
      />
    </LocalizationProvider>
  );
}
