import { Box, Button, Paper, Typography } from "@mui/material";
import { KeyboardDoubleArrowLeftTwoTone, KeyboardDoubleArrowRightTwoTone } from "@mui/icons-material";


export function PrevNextDisplay(props) {
  // const [slideDirection, setSlideDirection] = useState("left");
  const { title, items, index, setter } = props;

  const leftIndex = (index - 1 + items.length) % items.length;
  const rightIndex = (index + 1) % items.length;

  const displayItems = [
    items[leftIndex],
    items[index],
    items[rightIndex],
  ];

  return <Paper
    elevation={4}
    sx={{
      flex: 1,
      width: "100%",
      m: 1,
      p: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Typography
      variant="h4"
      sx={{
        textAlign: "center",
        color: "primary.light",
      }}
    >
      {title}
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={() => {
          setter(leftIndex);
        }}

      >
        <KeyboardDoubleArrowLeftTwoTone />

        Prev
      </Button>

      {displayItems.map((item, i) => {
        return <Box
          key={i}
          sx={{
            flex: 2,
            textAlign: "center",
            color: i === 1 ? 'primary.main' : 'grey',
          }}
        >
          {/*
                  TODO: Animations aren't working for some reason
                        The error says it can't read property 'style' of null
                */}
          {/* Slide left and right when changing current item */}
          {/* <Slide
                  direction={slideDirection}
                  // in={i === 1}
                  // mountOnEnter
                  // unmountOnExit
                > */}
          {item}
          {/* </Slide> */}

          {/* Fade out and in when changing current item */}
          {/* <Fade
                  in={i === 1}
                  mountOnEnter
                  unmountOnExit
                  className="fade"
                >
                  {item}
                </Fade> */}
        </Box>;
      })}

      <Button
        color="primary"
        size="large"
        variant="contained"
        sx={{
          flex: 1,
        }}
        onClick={() => {
          setter(rightIndex);
        }}
      >
        Next
        <KeyboardDoubleArrowRightTwoTone />
      </Button>

    </Box>

  </Paper>;
}
