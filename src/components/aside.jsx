import React, { useState } from 'react'
import { ToggleConsumer } from './content'
import './aside.css'

function Notice() {
  const initNotices = [
    {
      title: '播报',
      status: '正在播放'
    },
    {
      title: '播报',
      status: '播放完毕'
    },
    {
      title: '播报',
      status: '播放完毕'
    },
  ]
  const [notices, setNotices] = useState(initNotices)
  return (
    <section className="notices">
      <h5>今日播放</h5>
      {
        notices.map((item, i) => (
          <div key={'notice' + i} className="notice-container">
            <span className="notice-title">{item.title}</span>
            <span className="notice-value">{item.status}</span>
          </div>
        ))
      }
    </section>
  )
}

function Count() {
  return (
    <section className="count">
      <ToggleConsumer>
        {
          ({counts}) => (
            counts.map((item, i) => (
              <div key={'notice' + i} className="count-item">
                <div className="count-title">{item.title}</div>
                <div className="count-value">{item.value}</div>
              </div>
            ))
          )
        }
      </ToggleConsumer>
    </section>
  )
}

function Congestion() {
  return (
    <section className="congestion">
      <h5>古城应急广播分布</h5>
      <table>
        <thead>
          <tr>
            <th>街道</th>
            <th>附件设备</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
        <ToggleConsumer>
          {
            ({parts}) => (
              parts.map((item, i) => (
                <tr key={'parts' + i}>
                  <td>{item.title}</td>
                  <td>{item.value + '台'}</td>
                  <td>{item.status}</td>
                </tr>
              ))
            )
          }
        </ToggleConsumer>
        </tbody>
      </table>
    </section>
  )
}

function AsideSection() {
  return (
    <aside className="aside">
      <Notice />
      <Count />
      <Congestion />
    </aside>
  )
}


export default AsideSection