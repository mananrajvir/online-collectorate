const mongoose = require("mongoose");

var landSaleSchema = mongoose.Schema({	// From the data given in the sheet
	sale_number: {
		type: Number,
		required: true,
		unique: true,
	},
	owner_aadhar: {
		type: String,
		required: true,
	},
	Amount: Number,
	buyer_aadhar: {
		type: String,
		required: true,
	},
	address: String,
	sale_type: String
});

module.exports = mongoose.model("LandSale", landSaleSchema);