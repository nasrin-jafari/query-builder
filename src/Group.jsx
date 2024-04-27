import React from "react";
import { Button, Box, Select, MenuItem } from "@mui/material";
import Rule from "./Rule";

const Group = ({
  group,
  setGroup,
  canAddGroup,
  onAddGroup,
  onDeleteGroup,
  indexInParent,
}) => {
  const addRule = () => {
    const newRule = { type: "rule", field: "", operator: "", value: "" };
    const updatedRules = Array.isArray(group.rules)
      ? [...group.rules, newRule]
      : [newRule];
    setGroup({ ...group, rules: updatedRules });
  };

  const handleRuleChange = (index, updatedRule) => {
    const updatedRules = group.rules.map((rule, i) =>
      i === index ? updatedRule : rule
    );
    setGroup({ ...group, rules: updatedRules });
  };

  const deleteRule = (index) => {
    const updatedRules = group.rules.filter((_, i) => i !== index);
    setGroup({ ...group, rules: updatedRules });
  };

  const handleCombinatorChange = (event) => {
    setGroup({ ...group, combinator: event.target.value });
  };

  const handleAddGroup = () => {
    if (onAddGroup) {
      onAddGroup();
    }
  };

  const deleteGroup = (index) => {
    const updatedRules = group.rules.filter((_, i) => i !== index);
    setGroup({ ...group, rules: updatedRules });
  };

  return (
    <Box sx={{ border: "1px solid grey", p: 2, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Select
          value={group.combinator}
          onChange={handleCombinatorChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{ mr: 2, minWidth: 120 }}
        >
          <MenuItem value="and">AND</MenuItem>
          <MenuItem value="or">OR</MenuItem>
        </Select>
        <Button onClick={addRule} variant="contained" color="primary">
          Add Rule
        </Button>
        {canAddGroup && (
          <Button
            onClick={handleAddGroup}
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#ff9800", ml: 2 }}
          >
            Add Group
          </Button>
        )}
        {onDeleteGroup && (
          <Button
            onClick={() => onDeleteGroup(indexInParent)}
            variant="contained"
            color="secondary"
            sx={{ ml: 2 }}
          >
            Delete Group
          </Button>
        )}
      </Box>
      {group.rules &&
        group.rules.map((rule, index) =>
          rule.type === "rule" ? (
            <Rule
              key={index}
              rule={rule}
              onDelete={() => deleteRule(index)}
              onRuleChange={(prop, value) =>
                handleRuleChange(index, { ...rule, [prop]: value })
              }
              disableDelete={group.rules.length === 1}
            />
          ) : (
            <Group
              key={index}
              group={rule}
              setGroup={(newGroup) => handleRuleChange(index, newGroup)}
              onDeleteGroup={deleteGroup}
              indexInParent={index}
            />
          )
        )}
    </Box>
  );
};

export default Group;
//666
