const mongoose = require("mongoose");

var dueSchema = mongoose.Schema({	// From the data given in the sheet
	due_id: {
		type: Number,
		required: true,
		unique: true,
	},
	aadhar_number: String,
	due_amount: Number,
	pay_to_office: String,
	due_type: String,
	payment: {
		date: Date,
		amount: Number,
		payment_method: String
	}
});

module.exports = mongoose.model("Due", dueSchema);