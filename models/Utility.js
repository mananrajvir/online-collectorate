const mongoose = require("mongoose");

var utilitySchema = mongoose.Schema({	// From the data given in the sheet
	utility_type : String,
	place_name : String,
	address : String,
	contact_details : String,
	timings : String
});

module.exports = mongoose.model("Utility", utilitySchema);