const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required.'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email address.']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
        minlength: 8,
        select: false
    },
    passwordConfirmation: {
        type: String,
        required: [true, 'Please confirm your password.'],
        validate: [
            function (val) {
                return val === this.password;
            },
            'Passwords do not match.'
        ]
    },
    passwordChangeTimestamp: {
        type: Date,
        select: false
    },
    role: {
        type: String,
        enum: ['Admin', 'Moderator', 'User'],
        default: 'User'
    },
    active: {
        type: Boolean,
        default: true
    },
    name: {
        type: String
    },
    profileImage: {
        type: String,
        default: 'default.jpg'
    },
    about: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    location: {
        type: String
    },
    socialLinks: {
        facebook: String,
        twitter: String
    }
});

userSchema.methods.isPasswordCorrect = async function (candidate, hashed) {
    // Cannot get password property using "this" keyword because "select" property set to "false".
    return await bcrypt.compare(candidate, hashed);
};

userSchema.methods.wasPasswordChangedAfterTokenIssuance = function (
    issuanceTimestamp
) {
    if (this.passwordChangeTimestamp) {
        return (
            this.passwordChangeTimestamp.getTime() / 1000 > issuanceTimestamp
        );
    }

    return false;
};

userSchema.pre('save', async function (next) {
    if (!this.isNew && this.isModified('password'))
        this.passwordChangeTimestamp = Date.now();

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirmation = undefined;

    next();
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: true });

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
