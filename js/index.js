import { createStore, applyMiddleware } from "redux";
import { State, Action } from "./proto/blackbox_pb";
import { Message} from "google-protobuf"

let initialState = new State()

function reducer(state = initialState, action) {
  switch (action.type) {
    case Action.TypeCase.SEND_MESSAGE:
      console.log('hello');
      state.addMessages(action.sendMessage)
      return state
  }
  return state
}

const protoMiddleware = store => next => action => {
  const isProto = (obj) => { return obj instanceof Message }
  if (isProto(action)) {
    return next({
      ...action.toObject(),
      type: action.getTypeCase()
    })
  } else {
    return next(action)
  }
}

let store = createStore(reducer, applyMiddleware(protoMiddleware))

// later: loadInitialState

export function addStateCallback(fn) {
  store.subscribe(() => fn(store.getState().serializeBinary()))
}

export function handleAction(bytes) {
  store.dispatch(Action.deserializeBinary(bytes))
}

store.subscribe(() => console.log(store.getState()))
