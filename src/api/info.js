import requset from '../utils/request'

export function getDevsCount() {
  return requset({
    method: 'get',
    url: '/GetDevsCount'
  })
}

export function getAllDevices(page = 1, size = 10000) {
  return requset({
    method: 'get',
    url: '/AllDevices',
    params: {
      page: page,
      size: size
    }
  })
}

export function getGroups() {
  return requset({
    method: 'get',
    url: '/GetGroups'
  })
}

export function getDevice(no) {
  return requset({
    method: 'get',
    url: '/GetDevice',
    params: {
      no: no
    }
  })
}

export function getDeviceSearch(query) {
  return requset({
    method: 'get',
    url: '/QueryDevs',
    params: {
      qy: query
    }
  })
}
