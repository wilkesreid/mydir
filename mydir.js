#! /usr/bin/env node

const fs = require('fs');
const mkdirp = require('mkdirp');
const source = require('shell-source');

if (!/^darwin/.test(process.platform)) {
  console.log("mydir is currently built only for Mac OS X");
  return;
}

if (process.argv.length < 3) {
  console.log("requires an argument");
  return;
}

mkdirp('/usr/local/var/mydir', (mkdirp_err) => {
  if (!mkdirp_err) {

    fs.open('/usr/local/var/mydir/list.json', 'a+', (open_err, fd) => {
      if (!open_err) {
        // Do stuff

        var list = fs.readFileSync('/usr/local/var/mydir/list.json', 'utf8');

        if (list == "") {
          list = "{}";
          fs.writeFileSync('/usr/local/var/mydir/list.json', list, 'utf8');
        }

        var data = JSON.parse(list);

        switch (process.argv[2]) {
          case 'alias':
            source(__dirname + '/mydir-alias.sh', (err)=>{});
          break;
          case 'list':
            for (var key in data) {
              if (!data.hasOwnProperty(key)) continue;

              process.stdout.write(key+": "+data[key]+"\n");
            }
          break;
          case 'set':
            if (process.argv.length < 5) {
              process.stdout.write("'set' requires two additional arguments.\n");
            } else {
              data[process.argv[3]] = process.argv[4];
              fs.writeFileSync('/usr/local/var/mydir/list.json', JSON.stringify(data), 'utf8');
            }
          break;
          case 'rm':
            if (process.argv.length < 4) {
              process.stdout.write("'rm' required one additional argument.\n");
            } else {
              delete data[process.argv[3]];
              fs.writeFileSync('/usr/local/var/mydir/list.json', JSON.stringify(data), 'utf8');
            }
          break;
          default:
            if (data.hasOwnProperty(process.argv[2])) {
              process.stdout.write(data[process.argv[2]]);
            } else {
              process.stdout.write(".");
            }
          break;
        }

      } else {
        console.log("error: "+err);
      }
    });

  } else {
    console.log("could not create/access /usr/local/var/mydir");
  }
});
