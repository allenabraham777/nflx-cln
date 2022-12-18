import { emailAddress } from "../../ui/src/screens/Login/text.js";
import User from "../models/User.js";

export const addToFavourites = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { favourites } = user;
      const isAlreadyAdded = favourites.find((movie) => movie.id === data.id);
      if (isAlreadyAdded) {
        return res
          .status(400)
          .json({ message: "Movie already added to favourites" });
      } else {
        await User.findByIdAndUpdate(user._id, {
          favourites: [...user.favourites, data],
        });
      }
    } else {
      await User.create({ email, favourites: [data] });
    }
    return res.stats(201).json({ message: "Movie added to favourites" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error adding liked movie" });
  }
};

export default { addToFavourites };
