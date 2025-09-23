import React from "react";
import TextField from "@mui/material/TextField";
import "./CustomInput.css";

const CustomInput = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    helperText,
    error = false,
    required = false,
    variant = "outlined", // "filled" | "standard"
    fullWidth = true,
    size = "medium", // "small" | "medium"
    disabled = false,
    multiline = false,
    rows,
}) => {
    return (
        <div className="custom-input-container">
            <TextField
                className="custom-input"
                label={label}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                helperText={helperText}
                error={error}
                required={required}
                variant={variant}
                fullWidth={fullWidth}
                size={size}
                disabled={disabled}
                multiline={multiline}
                rows={rows}
            />
        </div>
    );
};

export default CustomInput;
