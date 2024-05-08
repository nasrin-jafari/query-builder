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

const Rule = ({ name, fieldOptions, errors, remove, disableDelete , fixedRules }) => {
  const { control } = useFormContext();
  const extractedFields = fixedRules?.map(rule => rule.field);
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
        {fieldOptions?.length > 0 && (
          <Controller
            name={`${name}.field`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                label="Field"
                error={!!errors?.field}
                sx={{ borderColor: errors?.field ? "red" : "" }}
                disabled={disableDelete}
              >
                {fieldOptions?.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    onClick={() => console.log(option.value)}
                    // disabled={extractedFields?.includes(option.value)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        )}
      </FormControl>
      <FormControl
        variant="outlined"
        sx={{ minWidth: 120, flex: 1, mr: 2 }}
        error={!!errors?.operator}
      >
        <InputLabel>Operator</InputLabel>
        <Controller
          name={`${name}.operator`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              {...field}
              label="Operator"
              error={!!errors?.operator}
              sx={{ borderColor: errors?.operator ? "red" : "" }}
            >
              <MenuItem value="=">=</MenuItem>
              <MenuItem value="!=">!=</MenuItem>
              <MenuItem value=">">&gt;</MenuItem>
              <MenuItem value="<">&lt;</MenuItem>
            </Select>
          )}
        />
      </FormControl>
      <Controller
        name={`${name}.value`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Value"
            variant="outlined"
            error={!!errors?.value}
            sx={{ flex: 2, mr: 2, borderColor: errors?.value ? "red" : "" }}
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
