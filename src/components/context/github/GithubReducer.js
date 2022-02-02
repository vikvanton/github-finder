const githubReducer = (state, action) => {
    switch (action.type) {
        case "SET_USERS":
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case "CLEAR_USERS":
            return {
                ...state,
                users: [],
            };
        case "SET_USER_AND_REPOS":
            return {
                ...state,
                user: action.payload.user,
                repos: action.payload.repos,
                loading: false,
            };
        case "CLEAR_USER_AND_REPOS":
            return {
                ...state,
                user: [],
                repos: [],
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: true,
            };
        case "CLEAR_LOADING":
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default githubReducer;
