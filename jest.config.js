/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  //collectCoverage: true,
  coverageDirectory: "test/coverage",
  coverageProvider: "v8",

  testEnvironment: "jsdom",

  transformIgnorePatterns: [
    "test/vendor/*.js"
  ],
};
