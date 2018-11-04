console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

// console.log(_.isString(true));
// console.log(_.isString('abc'));
// var filteredArray = _.uniq(['Ritosh', 1,'Ritosh', 1, 2, 3, 4]);
// console.log(filteredArray);

const argv = yargs
.command('add', 'add a new notes',{
    title:{
        describe: 'Title of note',
        demand: true,
        alias: 't'
    },
    body:{
    title:{describe: 'Body of note',
    demand: true,
    alias: 'b'
    }
 })
 .command('list','lis all notes')
 .command('read', 'Read a note',{
     title:{
        describe: 'Title of note',
        demand: true,
        alias: 't'
    },
 })
 .help()
  .argv;
console.log(process.argv);
var command = process.argv[0];
console.log('command', command);
console.log('process', process.argv);
console.log('Yargs',argv);

if(command === 'add'){
    console.log('Adding new note');
    var note = notes.addNote(argv.title,argv.body);
    if (note) {
        console.log('Note created');
        notes.logNote(note);
    }else{
        console.log('Note title taken');
    }
}else if(command === 'list'){
    var allNotes = notes.getall();
    console.log(`Printing ${allNotes.Length} note(s).`);
    allNotes.foreach((note) => notes.logNote(note));
    notes.getall();
}else if(command ==='read'){
    console.log('reading note');
    var note = notes.getNote(argv.title);
    if(note){
        console.log('Note found');
       notes.logNote(note);
    }else{
        console.log('Note not found');
    }
}else if(command === 'remove') {
    //console.log('remove');
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed': 'Note not found';
    console.log(message);
}else{
    console.log('command not recognized');
}
