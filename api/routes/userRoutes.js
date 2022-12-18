import { addToFavourites } from "../controllers/userController.js";

export const userRoutes = (app) => {
  app.post("/api/movies/add", addToFavourites);
};

export default userRoutes;
