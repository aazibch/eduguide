import { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-api';
import withHttpErrorHandler from '../../hoc/withHttpErrorHandler/withHttpErrorHandler';
import WikiLayout from '../../components/Wiki/WikiLayout/WikiLayout';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import RevisionsView from '../../components/Wiki/Revisions/RevisionsView/RevisionsView';
import NavBar from '../../components/Wiki/NavBar/NavBar';

import * as actions from '../../store/actions/index';

const Revisions = (props) => {
    useEffect(() => {
        if (!props.articleTitles) {
            props.fetchArticleTitles(props.match.params.title);
        }
    }, []);

    const navClickHandler = (event, articleId) => {
        props.fetchSelectedArticle(articleId);
    };

    let revisions = props.articleTitles ? (
        <WikiLayout
            revisions
            navClickHandler={navClickHandler}
            articleTitles={props.articleTitles}
        >
            {props.selectedArticleLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <NavBar revisions articleSlug={props.match.params.title} />
                    <RevisionsView
                        revisions={props.selectedArticle.revisions}
                    />
                </>
            )}
        </WikiLayout>
    ) : (
        <LoadingSpinner />
    );

    if (props.articleTitlesError) {
        revisions = <p>Can't load article titles. Application broken.</p>;
    }

    return revisions;
};

const mapStateToProps = (state) => {
    return {
        articleTitles: state.articleTitles,
        articleTitlesError: state.articleTitlesError,
        selectedArticle: state.selectedArticle,
        selectedArticleLoading: state.selectedArticleLoading
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
)(withHttpErrorHandler(Revisions, axios));

// @todo
// Fix loading spinner height.
