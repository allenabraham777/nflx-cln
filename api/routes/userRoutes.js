import {
  addToFavourites,
  deleteFromFavorites,
  getFavourites,
} from "../controllers/userController.js";

export const userRoutes = (app) => {
  app.post("/api/user/movies", addToFavourites);
  app.get("/api/user/:email/movies", getFavourites);
  app.delete("/api/user/:email/movies/:movieId", deleteFromFavorites);
};

export default userRoutes;
