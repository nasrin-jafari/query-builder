import React from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const Rule = ({
  name,
  fieldOptions,
  errors,
  remove,
  disableDelete,
  fixedRules,
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
      <FormControl
        variant="outlined"
        sx={{ minWidth: 120, flex: 1, mr: 2 }}
        error={!!errors?.field}
      >
        <InputLabel>Field</InputLabel>
        <Controller
          name={`${name}.field`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              {...field}
              label="Field"
              disabled={disableDelete}
              onChange={(e) =>
                handleFieldChange(e.target.value, parseInt(name.split("[")[1]))
              }
            >
              {fieldOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
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
        render={({ field }) => (
          <TextField
            {...field}
            label="Value"
            variant="outlined"
            sx={{ flex: 2, mr: 2 }}
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
