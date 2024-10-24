const path = require("path");
module.exports = {
  extends: ["@channel.io/eslint-config/web"],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  plugins: ["@jambit/typed-redux-saga", "@channel.io/eslint-plugin"],
  rules: {},
  settings: {
    "import/external-module-folders": [
      /* Default directory for resolved modules */
      "node_modules",
    ],
    "import/resolver": {
      webpack: { config: path.resolve("./webpack.config.js") },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      },
    },
  },
};
