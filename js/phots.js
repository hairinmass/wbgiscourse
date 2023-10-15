let map = new BMapGL.Map('map', {
    mapType: BMAP_EARTH_MAP
})

let ptInit = new BMapGL.Point(0, 0)
let ptAfter = new BMapGL.Point(115.23056, 37.93679)
let geocoder = new BMapGL.Geocoder()
let myDis = new BMapGLLib.DistanceTool(map)
let key = 'f8a2dea0b048486bb301d78cecd1702a'

map.centerAndZoom(ptInit, 3)

map.enableScrollWheelZoom(true)

var scaleCtrl = new BMapGL.ScaleControl()
map.addControl(scaleCtrl)
var zoomCtrl = new BMapGL.ZoomControl()
map.addControl(zoomCtrl)

map.addEventListener('tilesloaded',setTimeout(() => {
        map.flyTo(ptAfter, 14.5)
    }, 2500)
)

map.addEventListener('click',(e) => {
    geocoder.getLocation(e.latlng, (res) => {
        let r = res.content.address_detail
        let cn = r.city
        let r_des = res.content.poi_desc
        $('#res').html(
`${r.province}, ${r.city}, ${r.district}, ${r.adcode}, ${r_des}`
        )
        fetch(
            `https://geoapi.qweather.com/v2/city/lookup?location=${cn}&key=${key}` 
        )
        .then(res => res.json())
        .then(data => {
            let cid = data.location[0].id
            return fetch(
                `https://devapi.qweather.com/v7/weather/now?key=${key}&location=${cid}`           
            )
        })
        .then(res => res.json())
        .then(data => {
            $('#wea_res').html(
                `${data.now.text}  ${data.now.temp}℃`
            )
        })
    })
})

let points = {
    "huxi": {
        "loc": [115.2093599220773, 37.94655201619696],
        "title": '润泽湖西',
        "iconUrl": '../0911rsc/like.png'
    },
    "hudong": {
        "loc": [115.21113609714641, 37.94615093925929],
        "title": '润泽湖东',
        "iconUrl": '../0911rsc/lip.png'
    },
    "yiji": {
        "loc": [115.21895931417555, 37.9259334803372],
        "title": '河北一集市场',
        "iconUrl": '../0911rsc/parad.png'
    },
    "hudongji": {
        "loc": [115.21365294137544, 37.94910750674529],
        "title": '清河湾',
        "iconUrl": '../0911rsc/smile.png'
    },
    "shuluyuan":{
        "loc": [115.24015932421102, 37.93367520498837],
        "title": '束鹿园球场',
        "iconUrl": '../0911rsc/wink.png'
    },
    "yizhong": {
        "loc": [115.2422594867655, 37.949974077006594],
        "title": '辛集市第一中学',
        "iconUrl": '../0911rsc/cool.png'
    }
    
}

let initIcons = (() => {
    for(let key in points) {
        let coor = points[key].loc
        let point = new BMapGL.Point(coor[0], coor[1]) 
        let iconImage = new BMapGL.Icon(points[key].iconUrl, {height: 32,width: 32})
        let marker = new BMapGL.Marker(point, {
            icon: iconImage,
            title: points[key].title
        })
        map.addOverlay(marker)

        marker.addEventListener('click', (e) => {
            geocoder.getLocation(e.latLng, (res) => {
                let r = res.content.address_detail
                let r_des = res.content.poi_desc
                $('#res').text(
        `${r.province}, ${r.city}, ${r.district}, ${r.adcode}, ${r_des}`
                )
            })

            setTimeout(() => {
                window.open(`../third_pages/${key}.html`, '_blank')
            }, 1500)
        })
    }
})
initIcons()

$('#cs').click(() => {
    map.setMapType(
        map.getMapType() === BMAP_EARTH_MAP ? BMAP_NORMAL_MAP : BMAP_EARTH_MAP
    )
    initIcons()
})

let f = true
let driving = new BMapGL.DrivingRouteLine(map, { 
    renderOptions: { 
        map,
        autoViewport: true,
        enableDragging: true,
    }
})
let way = new BMapGL.Point(115.23056, 37.93679)
let start = new BMapGL.Point(115.20895931417555, 37.9259334803372)
let end = new BMapGL.Point(115.2522594867655, 37.949974077006594)
$('#nav').click(() => {
    if(f) {
        driving.search(start, end, {
            waypoints: [way]
        })
        driving.enableAutoViewport()
        f = !f
    } else {
        driving.hideRoute()
        f = !f
    }
})

$('#mea').click(() => {
    myDis.open()
})


