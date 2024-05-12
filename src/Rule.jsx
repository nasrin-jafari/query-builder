import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
  Box,
  FormHelperText,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const Rule = ({
  name,
  fieldOptions,
  errors,
  remove,
  disableDelete,
  handleFieldChange,
}) => {
  const { control } = useFormContext();
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
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Value"
            variant="outlined"
            sx={{ flex: 2, mr: 2 }}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
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
