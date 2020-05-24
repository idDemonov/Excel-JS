import * as types from '@/redux/constants';

export const rootReducer = (state, action) => {
  switch (action.type) {
    case types.EDITOR_RESIZE:
      return {
        ...state,
        colState: {
          ...state?.colState,
          [action.payload.id]: action.payload.value,
        },
      };
    default:
      return state;
  }
};
