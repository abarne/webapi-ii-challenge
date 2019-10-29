const express = require('express');

const server = express();
server.use(express.json());

const postsRouter = require('./routes/posts.js');

server.use('/api/posts', postsRouter);

server.get('/', (req, ress) => {
	ress.send(`<h2>Welcome to the API!</h2>`);
});

server.listen(8000, () => {
	console.log(`\n*** Server Running on localhost:8000 ***\n`);
});
