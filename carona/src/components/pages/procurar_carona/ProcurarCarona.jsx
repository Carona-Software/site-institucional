import styles from './ProcurarCarona.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../layout/sidebar/Sidebar";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuCircleDashed } from "react-icons/lu";
import { FaCalendarDays } from "react-icons/fa6";
import { FaDotCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from 'axios';
import AnimacaoEstrada from '../../layout/animacao_estrada/AnimacaoEstrada';
import SearchGeocode from '../../map/search_geocode/SearchGeocode';
import CardViagem from './card_viagem/CardViagem';
import notFound from '../../../utils/assets/image-not-found-viagem.svg';
import { toast } from "react-toastify";
import imgUser from '../../../utils/assets/user-image.png'


function ProcurarCarona() {
    let local = useLocation();
    const navigate = useNavigate();

    // const generoUser = localStorage.getItem('generoUser')
    const generoUser = "FEMININO";

    const [viagemAPesquisar, setViagemAPesquisar] = useState({
        latitudePartida: '',
        longitudePartida: '',
        latitudeDestino: '',
        longitudeDestino: '',
        diaViagem: '',
        soMulheres: false
    });

    const [viagensEncontradas, setViagensEncontradas] = useState([
        {
            idViagem: 1,
            nomeMotorista: "Gustavo",
            quantidadeEstrelas: 5,
            valor: 30,
            inicioViagem: "17:00",
            fimViagem: "19:00",
        },
        {
            idViagem: 1,
            nomeMotorista: "Gustavo",
            quantidadeEstrelas: 5,
            valor: 30,
            inicioViagem: "17:00",
            fimViagem: "19:00",
        }
    ]);

    const handleCardClick = (viagemId) => {
        console.log("Valor do id " + viagemId)
        navigate(`/viagens/detalhes/${viagemId}`);
    };

    const handleSubmitViagem = async () => {
        console.log("Viagem a pesquisar: " + JSON.stringify(viagemAPesquisar));

        try {
            const response = await axios.post('http://localhost:8080/viagem/buscar-viagens', viagemAPesquisar);
            if (response.data.length > 0) {
                setViagensEncontradas(response.data);
                toast.success('Viagens encontradas com sucesso!');
            } else {
                setViagensEncontradas([]);
                toast.info('Nenhuma viagem encontrada.');
            }

            console.log("ESSE FDP DO CARALHO DEU RESULTADO" + JSON.stringify(response.data));
            console.log(response.data);
            setViagensEncontradas(response.data);
        } catch (error) {
            console.log(error);
            toast.error('Erro ao buscar viagens');
        }
    }

    return (
        <>
            <Sidebar currentPageName={local.pathname} />

            <AnimacaoEstrada />

            <div className={styles["main"]}>
                <div className={styles["container"]}>
                    <div className={styles["search-bar"]}>
                        <SearchGeocode
                            placeholder='Partida'
                            startIcon={<LuCircleDashed />}
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
                            startIcon={<FaDotCircle />}
                            name='cidadeDestino'
                            className={styles["box-input"]}
                            onClickEvent={(place) => setViagemAPesquisar({
                                ...viagemAPesquisar,
                                latitudeDestino: place.geometry.coordinates[1], // Correção de coordenadas
                                longitudeDestino: place.geometry.coordinates[0] // Correção de coordenadas
                            })}
                        />

                        <div className={styles["box-input-date"]}>
                            <FaCalendarDays />
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
                        <div className={styles["filtros"]}>
                            <div className={styles["box-filtro"]}style={{width: '22%'}}>
                                <span>Ordenar por</span>
                                <select name="ordenarPor" id="ordenar" className={styles["box-select"]} >
                                    <option value="proximidade">Proximidade</option>
                                    <option value="preço">Preço</option>
                                    <option value="avaliação">Avaliação</option>
                                </select>
                            </div>

                            <div className={styles["box-filtro"]}style={{width: '22%'}}>
                                <span>Passageiros</span>
                                <select name="qtdPassageiros" id="qtd-passageiros" className={styles["box-select"]} >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>

                            {
                                generoUser === "FEMININO" &&
                                <div className={styles["box-filtro"]} style={{width: '15%'}}>
                                    <span>Apenas mulheres</span>

                                    <div
                                        className={viagemAPesquisar.soMulheres ? `${styles["toggle-button"]} ${styles["ativado"]}` : styles["toggle-button"]}
                                        onClick={() => setViagemAPesquisar({ ...viagemAPesquisar, soMulheres: !viagemAPesquisar.soMulheres })}
                                    >
                                        <input type="checkbox" name="soMulheres" value={viagemAPesquisar.soMulheres} />
                                    </div>
                                </div>
                            }

                        </div>
                    }

                    {
                        viagensEncontradas.length > 0
                            ? <div className={styles["viagens"]}>
                                {viagensEncontradas.map((viagem) => {
                                    const horarioPartida = viagem.inicioViagem;
                                    console.log("Id da viagem " + viagem.idViagem)
                                    // const horarioChegada = viagem.fimViagem.substring(11, 16);
                                    const horarioChegada = viagem.fimViagem
                                    return (
                                        <CardViagem
                                            key={viagem.idViagem}
                                            nomeUser={viagem.nomeMotorista}
                                            notaUser={(viagem.quantidadeEstrelas > 0 && viagem.quantidadeEstrelas != null) ? viagem.quantidadeEstrelas : '--'}
                                            preco={viagem.valor}
                                            fotoUser={viagem.foto ? viagem.foto : imgUser}
                                            horarioPartida={viagem.inicioViagem}
                                            horarioChegada={horarioChegada}
                                            distanciaPartida={viagem.distanciaPontoPartidaViagem}
                                            distanciaDestino={viagem.distanciaPontoDestinoViagem}
                                        />
                                    );
                                })}
                            </div>
                            : <div className={styles["not-to-show"]}>
                                <h4>Nenhuma viagem para mostrar</h4>
                                <img src={notFound} alt="Nenhuma viagem encontrada" />
                            </div>
                    }
                </div>
            </div>
        </>
    );
}

export default ProcurarCarona;
