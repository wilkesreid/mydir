const fs = require('fs');

fs.access('/usr/local', fs.constants.R_OK && fs.constants.W_OK, (err) => {
  console.log(err ? 'no access!' : 'can read/write');
});
