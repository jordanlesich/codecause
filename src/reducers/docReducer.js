const docReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        [action.docType]: {
          all: action.payload,
          status: "open",
        },
      };
    case "LOAD":
      return {
        ...state,
        [action.docType]: {
          ...state[action.docType],
          status: "loading",
        },
      };
    case "SWITCH_VIEW":
      return {
        ...state,
        [action.docType]: {
          ...state[action.docType],
          status: action.viewType,
        },
      };
    case "MOVE":
      return {
        ...state,
        [action.from]: {
          status: "closed",
          all: state[action.from].all.filter((doc) => doc.id !== action.id),
        },
        [action.to]: {
          status: "open",
          all: [
            state[action.from].all.find((doc) => doc.id === action.id),
            ...state[action.to].all,
          ],
        },
      };
    default:
      console.error("Could not find a matching case in tagReducer");
  }
};

export default docReducer;
