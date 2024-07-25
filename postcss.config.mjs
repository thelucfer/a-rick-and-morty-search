/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@csstools/postcss-global-data": {
      files: ["./lib/styles/constants/media.css"],
    },
    "postcss-preset-env": {
      stage: 0,
      features: {
        "nesting-rules": true,
        "custom-media-queries": true,
      },
      autoprefixer: {},
    },
  },
};

export default config;
