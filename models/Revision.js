const mongoose = require('mongoose');

const revisionSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [
            true,
            'Please provide the identification of the author of the revision.'
        ]
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: [
            true,
            'Please provide the identification of the article for this revision.'
        ]
    },
    date: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: String,
        enum: ['Creation', 'Edit'],
        default: 'Edit'
    },
    status: {
        type: String,
        enum: ['Approved', 'Rejected', 'Pending'],
        default: 'Pending'
    },
    rejectionReason: {
        type: String,
        validate: {
            validator: function (val) {
                return this.status === 'Rejected';
            },
            message:
                'The revision must have the status of "rejected" to have a "rejectionReason" property.'
        },
        required: function () {
            return this.status === 'Rejected';
        }
    }
});

// Check if this needs refactoring
revisionSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'author'
    });

    next();
});

module.exports = mongoose.model('Revision', revisionSchema);
