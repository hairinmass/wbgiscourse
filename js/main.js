let str = `             河北省辛集市,概地处 N 38° E 115°',冀中平原石家庄东部,是我国著名的皮毛集散地之一,素以“河北一集”享誉华北大地。面积951平方千米 人口约60万,位于石德铁路和沧石新保公路交汇处；
            辛集属暖温带大陆性季风气候,四季分明且光照充足雨热适中。农业生产条件优越特产大鸭梨,以及小麦玉米棉花花生等作物；
            辛集天然气石油地热资源丰富,是我国最大钡盐出口油毡产地,工业有纺织化工机械皮毛加工,又是全国优质棉生产出口基地,王口花炮远销欧美东南亚港澳。
            辛集历史悠久早在西汉已置县,唐朝中叶定名束鹿县历代袭用,1986年撤县设市由石家庄代管,素有“诗洋、画海、金束鹿”美誉。`
        let text = document.querySelector('.text')
        let words = str.split("")

let write = () => {
    if(words.length > 0) {
        let span = document.createElement('span')
        let del = words.shift()
        let opc = 0
        span.innerText = del
        text.appendChild(span)
        let fade = setInterval(() => {
            opc++
            span.style.opacity = opc / 10
            span.style.color = 'transparent'
            span.style.textShadow = '0 0 5px #57606f, 0 0 10px #57606f, 0 0 4px #57606f, 0 0 12px #ffa502'
            span.style.filter = `blur(${(10 / opc-1)})`
            if(opc >= 10) {
                clearInterval(fade)
                span.style.color = '#2f3542'
            }
        }, 50)
    }
}
setInterval(write, 50)
        
mapboxgl.accessToken = 'pk.eyJ1IjoieW91bmdtYXBwZXI2IiwiYSI6ImNsbmlhZWhvYzBsb2Iya21qamF2czNhODEifQ.jm_IU7uBxmc6E2QvyNDLyg';
    
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [0, 0],
            zoom: 1,
            pitch: 0,
            projection: 'globe'
        });

        map.on('style.load', () => {
            map.setFog({
                color: 'rgb(186, 210, 235)', 
                'high-color': 'rgb(36, 92, 223)', 
                'horizon-blend': 0.02,
                'space-color': 'rgb(11, 11, 25)', 
                'star-intensity': 0.6 
            });

            map.addSource('mapbox-dem', {
                'type': 'raster-dem',
                'url': 'mapbox://mapbox.terrain-rgb'
            });

            map.setTerrain({
                'source': 'mapbox-dem',
                'exaggeration': 1.5
            });
        });

        document.getElementById('fly').addEventListener('click', () => {
            map.flyTo({
                center: [115.21626, 37.94079],
                zoom: 12.5,
                duration: 12000, 
                essential: true 
            });
        });
        document.getElementById('reset').addEventListener('click', () => {
            map.flyTo({
                zoom: 1,
                center: [0, 0],
                essential: true,
                duration: 12000,
                pitch: 0,
                bearing: 0
            });
        });

        const layerList = document.getElementById('menu');
        const inputs = layerList.getElementsByTagName('input');
        
        for (const input of inputs) {
            input.onclick = (layer) => {
                const layerId = layer.target.id;
                switch(layerId) {
                    case 'treasure':
                        map.setStyle('mapbox://styles/youngmapper6/clleiqok600hc01rd6ho03a6p');
                        break;
                    case 'vintage':
                        map.setStyle('mapbox://styles/youngmapper6/clnid3pkt01m401r7h3cufktq');
                        break;
                    case 'decimal':
                        map.setStyle('mapbox://styles/youngmapper6/clnid4mxe01m501r709g8d02e');
                        break;
                    case 'northstar':
                        map.setStyle('mapbox://styles/youngmapper6/clnid56o6000l01oi7biu9p4b');
                        break;
                    default:
                        map.setStyle('mapbox://styles/mapbox/' + layerId);
                }
            };
        }

        const secondsPerRevolution = 120;
        const maxSpinZoom = 5;
        const slowSpinZoom = 3;

        let userInteracting = false;
        let spinEnabled = true;

        function spinGlobe() {
            const zoom = map.getZoom();
            if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
                let distancePerSecond = 360 / secondsPerRevolution;
                if (zoom > slowSpinZoom) {
                    const zoomDif =
                    (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                    distancePerSecond *= zoomDif;
                }
                const center = map.getCenter();
                center.lng -= distancePerSecond;
                map.easeTo({ center, duration: 1000, easing: (n) => n });
            }
        }

        map.on('mousedown', () => {
            userInteracting = true;
        });

        map.on('mouseup', () => {
            userInteracting = false;
            spinGlobe();
        });

        map.on('dragend', () => {
            userInteracting = false;
            spinGlobe();
        });
        map.on('pitchend', () => {
            userInteracting = false;
            spinGlobe();
        });
        map.on('rotateend', () => {
            userInteracting = false;
            spinGlobe();
        });

        map.on('moveend', () => {
            spinGlobe();
        });

        spinGlobe();

        map.on('click', function(e) {
            map.flyTo({
                center: [e.lngLat.lng, e.lngLat.lat],
                zoom: 8, 
                // pitch: 45,
                bearing: 0, 
                duration: 2000,
                essential: true, 
            });
        });

        // let item = [0, 1, 2];
        // let i = item[0];
        // document.body.onkeydown = function(e) {
        //     let key = e.keyCode;
        //     let title = document.getElementById('title');
        //     let message = document.getElementById('message');
        //     let address = document.getElementById('address');
            
        //     // let isZoomed = false;
        //     // let mapDiv = document.getElementById('map');

        //     if (key == 13) {
        //         switch(i) {
        //             case 0:
        //                 title.style.display = 'none';
        //                 message.style.display = 'block';
        //                 i = item[1];
        //                 break;
        //             case 1:
        //                 message.style.display = 'none';
        //                 address.style.display = 'block';
        //                 i = item[2];
        //                 break;
        //             case 2:
        //                 address.style.display = 'none';
        //                 title.style.display = 'block';
        //                 i = item[0];
        //                 break;
        //         }
        //     } else if (key == 90) {
        //         // if (!isZoomed) {
        //         //     mapDiv.style.width = '900px';
        //         //     mapDiv.style.height = '700px';
        //         //     mapDiv.style.zIndex = 9999;
        //         //     isZoomed = true;
        //         // } else {
        //         //     mapDiv.style.width = '600px';
        //         //     mapDiv.style.height = '600px';
        //         //     isZoomed = false;
        //         // }
        //     }
        // };