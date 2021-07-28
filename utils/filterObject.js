module.exports = (obj, ...allowedProperties) => {
    const newObj = {};

    for (let x in obj) {
        if (allowedProperties.includes(x)) newObj[x] = obj[x];
    }

    return newObj;
};
