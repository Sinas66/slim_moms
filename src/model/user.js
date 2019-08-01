const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		userName: {
			type: String,
			index: true,
			unique: true,
			required: true,
			lowercase: true,
			trim: true,
		},
		password: { type: String, required: true },
		userData: {
			type: Object,
			email: { type: String },
			age: {},
			weight: {
				type: Number,
				min: 1,
				max: 199
			},
			height: {},
			currentWeight: {},
			groupBlood: {},
		},
		token: { type: String },
		eatsRecorded: { type: Array },
	},
	{
		timestamps: true,
	},
);

UserSchema.pre('findOneAndUpdate', function() {
	const update = this.getUpdate();
	if (update.__v != null) {
		delete update.__v;
	}
	const keys = ['$set', '$setOnInsert'];
	for (const key of keys) {
		if (update[key] != null && update[key].__v != null) {
			delete update[key].__v;
			if (Object.keys(update[key]).length === 0) {
				delete update[key];
			}
		}
	}
	update.$inc = update.$inc || {};
	update.$inc.__v = 1;
});

UserSchema.method.comparePassword = () => {};

const User = mongoose.model('User', UserSchema);

module.exports = User;