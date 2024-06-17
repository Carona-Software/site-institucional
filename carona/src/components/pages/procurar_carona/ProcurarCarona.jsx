import styles from './ProcurarCarona.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../layout/sidebar/Sidebar";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuCircleDashed } from "react-icons/lu";
import { FaCalendarDays } from "react-icons/fa6";
import { FaDotCircle } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import axios from 'axios';
import AnimacaoEstrada from '../../layout/animacao_estrada/AnimacaoEstrada';
import SearchGeocode from '../../map/search_geocode/SearchGeocode';
import CardViagem from './card_viagem/CardViagem';
import notFound from '../../../utils/assets/image-not-found-viagem.svg';

function ProcurarCarona() {
    let local = useLocation();
    const navigate = useNavigate();

    const [viagemAPesquisar, setViagemAPesquisar] = useState({
        latitudePartida: '',
        longitudePartida: '',
        latitudeDestino: '',
        longitudeDestino: '',
        diaViagem: '',
    });

    const [viagensEncontradas, setViagensEncontradas] = useState([]);

    const handleCardClick = (viagemId) => {
        console.log("Valor do id " + viagemId)
        navigate(`/viagens/detalhes/${viagemId}`);
    };
    const handleSubmitViagem = async () => {
        // Verifica se todos os campos estão preenchidos
        if (!viagemAPesquisar.latitudePartida || !viagemAPesquisar.longitudePartida || !viagemAPesquisar.latitudeDestino || !viagemAPesquisar.longitudeDestino || !viagemAPesquisar.diaViagem) {
            toast.warning("Por favor, preencha todos os campos antes de pesquisar viagens.");
            return;
        }
    
        // Validação da data e do mês
        const today = new Date();
        const selectedDate = new Date(viagemAPesquisar.diaViagem);
        
        if (selectedDate <= today) {
            toast.error("A data da viagem deve ser um dia após a data atual.");
            return;
        }
        
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        if (selectedDate > nextYear) {
            toast.error("A data da viagem não pode ser mais do que um ano no futuro.");
            return;
        }
        
        if (selectedDate.getMonth() <= today.getMonth()) {
            toast.error("O mês da viagem deve ser superior ao mês atual.");
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:8080/viagem/buscar-viagens', viagemAPesquisar);
            console.log("Resposta da API: " + JSON.stringify(response.data));
            setViagensEncontradas(response.data);
        } catch (error) {
            console.error("Erro ao buscar viagens:", error);
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
                            <div className={styles["box-filtro"]}>
                                <span>Ordenar por</span>
                                <select name="ordenarPor" id="ordenar" className={styles["box-select"]} >
                                    <option value="proximidade">Proximidade</option>
                                    <option value="preço">Preço</option>
                                    <option value="avaliação">Avaliação</option>
                                </select>
                            </div>

                            <div className={styles["box-filtro"]}>
                                <span>Passageiros</span>
                                <select name="qtdPassageiros" id="qtd-passageiros" className={styles["box-select"]} >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>

                            <div className={styles["box-filtro"]}>
                                <span>Apenas mulheres</span>
                                <select name="apenasMulheres" id="apenas-mulheres" className={styles["box-select"]} >
                                    <option value={true}>Sim</option>
                                    <option value={false}>Não</option>
                                </select>
                            </div>
                        </div>
                    }

                        {
                            viagensEncontradas.length > 0
                                ? <div className={styles["viagens"]}>
                                    {viagensEncontradas.map((viagem) => {
                                        const horarioPartida = viagem.inicioViagem;
                                        const horarioChegada = viagem.fimViagem ? viagem.fimViagem.substring(11, 16) : ''; // Adicionando verificação para evitar erro
                                        return (
                                            <CardViagem
                                                key={viagem.idViagem}
                                                nomeUser={viagem.nomeMotorista}
                                                notaUser={viagem.quantidadeEstrelas}
                                                horarioPartida={horarioPartida}
                                                horarioChegada={horarioChegada}
                                                preco={viagem.valor}
                                                distancia={viagem.distanciaPontoDestinoViagem} // Passando a distância para o componente
                                                onClickEvent={() => handleCardClick(viagem.idViagem)} 
                                            />
                                        );
                                    })}
                                </div>
                                : <div className={styles["not-to-show"]}>
                                    <h4>Nenhuma viagem para mostrar</h4>
                                    <img src={notFound} alt="Nenhuma viagem encontrada" />
                                </div>
                        }
                <ToastContainer />
                                    
                </div>
            </div>
        </>
    );
}

export default ProcurarCarona;
