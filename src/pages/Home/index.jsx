import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import baseURL from '../../utils/baseURL'
import { Button } from 'antd-mobile';

function Home(props) {
  console.log(_.join(['a', 'b', 'c', '-']))
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
      <Button type="primary">primary</Button>
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
