import * as types from '@/redux/constants';

export const rootReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.EDITOR_RESIZE:
      const field = payload.type === 'col' ? 'colState' : 'rowState';
      return {
        ...state,
        [field]: {
          ...state?.[field],
          [action.payload.id]: action.payload.value,
        },
      };
    default:
      return state;
  }
};
