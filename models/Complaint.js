const mongoose = require("mongoose");

var complaintSchema = mongoose.Schema({	// From the data given in the sheet
	complaint_id: {
		type: Number,
		required: true,
		unique: true
	},
	aadhar: {
		type: String,
		required: true,
	},
	department: String,
	details: String,
	status: String,
});

module.exports = mongoose.model("Complaint", complaintSchema);