import * as types from '@/redux/types';
import * as H from '@/redux/action-handlers';
import { ActionsType, TReducer, TState } from '@/interface';

export const reducer: TReducer = (
  state: TState,
  action: ActionsType
): TState => {
  switch (action.type) {
    case types.EDITOR_RESIZE:
      return H.handlerEditorResize(state, action.payload);
    case types.CHANGE_TEXT:
      return H.handlerChangeText(state, action.payload);
    case types.CHANGE_STYLES:
      return H.handlerChangeStyles(state, action.payload);
    case types.APPLY_STYLE:
      return H.handlerApplyStyle(state, action.payload);
    case types.CHANGE_TITLE:
      return H.handlerChangeTitle(state, action.payload);
    case types.UPDATE_DATE:
      return H.handlerUpdateDate(state);
    case types.INIT_STATE: // default не будет работать так как затипизированы actions
      return state;
  }
};
