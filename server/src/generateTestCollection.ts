import { mongoose } from './mongoose';
import { User } from './module/user/user.schema';

export class GenerateTestCollection {

   static generate() {
      return Promise.resolve()
         // .then(() => this.dropDatabase())
         .then(() => this.buildIndex())
         .then(() => this.createUsers())
         .catch(err => {
            console.log('CATCH: ', err);
            mongoose.disconnect();
            return err;
         })
   }

   static dropDatabase() {
      const db = mongoose.connection.db;
      return db.dropDatabase()
         .then(result => console.log('dataBase dropped!', result));
   }

   static buildIndex() {
      return User.ensureIndexes();
   }

   static createUsers() {
      console.log('createUsers');
      const users = [
         {userName: 'Вася', age: '10', password: 'supervasya'},
         {userName: 'Петя', age: '11', password: '123'},
         {userName: 'admin', age: '12', password: 'thetruehero'},
         {userName: 'Николай', age: '13', password: 'ghbdtnckjy'}
      ];
      const arrayOfPromises = users.map(userData => {
         const user = new User(userData);
         return user.save();
      });
      return Promise.all(arrayOfPromises);
   }

}
