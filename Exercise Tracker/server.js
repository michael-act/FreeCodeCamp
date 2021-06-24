const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const bodyParser = require('body-parser')
const { nanoid } = require('nanoid')

app.use(cors())
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const Users = []
const Exercises = []

// Handle creating user request
app.route('/api/users')
	.get((req, res) => {
		res.json(Users)
	})
	.post((req, res) => {
		const { username } = req.body

		// Raise error if username has already taken
		if ( Users.find((user) => user.username === username)) {
			res.send('Username already taken')
			return
		}

		const _id = nanoid(24)
		const dbUserEntry = {_id, username}
		const dbExEntry = {_id, username, count: 0, log: []}

		Users.push(dbUserEntry)
		Exercises.push(dbExEntry)
		res.json(dbUserEntry)
	})

// Handle creating exercise for user request
app.post('/api/users/:_id/exercises', (req, res) => {
	const { _id } = req.params

	// Raise error if id not found
	const userLocID = Exercises.findIndex((user) => user._id === _id)
	const userObj = Exercises[userLocID]
	if (userLocID === -1) {
		res.send(`Cast to ObjectId failed for value "${_id}" at path "_id" for model "Users"`)
		return
	}

	const username = userObj.username
	let { description, duration, date } = req.body

	// Raise error if description & duration field not filled
	const mandatory = {description, duration}
	const nullLocID = Object.values(mandatory).indexOf('')
	if (nullLocID > -1) {
		res.send(`Path ${Object.keys(mandatory)[nullLocID]} is required.`)
		return
	}

	duration = parseInt(duration)
	date = date !== '' ? new Date(date) : new Date()
	date = date.toDateString()

	const exercise = {description, duration, date}
	userObj.log.push(exercise)
	userObj.count += 1

	res.json({_id, username, ...exercise})
})

// Handle request of exercise created user
app.get('/api/users/:_id/logs', (req, res) => {
	const { _id } = req.params

	// Raise error if id not found
	const userLocID = Exercises.findIndex((user) => user._id === _id)
	const userObj = Exercises[userLocID]
	if (userLocID === -1) {
		res.send(`Cast to ObjectId failed for value "${_id}" at path "_id" for model "Users"`)
		return
	} 

	const username = userObj.username

	let { 
		from, 
		to, 
		limit = userObj.log.length
	} = req.query

	let filteredEx = userObj.log.filter(task => 
		(from ? (new Date(task.date) >= new Date(from)) : true) &&
		(to ? (new Date(task.date) <= new Date(to)) : true)
	)

	filteredEx = {...userObj, log: filteredEx.slice(0, limit)}
	res.json(filteredEx)
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
