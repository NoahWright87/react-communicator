import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useState } from 'react';

export function AccordionGroup(props) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return <>
    {props.accordions.map((accordion, index) => {
      const isExpanded = index === expandedIndex;

      return <Accordion
        key={index}
        expanded={isExpanded}
        onChange={() => {
          setExpandedIndex(index);
        }}
        sx={{
          width: props.width ?? '100%',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          onClick={(event) => {
            if(expandedIndex === index) {
              setExpandedIndex(null);
            }
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: isExpanded ? 'primary.main' : 'text.secondary',
            }}
          >
            {accordion.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            maxHeight: '50vh',
            marginBottom: '1rem',
          }}
        >
          {accordion.content}
        </AccordionDetails>
      </Accordion>;
    })}
  </>;
}
