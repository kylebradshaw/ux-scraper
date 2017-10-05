// const SitemapGenerator = require('sitemap-generator');

// // create generator
// const generator = SitemapGenerator('http://google.com', {
//  stripQuerystring: false
// });

// // register event listeners
// generator.on('done', () => {
//   // sitemaps created
//   console.log('done deal')
// });

// // start the crawler
// generator.start();

const argv = require('yargs').argv
const Crawler = require('simplecrawler');

const port = 80;
const exclude = ['gif', 'jpg', 'jpeg', 'png', 'ico', 'bmp', 'ogg', 'webp',
  'mp4', 'webm', 'mp3', 'ttf', 'woff', 'json', 'rss', 'atom', 'gz', 'zip',
  'rar', '7z', 'css', 'js', 'gzip', 'exe', 'svg'];
const exts = exclude.join('|');
const regex = new RegExp('\.(' + exts + ')', 'i'); // This is used for filtering crawl items.
const crawler = new Crawler('http://' + argv.site);
// const crawler = new Crawler('http://www.macdowellcolony.org');

let pages = []; // This array will hold all the URLs
// let pages = new Set();

// Crawler configuration
crawler.initialPort = port;
crawler.initalPath = '/';

crawler.addFetchCondition(function (parsedURL) {
  return !parsedURL.path.match(regex); // This will reject anything that's not a link.
});

// Run the crawler
crawler.start();

crawler.on('fetchcomplete', function(item, responseBuffer, response) {
  pages.push(item.url); // Add URL to the array of pages
  // pages.add(item.url)
});

// pages.forEach(function (item) {
//   console.log(item)
// })
console.log(pages, 'pages')
