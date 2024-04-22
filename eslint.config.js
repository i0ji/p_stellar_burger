// module.exports = {
//     root: true,
//     env: {browser: true, es2020: true},
//     parserOptions: {
//         "ecmaVersion": 12,
//         "sourceType": "module",
//     },
//     extends: [
//         'eslint:recommended',
//         'plugin:@typescript-eslint/recommended',
//         'plugin:react-hooks/recommended',
//     ],
//     ignorePatterns: ['dist', 'eslint.config.js'],
//     parser: '@typescript-eslint/parser',
//     plugins: ['react-refresh'],
//     rules: {
//         "@typescript-eslint/ban-types": 'off',
//         "react-refresh/only-export-components": [
//             'warn',
//             {allowConstantExport: true},
//         ],
//         "sort-imports": "error"
//         // "import/order": [
//         //     "error",
//         //     {
//         //         "groups": ["builtin", "external", "internal"],
//         //         "pathGroups": [
//         //             {
//         //                 "pattern": "react",
//         //                 "group": "external",
//         //                 "position": "before"
//         //             }
//         //         ],
//         //         "pathGroupExcludeImportTypes": ["react"],
//         //         "newlines-between": "always",
//         //         "alphabetize": {
//         //             "order": "asc",
//         //             "caseInsensitive": true
//         //         }
//         //     }
//         // ]
//     },
// }

export default [
    {
        rules: {
            "no-unused-vars": "error",
            "no-undef": "error"
        }
    }
];