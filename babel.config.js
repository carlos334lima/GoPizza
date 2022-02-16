module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
        alias: {
          "@Assets": "./src/Assets",
          "@Screens": "./src/Screens",
          "@Components": "./src/Components",
          "@Theme": "./src/Theme",
          "@Utils": "./src/Utils",
          "@Types": "./src/@Types",
        },
      },
    ],
  ],
};
