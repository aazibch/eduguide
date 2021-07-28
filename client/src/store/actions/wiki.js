import axios from '../../axios-api';
import * as actionTypes from './actionTypes';

const fetchArticleTitlesSuccess = (articleTitles) => {
    return {
        type: actionTypes.FETCH_ARTICLE_TITLES_SUCCESS,
        payload: {
            articleTitles
        }
    };
};

const fetchArticleTitlesFailure = (error) => {
    return {
        type: actionTypes.FETCH_ARTICLE_TITLES_FAILURE,
        payload: {
            error
        }
    };
};

export const fetchArticleTitles = (selectedArticleSlug) => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/articles?fields=title,slug');

            const articleTitles = response.data.data.articles.map((el) => {
                return { id: el.id, title: el.title, slug: el.slug };
            });

            const selectedArticle = articleTitles.find(
                (el) => el.slug === selectedArticleSlug
            );

            dispatch(fetchArticleTitlesSuccess(articleTitles));
            dispatch(fetchSelectedArticle(selectedArticle.id));
        } catch (error) {
            dispatch(fetchArticleTitlesFailure(error));
        }
    };
};

const fetchSelectedArticleStart = () => {
    return {
        type: actionTypes.FETCH_SELECTED_ARTICLE_START
    };
};

const fetchSelectedArticleSuccess = (selectedArticle) => {
    return {
        type: actionTypes.FETCH_SELECTED_ARTICLE_SUCCESS,
        payload: {
            selectedArticle
        }
    };
};

const fetchSelectedArticleFailure = () => {
    return {
        type: actionTypes.FETCH_SELECTED_ARTICLE_FAILURE
    };
};

export const fetchSelectedArticle = (articleId) => {
    return async (dispatch) => {
        try {
            dispatch(fetchSelectedArticleStart());

            const response = await axios.get(`/articles/${articleId}`);

            dispatch(fetchSelectedArticleSuccess(response.data.data.article));
        } catch (error) {
            dispatch(fetchSelectedArticleFailure(error));
        }
    };
};
