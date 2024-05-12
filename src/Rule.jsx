import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
  Box,
  FormHelperText,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
const Rule = ({
  name,
  fieldOptions,
  errors,
  handleFieldChange,
  disableDelete,
  remove,
}) => {
  const { control, watch } = useFormContext();

  // Determine the input type based on dataType
  const renderInputField = (field, dataType, error) => {
    console.log(field);

    switch (dataType) {
      case "number":
        return (
          <TextField
            {...field}
            type="number"
            label="Value"
            variant="outlined"
            error={!!error}
            helperText={error ? error.message : null}
          />
        );
      case "checkbox":
        return (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label="Value"
          />
        );
      case "date":
        // Assuming you want a date input (requires additional setup with a date library like @mui/x-date-pickers)
        return (
          <TextField
            {...field}
            type="date"
            label="Value"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            error={!!error}
            helperText={error ? error.message : null}
          />
        );
      default:
        return (
          <TextField
            {...field}
            type="text"
            label="Value"
            variant="outlined"
            error={!!error}
            helperText={error ? error.message : null}
          />
        );
    }
  };

  // Get current field data to determine the appropriate input type
  const currentField = watch(`${name}.field`);
  const currentFieldData =
    fieldOptions.find((option) => option.value === currentField) || {};

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        mb: 2,
        backgroundColor: "#424242",
        color: "white",
        borderRadius: "4px",
      }}
    >
      <Controller
        name={`${name}.field`}
        control={control}
        defaultValue=""
        render={({ field, fieldState: { error } }) => (
          <FormControl
            variant="outlined"
            sx={{ minWidth: 120, flex: 1, mr: 2 }}
            error={!!error}
          >
            <InputLabel>Field</InputLabel>
            <Select
              {...field}
              label="Field"
              disabled={disableDelete}
              onChange={(e) => {
                field.onChange(e); // First, handle react-hook-form changes
                handleFieldChange(e.target.value); // Then, handle custom logic
              }}
            >
              {fieldOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />

      <Controller
        name={`${name}.operator`}
        control={control}
        defaultValue="="
        render={({ field }) => (
          <FormControl
            variant="outlined"
            sx={{ minWidth: 120, flex: 1, mr: 2 }}
          >
            <InputLabel>Operator</InputLabel>
            <Select {...field} label="Operator">
              <MenuItem value="=">=</MenuItem>
              <MenuItem value="!=">!=</MenuItem>
              <MenuItem value=">">&gt;</MenuItem>
              <MenuItem value="<">&lt;</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name={`${name}.value`}
        control={control}
        defaultValue=""
        render={({ field, fieldState: { error } }) =>
          renderInputField(field, currentFieldData.dataType, error)
        }
      />
      {!disableDelete && (
        <Button onClick={remove} variant="contained" color="secondary">
          X
        </Button>
      )}
    </Box>
  );
};

export default Rule;
/////س
