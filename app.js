const Contentful = require('spike-contentful');
const Records = require('spike-records');
const htmlStandards = require('reshape-standard');
const cssStandards = require('spike-css-standards');
const jsStandards = require('spike-js-standards');
const imgPlugin = require('./_imgsPlugin');
const {getConfigForKeys, getPostsWithImagesAndDate} = require('./config.js');
const env = process.env.NODE_ENV;
const c = getConfigForKeys([
  'CTF_BLOG_POST_TYPE_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN',
]);
const locals = {};

module.exports = {
  devtool: 'source-map',
  ignore: ['**/_*', '**/.*', 'views/*.css', 'readme.md', 'package.json', 'yarn.lock'],
  plugins: [
    new Records({
        addDataTo: locals,
        posts: {
          url: `https://cdn.contentful.com/spaces/${c.CTF_SPACE_ID}/entries?access_token=${c.CTF_CDA_ACCESS_TOKEN}&content_type=${c.CTF_BLOG_POST_TYPE_ID}&order=-sys.createdAt`,
          transform: getPostsWithImagesAndDate,
          template: {
            path: 'views/_post.html',
            output: post => `blog/${post.slug}/index.html` ,
          }
        },
    })
  ],
  reshape: htmlStandards({
    parser: false,
    locals: locals,
    minify: env === 'production',
    appendPlugins: imgPlugin,
    markdown: { typographer: false, linkify: true },
    retext: [],
  }),
  postcss: cssStandards({
    parser: false,
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  // babel: jsStandards({ modules: false }),
}
