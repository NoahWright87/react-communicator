import React, { useState } from "react";
//import ButtonAssignment from "./ButtonAssignment";
import { ButtonGroupSettings } from "./InputSettings";
import { Backdrop, Box, Button, Chip, MenuItem, Select, Typography } from "@mui/material";

export default function ButtonGroupList(props) {
  const [buttonAssignments, setButtonAssignments] = useState(props.buttonAssignments);

  function handleRemove(index) {
    const newAssignments = [...buttonAssignments];
    newAssignments.splice(index, 1);
    setButtonAssignments(newAssignments);
  }

  function handleAdd() {
    const newAssignments = [...buttonAssignments];
    newAssignments.push({});
    setButtonAssignments(newAssignments);
  }

  return (
    <Box>
      <Typography variant="h2">Button Assignments</Typography>
      {buttonAssignments.map((assignment, index) => (
        <Box key={index} display="flex" alignItems="center" mt={1}>
          <ButtonAssignment
            assignment={assignment}
            onRemove={() => handleRemove(index)}
          />

        </Box>
      ))}
      <Button onClick={handleAdd} color="primary" variant="contained" size="small" style={{ marginLeft: 10 }}>
        Add
      </Button>
    </Box>
  );
}
