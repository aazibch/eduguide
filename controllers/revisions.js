const Revision = require('../models/Revision');
const Article = require('../models/Article');
const catchAsync = require('../middleware/catchAsync');
const AppError = require('../utils/AppError');

exports.getRevisionsForArticle = catchAsync(async (req, res, next) => {
    const article = await Article.findById(req.params.articleId);

    if (!article) return next(new AppError(404, 'Article was not found.'));

    const revisions = await Revision.find({
        article: req.params.articleId,
        status: 'Approved'
    });

    res.status(200).json({
        status: 'success',
        responseLength: revisions.length,
        data: {
            revisions
        }
    });
});

exports.getRevisionsForUser = catchAsync(async (req, res, next) => {
    const revisions = await Revision.find({
        author: req.user.id
    }).populate('author', 'name');

    res.status(200).json({
        status: 'success',
        responseLength: revisions.length,
        data: {
            revisions
        }
    });
});

exports.getRevision = catchAsync(async (req, res, next) => {
    const revision = await Revision.findById(req.params.id);

    if (!revision) return next(new AppError(404, 'Revision was not found.'));

    res.status(200).json({
        status: 'success',
        data: {
            revision
        }
    });
});

// Remember: One article can't have multiple unapproved revisions.
exports.approveRevision = catchAsync(async (req, res, next) => {
    const revision = await Revision.findById(req.params.id);

    // Check if revision does not exist
    if (!revision) return next(new AppError(404, 'Revision was not found.'));

    // Check if revision is pending
    if (revision.status !== 'Pending')
        return next(new AppError(400, 'The revision is not pending.'));

    revision.status = 'Approved';
    await revision.save();

    await Article.findByIdAndUpdate(
        revision.article,
        {
            title: revision.title,
            content: revision.content,
            pendingRevision: false,
            currentRevision: revision.id
        },
        { runValidators: true }
    );

    res.status(200).json({
        status: 'success',
        data: {
            revision
        }
    });
});

exports.rejectRevision = catchAsync(async (req, res, next) => {
    const revision = await Revision.findById(req.params.id);

    // Check if revision does not exist
    if (!revision) next(new AppError(404, 'Revision was not found.'));

    // Check if revision is pending
    if (revision.status !== 'Pending')
        return next(new AppError(400, 'The revision is not pending.'));

    // Update and save to database
    revision.status = 'Rejected';
    revision.rejectionReason = req.body.rejectionReason;
    await revision.save();

    const article = await Article.findByIdAndUpdate(revision.article, {
        pendingRevision: false
    });

    res.status(200).json({
        status: 'success',
        data: {
            revision
        }
    });
});
