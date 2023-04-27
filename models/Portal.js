const mongoose = require('mongoose');
var portalSchema = new mongoose.Schema({
	name:{
		type: String,
		unique: true,
		required: true
	},
	email:{
		type: String,
		unique: true,
		required: true,
	},
	password:{
		type: String,
		required: true,
		select: false
	},
	type:{
		type: String,
		default: 'admin',
		required: true,
		enum: ['super', 'admin', 'user']
	},
	created_on:{
		type: Date,
		required: true,
		default: Date.now
	},
	token_iat:{
		type: String,
	},
	last_login:{
		type: Date,
	},
	access_control:{
		type: [String],
		default: [],
		required: true,
	},
}, { versionKey: false });
module.exports = mongoose.model('Portal', portalSchema);
