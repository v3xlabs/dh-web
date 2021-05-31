module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:unicorn/recommended",
        "plugin:radar/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "unicorn",
        "simple-import-sort",
        "radar"
    ],
    "ignorePatterns": [".eslintrc.cjs", "**/src/pages/_document.js"],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/react-in-jsx-scope": "off",
        "unicorn/filename-case": [
            "error", {
                "cases": {
                    "pascalCase": true,
                    "camelCase": true
                }
            }
        ],
        "unicorn/prefer-spread": "off",
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
    }
};
