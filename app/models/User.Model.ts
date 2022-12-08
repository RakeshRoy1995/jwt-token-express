import { Document, model, Schema } from 'mongoose';

var userSchema = new Schema({
    email: {type: String},
    password: {type: String},
    salt: {type: String},
    verification_token: {type: String},
    access_token: {type: String},
    phone: {type: String},
    
}, {timestamps: true});

const User = model('user', userSchema);

export default User;