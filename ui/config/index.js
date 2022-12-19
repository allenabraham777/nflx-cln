const config = {
  api: {
    url: "/api",
  },
  application: {
    firebase: {
      apiKey: "AIzaSyDEIzjuggXUwSAKvp_v-QT1A24UoYYPog0",
      authDomain: "netfilx-clone-c2e6d.firebaseapp.com",
      projectId: "netfilx-clone-c2e6d",
      storageBucket: "netfilx-clone-c2e6d.appspot.com",
      messagingSenderId: "1004885515543",
      appId: "1:1004885515543:web:cb2556dbc1fb3b682c6b52",
    },
    tmdb: {
      apiKey: "d1f6137c37a621505e44c4a02843275c",
      baseUrl: "https://api.themoviedb.org/3",
      imageBaseUrl: "https://image.tmdb.org/t/p",
      titleImagesUrl(id, type) {
        return `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${this.apiKey}`;
      },
      videosUrl(id, type) {
        return `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${this.apiKey}`;
      },
    },
    sampleVideo: "9xwazD5SyVg",
  },
};

export default config;
