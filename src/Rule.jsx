import React from 'react';
import { TextField, MenuItem, FormControl, Select, InputLabel, Button, Box } from '@mui/material';

const Rule = ({ rule, onDelete, onRuleChange, disableDelete }) => {
    return (
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        mb: 2,
        backgroundColor: '#424242', // Adjust the background color to match the dark theme
        color: 'white', // Text should be white for readability
        borderRadius: '4px',
        // Add more styling as needed...
      }}>
      <FormControl variant="outlined" sx={{ minWidth: 120, flex: 1 }}>
        <InputLabel>Field</InputLabel>
        <Select
          label="Field"
          value={rule.field}
          onChange={e => onRuleChange('field', e.target.value)}
        >
          <MenuItem value="firstName">First Name</MenuItem>
          <MenuItem value="lastName">Last Name</MenuItem>
          <MenuItem value="age">Age</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 120, flex: 1 }}>
        <InputLabel>Operator</InputLabel>
        <Select
          label="Operator"
          value={rule.operator}
          onChange={e => onRuleChange('operator', e.target.value)}
        >
          <MenuItem value="=">=</MenuItem>
          <MenuItem value="!=">!=</MenuItem>
          <MenuItem value=">">&gt;</MenuItem>
          <MenuItem value="<">&lt;</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Value"
        variant="outlined"
        value={rule.value}
        onChange={e => onRuleChange('value', e.target.value)}
        sx={{ flex: 2 }}
      />
  <Button
        onClick={onDelete}
        variant="contained"
        color="secondary"
        disabled={disableDelete}
      >
        Delete Rule
      </Button>    </Box>
  );
};

export default Rule;
