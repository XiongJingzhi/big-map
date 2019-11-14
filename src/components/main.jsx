/* eslint-disable no-undef */
import React, { useState } from 'react'
import { transform, BD09, GCJ02 } from 'gcoord'
import { getAllDevices, getDevice } from '../api/info'
import './main.css'
import MapNotice from '../assets/icon-map-notice.png'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.appendScript()
    window.init = () => {
      this.createMap(props)
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

  createMap(props) {
    function initMap(center) {

      const map = new AMap.Map('map', {
        zoom: 18,
        layers: [new AMap.TileLayer.RoadNet(), new AMap.TileLayer.Satellite()], 
        resizeEnable: true,
        center: center,
      })
      var canvas = document.createElement('canvas');
      canvas.width = map.getSize().width;
      canvas.height = map.getSize().height;
      var context = canvas.getContext('2d')
      context.fillStyle = 'rgba(13, 29, 61, 0.2)'
      context.fillRect(0, 0, canvas.width, canvas.height)
      var customLayer = new AMap.CanvasLayer({
        canvas: canvas,
        zIndex: 12,
        zooms: [3, 18] // 设置可见级别，[最小级别，最大级别]
      })
      map.add(customLayer)
      map.setFeatures('road')
      return map
    }

    async function getMarkers() {
      const {List} = await getAllDevices()
      function transformGeo(geo) {
        return transform(
          geo,
          BD09,
          GCJ02
        )
      }
      const markers = List.flat().map(item => (
        {
          geo: transformGeo([item.Long, item.Lat]),
          title: item.Addr,
          icon: MapNotice,
          id: item.No
        }
      ))
      return markers
    }

    function renderMarkers(map, markers) {
      function generateMarkers(geo, title, icon, id) {
        var marker = new AMap.Marker({
          map: map,
          position: new AMap.LngLat(...geo),
          icon: icon,
          clickable: true,
          title: title
        })
        marker.on('click', function(e) {
          console.log('click')
          props.getDetail(e, id)
        })
        return marker
      }

      markers.forEach(({geo, title, icon, id}, index) => {
        generateMarkers(geo, title, icon, id)
      })
    }

    function renderWindow(map) {
  
    }


    async function renderMap() {
      const markers = await getMarkers()
      const map = initMap(markers[0]['geo'])
      renderMarkers(map, markers)
      renderWindow(map)
    }

    renderMap()
  }

  render() {
    return (
      <div className="map-container">
        <div id="map" style={{width: '1272px', height: '617px'}}></div>
      </div>
    )
  }
}

function Footer({detail}) {
  const initImages = [
    'http://cdn.bgwiki.cn//mch/20190806155101fjabTesNHPenrGXw.jpg',
    'http://cdn.bgwiki.cn//mch/20190806155101fjabTesNHPenrGXw.jpg',
    'http://cdn.bgwiki.cn//mch/20190806155101fjabTesNHPenrGXw.jpg'
  ]
  const [name, setName] = useState('S123')
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
            <span className="value">{detail.no}</span>
          </div>
          <div className="item">
            <span className="title">工作状态</span>
            <span className="value">{detail.status}</span>
          </div>
          <div className="item">
            <span className="title">设备点位地理信息</span>
            <span className="value">{detail.address}</span>
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
  const [detail, setDetail] = useState({})
  
  async function detailHandler(e, id){
    const {No, Play, Vol, IsConn, Addr, Enable} = await getDevice(id)
    setDetail({
      no: No,
      address: Addr.slice(5),
      content: Play,
      status: !IsConn
                ? '未连接'
                : Enable
                  ? '已启用'
                  : '未启用',
      volumn: Vol
    })
  }
  return (
    <main className='main-main'>
      <Map getDetail={detailHandler} />
      <Footer detail={detail} />
    </main>
  )
}

export default Main;