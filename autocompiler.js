let fs = require('fs');
let shell = require('shelljs');

// fs.watch( 'style.styl', true, ( e,n ) => {
// });

shell.exec( 'stylus -w style.styl -o style.css' );
console.log( 'Watching.' );