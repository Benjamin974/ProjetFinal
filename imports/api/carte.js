import { Mongo } from 'meteor/mongo';
export const Cartes = new Mongo.Collection('carte');
export const Reserves = new Mongo.Collection('reserves');