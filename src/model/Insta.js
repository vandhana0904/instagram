const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const commentschema=new Schema({
    createdat:{
        type:Date,
        default:Date.now()
    },
    comment:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },

})

const InstaShema = new Schema({

        createdat:{
            type:Date,
            default:Date.now()
        },
        likes:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
        caption:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        },
        comments:[commentschema]

    
	
});

module.exports = Insta = mongoose.model('users', InstaShema);
