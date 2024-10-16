import styles from './Home.module.css'
import img from '../../../utils/assets/home illustration.svg'
import CardViagem from '../procurar_carona/card_viagem/CardViagem'
import Slider from '../../layout/slider/Slider'
import InfoUsers from '../../layout/info_users/InfoUsuarios'
import InfoSistema from '../../layout/info_sistema/InfoSistema'
import Footer from '../../layout/footer/Footer'
import Navbar from '../../layout/navbar/Navbar'
import SearchGeocode from '../../map/search_geocode/SearchGeocode'
import { FaArrowRightLong } from 'react-icons/fa6'
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../../Api'
import imgUser from '../../../utils/assets/user-image.png'
import { IoLocationSharp } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";


function Home() {
    const [viagemAPesquisar, setViagemAPesquisar] = useState({
        latitudePartida: '',
        longitudePartida: '',
        latitudeDestino: '',
        longitudeDestino: '',
        diaViagem: '',
    });

    const [viagensEncontradas, setViagensEncontradas] = useState([]);

    const handleSubmitViagem = async () => {
        console.log("Viagem a pesquisar: " + JSON.stringify(viagemAPesquisar));

        try {
            const response = await api.post('/viagem/buscar-viagens', viagemAPesquisar);
            if (response.data.length > 0) {
                setViagensEncontradas(response.data);
                toast.success('Viagens encontradas com sucesso!');
            } else {
                setViagensEncontradas([]);
                toast.info('Nenhuma viagem encontrada.');
            }

            console.log("DEU RESULTADO: " + JSON.stringify(response.data));
            console.log(response.data);

            const viagensLimitadas = []

            for (let i = 0; i < 2; i++) {
                viagensLimitadas.push(response.data[i])
            }

            setViagensEncontradas(viagensLimitadas);
        } catch (error) {
            console.log(error);
            toast.error('Erro ao buscar viagens');
        }
    }

    return (
        <div className={styles["container"]}>
            <Navbar />

            <div className={styles["imagem"]}>
                <img src={img} alt="imagem Home" />
            </div>

            <div className={styles["search-bar"]}>
                <SearchGeocode
                    placeholder='Partida'
                    startIcon={<MdMyLocation />}
                    name='cidadeOrigem'
                    className={styles["box-input"]}
                    onClickEvent={(place) => setViagemAPesquisar({
                        ...viagemAPesquisar,
                        latitudePartida: place.geometry.coordinates[1],
                        longitudePartida: place.geometry.coordinates[0]
                    })}
                />

                <FaArrowRightLong className={styles["arrow"]} />

                <SearchGeocode
                    placeholder='Chegada'
                    startIcon={<IoLocationSharp />}
                    name='cidadeDestino'
                    className={styles["box-input"]}
                    onClickEvent={(place) => setViagemAPesquisar({
                        ...viagemAPesquisar,
                        latitudeDestino: place.geometry.coordinates[1], 
                        longitudeDestino: place.geometry.coordinates[0] 
                    })}
                />

                <div className={styles["box-input-date"]}>
                    <FaCalendarAlt />
                    <input type="date" name="diaViagem" className={styles["inputDate"]} id="dateId" onChange={(e) => setViagemAPesquisar({
                        ...viagemAPesquisar,
                        diaViagem: e.target.value
                    })} />
                </div>

                <button
                    className={styles["search-button"]}
                    onClick={handleSubmitViagem}
                >
                    Ver caronas
                </button>
            </div>
            {
                viagensEncontradas.length > 0 &&

                <div className={styles["viagens"]}>
                    {
                        viagensEncontradas.map((viagem) => (
                            <CardViagem
                                key={viagem.idViagem}
                                nomeUser={viagem.nomeMotorista}
                                notaUser={viagem.quantidadeEstrelas}
                                preco={viagem.valor}
                                fotoUser={viagem.foto ? viagem.foto : imgUser}
                                horarioPartida={viagem.inicioViagem}
                                horarioChegada={viagem.fimViagem}
                                distanciaPartida={viagem.distanciaPontoPartidaViagem}
                                distanciaDestino={viagem.distanciaPontoDestinoViagem}
                            />
                        ))
                    }
                </div>

            }

            <Slider />
            <InfoUsers />
            <InfoSistema />
            <Footer />
        </div>
    )
}

export default Home