const router = require('express');
const postsDb = require('../data/db');

module.exports = router;

//create a post using the information sent inside request body
router.post('/', (req, res) => {});

//Create a comment for the post with the specified id
router.post('/:id/comments', (req, res) => {});

//return array of all the post objects contained in the database
router.get('/', (req, res) => {});

//return the post object with the specified id
router.get('/:id', (req, res) => {});

//return array of all comment objects associated with the post with the specified id
router.get('/:id/comments', (req, res) => {});

//removes the post with the specified id and returns the deleted post object
router.delete('/:id', (req, res) => {});

//Updates the post with the specified id using data from the request body
router.put('/:id', (req, res) => {});
