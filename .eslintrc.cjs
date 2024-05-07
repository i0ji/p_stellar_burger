module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    overrides: [
        {
            env: {
                node: true,
            },
            files: ["*.ts", "*.tsx"],
            parserOptions: {
                sourceType: "module",
            },
        },
    ],
    parserOptions: {
        ecmaFeatures: "latest",
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        "no-var": "error",
        "prettier/prettier": [
            "warn",
            {
                endOfLine: "auto",
            },
        ],
        "react/react-in-jsx-scope": "off",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    ignorePatterns: ["temp/*", "*.config.*", "build/*", "cypress/*", "jest/*", "src/__tests__/**", "node_modules/**"],
};