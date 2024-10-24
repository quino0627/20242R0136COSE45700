module.exports = function (api) {
  api.cache(true);
  const presets = [
    ["@babel/preset-env"],
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
    ["@babel/preset-typescript", { isTSX: true, allExtensions: true }],
  ];

  const plugins = [
    // Stage 1
    "@babel/plugin-proposal-export-default-from",

    // Stage 2
    ["@babel/plugin-proposal-decorators", { legacy: true }],

    // Stage 3
    ["@babel/plugin-proposal-class-properties", { loose: false }],

    /* eslint-disable no-template-curly-in-string */
    [
      "transform-imports",
      {
        "core-decorators": {
          transform: "core-decorators/lib/${member}",
          preventFullImport: true,
        },
      },
    ],
    /* eslint-enable no-template-curly-in-string */
    "lodash",
    ["@babel/plugin-transform-classes", { loose: true }],
    ["@babel/plugin-transform-runtime", { corejs: 3 }],
    "macros",

    [
      "babel-plugin-styled-components",
      {
        namespace: "ch",
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
