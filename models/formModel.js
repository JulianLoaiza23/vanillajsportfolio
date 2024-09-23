const mongoose = require("mongoose")

const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
  });

  const FormEntryModel = mongoose.model("FormEntry", formSchema);

  module.exports = FormEntryModel;
  