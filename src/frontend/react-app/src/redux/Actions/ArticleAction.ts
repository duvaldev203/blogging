import { ArticleResponse } from "../../generated";

export const SELECT_ARTICLE = 'SELECT_ARTICLE';

export function selectArticle(article: ArticleResponse) {
  return {
    type: SELECT_ARTICLE,
    payload: article,
  };
}
