module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testTimeout: 20000,
	modulePathIgnorePatterns: [
		"<rootDir>/build/",
		"<rootDir>/node_modules/",
	],
};
