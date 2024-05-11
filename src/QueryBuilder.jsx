import React from "react";
import { Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Group from "./Group";

const fieldOptions = [
  { label: "parent", value: "parent" },
  { label: "target", value: "target" },
  { label: "time", value: "time" },
  { label: "agent id", value: "agentId" },
  { label: "server id", value: "serverId" },
  { label: "score", value: "score" },
];

const ruleSchema = yup.object().shape({
  field: yup.string().required("Field is required"),
  operator: yup.string().required("Operator is required"),
  value: yup.string().required("Value is required"),
});

const groupSchema = yup.object().shape({
  combinator: yup.string().required("Combinator is required"),
  rules: yup
    .array()
    .of(
      yup.lazy((value) => (value.type === "group" ? groupSchema : ruleSchema))
    ),
});

const schema = yup.object().shape({
  combinator: yup.string().required("Combinator is required"),
  rules: yup
    .array()
    .of(
      yup.lazy((value) => (value.type === "group" ? groupSchema : ruleSchema))
    ),
});
const fixedRules = [
  { type: "rule", field: "parent", operator: "=", value: "" },
  { type: "rule", field: "target", operator: "=", value: "" },
  { type: "rule", field: "time", operator: "=", value: "" },
];
const firstRules = [
  { type: "rule", field: "agentId", operator: "=", value: "" },
];
const defaultRules = [...fixedRules, ...firstRules];

const QueryBuilder = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: "group",
      combinator: "and",
      key: "parent",
      rules: defaultRules,
    },
  });

  const { handleSubmit, formState } = methods;
  const { errors } = formState;

  const exportQuery = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(exportQuery)}>
        <Group
          name="rules"
          combinatorName="combinator"
          keyName="key"
          fieldOptions={fieldOptions}
          errors={errors}
          canAddGroup={true}
          isMainGroup={true}
          fixedRules={fixedRules}
          defaultRules={defaultRules}
        />
        <Button type="submit" variant="contained" color="primary">
          Export Query
        </Button>
      </form>
    </FormProvider>
  );
};

export default QueryBuilder;
