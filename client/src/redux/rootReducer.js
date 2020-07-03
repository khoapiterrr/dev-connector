import { combineReducers } from 'redux';
import alerts from './Alert/AlertReduce';
import auth from './Auth/AuthReduce';
import profile from './profile/ProfileReduce';

export default combineReducers({ alerts, auth, profile });
