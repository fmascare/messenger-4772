import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
    width: "180px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    msTextOverflow: "ellipsis",
  },
  previewUnreadText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    letterSpacing: -0.17,
    width: "180px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    msTextOverflow: "ellipsis",
  },
  bubble: {
    backgroundColor: "#3A8DFF",
    borderRadius: "10px",
    marginTop: 10,
    marginRight: 20,
    height: 20
  },
  count: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
    padding: "1px 9px"
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation, activeConversation } = props;
  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        { otherUser.unreadCount > 0 && activeConversation !== otherUser.username && (
        <Typography className={classes.previewUnreadText}>
          {latestMessageText}
        </Typography>
        )}
        { (otherUser.unreadCount === 0 || otherUser.lastChecked === "") && (
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
        )}
      </Box>
      { otherUser.unreadCount > 0 && activeConversation !== otherUser.username && (
        <Box className={classes.bubble}>
          <Typography className={classes.count}>{otherUser.unreadCount}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatContent;
