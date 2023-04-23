import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useState } from 'react';

export function AccordionGroup(props) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  // const handleIndexChange = (index) => {
  //   setExpandedIndex(index);
  // }
  return <>
    {props.accordions.map((accordion, index) => {
      const isExpanded = index === expandedIndex;

      return <Accordion
        key={index}
        expanded={isExpanded}
        onChange={() => {
          setExpandedIndex(index);
        }}
        // onClick={() => {
        //   if(expandedIndex === index) {
        //     setExpandedIndex(null);
        //   }
        // }}
        sx={{
          width: props.width ?? '100%',
          // maxHeight: '80vh',
          // color: expandedIndex === index ? 'yellow' : 'red',
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
              // color: 'primary.main',
              color: isExpanded ? 'primary.main' : 'text.secondary',
              
            }}
          >
            {accordion.title}
          </Typography>
        </AccordionSummary>
        {/* Really long content to test scrolling */}
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
          {/* {"lorum ipsum ".repeat(1000)} */}
        </AccordionDetails>

      </Accordion>;
    })}
  </>;
}
