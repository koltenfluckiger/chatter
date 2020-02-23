const mongoose = require("mongoose");

class MongooseFinderModule {

  setFind(schema) {

    schema.post([
      "findOne", "findOneById"
    ], function(result, next) {
      if (!result) {
        return next(new Error("Object not found."));
      }
      return next();
    })
  }
  defaultPlugin = (schema, options) => {
    this.setFind(schema);
  }
}
module.exports = MongooseFinderModule;
