module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|webp|svg|css)$': 'jest-transform-stub'
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text", "clover", "json-summary"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"]
};