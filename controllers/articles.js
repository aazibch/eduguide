const catchAsync = require('../middleware/catchAsync');
const filterObject = require('../utils/filterObject');
const AppError = require('../utils/AppError');
const Article = require('../models/Article');
const Revision = require('../models/Revision');
const ApiFeatures = require('../utils/ApiFeatures');

exports.createArticle = catchAsync(async (req, res, next) => {
    const newArticle = new Article({ ...req.body });

    const newRevision = await Revision.create({
        title: req.body.title,
        content: req.body.content,
        author: req.user.id,
        article: newArticle.id,
        status: 'Approved',
        type: 'Creation'
    });

    newArticle.currentRevision = newRevision.id;
    await newArticle.save();

    res.status(201).json({
        status: 'success',
        data: {
            article: newArticle
        }
    });
});

exports.getArticle = catchAsync(async (req, res, next) => {
    let article = await Article.findById(req.params.id).populate({
        path: 'revisions.author'
    });

    if (!article) return next(new AppError(404, 'Article was not found.'));

    res.status(200).json({
        status: 'success',
        data: {
            article
        }
    });
});

exports.getArticles = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Article.find(), req.query).limitFields();

    const articles = await features.query;

    res.status(200).json({
        status: 'success',
        responseLength: articles.length,
        data: {
            articles
        }
    });
});

exports.updateArticle = catchAsync(async (req, res, next) => {
    // Get article.
    const article = await Article.findById(req.params.id);

    // Check if it exists.
    if (!article) return next(new AppError(404, 'Article was not found.'));

    if (article.pendingRevision)
        return next(
            new AppError(403, 'Article already has a pending revision.')
        );

    // Filter for allowed properties for all roles.
    const newRevisionProps = filterObject(req.body, 'title', 'content', 'type');

    // Check what role the current user is.
    const isPrivileged = ['Admin', 'Moderator'].includes(req.user.role);

    newRevisionProps.status = isPrivileged ? 'Approved' : 'Pending';
    newRevisionProps.author = req.user.id;
    newRevisionProps.article = req.params.id;
    newRevisionProps.title = isPrivileged
        ? newRevisionProps.title
        : article.title;

    const newRevision = await Revision.create(newRevisionProps);

    // Adjust properties according to the user's role
    if (isPrivileged) {
        // If user is admin or moderator, apply their changes to the article immediately and send response.
        article.title = newRevisionProps.title;
        article.content = newRevisionProps.content;
        article.currentRevision = newRevision.id;
    }

    article.pendingRevision = !isPrivileged;

    // Update article in the database.
    await article.save();

    // Prepare response
    const response = {
        status: 'success'
    };

    if (isPrivileged) {
        response.data = {
            article
        };
    } else {
        response.message = 'Your revision is awaiting approval.';
        response.data = {
            revision: newRevision
        };
    }

    return res.status(201).json(response);
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);

    if (!deletedArticle)
        return next(new AppError(404, 'Article was not found.'));

    await Revision.deleteMany({ article: req.params.id });

    res.status(204).json({
        status: 'success',
        data: {
            article: deletedArticle
        }
    });
});
