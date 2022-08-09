import initialState from "./initialstate";

export default (state = initialState, action) => {
  const { type, payload, context } = action;
  const interest = state[context];

  switch (type) {
    case "ADD_ENTRIES": {
      return {
        ...state,
        [context]: payload,
      };
    }
    case "RESET": {
      return {
        ...initialState,
      };
    }
    default: {
      return { ...state };
    }
  }
};
