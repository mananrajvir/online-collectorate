const mongoose = require("mongoose");

var citizenSchema = mongoose.Schema({	// From the data given in the sheet
	aadhar: {
		type: String,
		required: true,
		unique: true,
	},
	dob: Date,
	name: String,
	voter_id: String,
	license: String,
	gender: String,
	phone: String,
	district: String,
	street: String,
	pincode: String,
});

module.exports = mongoose.model("Citizen", citizenSchema);