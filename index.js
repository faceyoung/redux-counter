import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// 计数器组件
class Counter extends Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span> {value} </span>
        <button onClick={onIncreaseClick}> +1 </button>
      </div>
    )
  }
}
Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}



// 重做什么 whatToRedo
const increase = { type: 'increase' }

// 如何重做 howToRedo
function howToRedo(material = { count: 0 }, whatToRedo) {
  const count = material.count
  switch (whatToRedo.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return material
  }
}

// 建仓
const store = createStore(howToRedo)



// 将原料从仓库传给门店
function storeToShop(material) {
  return {
    value: material.count
  }
}

// 将重做从门店传给仓库
function shopToStore(redo) {
  return {
    onIncreaseClick: () => redo(increase)
  }
}

// 链接
const App = connect(
  storeToShop,
  shopToStore
)(Counter)



// 开店
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)