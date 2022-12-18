import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  favourites: [
    {
      id: {
        type: String,
      },
    },
  ],
});

export const User = mongoose.model("User", UserSchema);

export default User;
