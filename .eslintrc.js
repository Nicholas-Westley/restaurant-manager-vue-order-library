module.exports = {

    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
    },
    extends: 'airbnb-base',
    globals: {
        __static: true,
    },
    plugins: [
        'html',
    ],
    rules: {
        'global-require': 0,
        'import/no-unresolved': 0,
        'no-param-reassign': 0,
        'no-shadow': 0,
        'import/extensions': 0,
        'import/newline-after-import': 0,
        'no-multi-assign': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        indent: 0,
        'consistent-return': 0,
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-new': 0,
        'arrow-parens': 0,
        'no-unused-vars': 0,
        'no-return-assign': 0,
    },
};
