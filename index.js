const fs = require('fs')
const argv = require('yargs').argv
const Crawler = require('simplecrawler');

const port = 80;
const exclude = ['gif', 'jpg', 'jpeg', 'png', 'ico', 'bmp', 'ogg', 'webp',
  'mp4', 'webm', 'mp3', 'ttf', 'woff', 'json', 'rss', 'atom', 'gz', 'zip',
  'rar', '7z', 'css', 'js', 'gzip', 'exe', 'svg', 'pdf'];
const exts = exclude.join('|');
const regex = new RegExp('\.(' + exts + ')', 'i');
const crawler = new Crawler(argv.url);

let pages = new Set()

// Crawler configuration
crawler.initialPort = port;
crawler.initalPath = '/';
crawler.interval = 1; // seconds
crawler.maxConcurrency = 3;

crawler.addFetchCondition(function (parsedURL) {
  return !parsedURL.path.match(regex); // This will reject anything that's not a link.
});

// Run the crawler
crawler.start();

crawler.on('fetchcomplete', function(item, responseBuffer, response) {
  pages.add(item.url); // Add URL unique url to Set
});

crawler.on('complete', (item, responseBuffer, response) => {
  fs.writeFile(__dirname + '/sites/' + argv.name + '/' + argv.name + '.txt', [...pages].join('\n'), (err) => {
    if (err) throw err;
    console.log('completed!!')
  })
})

