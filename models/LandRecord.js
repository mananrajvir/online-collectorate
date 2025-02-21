const mongoose = require("mongoose");

var landRecordSchema = mongoose.Schema({	// From the data given in the sheet
	aadhar: {
		type: String,
		required: true,
	},
	land_id: {
		type: Number,
		required: true,
		unique: true,
	},
	area: String,
	land_tpye: String
	,
});

module.exports = mongoose.model("LandRecord", landRecordSchema);