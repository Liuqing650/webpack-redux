export default {
  state: {
    msg: 'init store...',
  },
  effects: {
    *loadingData(action, {put, delay, select}) {
      yield put({type: 'onChange', payload: {msg: 'loading'}})
      yield delay(1000)
      yield put({type: 'onChange', payload: {msg: 'success'}})
    }
  },
  reducers: {
    onChange(state, action) {
      return {...state, ...action.payload};
    },
  }
}