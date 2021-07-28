//refactor

class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // filter() {
    //     const queryObj = { ...this.queryString };
    //     const excludedFields = ['page', 'sort', 'limit', 'fields'];
    //     excludedFields.forEach(el => delete queryObj[el]);

    //     // My solution for Advanced Filtering
    //     // const queryOperators = ['gte'];
    //     // Object.keys(req.query).forEach(elem => {
    //     //     const innerKeys = Object.keys(req.query[elem]);
    //     //     for (let i in innerKeys) {
    //     //         if (queryOperators.includes(innerKeys[i])) {
    //     //             const propertyName = '$' + innerKeys[i];
    //     //             const propertyValue = req.query[elem][innerKeys[i]];
    //     //             delete req.query[elem][innerKeys[i]];
    //     //             req.query[elem][propertyName] = propertyValue;
    //     //         }
    //     //     }
    //     // });

    //     let queryStr = JSON.stringify(queryObj);
    //     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    //     this.query = this.query.find(JSON.parse(queryStr));

    //     // Return entire object
    //     return this;
    // }

    // sort() {
    //     if (this.queryString.sort) {
    //         const sortBy = this.queryString.sort.split(',').join(' ');
    //         this.query = this.query.sort(sortBy);
    //     } else {
    //         this.query = this.query.sort('-createdAt');
    //     }

    //     return this;
    // }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    // paginate() {
    //     const page = +this.queryString.page || 1;
    //     const limit = +this.queryString.limit || 100;
    //     const skipVal = (page - 1) * limit;

    //     this.query = this.query.skip(skipVal).limit(limit);

    //     return this;
    // }
}

module.exports = ApiFeatures;
