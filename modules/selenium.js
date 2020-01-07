const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
	_id:mongoose.Schema.Types.ObjectId,
	error_value: {type:String, required:true},
	getCardsOnList: {type:String},
	addChecklistToCard: {type:String}
});


module.exports = mongoose.model('selenium_error',postSchema);
