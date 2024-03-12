import { ArticleResponse } from "../../generated";
import { SELECT_ARTICLE } from "../Actions/ArticleAction";

export interface ArticlesState {
  selectedArticle: ArticleResponse | null;
}

const initialState: ArticlesState = {
  selectedArticle: null
};

export function articlesReducer(state = initialState, action: {type: string, payload: ArticleResponse}): ArticlesState {
  switch (action.type) {
    case SELECT_ARTICLE:
      return {
        ...state,
        selectedArticle: action.payload
      };
    default:
      return state;
  }
}
