const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/noteModels');
const User = require('../models/userModels');

const viewNotes = (req, res) => {
	if (req.decoded) {
		User.findOne({ username: req.username })
			.then(user => {
					id = user._id;
					Note.find({ author: id })
					.then(notes => {
							res.json(notes);
						})
					  .catch(err => {
								res.status(500).json(err);
							});
					 })
		       .catch(err => {
							 res.status(500).json(err);
						});
	      } else {
					  return res.status(422).json({ error: 'Login is required before notes can be viewed' });
				 }
	    };

	const createNote = (req, res) => {
			const { title, content } = req.body;
			const username = req.username;
			const author = req.author;
		  
			if (req.decoded) {
			  User.findOne({ username })
				.then(user => {
				  const newNote = new Note({
					title,
					content,
					author: user._id
				  });
				  newNote
					.save((err, note) => {
					  if (err) return res.json(err);
					  res.json(note);
					});
				})
				.catch(err => {
				  res.status(500).json(err);
				});
			} else {
			  return res.status(422).json({ error: 'Please log in first to view your notes' });
			}
		  };

       const editNote = (req, res) => {
				  const { id, title, content } = req.body;
					const updateNote = {
						title,
						content
					};

					if (req.decoded) {
						Note.findByIdAndUpdate(id, updateNote, { new: true })
							.then(note => {
									res.json(note);
								})
						   .catch(err => {
									 res.status(500).json(err);
								});
				   	} else {
						   	return res.status(422).json({ error: 'Login is required to edit notes' });
             }
				 };
  
        const deleteNote = (req, res) => {
					const { id } = req.body;

					if (req.decoded) {
						Note.findByIdAndRemove(id)
							.then(note => {
									res.json({ success: 'Success in note deletion' });
							 })
						  .catch(err => {
									res.status(500).json(err);
						   });
						 } 
					 };

module.exports = {
	viewNotes,
	createNote,
	editNote,
	deleteNote
};
						 
