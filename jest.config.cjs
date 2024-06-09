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
  coverageReporters: ["json", "lcov", "text", "clover"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"]
};