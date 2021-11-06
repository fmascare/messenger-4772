export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.otherUser.unreadCount = newConvo.messages.length;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      if(message.senderId === convoCopy.otherUser.id) {
        convoCopy.otherUser.unreadCount++;
      }
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = { ...convo };
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      convoCopy.otherUser.unreadCount=1;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

//Sort messages in each convo with oldest message on top
export const sortMessages = (conversations) => {
  const convoCopy = [...conversations];
  return convoCopy.map((convo) => {
    convo.messages.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1);
    return convo;
  });
};

export const clearUnreadFromStore = (state, conversationId, id) => {
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.unreadCount = 0;
      convoCopy.messages.map((msg) => {
        if(msg.isRead && msg.senderId !== convoCopy.otherUser.id) {
          convoCopy.otherUser.lastRead = msg.id;
        }
        else if(! msg.isRead && msg.senderId === id) {
          msg.isRead = true;
          if(id !== convoCopy.otherUser.id) {
            convoCopy.otherUser.lastRead = msg.id;
          }
        }
        return msg;
      });
      return convoCopy;
    } else {
      return convo;
    }
  });
};