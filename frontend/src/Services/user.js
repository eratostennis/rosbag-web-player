const LOAD = 'user/LOAD'

const initialState = {
  users: null,
}

export default function reducer(state = initialState, action = {}){
  switch (action.type) {
    case LOAD:
      return {
        users:action.results,
      }
    default:
      return state
  }
}

export function load() {
  // clientはaxiosの付与したクライアントパラメータ
  // 非同期処理をPromise形式で記述できる
  return (dispatch, getState, client) => {
    return client
      .get('https://randomuser.me/api/')
      .then(res => res.data)
      .then(data => {
        const results = data.results
        // dispatchしてreducer呼び出し
        dispatch({ type: LOAD, results })
      })
  }
}
