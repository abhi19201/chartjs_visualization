class ApiFeatures {
    constructor(action, query) {
        this.action = action;
        this.query = query;
    }

    //Searching Measures
    search(key) {
        const measure = this.query.measure
            ? {
                  measure: {
                      $regex: this.query.measure,
                      $options: "i",
                  },
              }
            : {};
        this.action = this.action.find({ ...measure });
        return this;
    }

    //getting Pages
    pagination(numOfPages) {
        const currentPage = Number(this.query.page) || 1;

        const numOfSkips = numOfPages * (currentPage - 1);

        this.action = this.action.limit(numOfPages).skip(numOfSkips);

        return this;
    }
}

module.exports = ApiFeatures;
