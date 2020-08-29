{
    test: sassRegex,
    exclude: sassModuleRegex,
    use: getStyleLoaders({
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap
    }).concat({
      loader: require.resolve('sass-loader'),
      options: {
        includePaths: [paths.appSrc + '/styles'],
        sourceMap: isEnvProduction && shouldUseSourceMap,
        data: `@import 'utils';`
      }
    }),
    sideEffects: true
  },