const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title.']
        },
        content: {
            type: String,
            required: [true, 'Please provide the content for the article.']
        },
        slug: {
            type: String
        },
        dateCreated: {
            type: Date,
            default: Date.now()
        },
        pendingRevision: {
            type: Boolean,
            default: false
        },
        currentRevision: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Revision'
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

articleSchema.virtual('revisions', {
    ref: 'Revision',
    localField: '_id',
    foreignField: 'article'
});

articleSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'currentRevision',
        select: 'date author',
        populate: { path: 'author', select: 'name' }
    });

    this.populate({
        path: 'revisions'
    });

    next();
});

articleSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

module.exports = mongoose.model('Article', articleSchema);
