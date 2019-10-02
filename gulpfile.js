var execSync = require('child_process').execSync;
var cp = require('child_process');
gulp = require("gulp");
var exec = require('gulp-exec');

function compile(cb) {

    let command = "eosio-cpp contracts/addressbook/addressbook.cpp -o addressbook.wasm";
    console.log(execSync(command).toString());

    command = "cleos set contract addressbook  /Users/justin/ref/code-escrow/code-escrow/contracts/addressbook -p addressbook@active";

    console.log(execSync(command).toString());


    command = "cleos get table addressbook addressbook people --upper john --limit 3";
    console.log(execSync(command).toString());
    cb();
};


function watch() {
    gulp.watch('contracts/addressbook/addressbook.cpp', function() {
        compile(watch);
    });
};

exports.watch = watch;
exports.compile = compile;
