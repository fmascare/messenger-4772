import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 12,
  },
  palette: {
    primary: { main: "#9CADC8" },
    secondary: { main: "#000000" }
  },
  spacing: [1,9,10,20],
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
  username: {
    fontWeight: (styleProps) => styleProps.fontWeight,
    letterSpacing: -0.2,
  },
  previewText: {
    letterSpacing: -0.17,
    width: (styleProps) => styleProps.width,
    overflow: (styleProps) => styleProps.overflow,
    whiteSpace: (styleProps) => styleProps.whiteSpace,
    textOverflow: (styleProps) => styleProps.textOverflow,
    msTextOverflow: (styleProps) => styleProps.msTextOverflow,
  },
  boldPreview: {
    fontWeight: (styleProps) => styleProps.fontWeight,
  },
  bubble: {
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(3),
    padding: theme.spacing(0,1),
    fontSize: (styleProps) => styleProps.fontSize,
    backgroundColor: (styleProps) => styleProps.backgroundColor,
    height: (styleProps) => styleProps.height,
    fontWeight: (styleProps) => styleProps.fontWeight,
    color: (styleProps) => styleProps.color,
  },
}));

const ChatContent = (props) => {
  const styleProps = {
    backgroundColor: "#3A8DFF",
    color: "#FFFFFF",
    height: 20,
    fontSize: 12,
    fontWeight: "bold",
    width: "180px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    msTextOverflow: "ellipsis",
  };
  const classes = useStyles(styleProps);

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
          <Typography color="secondary" className={`${classes.previewText} ${classes.boldPreview}`}>
            {latestMessageText}
          </Typography>
          ) : (
          <Typography color="primary" className={classes.previewText}>
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
