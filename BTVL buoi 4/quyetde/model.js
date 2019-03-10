const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  yes: { type: Number, default: 0 },
  no: {
    type: Number,
    default: 0
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});
const questionModel=mongoose.model('Question',QuestionSchema);

module.exports = questionModel;