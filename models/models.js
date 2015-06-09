var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
	created_by: String,		//should be changed to ObjectId, ref "User"
	created_at: {type: Date, default: Date.now},
	category: Number, 
	title: String, 
	price: Number, 
	location: String, 
	zip: String, 
	details: String , 
	link: String , 
	availability: String, 
	imageUrl: String , 
	emailid: String , 
	emailidAgain: String
});

var userSchema = new mongoose.Schema({
	username: String,
	password: String, //hash created from password
	created_at: {type: Date, default: Date.now}
});


var postRequestSchema = new mongoose.Schema({
	requestUser: String , 
	ownerUser: String, 
	requested_at:  {type: Date, default: Date.now}   
}); 

mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);
mongoose.model('PostRequest', postRequestSchema);