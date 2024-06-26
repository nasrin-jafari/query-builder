import React from "react";
import {
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import Rule from "./Rule";

const Group = ({
  name,
  combinatorName,
  fieldOptions,
  errors = {},
  canAddGroup = false,
  isMainGroup = false,
  removeGroup = null,
  fixedRules = [],
  defaultRules,
}) => {
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });
  const currentGroup = watch(name) || [];
  const currentCombinator = watch(combinatorName) || "and";

  // Extract fields from fixed rules
  const extractedFixedFields = fixedRules.map((rule) => rule.field);

  const handleFieldChange = (index, newValue) => {
    const newFields = currentGroup.map((rule, idx) => {
      if (idx === index) {
        return { ...rule, field: newValue };
      }
      return rule;
    });
    setValue(`${name}`, newFields); // Update react-hook-form state
  };

  // Calculate the available fields for each rule within this group
  const getAvailableFields = (currentIndex) => {
    const usedFields = currentGroup
      .filter((rule, index) => rule.type === "rule" && index !== currentIndex)
      .map((rule) => rule.field);

    return fieldOptions.filter((option) =>
      currentCombinator === "or"
        ? !extractedFixedFields.includes(option.value) ||
          !usedFields.includes(option.value)
        : !usedFields.includes(option.value)
    );
  };

  const addRule = () => {
    const availableFields = getAvailableFields();
    if (availableFields.length > 0) {
      append({ type: "rule", field: "", operator: "=", value: "" });
    }
  };
  const addGroup = () => {
    append({
      type: "group",
      combinator: "and",
      key: "parent",
      rules: defaultRules,
    });
  };
  const countRules = currentGroup.filter((rule) => rule.type === "rule").length;
  return (
    <Box sx={{ border: "1px solid grey", p: 2, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <FormControl variant="outlined" sx={{ mr: 2, minWidth: 120 }}>
          <InputLabel>Combinator</InputLabel>
          <Controller
            name={combinatorName}
            control={control}
            defaultValue="and"
            render={({ field }) => (
              <Select {...field} label="Combinator">
                <MenuItem value="and">AND</MenuItem>
                <MenuItem value="or">OR</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <FormControl variant="outlined" sx={{ mr: 2, minWidth: 120 }}>
          <InputLabel>key</InputLabel>
          <Controller
            name="key"
            control={control}
            defaultValue="target"
            render={({ field }) => (
              <Select {...field} label="key">
                <MenuItem value="parent">parent</MenuItem>
                <MenuItem value="target">target</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        {currentCombinator === "or" ? (
          <Button onClick={addRule} variant="contained" color="primary">
            Add Rule
          </Button>
        ) : countRules < fieldOptions.length ? (
          <Button onClick={addRule} variant="contained" color="primary">
            Add Rule
          </Button>
        ) : null}

        {canAddGroup && (
          <Button
            onClick={addGroup}
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#ff9800", ml: 2 }}
          >
            Add Group
          </Button>
        )}
        {!isMainGroup && removeGroup && (
          <Button
            onClick={removeGroup}
            variant="contained"
            color="secondary"
            sx={{ ml: 2 }}
          >
            Delete Group
          </Button>
        )}
      </Box>
      {fields.map((field, index) =>
        field.type === "rule" ? (
          <Rule
            key={field.id}
            name={`${name}[${index}]`}
            fieldOptions={getAvailableFields(index)}
            errors={errors.rules ? errors.rules[index] : {}}
            remove={() => remove(index)}
            disableDelete={index < fixedRules.length}
            fixedRules={fixedRules}
            handleFieldChange={(newValue) => handleFieldChange(index, newValue)}
          />
        ) : (
          <Group
            key={field.id}
            name={`${name}[${index}].rules`}
            combinatorName={`${name}[${index}].combinator`}
            fieldOptions={fieldOptions}
            errors={errors[index] || {}}
            canAddGroup={true}
            removeGroup={() => remove(index)}
            fixedRules={fixedRules}
            defaultRules={defaultRules}
          />
        )
      )}
    </Box>
  );
};

export default Group;
/////س
