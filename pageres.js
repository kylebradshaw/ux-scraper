const fs = require('fs')
const argv = require('yargs').argv
const Pageres = require('pageres')

var lines = fs.readFileSync(__dirname + '/sites/' + argv.name + '/' + argv.name + '.txt').toString().split("\n");
// for(l in lines) {
//   console.log(lines[l]);
// }

// not performant! does everything at once
// lines.map((url) => {
//   const pageres = new Pageres({ delay: 2 })
//     .src(url, ['320x480'])
//     .dest(__dirname + '/sites/' + argv.name + '/ss/')
//     .run()
//     .then(() => console.log(url, 'done'))
// })

// chunk it out
function fetchPage(page = 0) {
  const pageres = new Pageres({ delay: 2 })
    .src(lines[page], ['320x480'])
    // .src(lines[page], ['800x600'])
    .dest(__dirname + '/sites/' + argv.name + '/ss/')
    .run()
    .then(() => {
      if (page <= lines.length) {
        fetchPage(page + 1)
      } else {
        console.log('completed all!')
      }
    })
}

fetchPage();
