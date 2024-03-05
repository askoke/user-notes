const Note = require('../models/note')

const addNote = async (req, res) => {
    Note.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.session.user.user_id
    })
    .then(note => {
        res.json({
            message: 'New note is created', 
            note: note
        })
    })
    .catch(err => {
        console.log(err)
    })
}   

const getAllNotes = async (req, res) => {
    Note.findAll({
        where: {
            userId: req.session.user.user_id
        } 
    })
    .then(notes => { 
        res.json(notes)
    })
    .catch(err => { 
        console.log(err)
    })
} 

module.exports = { addNote, getAllNotes } 