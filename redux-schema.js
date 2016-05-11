{
  users: {
    isAuthed,
    isFetching,
    error,
    authedId,
    [uid]: {
      lastUpdated,
      info: {
        name,
        uid,
        avatar,
      }
    }
  },

  ducks: {
    isFetching,
    error,
    [duckId]: {
      lastUpdated,
      info: {
        avatar,
        duckId,
        name,
        text,
        timestamp,
        uid,
      }
    }
  },

  usersDucks: {
    isFetching,
    error,
    [uid]: {
      lastUpdated,
      duckIds: [duckId, duckId, duckId]
    }
  },

  likeCount: {
    [duckId]: 0
  },

  usersLikes: {
    [duckId]: true
  },

  replies: {
    isFetching,
    error,
    [duckId]: {
      lastUpdated,
      replies: {
        [replyId]: {
          replyId,
          name,
          reply,
          uid,
          timestamp,
          avatar,
        }
      }
    }
  },

  modal: {
    duck,
    isOpen,
  },

  listeners: {
    [listenerId]: true
  },

  feed: {
    isFetching,
    error,
    newDucksAvailable,
    ducksIdsToAdd: [duckId, duckId]
    duckIds: [duckId, duckId]
  }
}
