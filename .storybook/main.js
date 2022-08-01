module.exports = {
  "stories": ["../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", {
    name: "storybook-addon-turbo-build",
    options: {
      optimizationLevel: 1
    }
  }],
  staticDirs: ['../static'],
  features: {
    postcss: false
  },
  framework: "@storybook/html",
};

