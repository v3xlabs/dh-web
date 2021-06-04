module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:unicorn/recommended",
        "plugin:radar/recommended",
        "plugin:react/all",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
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
        "react/react-in-jsx-scope": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".jsx", ".tsx"] }],
        "unicorn/prefer-spread": "off",
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "no-console": ["error", { allow: ["warn", "error"] }],
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
        "unicorn/filename-case": [
            "error", {
                "cases": {
                    "pascalCase": true,
                    "camelCase": true
                }
            }
        ],
    }
};
