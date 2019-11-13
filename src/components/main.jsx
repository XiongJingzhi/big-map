/* eslint-disable no-undef */
import React, { useState } from 'react';
import './main.css'
import MapNotice from '../assets/icon-map-notice.png'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.appendScript()
    window.init = () => {
      this.createMap()
    }
  }

  appendScript() {
    if (document.querySelector('#amap')) {
      return
    }
    const body = document.getElementsByTagName('body')[0]
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    script.src = 
      'https://webapi.amap.com/maps?v=1.4.15&key=e3c5f0e5680290cd9e56a889b7babb01&callback=init'
    script.setAttribute("id", "amap")
    body.appendChild(script)
  }

  createMap() {
    function initMap() {
      const map = new AMap.Map('map', {
        zoom: 18,
        mapStyle: 'amap://styles/blue',
        layers: [new AMap.TileLayer.RoadNet(), new AMap.TileLayer.Satellite()], 
        resizeEnable: true,
        center: [100.236577,26.870854],
      })
      map.setFeatures()
      return map
    }

    function renderMarkers(map) {
      const markers = [
        {
          geo: [100.235045,26.868957],
          title: '玉带桥',
          icon: MapNotice
        },
        {
          geo: [100.234326,26.871397],
          title: '网红街',
          icon: MapNotice
        },
        {
          geo: [100.238553,26.87089],
          title: '雪山书院',
          icon: MapNotice
        },
        {
          geo: [100.233757,26.869263],
          title: '万卷楼',
          icon: MapNotice
        }
      ]
      function generateMarkers(geo, title, icon) {
        var marker = new AMap.Marker({
          position: new AMap.LngLat(...geo),
          offset: new AMap.Pixel(-10, -10),
          icon: icon,
          title: title
        })
        return marker
      }
      const markerList = markers.map(({geo, title, icon}, index) => generateMarkers(geo, title, icon))
      map.add(markerList)
    }

    function renderWindow() {

    }

    function removeLogo() {
      document.querySelector('.amap-logo').remove()
    }

    function renderMap() {
      const map = initMap()
      renderMarkers(map)
      // removeLogo()
    }

    renderMap()
  }

  render() {
    return (
      <div className="map-container">
        <div id="map" style={{width: '1272px', height: '617px'}}>正在加载</div>
      </div>
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
    <footer className="footer">
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
    marginLeft: 40,
    width: 1280,
    color: '#ffffff'
  }
}

export default Main;