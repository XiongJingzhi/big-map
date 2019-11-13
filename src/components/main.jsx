import React, { useState } from 'react';
import './main.css'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.appendScript('maps', 'e3c5f0e5680290cd9e56a889b7babb01', '1.3.2', 'init')
    window.init = () => {
      this.map = this.createMap()
    }
  }

  appendScript(type, key, version, event) {
    if (document.querySelector(`#${type}`)) {
      return
    }
    const body = document.getElementsByTagName('body')[0]
    const script = document.createElement('script')
    script.src = `https://webapi.amap.com/${type}?key=${key}&v=${version}&callback=${event}`
    script.setAttribute("id", type)
    body.appendChild(script)
  }

  createMap() {
    // eslint-disable-next-line no-undef
    const map = new AMap.Map('map', {
      mapStyle: 'amap://styles/normal',
      zoom: 16,
      resizeEnable: true,
      center: [100.236577,26.870854]
    })
    document.querySelector('.amap-logo').remove()
    return map
  }

  render() {
    return (
      <div id="map" style={{width: '1280px', height: '623px'}}>正在加载</div>
    )
  }
}

function Footer() {
  const initDetail = {
    id: 12321321,
    geo: '七一街',
    status: '工作状态',
    content: '疏松通知'
  }
  const initImages = [
    'http://cdn.bgwiki.cn//mch/20190806155101fjabTesNHPenrGXw.jpg',
    'http://cdn.bgwiki.cn//mch/20190806155101fjabTesNHPenrGXw.jpg',
    'http://cdn.bgwiki.cn//mch/20190806155101fjabTesNHPenrGXw.jpg'
  ]
  const [name, setName] = useState('S123')
  const [detail, setDetail] = useState(initDetail)
  const [images, setImages] = useState(initImages)
  return (
    <footer style={styles.footer} className="footer">
      <div className="left">
        <div className="top">
          <h5 className="title">设备信息</h5>
          <div className="search-input">
            <span>{name}</span>
            <input type="text" placeholder="模糊查询"/>
          </div> 
        </div>
        <div className="image-container">
          {
            images.map((item, i) => (
              <img src={item} key={'image' + i} alt="景区图片" />
            ))
          }
        </div>
      </div>
      <div className="group">
        <div className="group-title">所属分组</div>
        <div className="group-container">
          <div className="item">
            <span className="title">设备编号</span>
            <span className="value">{detail.id}</span>
          </div>
          <div className="item">
            <span className="title">工作状态</span>
            <span className="value">{detail.status}</span>
          </div>
          <div className="item">
            <span className="title">设备点位地理信息</span>
            <span className="value">{detail.geo}</span>
          </div>
          <div className="item">
            <span className="title">正在播放内容</span>
            <span className="value">{detail.content}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Main() {
  return (
    <main style={styles.main}>
      <Map />
      <Footer />
    </main>
  )
}

const styles = {
  main: {
    float: 'left',
    width: 1280,
    overflow: 'hidden'
  }
}

export default Main;