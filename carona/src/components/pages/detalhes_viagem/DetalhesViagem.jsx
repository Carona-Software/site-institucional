import styles from './DetalhesViagem.module.css'
import { useParams } from "react-router-dom";
import Sidebar from "../../layout/sidebar/Sidebar"
import { FaArrowRightLong } from "react-icons/fa6";
import { LuCircleDashed } from "react-icons/lu";
import { FaCalendarDays } from "react-icons/fa6";
import { FaDotCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from '../../../Api'
import { FaStar } from "react-icons/fa";
import placaIcon from '../../../utils/assets/license-plate.png'
import { FaCar } from "react-icons/fa";
import AnimacaoEstrada from '../../layout/animacao_estrada/AnimacaoEstrada';
import CardPassageiro from './card_passageiro/CardPassageiro';
import MapGeolocation from '../../map/MapGeolocation';
import axios from 'axios';


function convertMinutesToHours(minutes) {
    if (minutes < 60) {
        return `${Math.round(minutes)} minutos`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = Math.round(minutes % 60);
        return `${hours} horas e ${remainingMinutes} minutos`;
    }
}


function DetalhesViagem() {

    const idViagem = getViagemIdFromUrl(); 
    const [nome , setNome] = useState("");
    const [mediaEstrelas , setMediaEstrelas] = useState("");
    const [horarioPartida , setHorarioPartida] = useState("");
    const [fimViagem , setFimViagem] = useState("");
    const [tempoMedio , setTempoMedio] = useState("");
    const [modeloCarro , setModeloCarro] = useState("");
    const [marcaCarro , setMarca] = useState("");
    const [placa , setPlaca] = useState("")
    function getViagemIdFromUrl() {
        const url = window.location.href;
        const regex = /\/viagens\/detalhes\/(\d+)/;
        const match = url.match(regex);
        if (match) {
            return match[1];
        } else {
            return null; 
        }
    }

    // Extrai o ID da viagem ao montar o componente
   
    useEffect(() => {
        const fetchViagem = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/viagem/detalhesViagens/${idViagem}`);
                console.log("Resposta do back " + JSON.stringify(response))
                setNome(response.data.nomeMotorista)
                setMediaEstrelas(response.data.quantidadeEstrelas);
                setHorarioPartida(response.data.inicioViagem);
                setFimViagem(response.data.fimViagem);
                const tempoMedioViagem = convertMinutesToHours(response.data.tempoMedioViagem);
                setTempoMedio(tempoMedioViagem);
                setModeloCarro(response.data.nomeCarro)
                setMarca(response.data.modeloCarro)
                setPlaca(response.data.placaCarro)
                console.log(nome)
            } catch (error) {
                console.error("Erro ao buscar detalhes da viagem:", error);
            }
        };

        fetchViagem();
    }, [idViagem]);

    const [viagem, setViagem] = useState({
        preco: 36,
        data: "17/05/2024",
        horarioSaida: "15:00",
        horarioChegada: "17:00",
        tempoEstimado: "2:00",
        carro: {
            marca: "Ford",
            modelo: "Ka",
            placa: "ABC1D23",
            cor: "red"
        },
        enderecoPartida: {
            logradouro: "Av. Paulista",
            numero: '2000',
            cidade: 'São Paulo',
            uf: 'SP',
            bairro: 'Consolação',
            latitude: '',
            longitude: ''
        },
        enderecoDestino: {
            logradouro: "Av. Ricardo Peixoto",
            numero: '234',
            cidade: 'Campinas',
            uf: 'SP',
            bairro: 'Jardim Brasil',
            latitude: '',
            longitude: ''
        },
        motorista: {
            id: '1',
            nome: "Gustavo Medeiros",
            nota: "4.5"
        },
        passageiros: [
            {
                id: '1',
                nome: "Lucas Arantes",
                nota: "4.7",
                foto: ""
            },
            {
                id: '2',
                nome: "Ewerton Oliveira",
                nota: "4.9",
                foto: ""
            }
        ]
    })

 
    

    const reservarViagem = () => {
        console.log('');
    }

    return (
        <>
            <Sidebar currentPageName={'/viagens'} />

            <AnimacaoEstrada />

            <div className={styles["main"]}>
                <div className={styles["container"]}>
                    <div className={styles["search-bar"]}>

                        <div className={styles["box-input"]}>
                            <LuCircleDashed />
                            <input value={`${viagem.enderecoPartida.cidade}, ${viagem.enderecoPartida.uf}`} name="cidadeOrigem" id="partidaId" className={styles["inputPartida"]} disabled />
                        </div>
                        <FaArrowRightLong className={styles["arrow"]} />
                        <div className={styles["box-input"]}>
                            <FaDotCircle />
                            <input value={`${viagem.enderecoDestino.cidade}, ${viagem.enderecoDestino.uf}`} name="cidadeDestino" id="chegadaId" className={styles["inputChegada"]} disabled />
                        </div>
                        <div className={styles["box-input-date"]}>
                            <FaCalendarDays />
                            <input value={viagem.data} name="data" className={styles["inputDate"]} id="dateId" disabled />
                        </div>

                        <button className={styles["reservar-button"]} onClick={reservarViagem}>Reservar</button>

                    </div>

                    <div className={styles["viagem-quadro"]}>
                        <div className={styles["info"]}>

                            <div className={styles["motorista"]}>
                                <img src="" alt="Foto do Motorista" />
                                <div className={styles["nome-nota"]}>
                                    <h4>{nome}</h4>
                                    <div className={styles["nota"]}>
                                        <FaStar />
                                        <span>{mediaEstrelas}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles["separator"]}></div>

                            <div className={styles["hora-endereco"]}>
                                <div className={styles["horarios"]}>
                                    <span className={styles["hora-definida"]}>{horarioPartida}h</span>
                                    <span className={styles["tempo-estimado"]}>{tempoMedio}</span>
                                    <span className={styles["hora-definida"]}>{fimViagem}h</span>
                                </div>
                                <div className={styles["enderecos"]}>
                                    <span>{viagem.enderecoDestino.logradouro}, {viagem.enderecoDestino.numero}</span>
                                    <span>{viagem.enderecoPartida.logradouro}, {viagem.enderecoPartida.numero}</span>
                                </div>
                            </div>

                            <div className={styles["separator"]}></div>

                            <div className={styles["info-carro"]}>
                                <div className={styles["modelo-carro"]}>
                                    <FaCar style={{ color: viagem.carro.cor }} />
                                    <span>{marcaCarro} {modeloCarro}</span>
                                </div>
                                <div className={styles["placa-carro"]}>
                                    <img src={placaIcon} alt="Ícone de placa" />
                                    <span>{placa}</span>
                                </div>
                            </div>

                            <div className={styles["separator"]}></div>

                            <div className={styles["passageiros"]}>
                                <h5>Passageiros</h5>
                                <div className={styles["users"]}>
                                    {
                                        viagem.passageiros.length > 0
                                            ? viagem.passageiros.map(passageiro => (
                                                <CardPassageiro key={passageiro.id} foto={passageiro.foto} nome={passageiro.nome} nota={passageiro.nota} />
                                            ))
                                            : <p>Nenhum passageiro reservou esta viagem até o momento</p>
                                    }
                                </div>
                            </div>

                        </div>

                        <div className={styles["mapa"]}>
                            {/* <MapGeolocation /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetalhesViagem