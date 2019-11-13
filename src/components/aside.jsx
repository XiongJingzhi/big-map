import React, { useState } from 'react'
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
  const initCounts = [
    {
      title: '广播数量',
      value: '600'
    },
    {
      title: '景区人数预估',
      value: '318370'
    },
    {
      title: '故障率',
      value: '20%'
    }
  ]
  const [counts, setCounts] = useState(initCounts)

  return (
    <section className="count">
      {
        counts.map((item, i) => (
          <div key={'notice' + i} className="count-item">
            <div className="count-title">{item.title}</div>
            <div className="count-value">{item.value}</div>
          </div>
        ))
      }
    </section>
  )
}

function Congestion() {
  const initCounts = [
    {
      title: '四方街',
      value: '16',
      status: '疏散'
    },
    {
      title: '酒吧街',
      value: '40',
      status: '疏散中'
    },
    {
      title: '东大街',
      value: '16',
      status: '疏散'
    },
    {
      title: '现文街',
      value: '26',
      status: '疏散'
    },
    {
      title: '七一街',
      value: '16',
      status: '疏散'
    },
    {
      title: '五一街',
      value: '16',
      status: '疏散'
    }
  ]
  const [counts, setCounts] = useState(initCounts)

  return (
    <section className="congestion">
      <h5>景区拥堵情况</h5>
      <table>
        <thead>
          <tr>
            <th>街道</th>
            <th>附件设备</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {
            counts.map((item, i) => (
              <tr key={'notice' + i}>
                <td>{item.title}</td>
                <td>{item.value + '台'}</td>
                <td>{item.status}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  )
}

function AsideSection() {
  return (
    <aside style={styles.aside} className="aside">
      <Notice />
      <Count />
      <Congestion />
    </aside>
  )
}

const styles = {
  aside: {
    float: 'left',
    marginLeft: 30,
    width: 530,
    overflow: 'hidden'
  }
}


export default AsideSection