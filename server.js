const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { logger, expressWinstonLogger } = require('./utility/loggers.js');

const API_PORT = 3001;

// Data JSONs
const citizensJSON = require('./data/Citizens.json');


// Models
const Citizen = require('./models/Citizen');

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

function doCitizenUpdate(query, update) {
	return new Promise((resolve, reject) => {
		Citizen.findOneAndUpdate(query, update,
			{ upsert: true, new: true, setDefaultsOnInsert: true },
			function (err, doc) {
				if(err) return reject(err);
				return resolve(doc);
			});
	});	
}

function doComplaintUpdate(query, update) {
	return new Promise((resolve, reject) => {
		Complaint.findOneAndUpdate(query, update,
			{ upsert: true, new: true, setDefaultsOnInsert: true },
			function (err, doc) {
				if (err) return reject(err);
				return resolve(doc);
			});
	});
}

function doDueUpdate(query, update) {
	return new Promise((resolve, reject) => {
		Due.findOneAndUpdate(query, update,
			{ upsert: true, new: true, setDefaultsOnInsert: true },
			function (err, doc) {
				if (err) return reject(err);
				return resolve(doc);
			});
	});
}

function doLandRecordUpdate(query, update) {
	return new Promise((resolve, reject) => {
		LandRecord.findOneAndUpdate(query, update,
			{ upsert: true, new: true, setDefaultsOnInsert: true },
			function (err, doc) {
				if (err) return reject(err);
				return resolve(doc);
			});
	});
}

app.get('/parseCitizens', (req, res) => {
	var promises = citizensJSON.map((v) => doCitizenUpdate({aadhar: v.aadhar}, v));

	Promise.all(promises)
	.then(result => res.json(result))
	.catch(err => logger.error(err));
});

app.listen(API_PORT, () => logger.info(`Listening on port ${API_PORT}`));