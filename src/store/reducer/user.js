
import user from '../state/user'

export default function(initState = user, action) {
  const state = initState
  switch (action.type) {
    case 'GET_USER':
      state.userName = action.payLoad.userName
      state.userId = action.payLoad.userId
      break
    default: break
  }
  return state
}
