/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* eslint-disable global-require */

module.exports = () => ({
    plugins: [
    // Add vendor prefixes to CSS rules using values from caniuse.com
    // https://github.com/postcss/autoprefixer
        require('autoprefixer')(),
    ],
});
