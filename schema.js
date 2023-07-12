const mongoose = require('mongoose');

const userSchema = new
mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true,
        maxlength:36,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },
    firstName:{
        type:String,
        maxlength:20,
    },
    middleName:{
        type:String,
        maxlength:20,
    },
    lastName:{
        type:String,
        maxlength:20,
    },
    countryCode:{
        type:String,
        maxlength:4,
    },
    countryNumber:{
        type:Number,
        max:999,
    },
    mobileNumber:{
        type:Number,
        max:999999999999,
    },
    emails:{
        type:String,
        maxlength:320,
    },
    address:{
        type:String,
        maxlength:160,

    },
    areaId:{
        type:Number,
        max:999999,
    },
    photo:{
        type:Buffer,
    },
});

const User = mongoose.model('User',userSchema);
module.exports=User;