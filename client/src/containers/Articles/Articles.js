import { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-api';
import withHttpErrorHandler from '../../hoc/withHttpErrorHandler/withHttpErrorHandler';
import WikiLayout from '../../components/Wiki/WikiLayout/WikiLayout';
import Article from '../../components/Wiki/Articles/Article/Article';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import NavBar from '../../components/Wiki/NavBar/NavBar';

import * as actions from '../../store/actions/index';

const Articles = (props) => {
    useEffect(() => {
        if (!props.articleTitles) {
            props.fetchArticleTitles(props.match.params.title);
        }
    }, []);

    const navClickHandler = (event, articleId) => {
        props.fetchSelectedArticle(articleId);
    };

    let article = <LoadingSpinner />;

    if (!props.selectedArticleLoading) {
        article = props.selectedArticleError ? (
            <p>Unable to load the selected article.</p>
        ) : (
            <>
                <NavBar
                    articleSlug={props.match.params.title}
                    lastEditDate={props.selectedArticle.currentRevision.date}
                />
                <Article selectedArticle={props.selectedArticle} />
            </>
        );
    }

    let articles = props.articleTitles ? (
        <WikiLayout
            navClickHandler={navClickHandler}
            articleTitles={props.articleTitles}
        >
            {article}
        </WikiLayout>
    ) : (
        <LoadingSpinner />
    );

    if (props.articleTitlesError) {
        articles = <p>Can't load article titles. Application broken.</p>;
    }

    return articles;
};

const mapStateToProps = (state) => {
    return {
        articleTitles: state.articleTitles,
        articleTitlesError: state.articleTitlesError,
        selectedArticle: state.selectedArticle,
        selectedArticleLoading: state.selectedArticleLoading,
        selectedArticleError: state.selectedArticleError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticleTitles: (selectedArticleSlug) =>
            dispatch(actions.fetchArticleTitles(selectedArticleSlug)),
        fetchSelectedArticle: (articleId) =>
            dispatch(actions.fetchSelectedArticle(articleId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withHttpErrorHandler(Articles, axios));
