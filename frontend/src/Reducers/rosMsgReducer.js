import { createStore } from 'redux'
import SocketIOClient from '../Services/SocketIOClient'

const SUBSCRIBE = 'rosbagMsg/SUBSCRIBE'
const CONNECT = 'rosbagMsg/CONNECT'
const PLAY = 'rosbagMsg/PLAY'

const initialState = {
  current_timestamp: null,
  current_msg_index: null,
  msg: null,
  sioClient: null,
  rosStatus: 'STOP'
}

export default function reducer(state = initialState, action = {}){
  switch (action.type) {
    case SUBSCRIBE:
      return {
        sioClient:state.sioClient,
        msg:action.msg
      }
    case CONNECT:
      return {sioClient:action.sioClient}
    default:
      return state
  }
}

export function receiveMsg(msg) {
  return (dispatch, getState, client) => {
    dispatch({type: SUBSCRIBE, msg})
  }
}

export function socketIOConnect(callback) {
  const sioClient = {
    pub: new SocketIOClient(callback),
    sub: new SocketIOClient(callback)
  }
  return (dispatch, getState, client) => {
    dispatch({type: CONNECT, sioClient})
  }
}
