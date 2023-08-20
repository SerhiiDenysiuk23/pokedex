import {Action, State} from "../types/ReducerTypes";
import {LinksType} from "../types/PockemonDataTypes";


export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set-all-links': {
      return {
        ...state,
        allLinks: action.payload,
        count: action.payload.length,
        linksToView: action.payload.slice(state.offset, state.offset + state.limit)
      }
    }
    case 'set-picked-links': {
      return {
        ...state,
        pickedLinks: action.payload,
        count: action.payload.length > 0 ? action.payload.length : state.allLinks.length,
        linksToView: state.isSearchMode
          ? action.payload.slice(state.offset, state.offset + state.limit)
          : state.allLinks.slice(state.offset, state.offset + state.limit)
      }
    }
    case 'set-limit-offset': {
      return {
        ...state,
        limit: action.payload.limit,
        offset: action.payload.offset,
        linksToView: state.isSearchMode
          ? state.pickedLinks.slice(action.payload.offset, action.payload.offset + action.payload.limit)
          : state.allLinks.slice(action.payload.offset, action.payload.offset + action.payload.limit)
      }
    }
    case 'toggle-search-mode': {
      return {
        ...state,
        isSearchMode: action.payload
      }
    }
    default:
      return {...state}
  }
}

export const setAllLinksAction = (payload: LinksType[]) => {
  return {type: "set-all-links", payload} as Action
}

export const setPickedLinksAction = (payload: LinksType[]) => {
  return {type: "set-picked-links", payload} as Action
}

export const setLimitOffsetAction = (limit: number, offset: number) => {
  return {type: "set-limit-offset", payload: {limit, offset}} as Action
}

export const toggleSearchModeAction = (payload: boolean) => {
  return {type: "toggle-search-mode", payload} as Action
}