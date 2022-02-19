module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@Assets': './src/Assets',
          '@Screens': './src/Screens',
          '@Theme': './src/Theme',
          '@Hooks': './src/Hooks',
          '@Components': './src/Components',
          '@Utils': './src/Utils',
          '@Types': './src/@Types',

        },
        root: ['.']
      }
    ],
    'jest-hoist'
  ]
};