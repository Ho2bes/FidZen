module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-syntax-jsx',
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-transform-flow-strip-types', // Ce plugin est crucial pour supporter Flow
  ],
};
