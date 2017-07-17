import { config } from '../config/index';

import * as mongooseLib from 'mongoose';
import { Mongoose } from 'mongoose';

export const mongoose: Mongoose = mongooseLib.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

mongoose.Promise = global.Promise;
