/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// const path = require('path');
const s3 = require('s3');
const config = require('./config');
const AWS = require('aws-sdk');
const url = require('url');
const packageJson = require('./package.json');
// const mime = require('mime-types');
// const path = require('path');
const { spawn } = require('child_process');

// Build and deploy the app to Firebase

function ensureSlash(path, needsSlash) {
    const hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    }
    return path;
}

function run(task, action, ...args) {
    const command = process.argv[2];
    const taskName =
    command && !command.startsWith('-') ? `${task}:${command}` : task;
    const start = new Date();
    process.stdout.write(`Starting '${taskName}'...\n`);
    return Promise.resolve().then(() => action(...args)).then(
        () => {
            process.stdout.write(
                `Finished '${taskName}' after ${new Date().getTime() -
          start.getTime()}ms\n`,
            );
        },
        err => process.stderr.write(`${err.stack}\n`),
    );
}

process.nextTick(() => require.main.exports());
const task = (task, action) => run.bind(undefined, task, action);

const build = task(
    'build',
    () =>
        new Promise((resolve, reject) => {
            const { spawn } = require('child_process');
            const child = spawn('npm', ['run', 'build']);

            // use child.stdout.setEncoding('utf8'); if you want text chunks
            child.stdout.on('data', (chunk) => {
                // data from standard output is here as buffers
                process.stdout.write(chunk);
            });

            // since these are streams, you can pipe them elsewhere
            // child.stderr.pipe(dest);
            child.on('error', (err) => {
                console.log(`Error: ${err}`);
                reject(err);
            });
            child.on('close', (code) => {
                resolve(`child process exited with code ${code}`);
            });
        }),
);

const deploy = task(
    'publish',
    () =>
        new Promise((resolve, reject) => {
            const isProduction = process.argv.includes('--production');
            const envPublicUrl = process.env.PUBLIC_URL;
            const getPublicUrl = appPackageJson =>
                envPublicUrl || require(appPackageJson).homepage;

            // We use `PUBLIC_URL` environment variable or "homepage" field to infer
            // "public path" at which the app is served.
            // Webpack needs to know it to put the right <script> hrefs into HTML even in
            // single-page apps that may serve index.html for nested URLs like /todos/42.
            // We can't use a relative path in HTML because we don't want to load something
            // like /todos/42/static/js/bundle.7289d.js. We have to know the root.
            function getServedPath(appPackageJson) {
                const publicUrl = getPublicUrl(appPackageJson);
                const servedUrl =
          envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
                return ensureSlash(servedUrl, true);
            }

            const customFolder = getServedPath('./package.json').substring(1);
            console.log(
                `The project is being published in ${isProduction
                    ? 'production'
                    : 'staging'} in ${customFolder}.`,
            );
            const awsS3Client = new AWS.S3(config.awsOptions);
            const options = {
                s3Client: awsS3Client,
                // more options available. See API docs below.
            };

            const client = s3.createClient({ options });
            const uploader = client.uploadDir({
                localDir: 'build',
                deleteRemoved: false,
                s3Params: {
                    Bucket: isProduction ? config.s3Prod.bucket : config.s3Dev.bucket,
                    Prefix: customFolder,
                },
                getS3Params(file, state, cb) {
                    const s3Params = {};
                    if (file.includes('.gz')) {
                        s3Params.ContentEncoding = 'gzip';
                    }
                    cb(null, s3Params);
                    console.log('Deploy S3Params ', s3Params);
                },
            });
            console.log('Deploy CustomFolder ', customFolder);
            uploader.on('error', (err) => {
                console.log(err);
                reject(err);
            });
            uploader.on('end', resolve);
        }),
);

const invalidate = task(
    'invalidate',
    () =>
        new Promise((resolve, reject) => {
            const isProduction = process.argv.includes('--production');
            const customFolder =
        process.argv.includes('--folder') &&
        process.argv[process.argv.indexOf('--folder') + 1]
            ? `${process.argv[process.argv.indexOf('--folder') + 1]}/`
            : '';
            console.log('Invalidate CustomFolder ', customFolder);
            AWS.config = new AWS.Config(config.awsOptions);
            const cloudfront = new AWS.CloudFront();
            cloudfront.createInvalidation(
                {
                    DistributionId: isProduction
                        ? config.s3Prod.distributionId
                        : config.s3Dev.distributionId,
                    InvalidationBatch: {
                        CallerReference: String(+new Date()),
                        Paths: {
                            Quantity: 4,
                            Items: [
                                `/${customFolder}*`,
                                `/${customFolder}dist/*`,
                                `/${customFolder}img/*`,
                                `/${customFolder}data/*`,
                            ],
                        },
                    },
                },
                (err, data) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else resolve(data);
                },
            );
        }),
);

module.exports = task('deploy', () =>
    Promise.resolve()
        .then(build)
        .then(deploy)
        .then(invalidate)
        .then((data) => {
            if (data) console.log(data);
            setTimeout(() => process.exit());
        })
        .catch(error => console.log(error)),
);
