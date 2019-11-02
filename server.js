const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { logger, expressWinstonLogger } = require('./utility/loggers.js');

const API_PORT = 3001;

// Data JSONs
const citizensJSON = require('./data/Citizens.json');
const complaintsJSON = require('./data/Complaints.json');
const duesJSON = require('./data/Dues.json');
const landRecordsJSON = require('./data/LandRecords.json');
const landSalesJSON = require('./data/LandSales.json');
const publicUtilitiesJSON = require('./data/PublicUtilities.json');
const utilitiesListJSON = require('./data/UtilitiesList.json');

// Models
const Citizen = require('./models/Citizen');
const Complaint = require('./models/Complaint');
const Due = require('./models/Due');
const LandRecord = require('./models/LandRecord');
const LandSale = require('./models/LandSale');
const PublicUtility = require('./models/PublicUtility');
const Utility = require('./models/Utility');


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

function doLandSaleUpdate(query, update) {
	return new Promise((resolve, reject) => {
		LandSale.findOneAndUpdate(query, update,
			{ upsert: true, new: true, setDefaultsOnInsert: true },
			function (err, doc) {
				if (err) return reject(err);
				return resolve(doc);
			});
	});
}

function doPublicUtilityUpdate(query, update) {
	return new Promise((resolve, reject) => {
		PublicUtility.findOneAndUpdate(query, update,
			{ upsert: true, new: true, setDefaultsOnInsert: true },
			function (err, doc) {
				if (err) return reject(err);
				return resolve(doc);
			});
	});
}


function doUtilityUpdate(query, update) {
	return new Promise((resolve, reject) => {
		Utility.findOneAndUpdate(query, update,
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

app.get('/parseComplaints', (req, res) => {
	var promises = complaintsJSON.map((v) => doComplaintUpdate({ aadhar: v.aadhar }, v));

	Promise.all(promises)
		.then(result => res.json(result))
		.catch(err => logger.error(err));
});

app.get('/parseDues', (req, res) => {
	var promises = duesJSON.map((v) => doDueUpdate({ aadhar: v.aadhar }, v));

	Promise.all(promises)
		.then(result => res.json(result))
		.catch(err => logger.error(err));
});

app.get('/parseLandRecords', (req, res) => {
	var promises = landRecordsJSON.map((v) => doLandRecordUpdate({ aadhar: v.aadhar }, v));

	Promise.all(promises)
		.then(result => res.json(result))
		.catch(err => logger.error(err));
});

app.get('/parseLandSales', (req, res) => {
	var promises = landSalesJSON.map((v) => doLandSaleUpdate(v, v));

	Promise.all(promises)
		.then(result => res.json(result))
		.catch(err => logger.error(err));
});

app.get('/parsePublicUtilities', (req, res) => {
	var promises = publicUtilitiesJSON.map((v) => doPublicUtilityUpdate({ aadhar: v.aadhar }, v));

	Promise.all(promises)
		.then(result => res.json(result))
		.catch(err => logger.error(err));
});

app.get('/parseUtilities', (req, res) => {
	var promises = utilitiesListJSON.map((v) => doUtilityUpdate(v, v));

	Promise.all(promises)
		.then(result => res.json(result))
		.catch(err => logger.error(err));
});

app.listen(API_PORT, () => logger.info(`Listening on port ${API_PORT}`));