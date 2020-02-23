const mongoose = require("mongoose");

class MongooseSequencer {

  defaults = {
    inc_field: '_id',
    start_seq: 0,
    inc_amount: 1
  };

  constructor(connection, schema, opts) {
    this.connection = connection;
    this.schema = schema;
    this.options = {
      ...this.defaults,
      ...opts
    }
    this.createCounterModel();
  }

  async createCounterModel() {
    const counterSchema = new mongoose.Schema({
      id: {
        type: mongoose.Schema.Types.Mixed,
        required: true
      },
      seq: {
        type: Number,
        default: this.defaults.start_seq,
        required: true
      }
    }, {
      validateBeforeSave: false,
      versionKey: false
    });
    this.counterModel = this.connection.model(`counter_${this.options.id}`, counterSchema);
  }

  async setMethods(schema) {
    const mongooseSequencer = this;

    schema.statics.setIDS = async function(cb) {
      try {
        var start_seq = 1;
        const counterModel = mongooseSequencer.counterModel;
        const counter = await counterModel.findOne({id: mongooseSequencer.options.id});
        if (counter.seq < 1) {
          return cb(true);
        };

        const models = await this.find().sort({_id: "asc"});

        for (const model of models) {
          if (model._id === start_seq) {
            start_seq++;
          } else {
            const nextSeq = start_seq + 1;
            var newModel = model;
            newModel._id = start_seq;
            await this.findOneAndDelete({_id: nextSeq});
            await this.insertMany(newModel);
            start_seq++;
          }
        }
      } catch (err) {
        return cb(false, err);
      }
      return cb(true);
    }
  };

  async setSave(schema) {
    const mongooseSequencer = this;

    schema.pre("save", async function(next) {
      try {
        if (!this.isNew) {
          return next()
        };
        const counterModel = mongooseSequencer.counterModel;
        const counterSequencer = await counterModel.findOneAndUpdate({
          id: mongooseSequencer.options.id
        }, {
          $inc: {
            seq: mongooseSequencer.options.inc_amount
          }
        }, {
          upsert: true,
          new: true
        });
        this._id = counterSequencer.seq;
        return next();
      } catch (err) {
        console.log(err);
        return next();
      }
    });
  }

  async setDelete(schema) {
    const mongooseSequencer = this;
    schema.post([
      "deleteOne", "deleteMany"
    ], async function(doc) {

      try {
        const deletedCount = -Math.abs(doc.deletedCount);
        const counterModel = mongooseSequencer.counterModel;
        const counterSequencer = await counterModel.findOneAndUpdate({
          id: mongooseSequencer.options.id
        }, {
          $inc: {
            seq: deletedCount
          }
        }, {
          upsert: true,
          new: true
        });
        const model = mongooseSequencer.connection.model(mongooseSequencer.options.id, schema);

        model.setIDS((success, error) => {
          console.log(success, error);
          if (error) {
            console.log(error);
          }
        });
      } catch (err) {
        console.log(err);
      }
    })
  }

  defaultPlugin = (schema, options) => {

    this.setMethods(schema);
    this.setSave(schema);
    this.setDelete(schema);

  }
}

module.exports = MongooseSequencer;
