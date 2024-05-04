import React, { useState } from "react";
import Group from "./Group";
import { Button } from "@mui/material";

const fieldOptions = [
  { label: "First Name", value: "firstName" },
  { label: "Last Name", value: "lastName" },
  { label: "Age", value: "age" },
  { label: "field 4", value: "field4" },
  { label: "field 5", value: "field5" },
  { label: "field 6", value: "field6" },
];
const QueryBuilder = () => {
  const createDefaultRule = () => ({
    type: "rule",
    field: "",
    operator: "",
    value: "",
  });

  // Initialize the state with one group that includes one default rule
  const [query, setQuery] = useState({
    combinator: "and",
    rules: [createDefaultRule()],
  });

  const addGroup = () => {
    const newGroup = {
      combinator: "and",
      rules: [createDefaultRule()],
    };
    setQuery((prev) => ({
      ...prev,
      rules: [...prev.rules, newGroup],
    }));
  };

  const exportQuery = () => {
    console.log(JSON.stringify(query, null, 2));
  };

  return (
    <div>
      <Group
        group={query}
        setGroup={setQuery}
        canAddGroup={true} // Allow the main group to show the add group button
        onAddGroup={addGroup} // Pass the addGroup function as a prop
        fieldOptions={fieldOptions}
      />

      <Button onClick={exportQuery} variant="contained" color="primary">
        Export Query
      </Button>
    </div>
  );
};

export default QueryBuilder;

