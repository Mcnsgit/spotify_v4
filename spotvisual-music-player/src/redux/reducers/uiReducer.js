import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: "Songs"
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateHeaderTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { updateHeaderTitle } = uiSlice.actions;
export default uiSlice.reducer;

//   switch (action.type) {

//   case "UPDATE_HEADER_TITLE":
//     return {
//       ...state,
//       title: action.title
//     };

//   default:
//     return state;
//   }

// };

// export default uiReducer;  
// const defaultState = {
//   title: "Songs"
// };

// export const uiReducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case "UPDATE_HEADER_TITLE":
//       return {
//         ...state,
//         title: action.title
//       };

//     default:
//       return state;
//   }
// };

// export default uiReducer;
