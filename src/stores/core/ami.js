import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as sagaEffects from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

class Ami {
  constructor() {}

  createStore(modules) {
    const reducers = this.generateReducer(modules);
    const store = createStore(reducers, applyMiddleware(sagaMiddleware));
    this.generateSaga(modules);
    return store;
  }

  start = (module) => {
    return this.createStore(module);
  }

  generateReducer(modules) {
    const reducers = {};
    function getReducer(item) {
      return function(state = item.state, action) {
        const type = action.type;
        if (item.reducers[type]) {
          return item.reducers[type](state, action);
        }
        return {...state};
      };
    }
    for (const name in modules) {
      const item = modules[name];
      reducers[name] = getReducer(item);
    }
    return combineReducers(reducers);
  }

  generateSaga(modules) {
    for (const name in modules) {
      const item = modules[name];
      if (item.effects) {
        sagaMiddleware.run(this.getSaga(item.effects))
      }
    }
  }

  getSaga(effects) {
    const self = this;
    return function*() {
      for (const key in effects) {
        if (Object.prototype.hasOwnProperty.call(effects, key)) {
          const effect = self.handleEffects(effects[key]);
          yield sagaEffects.fork(function*() {
            yield sagaEffects.takeEvery(key, effect);
          });
        }
      }
    }
  }

  handleEffects(effect) {
    function* asyncEffect(...args) {
      yield effect(...args.concat({...sagaEffects}));
    }
    return asyncEffect;
  }
};

export default new Ami();
