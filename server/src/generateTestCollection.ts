import { mongoose } from './mongoose';
import { User } from './models/user';

export class GenerateTestCollection {

   static generate() {
      return Promise.resolve()
         // .then(() => this.dropDatabase())
         .then(() => this.buildIndex())
         .then(() => this.createUsers())
         .catch(err => {
            console.log('CATCH: ', err);
            mongoose.disconnect();
         });
   }

   static dropDatabase() {
      const db = mongoose.connection.db;
      return db.dropDatabase()
         .then(result => console.log('dataBase dropped!', result));
   }

   static dropCollection() {
      console.log('dropCollection');
      const collection = mongoose.connection.collection('users');
      // return new Promise(resolve => collection.drop(resolve));
      return collection.drop();
   }

   static buildIndex() {
      console.log('build index');
      return User.ensureIndexes();
   }

   static createUsers() {
      console.log('createUsers');
      const users = [
         {userName: 'Вася', password: 'supervasya'},
         {userName: 'Петя', password: '123'},
         {userName: 'admin', password: 'thetruehero'}
      ];
      const arrayOfPromises = users.map(userData => {
         const user = new User(userData);
         return user.save();
      });
      return Promise.all(arrayOfPromises);
   }

}