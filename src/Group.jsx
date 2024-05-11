import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
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
  defaultRules = [],
}) => {
  const { control, watch, getValues, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });
  const currentGroup = watch(name) || [];
  const currentCombinator = watch(combinatorName) || "and";
  // State to track field usage
  const [usedFields, setUsedFields] = useState([]);

  useEffect(() => {
    const rules = getValues(name);
    setUsedFields(rules.map((rule) => rule.field));
  }, [getValues, name]);

  const handleFieldChange = (fieldValue, index) => {
    const values = getValues(name);
    values[index].field = fieldValue;
    setValue(name, values);
    setUsedFields(values.map((rule) => rule.field));
  };

  const addRule = () => {
    append({ type: "rule", field: "", operator: "=", value: "" });
  };

  const addGroup = () => {
    append({
      type: "group",
      combinator: "and",
      key: "parent",
      rules: defaultRules,
    });
  };
  const extractedFixedFields = fixedRules.map((rule) => rule.field);

  const getAvailableFields = (currentIndex) => {
    const currentValues = getValues(name);
    const usedFields = currentGroup
      .filter((rule, index) => rule.type === "rule" && index !== currentIndex)
      .map((rule) => rule.field);
    if (currentCombinator === "and") {
      return fieldOptions.filter(
        (option) =>
          !currentValues.some(
            (rule, idx) => rule.field === option.value && idx !== currentIndex
          )
      );
    } else if (currentCombinator === "or") {
      // Allow repetition of non-fixed fields but prevent duplicates of fixed fields
      return fieldOptions.filter(
        (option) =>
          !extractedFixedFields.includes(option.value) ||
          !usedFields.includes(option.value)
      );
    }
  };
console.log(errors ,'')
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
            defaultValue="parent"
            render={({ field }) => (
              <Select {...field} label="key">
                <MenuItem value="parent">parent</MenuItem>
                <MenuItem value="target">target</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        {canAddGroup && (
          <Button
            onClick={addGroup}
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
          >
            Add Group
          </Button>
        )}
        {currentCombinator === "or" ? (
          <Button onClick={addRule} variant="contained" color="primary">
            Add Rule
          </Button>
        ) : currentGroup.length < fieldOptions.length ? (
          <Button onClick={addRule} variant="contained" color="primary">
            Add Rule
          </Button>
        ) : null}
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
          handleFieldChange={handleFieldChange}
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
          />
        )
      )}
    </Box>
  );
};

export default Group;
