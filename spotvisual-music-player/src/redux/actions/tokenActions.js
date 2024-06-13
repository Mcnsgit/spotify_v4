// tokenActions.js
export const setToken = (token) => {
  return {
    type: 'auth/setToken',  // Match this type with the slice name and action
    payload: token
  };
};
