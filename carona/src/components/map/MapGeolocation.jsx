import { GeolocateControl, Marker, Layer, Source, FullscreenControl, NavigationControl } from 'react-map-gl'
import Map from 'react-map-gl';
import { useEffect, useState } from 'react';
import styles from './MapGeolocation.module.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import apiMap from '../../ApiMap';
import { FaCar } from 'react-icons/fa';

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function MapGeolocation({ latitudePartida, longitudePartida, latitudeDestino, longitudeDestino, onChangeRoute }) {

    const [view, setView] = useState({
        longitude: -46.5831203,
        latitude: -23.6323164,
        zoom: 9
    })

    const [coords, setCoords] = useState([])

    const [distancia, setDistancia] = useState()
    const [duracao, setDuracao] = useState({
        horas: '',
        minutos: ''
    })

    const handleDistancia = (distancia) => {
        setDistancia((distancia / 1000).toFixed(1))
    }
    
    const handleDuracao = (duracao) => {
        let duracaoEmMinutos = duracao / 60

        setDuracao({
            horas: Math.floor(duracaoEmMinutos / 60),
            minutos: (duracaoEmMinutos % 60).toFixed(0)
        })
    }

    useEffect(() => {
        if (latitudePartida !== '' && longitudePartida !== '' && latitudeDestino !== '' && longitudeDestino !== '') {
            getRoutes()
        }
    }, [latitudePartida, longitudePartida, latitudeDestino, longitudeDestino])

    const getRoutes = async () => {
        try {
            const response = await apiMap.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${longitudePartida},${latitudePartida};${longitudeDestino},${latitudeDestino}?steps=false&geometries=geojson&language=pt&access_token=${TOKEN}`)

            const data = response.data.routes[0]

            setCoords(data.geometry.coordinates)
            handleDistancia(data.distance)
            handleDuracao(data.duration)
        } catch (error) {
            console.log(error);
        }
    }

    // geodata
    const geojson = {
        "type": "FeatureCollection",
        "features": [{
            "type": "feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [...coords]
            }
        }]
    }

    // route styles
    const lineStyle = {
        id: "roadLayer",
        type: 'line',
        layout: {
            "line-join": "round",
            "line-cap": "round",
        },
        paint: {
            "line-color": "#74aae8",
            "line-width": 7,
            "line-opacity": 1,
        }
    }

    return (
        <div className={styles['mapa']}>
            <Map
                initialViewState={view}
                style={{ width: '100%', height: '100%', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', border: '1px solid #CCCCCC' }}
                mapStyle='mapbox://styles/gustavomeds/clxhvcqpk012a01qm904o8ear'
                mapboxAccessToken={TOKEN}
                onMove={evt => setView(evt.viewState)}
            >
                {
                    coords.length > 0 &&
                    <Source id='routeSource' type='geojson' data={geojson}>
                        <Layer {...lineStyle} />
                    </Source>
                }

                {
                    (latitudePartida !== '' && longitudePartida !== '') &&
                    <Marker latitude={latitudePartida} longitude={longitudePartida} color='#173e6d' />
                }

                {
                    (latitudeDestino !== '' && longitudeDestino !== '') &&
                    <Marker latitude={latitudeDestino} longitude={longitudeDestino} color='#EC3939' />
                }

                <GeolocateControl />
                <FullscreenControl />
                <NavigationControl />
            </Map>

            {
                coords.length > 0 &&
                <div className={styles["duracao-distancia"]}>
                    <div className={styles["icon-carro"]}>
                        <div className={styles["icon"]}>
                            <FaCar />
                        </div>
                        <span>Trajeto</span>
                    </div>

                    <div className={styles["km-horas"]}>
                        <p><span>{duracao.horas}</span>h <span>{duracao.minutos}</span>min</p>
                        <p><span>{distancia}</span> km</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default MapGeolocation