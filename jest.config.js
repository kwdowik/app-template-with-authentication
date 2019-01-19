module.exports = {
    "roots": [
        "<rootDir>/src"
      ],
      "globals": {
      },
      "transform": {
        "^.+\\.tsx?$": "ts-jest"
      },
      "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
      "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "json"
      ],
      "setupTestFrameworkScriptFile": "<rootDir>/src/test-setup.js",
      "moduleNameMapper":{
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
        "\\.(css|less|sass|scss)$": "identity-obj-proxy"
      },
    };