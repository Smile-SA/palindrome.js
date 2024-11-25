module.exports = {
  "stories": ["../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  "staticDirs": ['../static'],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", {
    name: "storybook-addon-turbo-build",
    options: {
      optimizationLevel: 1
    }
  }],
  features: {
    postcss: false
  },
  framework: "@storybook/html",
  webpackFinal: async (config) => {
    config.optimization.minimizer.forEach((plugin) => {
      if (plugin.constructor.name === 'ESBuildMinifyPlugin') {
        plugin.options.target = 'esnext'; // or 'es2017'
      }
    });
    return config;
  },
};

