const express = require('express')
const router = express.Router()
const { addNote, getAllNotes } = require('../controllers/notes')

router.post('/add', addNote)
router.get('/', getAllNotes)

module.exports = router