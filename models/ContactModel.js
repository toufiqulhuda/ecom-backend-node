const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    date_added: {
        type: Date,
        default: () => Date.now()
    }
    
});
const Contact = model('Contact', ContactSchema);
module.exports =  Contact;