/* eslint-disable no-undef */
import React, { useState } from 'react'
import { transform, BD09, GCJ02 } from 'gcoord'
import { getAllDevices, getDevice, getDeviceSearch } from '../api/info'
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
      'https://webapi.amap.com/maps?v=1.4.15&key=e3c5f0e5680290cd9e56a889b7babb01&callback=init&plugin=AMap.DistrictSearch'
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
      map.setFeatures('road')
      AMap.plugin(["AMap.ControlBar"], function () {
        var bar = new AMap.ControlBar()
        map.addControl(bar)
      })

      // 添加丽江背景
      var opts = {
        subdistrict: 0,
        extensions: 'all',
        level: 'district'
      }
      var district = new AMap.DistrictSearch(opts)
      district.search('丽江', function(status, result) {
        var polygons = []
        var bounds = result.districtList[0].boundaries;
        if (bounds) {
          for (var i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            var polygon = new AMap.Polygon({
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.4,
              fillColor: '#80d8ff',
              strokeColor: '#0091ea'
            })
            polygons.push(polygon);
          }
        }
        map.add(polygons)
      })
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
          renderWindow(map, title.slice(8), new AMap.LngLat(...geo))
          props.getDetail(e, id)
        })
        return marker
      }

      markers.forEach(({geo, title, icon, id}, index) => {
        generateMarkers(geo, title, icon, id)
      })
    }

    function renderWindow(map, address, position) {
      const element = `
        <div class="custom-info">${address}</div>
      `
      var infoWindow = new AMap.InfoWindow({
        content: element,
        offset: new AMap.Pixel(20, -30)
      })
      infoWindow.open(map, position)
    }


    async function renderMap() {
      const markers = await getMarkers()
      const map = initMap(markers[0]['geo'])
      renderMarkers(map, markers)
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

function Footer({detail, searchDetail, searchList, selectSearch, qeury}) {
  const initImages = [
    require('../assets/device01.png'),
    require('../assets/device02.png'),
    require('../assets/device03.png')
  ]
  const iconNotice = require("../assets/icon-notice.png")
  const [images] = useState(initImages)
  const volumnValue = {
    height: detail.volumn
  }
  return (
    <footer className="footer">
      <div className="left">
        <div className="top">
          <h5 className="title">设备信息</h5>
          <div className="search-input">
            <input type="text" placeholder="模糊查询" onChange={searchDetail} value={qeury}/>
            <ul className="search-box">
              {
                searchList && searchList.map(item => <li key={item.No} className="search-item" onClick={(e) => selectSearch(e, item)}>{item.No}</li>)
              }
            </ul>
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
        <div className="group-title">
          <div className="group-name">—所属分组—</div>
          <div className="grop-vlaue">{detail.grpName}</div>
        </div>
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
        <div className="volumn">
          <img src={iconNotice} alt="音响" />
          <div className="volumn-container">
            <div className="volumn-value" style={volumnValue}></div>
          </div>
        <div className="volumn-num">{detail.volumn}</div>
        </div>
      </div>
    </footer>
  )
}

function Main() {
  const [detail, setDetail] = useState({})
  const [searchList, setSearchList] = useState([])

  async function detailHandler(e, id){
    const {No, Play, Vol, IsConn, Addr, Enable, GrpName} = await getDevice(id)
    setDetail({
      no: No,
      address: Addr.slice(5),
      content: Play.slice(0, -4),
      status: !IsConn
                ? '未连接'
                : Enable
                  ? '已启用'
                  : '未启用',
      volumn: Vol,
      grpName: GrpName
    })
  }

  async function searchDetail(event) {
    const value = event.target.value
    const result = await getDeviceSearch(value)
    console.log('result', result, result.length)
    
    if (result.length > 0) {
      setSearchList(result)
    }
  }

  function selectSearch(e, item) {
    setSearchList([])
    setDetail(item)
  }

  return (
    <main className='main-main'>
      <Map getDetail={detailHandler} />
      <Footer detail={detail} searchList={searchList} searchDetail={searchDetail} selectSearch={selectSearch} />
    </main>
  )
}

export default Main;