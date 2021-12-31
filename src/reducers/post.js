const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'GETPOSTS': {
      state = action.payload
      return state;
    }
    case 'GETCOMMENTS':
      return state
    default:
      return state
  }
}


export default postReducer;