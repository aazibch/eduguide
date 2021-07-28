const express = require('express');
const app = express();
const cors = require('cors');

const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');
const revisionsRouter = require('./routes/revisions');

const errorHandler = require('./controllers/error');

// Imports for the temporary test route
const catchAsync = require('./middleware/catchAsync');
const protectMiddleware = require('./controllers/auth').protect;
const User = require('./models/User');
const Revision = require('./models/Revision');

app.use(express.json());
app.use(cors());
app.options('*', cors());

// Temporary test route
app.get(
    '/api/v1/test',
    catchAsync(async (req, res) => {
        const revision = await Revision.create({
            author: '600ac7b93701e1358064b492',
            article: '602bd54f056cf21cfee084af',
            status: 'Rejected',
            rejectionReason: 'This is the reason for rejection.'
        });

        res.json({
            message: 'A revision test',
            data: {
                revision
            }
        });
    })
);

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/articles', articlesRouter);
app.use('/api/v1/revisions', revisionsRouter);
app.use(errorHandler);

module.exports = app;

// @todo check if better cors implementation is necessary.
