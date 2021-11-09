import React from "react";
import { makeStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
  spacing: [5,8,19],
});


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  avatar: {
    height: theme.spacing(2),
    width: theme.spacing(2),
    float: "right",
    marginBottom: theme.spacing(0)
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: theme.spacing(0)
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: theme.spacing(1),
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, otherUser, messageId } = props;
  return (
    <Box className={classes.root}>
      <ThemeProvider theme={theme}>
        <Typography className={classes.date}>{time}</Typography>
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
        { otherUser.lastRead !== "" && otherUser.lastRead === messageId && (
          <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar} />
        )}
      </ThemeProvider>
    </Box>
  );
};

export default SenderBubble;
