import React, { createContext } from 'react'
import { getDevsCount } from '../api/info'

const getCount = async () => {
  const res = await getDevsCount()
  return ([
    {
      title: '广播数量',
      value: res.AllCount
    },
    {
      title: '景区人数预估',
      value: '318370'
    },
    {
      title: '故障率',
      value: (res.DisCount / res.AllCount).toFixed(2) * 100 + '%'
    }
  ])
}

// 1. 使用 createContext 创建上下文
const ToggleContext = createContext()

export class ToggleProvider extends React.Component {
  state = {
    counts: [
      {
        title: '广播数量',
        value: 600
      },
      {
        title: '景区人数预估',
        value: '318370'
      },
      {
        title: '故障率',
        value: '20%'
      }
    ],
    allDevices: []
  }
  componentDidMount() {
    this.init()
    setInterval(() => {
      this.init()
    }, 10000)

  }

  init = async() => {
    let [counts] = await Promise.all([getCount()])
    this.setState({
      counts: counts
    })
  }

  render() {
    return (
      <ToggleContext.Provider value={this.state}>
        {this.props.children}
      </ToggleContext.Provider>
    )
  }
}

export const ToggleConsumer = ToggleContext.Consumer
