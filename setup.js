/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

const fs = require('fs');
const path = require('path');
const https = require('https');

let file,
    text,
    search;

//
// Inject SASS Loader into webpack.config.dev.js
// -----------------------------------------------------------------------------
file = path.resolve('./node_modules/react-scripts/config/webpack.config.dev.js'); // prettier-ignore
text = fs.readFileSync(file, 'utf8');
search = `{
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },`;

if (text.includes(search)) {
    text = text.replace(
        search,
        `${search}
    {
      test: /bootstrap-sass\/assets\/javascripts\//,
      use: {
        loader: 'imports-loader?jQuery=jquery',
      },
    },
    {
      test: /\.scss$/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]-[local]-[hash:base64:5]',
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            options: {
              config: './postcss.sass.js',
            },
            plugins: () => [
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
            ],
          },
        },
        {
          loader: 'sass-loader',
          options: eyeglass({
                  // sass options...
                  includePaths: ['/share/scss/'],
                  eyeglass: {
                    // eyeglass options
                  }
                })
        },
      ],
    },`); // prettier-ignore
    fs.writeFileSync(file, text, 'utf8');
} else if (!text.indexOf('sass-loader') === -1) {
    throw new Error(`Failed to inject sass-loader into ${file}`);
}

//
// Inject CSS Modules into webpack.config.dev.js
// -----------------------------------------------------------------------------
file = path.resolve('./node_modules/react-scripts/config/webpack.config.dev.js'); // prettier-ignore
text = fs.readFileSync(file, 'utf8');
search = /importLoaders: 1,\n\s{16}}/;

if (text.match(search)) {
    text = text.replace(
        search,
        `importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]-[local]-[hash:base64:5]',
                }`); // prettier-ignore
    fs.writeFileSync(file, text, 'utf8');
} else if (!text.indexOf('[name]-[local]-[hash:base64:5]') === -1) {
    throw new Error(`Failed to inject CSS Modules into ${file}`);
}

//
// Inject Eyeglass into webpack.config.dev.js
// -----------------------------------------------------------------------------
file = path.resolve('./node_modules/react-scripts/config/webpack.config.dev.js'); // prettier-ignore
text = fs.readFileSync(file, 'utf8');
search = `const webpack = require('webpack');
          const HtmlWebpackPlugin = require('html-webpack-plugin');`;

if (text.includes(search)) {
    text = text.replace(
        search,
        `const webpack = require('webpack');
     const eyeglass = require('eyeglass');
     const HtmlWebpackPlugin = require('html-webpack-plugin');`); // prettier-ignore
    fs.writeFileSync(file, text, 'utf8');
} else if (!text.indexOf("require('eyeglass');") === -1) {
    throw new Error(`Failed to inject Eyeglass into ${file}`);
}

//
// Inject style custom processor loader into webpack.config.dev.js
// -----------------------------------------------------------------------------
file = path.resolve('./node_modules/react-scripts/config/webpack.config.dev.js'); // prettier-ignore
text = fs.readFileSync(file, 'utf8');
search = "loader: require.resolve('babel-loader'),";

if (text.match(search)) {
    text = text.replace(
        search,
        'use: [require.resolve(\'babel-loader\'), \'stylelint-custom-processor-loader\'],'); // prettier-ignore
    fs.writeFileSync(file, text, 'utf8');
} else if (!text.indexOf('stylelint-custom-processor-loader') === -1) {
    throw new Error(
        `Failed to inject stylelint-custom-processor-loader into ${file}`,
    );
}

//
// Inject SASS Loader into webpack.config.prod.js
// -----------------------------------------------------------------------------
file = path.resolve('./node_modules/react-scripts/config/webpack.config.prod.js'); // prettier-ignore
text = fs.readFileSync(file, 'utf8');
search = `{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: require.resolve('style-loader'),
                  use: [
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: shouldUseSourceMap,
                      },
                    },
                    {
                      loader: require.resolve('postcss-loader'),
                      options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                          require('postcss-flexbugs-fixes'),
                          autoprefixer({
                            browsers: [
                              '>1%',
                              'last 4 versions',
                              'Firefox ESR',
                              'not ie < 9', // React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009',
                          }),
                        ],
                      },
                    },
                  ],
                },
                extractTextPluginOptions
              )
            ),
            // Note: this won't work without \`new ExtractTextPlugin()\` in \`plugins\`.
          },`;

