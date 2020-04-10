import React from 'react'
import { connect } from 'react-redux'
import baseURL from '../../utils/baseURL'

function Home(props) {
  const getUser = () => {
    console.log(121212, baseURL)
    props.getUser({
      userId: '231',
      userName: 'yuanye'
    })
  }
  return (
    <div className='App'>
      这是首页
      <button name='sfda' onClick={() => getUser()} type='button'>
        测试
      </button>
    </div>
  )
}
const mapStateToProps = (store) => ({
  user: store.user
})
const maoDispatchToProps = (dispatch) => ({
  getUser(useInfo = {}) {
    dispatch({
      type: 'GET_USER',
      payLoad: useInfo
    })
  }
})
export default connect(mapStateToProps, maoDispatchToProps)(Home)
