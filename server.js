const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { logger, expressWinstonLogger } = require('./utility/loggers.js');

const API_PORT = 3001;

mongoose.connect("mongodb://localhost:27017/collectorate", {
	useFindAndModify: false,
	useNewUrlParser: true,
	useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', logger.error.bind(logger, 'connection error:'));
db.once('open', function () {
	logger.info("Connected to MongoDB Instance");
});

const app = express();

app.use(expressWinstonLogger);


app.get('/', (req, res) => {
	res.send('Hi');
});

app.listen(API_PORT, () => logger.info(`Listening on port ${API_PORT}`));