if (text.includes(search)) {
    text = text.replace(
        search,
        `${search}
    {
      test: /bootstrap-sass\/assets\/javascripts\//,
      use: {
        loader: 'imports-loader?jQuery=jquery',
      },
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        Object.assign(
          {
            fallback: require.resolve('style-loader'),
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[hash:base64:5]',
                  minimize: true,
                  sourceMap: shouldUseSourceMap,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  options: {
                    config: './postcss.sass.js',
                  },
                  plugins: () => [
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              {
                loader: 'sass-loader',
                options: eyeglass({
                  // sass options...
                  includePaths: ['node_modules'],
                  eyeglass: {
                    // eyeglass options
                  }
                })
              },
            ],
          },
          extractTextPluginOptions
        )
      ),
      // Note: this won't work without \`new ExtractTextPlugin()\` in \`plugins\`.
    },`); // prettier-ignore
    fs.writeFileSync(file, text, 'utf8');
} else if (!text.indexOf('sass-loader') === -1) {
    throw new Error(`Failed to inject CSS Modules into ${file}`);
}

//
// Inject CSS Modules into webpack.config.prod.js
// -----------------------------------------------------------------------------
file = path.resolve('./node_modules/react-scripts/config/webpack.config.prod.js'); // prettier-ignore
text = fs.readFileSync(file, 'utf8');
search = /importLoaders: 1,\n\s{24}minimize: true,/;

if (text.match(search)) {
    text = text.replace(
        search,
        `importLoaders: 1,
                        modules: true,
                        localIdentName: '[hash:base64:5]',
                        minimize: true,`); // prettier-ignore
    fs.writeFileSync(file, text, 'utf8');
} else if (!text.indexOf('[hash:base64:5]') === -1) {
    throw new Error(`Failed to inject CSS Modules into ${file}`);
}

//
// Inject style custom processor loader into webpack.config.prod.js
// -----------------------------------------------------------------------------
file = path.resolve('./node_modules/react-scripts/config/webpack.config.prod.js'); // prettier-ignore
text = fs.readFileSync(file, 'utf8');
search = "loader: require.resolve('babel-loader'),";

if (text.match(search)) {
    text = text.replace(
        search,
        'use: [require.resolve(\'babel-loader\'), \'stylelint-custom-processor-loader\'],'); // prettier-ignore
    fs.writeFileSync(file, text, 'utf8');
} else if (!text.indexOf('[name]-[local]-[hash:base64:5]') === -1) {
    throw new Error(`Failed to inject CSS Modules into ${file}`);
}

//
// Inject Eyeglass into webpack.config.prod.js
// -----------------------------------------------------------------------------
file = path.resolve('./node_modules/react-scripts/config/webpack.config.prod.js'); // prettier-ignore
text = fs.readFileSync(file, 'utf8');
search = `const webpack = require('webpack');
          const HtmlWebpackPlugin = require('html-webpack-plugin');`;

if (text.includes(search)) {
    text = text.replace(
        search,
        `const webpack = require('webpack');
     const eyeglass = require('eyeglass');
     const HtmlWebpackPlugin = require('html-webpack-plugin');`); // prettier-ignore
    fs.writeFileSync(file, text, 'utf8');
} else if (!text.indexOf("require('eyeglass');") === -1) {
    throw new Error(`Failed to inject Eyeglass into ${file}`);
}

//
// Download the GraphQL schema
// -----------------------------------------------------------------------------
if (process.argv.includes('--download-schema')) {
    file = fs.createWriteStream('./src/schema.graphql');
    https.get('https://graphql-demo.kriasoft.com/schema', (resp) => {
        if (resp.statusCode === 200) {
            resp.pipe(file);
        } else {
            throw new Error('Failed to download the schema.');
        }
    });
}
