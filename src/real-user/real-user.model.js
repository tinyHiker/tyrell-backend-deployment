const mongoose = require('mongoose')
//const bcrypt = require('bcrypt');

const realUserSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: false
    }]
    
})



const RealUser =  mongoose.model('RealUser', realUserSchema);

module.exports = RealUser;
