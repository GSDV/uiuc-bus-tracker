module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
        // 'babel-preset-expo',
        ["module-resolver", {
            "alias": {
                "@components": "./src/components",
                "@styles": "./src/styles",
                "@screens": "./src/screens",
                "@assets": "./src/assets",
                "@util": "./src/util"
            },
            "extensions": [
                ".js",
                ".jsx",
                ".ts",
                ".tsx",
            ]
        }]
    ]
  };
};
