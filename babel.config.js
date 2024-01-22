module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
        'expo-router/babel',
        ["module-resolver", {
            "alias": {
                "@components": "./src/components",
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
