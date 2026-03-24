const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    attachments: [
      {
        url: String,
        type: String,
      },
    ],
  },
  { timestamps: true },
);

todoSchema.index({ user: 1 });

module.exports = mongoose.model("Todo", todoSchema);
