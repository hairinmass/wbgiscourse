mapboxgl.accessToken = 'pk.eyJ1IjoieW91bmdtYXBwZXI2IiwiYSI6ImNsazU3ZG9wYTBtYzEzbHMxNG1qbXp3amgifQ.g4S6_RMZeGK1OOhct6KiYQ';
    
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/youngmapper6/clleiqok600hc01rd6ho03a6p',
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
                center: [115.20626, 37.94079],
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
                if(layer.target.id === 'treasure') {
                    map.setStyle('mapbox://styles/youngmapper6/clleiqok600hc01rd6ho03a6p');                
                } else {
                    map.setStyle('mapbox://styles/mapbox/' + layerId);                
                };
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

        let item = [0, 1, 2];
        let i = item[0];
        document.body.onkeydown = function(e) {
            let key = e.keyCode;
            let title = document.getElementById('title');
            let message = document.getElementById('message');
            let address = document.getElementById('address');
            
            let isZoomed = false;
            let mapDiv = document.getElementById('map');

            if (key == 13) {
                switch(i) {
                    case 0:
                        title.style.display = 'none';
                        message.style.display = 'block';
                        i = item[1];
                        break;
                    case 1:
                        message.style.display = 'none';
                        address.style.display = 'block';
                        i = item[2];
                        break;
                    case 2:
                        address.style.display = 'none';
                        title.style.display = 'block';
                        i = item[0];
                        break;
                }
            } else if (key == 90) {
                // if (!isZoomed) {
                //     mapDiv.style.width = '900px';
                //     mapDiv.style.height = '700px';
                //     mapDiv.style.zIndex = 9999;
                //     isZoomed = true;
                // } else {
                //     mapDiv.style.width = '600px';
                //     mapDiv.style.height = '600px';
                //     isZoomed = false;
                // }
            }
        };