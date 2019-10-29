const router = require('express').Router();
const postsDb = require('../data/db');

module.exports = router;

//create a post using the information sent inside request body
router.post('/', (req, res) => {
	if (!req.body.title || !req.body.contents) {
		res.status(400).json({ message: 'Please include a title and contents for the post' });
	} else {
		postsDb
			.insert(req.body)
			.then((post) => {
				res.status(201).json(req.body);
			})
			.catch((error) => {
				console.log(error);
				res.status(500).json({ message: 'Error adding the post' });
			});
	}
});

//Create a comment for the post with the specified id
router.post('/:id/comments', (req, res) => {
	const id = req.params.id;

	const comment = {
		text: req.body.text,
		post_id: id
	};

	postsDb
		.insertComment(comment)
		.then((comments) => {
			res.status(201).json({
				message: 'Comment added'
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: 'Error posting comment' });
		});
});

//return array of all the post objects contained in the database
router.get('/', (req, res) => {
	postsDb
		.find()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: 'Error retrieving the posts' });
		});
});

//return the post object with the specified id
router.get('/:id', (req, res) => {
	const id = req.params.id;
	postsDb
		.findById(id)
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error retrieving the post' });
		});
});

//return array of all comment objects associated with the post with the specified id
router.get('/:id/comments', (req, res) => {
	const id = req.params.id;

	postsDb
		.findPostComments(id)
		.then((comments) => {
			res.status(200).json(comments);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error finding comments' });
		});
});

//removes the post with the specified id and returns the deleted post object
router.delete('/:id', (req, res) => {
	const id = req.params.id;
	postsDb
		.remove(id)
		.then((post) => {
			res.status(200).json({
				message: 'Post deleted'
			});
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error deleting the post' });
		});
});

//Updates the post with the specified id using data from the request body
router.put('/:id', (req, res) => {
	const id = req.params.id;
	const postInfo = req.body;

	postsDb.update(id, postInfo).then((post) => {
		if (!post) {
			res.status(404).json({ message: 'Post not fount' });
		} else if (!postInfo.title || !postInfo.contents) {
			res.status(400).json({ message: 'Please include a title and contents for the post' });
		} else {
			res.status(200).json({
				message: 'The post was updated',
				post: postInfo
			});
		}
	});
});
