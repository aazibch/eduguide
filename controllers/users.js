const User = require('../models/User');
const filterObject = require('../utils/filterObject');
const catchAsync = require('../middleware/catchAsync');

exports.getMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        status: 'success',
        data: {
            user: user
        }
    });
});

exports.updateMe = catchAsync(async (req, res, next) => {
    const filteredUpdatesObj = filterObject(
        req.body,
        'name',
        'email',
        'about',
        'gender',
        'location',
        'socialLinks'
    );

    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        filteredUpdatesObj,
        {
            runValidators: true,
            new: true
        }
    );

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.user.id,
        { active: false },
        { runValidators: true, new: true }
    );

    res.status(204).json({
        status: 'successful',
        data: {
            user: user
        }
    });
});
