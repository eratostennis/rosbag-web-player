import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import user from '../Services/user'
import rosMsgReducer from './rosMsgReducer'
import json from '../Services/JSON'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  user,
  rosMsgReducer,
  json
})
