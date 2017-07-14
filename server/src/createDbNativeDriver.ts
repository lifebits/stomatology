import { config } from '../config/index';
import { MongoClient } from 'mongodb';

MongoClient.connect(config.get('mongoose:uri'), function(err, db) {
   if (err) {
      console.log('db error connect');
      throw err;
   } else {
      console.log('db connected!');
   }
});
