import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articleTitles: null,
    articleTitlesError: false,
    selectedArticle: null,
    selectedArticleError: false,
    selectedArticleLoading: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ARTICLE_TITLES_SUCCESS:
            return {
                ...state,
                articleTitles: action.payload.articleTitles
            };
        case actionTypes.FETCH_ARTICLE_TITLES_FAILURE:
            return {
                ...state,
                articleTitlesError: true
            };
        case actionTypes.FETCH_SELECTED_ARTICLE_START:
            return {
                ...state,
                selectedArticleLoading: true,
                selectedArticleError: false
            };
        case actionTypes.FETCH_SELECTED_ARTICLE_SUCCESS:
            return {
                ...state,
                selectedArticle: action.payload.selectedArticle,
                selectedArticleLoading: false
            };
        case actionTypes.FETCH_SELECTED_ARTICLE_FAILURE:
            return {
                ...state,
                selectedArticleLoading: false,
                selectedArticleError: true
            };
        default:
            return state;
    }
};

export default reducer;
