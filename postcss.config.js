module.exports = {
    parser: 'sugarss',
    plugins: {
        'postcss-import': {
            path: ['src', 'node_modules']
        },
        stylelint: {},
        // 'postcss-autoreset': {},
        'postcss-cssnext': {},
        precss: {},
        cssnano: {},
    },
};
