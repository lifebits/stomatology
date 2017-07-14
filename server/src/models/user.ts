import { mongoose } from '../mongoose';
import { Schema } from 'mongoose';

import * as crypto from 'crypto';

const schema: Schema = new Schema({
   userName: {
      type: String,
      // unique: true,
      required: true
   },
   age: {
      type: String,
      required: true
   },
   hashedPassword: {
      type: String,
      required: true
   },
   salt: {
      type: String,
      required: true
   },
   created: {
      type: Date,
      default: Date.now
   }
});

schema.index({userName: 1, age: 1}, {unique: true});

schema.methods.encryptPassword = function(password) {
   return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
   .set(function (password) {
      this._plainPassword = password;
      this.salt = Math.random() + '';
      this.hashedPassword = this.encryptPassword(password);
   })
   .get(() => this._plainPassword);


schema.methods.checkPassword = password => {
   return this.encryptPassword(password) === this.hashedPassword;
};

export const User = mongoose.model('User', schema);
