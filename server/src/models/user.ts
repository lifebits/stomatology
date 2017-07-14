import { mongoose } from '../mongoose';
import { Schema } from 'mongoose';

import * as crypto from 'crypto';

const schema: Schema = new Schema({
   userName: {
      type: String,
      unique: true,
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

/*schema.pre('save', true, function(next, done) {
   const self = this;
   mongoose.models["User"].findOne({username: self.username}, function(err, user) {
      if (err) {
         done(err);
      } else if(user) {
         self.invalidate("username", "username must be unique");
         done(new Error("username must be unique"));
      } else {
         done();
      }
   });
   next();
});*/

/*schema.path('userName').validate(function(value, respond) {
   User.findOne({userName: value}, function(err, user) {
      if (user) {
         respond(false);
      }
   })
}, 'This user is already registered');*/

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
