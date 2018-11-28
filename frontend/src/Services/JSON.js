const LOAD = 'json/LOAD'

const initialState = {
  payload: null,
}

export default function reducer(state = initialState, action = {}){
  switch (action.type) {
    case LOAD:
      return {
        payload:action.payload,
      }
    default:
      return state
  }
}

export function load() {
  return (dispatch, getState, client) => {
    return client
      .get('/api/set_rosbag')
      .then(res => res.data)
      .then(data => {
        const payload = data
        dispatch({ type: LOAD, payload })
      })
  }
}

