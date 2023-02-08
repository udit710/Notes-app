const fs = require('fs')
const chalk = require('chalk')

const addNote =  (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })   
        console.log(chalk.green('New note added'))
    } else {
        console.log(chalk.red('Note title taken!'))
    }

    saveNotes(notes)
}

const removeNote =  (title) => {
    const notes = loadNotes()

//--------------------------
const duplicateNotes = notes.filter((note)=> note.title === title)

if (duplicateNotes.length === 0) {
    console.log(chalk.red('Note not found!')   )
} else {
    const removedNotes = notes.filter((note) =>  note.title !== title)
    saveNotes(removedNotes)
    console.log(chalk.green('Note removed: '+title))
}
//---------------------------
// try {
//     const removedNotes = notes.filter(function(note) {
//         return note.title !== title;
//     })
//     saveNotes(removedNotes)
//     console.log(chalk.green('Note removed: ' + title))
// } catch (e) {
//     console.log(chalk.red('Note not found!'))
// }
}

const saveNotes = (notes)=> {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  () => {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataString = dataBuffer.toString()
        return JSON.parse(dataString)
    } catch (e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.yellow('Your notes: '))
    notes.forEach(note => console.log((notes.indexOf(note)+1)+') '+ note.title))
}

const readNotes = (title) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (duplicateNote) {
        console.log(duplicateNote.body)   
    } else{
        console.log(chalk.red('Note not found!'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}