import config from "config";
import constants from "../constants/home";
import apis from "./apis";

export const generateCover = async (movies, type = "movie") => {
  if (movies.length) {
    try {
      const chooseIndex = parseInt(Math.random() * movies.length);
      const movie = movies[chooseIndex];
      const {
        data: { logos },
      } = await apis.getCoverImage(movie.id, type);

      const icon = logos.find(
        (movie) => movie?.file_path && movie["iso_639_1"] === "en"
      );
      return {
        id: movie.id,
        type,
        icon: `${config.application.tmdb.imageBaseUrl}/w500${icon.file_path}`,
        background: `${config.application.tmdb.imageBaseUrl}/original${movie.image}`,
        description: movie.description,
      };
    } catch (error) {
      console.error(error);
    }
  }
  return constants.cover;
};

export const getVideo = async (type, id) => {
  let video = config.application.sampleVideo;
  try {
    const {
      data: { results },
    } = await apis.getVideo(id, type);
    const _video = results.find(
      (v) =>
        v.type.toLowerCase() === "trailer" || v.type.toLowerCase() === "teaser"
    );
    video = _video || { key: video };
  } catch (error) {
    console.error(error);
  }
  return video;
};

export default {
  generateCover,
  getVideo,
};
