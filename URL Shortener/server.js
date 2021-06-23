require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Handle long URL to short URL API processing
const listShortURL = {'#': "#"}

function genUniqueID(arr, callback) {
	let id = '#'
	setTimeout(() => {
		while (arr.includes(id)) {
			id = Math.floor(Math.random() * 10000).toString()
		}
		callback(id)
	}, 100)
}

app.route('/api/shorturl/:id?')
	.get((req, res) => {
		const { id } = req.params
		if (id in listShortURL) {
			res.redirect(301, listShortURL[id])
		}
	})
	.post((req, res) => {
		const { url } = req.body

		const urlRegex = /^(https?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
		if (urlRegex.test(url) === false) {
			res.json({error: 'invalid url'})
			return
		}

		const keys = Object.keys(listShortURL)
		const values = Object.values(listShortURL)

		const idurl = values.indexOf(url)
		if (idurl > -1) {
			res.json({
				original_url: values[idurl], 
				short_url: parseInt(keys[idurl])
			})
		} else {
			genUniqueID(keys, id => {
				Object.assign(listShortURL, {[id]: url})
				console.log(listShortURL)
				res.json({
					original_url: url, 
					short_url: parseInt(id)
				})
			})
		}
	})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
