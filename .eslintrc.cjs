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
        "react-hooks",
        "@typescript-eslint",
        "unicorn",
        "simple-import-sort",
        "radar"
    ],
    "ignorePatterns": [".eslintrc.cjs", "**/src/pages/_document.js", "**/__generated__"],
    "rules": {
        "no-console": ["error", { allow: ["warn", "error"] }],
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
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
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
