const tagReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return state.map((tag) => {
        if (tag.name === action.name) {
          return tag.selected
            ? { ...tag, selected: false }
            : { ...tag, selected: true };
        } else {
          return tag;
        }
      });
    case "INIT":
      return action.payload;
    case "CLEAR":
      return state.map((tag) => ({ ...tag, selected: false }));
    default:
      console.error("Could not find a matching case in tagReducer");
  }
};

export default tagReducer;
