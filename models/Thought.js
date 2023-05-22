const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
//blueprint to set up schema db for thoughts
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
//created virtual for reaction count
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return `${this.reactions.length}`;
  })


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;