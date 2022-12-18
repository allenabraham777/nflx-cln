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
    return res.status(201).json({ message: "Movie added to favourites" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error adding to favourites" });
  }
};

export const getFavourites = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    let favourites = [];
    if (user) {
      favourites = user.favourites;
    }
    return res.status(200).json({ message: "Favourrite movies", favourites });
  } catch (error) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching favourites" });
  }
};

export const deleteFromFavorites = async (req, res) => {
  try {
    const { email, movieId } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      const { favourites } = user;
      const index = favourites.findIndex(
        (movie) => `${movie.id}` === `${movieId}`
      );
      if (index < 0) {
        return res
          .status(404)
          .json({ message: "Movie not found in favourites" });
      }
      favourites.splice(index, 1);
      await User.findByIdAndUpdate(user._id, {
        favourites,
      });
      return res.status(200).json({
        message: "Movie deleted from favourites",
        movies: favourites,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting from favourites" });
  }
};

export default { addToFavourites };
