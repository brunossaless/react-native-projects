module.exports = {
  preset: "jest-expo",

//   what steps does he skip to test = IGNORE
  testPathIgnorePatterns: [
    "/node_modules",
    "/android",
    "/ios",
  ],

  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components"
  ],

  //yarn test --coverage
  //relatório de cobertura de código
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx"
  ],
  coverageReporters: [
    "lcov"
  ] 
};
