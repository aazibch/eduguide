const User = require('../models/User');
const jwt = require('jsonwebtoken');
const catchAsync = require('../middleware/catchAsync');
const AppError = require('../utils/AppError');
const { body, validationResult } = require('express-validator');

const createAuthToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_TIME
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation,
        about: req.body.about,
        gender: req.body.gender,
        location: req.body.location,
        socialLinks: { ...req.body.socialLinks }
    });

    let token;

    token = createAuthToken({
        user: {
            id: newUser.id,
            role: newUser.role
        }
    });

    await newUser.save();

    newUser = newUser.toObject();
    delete newUser.password;

    res.status(201).json({
        status: 'success',
        token,
        data: {
            newUser
        }
    });
});

exports.login = catchAsync(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email }).select(
        '+password'
    );
    const appError = new AppError(401, 'Incorrect email address or password.');

    if (!user) {
        return next(appError);
    }

    if (!(await user.isPasswordCorrect(req.body.password, user.password)))
        return next(appError);

    const token = createAuthToken({
        user: {
            id: user.id,
            role: user.role
        }
    });

    user = user.toObject();
    delete user.password;

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    let receivedToken;
    let loggedOutAppError = new AppError(401, 'You are not logged in.');
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    )
        receivedToken = req.headers.authorization.split(' ')[1];

    if (!receivedToken) return next(loggedOutAppError);

    let payload;

    try {
        payload = await jwt.verify(receivedToken, process.env.JWT_SECRET);
    } catch (err) {
        return next(
            new AppError(401, 'Invalid or expired authentication token.')
        );
    }

    const user = await User.findById(payload.user.id);

    if (!user)
        return next(
            new AppError(
                401,
                'The user this authentication token was issued to no longer exists.'
            )
        );

    if (user.wasPasswordChangedAfterTokenIssuance(payload.iat))
        return next(loggedOutAppError);

    req.user = { ...payload.user };

    next();
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
    if (
        !(
            req.body.currentPassword &&
            req.body.password &&
            req.body.passwordConfirmation
        )
    )
        return next(
            new AppError(
                400,
                'Please provide all required fields for this route.'
            )
        );

    // 1) Get user
    let user = await User.findById(req.user.id).select('+password');

    // 2) Check if the provided password is currect.
    if (
        !(await user.isPasswordCorrect(req.body.currentPassword, user.password))
    ) {
        return next(
            new AppError(401, 'Incorrect value for your current password.')
        );
    }

    // 3) Update password.
    // Inserting fields manually because the validator to check if the passwords match only runs on Document.save() or Model.create()
    user.password = req.body.password;
    user.passwordConfirmation = req.body.passwordConfirmation;
    await user.save();

    user = user.toObject();

    delete user.password;
    delete user.passwordConfirmation;

    // 4) Send a response.
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});
