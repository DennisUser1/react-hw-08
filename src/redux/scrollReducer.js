const initialState = {
    visible: false,
    isOnClick: false,
};
  
  const scrollReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_VISIBLE':
        return { ...state, visible: action.payload };
      case 'SET_IS_ON_CLICK':
        return { ...state, isOnClick: action.payload };
      default:
        return state;
    }
};
  
export default scrollReducer;