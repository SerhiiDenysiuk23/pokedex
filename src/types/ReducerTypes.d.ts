import {LinksType} from "./PockemonDataTypes";

export interface State {
  pickedLinks: LinksType[],
  allLinks: LinksType[],
  linksToView: LinksType[],
  count: number,
  limit: number,
  offset: number,
  isSearchMode: boolean
}

export type Action = {
  type: "set-all-links" | "set-picked-links",
  payload: LinksType[]
} | {
  type: "set-limit-offset",
  payload: {limit: number, offset: number}
} | {
  type: "toggle-search-mode",
  payload: boolean
}