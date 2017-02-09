#! /usr/bin/env node

const fs = require('fs');
const mkdirp = require('mkdirp');
const exec = require('child_process').exec;

if (!/^darwin/.test(process.platform)) {
  console.log("mydir is currently built only for Mac OS X");
  return;
}

if (process.argv.length < 3) {
  console.log("\nmydir usage:\n\nmydir <alias>: recalls an alias's path\nmydir set <alias> <path>: creates an alias\nmydir rm <alias>: removes an alias\nmydir list: lists all existing aliases\n\ncmydir <alias>: changes working directory to path associated with given alias\n");
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
              process.stdout.write("'rm' requires one additional argument.\n");
            } else {
              delete data[process.argv[3]];
              fs.writeFileSync('/usr/local/var/mydir/list.json', JSON.stringify(data), 'utf8');
            }
          break;
          default:
            if (process.argv[2].includes("/")) {
              var alias = process.argv[2].substring(0, process.argv[2].indexOf("/"));
              var remainingPath = process.argv[2].substring(process.argv[2].indexOf("/") + 1);
              if (data.hasOwnProperty(alias)) {
                process.stdout.write(data[alias] + "/" + remainingPath);
              } else {
                process.stdout.write(".");
              }
            } else {
              var alias = process.argv[2];
              if (data.hasOwnProperty(alias)) {
                process.stdout.write(data[alias]);
              } else {
                process.stdout.write(".");
              }
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
