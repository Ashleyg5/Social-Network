const { Schema, model } = require('mongoose');
//blueprint to set up schema db for users
const userSchema = new Schema(
  {
    username: String,
    email: String,
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
//added virtual for friend count
userSchema
  .virtual('friendCount')
  .get(function () {
    return `${this.friends.length}`;
  })


const User = model('User', userSchema);

module.exports = User;
