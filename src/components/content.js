import React, { createContext } from 'react'
import { getDevsCount, getAllDevices } from '../api/info'
import  { groupBy } from 'lodash'

const getCount = async () => {
  const res = await getDevsCount()
  return ([
    {
      title: '广播数量',
      value: res.AllCount
    },
    {
      title: '广播受众范围',
      value: 964 + Number((Math.random() * 100000).toFixed(0))
    },
    {
      title: '今日播放时长',
      value: 300 + Number((Math.random() * 400).toFixed(0))
    }
  ])
}

const getDevices = async () =>  {
  const {List} = await getAllDevices()
  const all =  List.flat()
  const parts = groupBy(all, 'GrpName')
  const keys = Object.keys(parts).map(item =>  item.slice(0, 3))
  const res = {}
  for (const key in parts) {
    const element = parts[key]
    const name = key.slice(0, 3)
    if (keys.includes(name)) {
      res[name] ? res[name].push(...element) : res[name] = element
    }
  }
  return {
    devices: all,
    parts: Object.keys(res).map(item => ({
      title: item,
      value: res[item].length,
      status: (res[item].map(i =>  i.IsConn).length / res[item].length) > 0.7 ? '正常' : '异常'
    }))
  }
}

// 1. 使用 createContext 创建上下文
const ToggleContext = createContext()

export class ToggleProvider extends React.Component {
  state = {
    counts: [
      {
        title: '广播数量',
        value: 0
      },
      {
        title: '广播受众范围',
        value: '108370'
      },
      {
        title: '今日播放时长',
        value: '0'
      }
    ],
    parts: [],
    devices: []
  }
  componentDidMount() {
    setTimeout(() => {
      this.init()
    }, 1000)
    setInterval(() => {
      this.init()
    }, 2000)

  }

  init = async () => {
    let [counts, devices] = await Promise.all([getCount(), getDevices()])
    this.setState({
      counts: counts,
      parts: devices.parts,
      devices: devices.devices
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
