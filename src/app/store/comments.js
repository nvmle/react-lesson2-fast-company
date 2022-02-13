import { createSlice, createAction } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested(state) {
      state.isLoading = true;
    },
    commentsReceived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated(state, action) {
      state.entities.push(action.payload);
    },
    commentRemoved(state, action) {
      state.entities = state.entities.filter(
        (comment) => comment._id !== action.payload
      );
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentRemoved
} = actions;
const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentCreateRequestFailed = createAction(
  "comments/commentCreateRequestFailed"
);
const commentRemoveRequested = createAction("comments/commentRemoveRequested");
const commentRemoveRequestFailed = createAction(
  "comments/commentRemoveRequestFailed"
);

export const removeComment = (commentId) => async (dispatch) => {
  dispatch(commentRemoveRequested());
  try {
    const { content } = await commentService.removeComment(commentId);
    if (content === null) {
      dispatch(commentRemoved(commentId));
    }
  } catch (error) {
    dispatch(commentRemoveRequestFailed(error.message));
  }
};

export const createComment = ({ data, userId }) => async (
  dispatch,
  getState
) => {
  dispatch(commentCreateRequested());

  const currentuserId = getState().users.auth.userId;

  const comment = {
    ...data,
    _id: nanoid(),
    pageId: userId,
    created_at: Date.now(),
    userId: currentuserId
  };

  try {
    const { content } = await commentService.createComment(comment);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(commentCreateRequestFailed(error.message));
  }
};

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
