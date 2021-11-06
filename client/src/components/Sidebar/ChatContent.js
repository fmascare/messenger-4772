import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9CADC8",
    },
    secondary: {
      main: "#000000",
    }
  },
  spacing: [1,9,10,20],
});

theme.typography.h6 = {
  fontWeight: "bold",
};

theme.typography.subtitle1 = {
  fontSize: 13,
  letterSpacing: -0.17,
  width: "180px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  msTextOverflow: "ellipsis",
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  bubble: {
    backgroundColor: "#3A8DFF",
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(3),
    height: 20,
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
    padding: "1px 9px"
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <ThemeProvider theme={theme}>
          { otherUser.unreadCount > 0 ? (
          <Typography color="secondary" variant="subtitle1 h6">
            {latestMessageText}
          </Typography>
          ) : (
          <Typography color="primary" variant="subtitle1">
            {latestMessageText}
          </Typography>
          )}
        </ThemeProvider>
      </Box>
      { otherUser.unreadCount > 0 && (
        <Badge className={classes.bubble}>{otherUser.unreadCount}</Badge>
      )}
    </Box>
  );
};

export default ChatContent;
