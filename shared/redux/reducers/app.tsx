import { ACTION_TYPES } from '../constants/actionTypes';

const initialState = {
  isLoading: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
