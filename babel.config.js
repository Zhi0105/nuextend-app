module.exports = {
  presets: [
    'module:metro-react-native-babel-preset', 
    'nativewind/babel',
  ],
  plugins: [
    [
        require.resolve('babel-plugin-module-resolver'),
        {
            root: ['./src'],
            extensions: [".*"],
            // aliases starts with @_ in case of node module name conflict
            alias: {
              '@_utils': './src/utils',
              '@_stores': './src/stores',
              '@_services': './src/services',
              '@_screens': './src/screens',
              '@_providers': './src/providers',
              '@_navigation': './src/navigation',
              '@_context': './src/context',
              '@_components': './src/components',
              '@_assets': './src/assets',
              '@_src': './src',
            },
        },
    ],
    ["react-native-reanimated/plugin", {
        "globals": [
          "__scanCodes"
        ]
    }]
  ],
};