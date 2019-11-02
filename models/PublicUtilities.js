const mongoose = require("mongoose");

var publicUtilitiesSchema = mongoose.Schema({	// From the data given in the sheet
	appointment_id: {
		type: Number,
		required: true,
		unique: true,
	},
	aadhar: {
		type: String,
		required: true,
	},
	place_name: String,
	utility_type: String,
	appointment_type: String,
});

module.exports = mongoose.model("PublicUtilities", publicUtilitiesSchema);