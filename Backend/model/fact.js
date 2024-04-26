const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const factSchema = new Schema(
  {
    facts: {
      type: String,
      required: true,
    },
  },
  { collection: "Facts", versionKey: false }
);
module.exports = mongoose.model("Fact", factSchema);
