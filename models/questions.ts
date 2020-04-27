import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const Question = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: true,
    default: 0,
  },
  isSuspended: {
    type: Boolean,
    required: true,
    default: false,
  },
  owner: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
    default: [],
  },
  answers: {
    type: [String],
    required: true,
    default: [],
  },
  votes: {
    type: Number,
    required: true,
    default: 0,
  },
  postedOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
  editedBy: {
    type: [String],
    required: true,
    default: [],
  },
  editedOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const QuestionModel = mongoose.model("Question", Question, "Questions");

const createQuestion = async (_parent: any, args: any) => {
  try {
    args = args.args;
    await QuestionModel.create({
      name: args.name,
      title: args.title,
      body: args.body,
      tags: args.tags,
      email: args.email,
      owner: args.owner,
    });
    return true;
  } catch (err) {
    throw err;
    return false;
  }
};

const updateQuestion = async (_parent: any, args: any) => {
  try {
    await QuestionModel.updateOne({ _id: args.args._id }, args.args, () => {});
    return true;
  } catch {
    return false;
  }
};

const deleteQuestion = async (_parent: any, args: any) => {
  try {
    await QuestionModel.updateOne(args.args._id, () => {});
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  model: QuestionModel,
  createQuestion: createQuestion,
  updateQuestion: updateQuestion,
  deleteQuestion: deleteQuestion,
};
