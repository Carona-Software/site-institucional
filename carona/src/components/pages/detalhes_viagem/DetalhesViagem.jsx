import styles from './DetalhesViagem.module.css'
import { useParams } from "react-router-dom";
import Sidebar from "../../layout/sidebar/Sidebar"
import { FaArrowRightLong } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { useEffect, useState } from "react";
import api from '../../../Api'
import { FaStar } from "react-icons/fa";
import placaIcon from '../../../utils/assets/license-plate.png'
import { FaCar } from "react-icons/fa";
import AnimacaoEstrada from '../../layout/animacao_estrada/AnimacaoEstrada';
import CardPassageiro from './card_passageiro/CardPassageiro';
import MapGeolocation from '../../map/MapGeolocation';
import imgUser from '../../../utils/assets/user-image.png'

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
    const { idViagem } = useParams();

    const [viagem, setViagem] = useState({
        id: 1,
        capacidadePassageiros: 4,
        apenasMulheres: false,
        data: "18/03/2024",
        horarioSaida: "21:00h",
        horarioChegada: "23:00h",
        preco: 30.0,
        status: "Pendente",
        endereco: {
            pontoPartida: {
                latitude: -23.6323164,
                longitude: -46.5831203,
                cidade: "São Paulo",
                uf: "SP",
                cep: "012345-000",
                bairro: "Consolação",
                logradouro: "Rua Haddock Lobo",
                numero: 300
            },
            pontoChegada: {
                latitude: -23.6323164,
                longitude: -46.60,
                cidade: "Campinas",
                uf: "SP",
                cep: "19865-030",
                bairro: "Guarani",
                logradouro: "Avenida Guarani",
                numero: 2100
            },
        },
        carro: {
            marca: "Fiat",
            modelo: "Mobi",
            cor: "Branco",
            placa: "ABC1D23"
        },
        motorista: {
            id: 2,
            nome: "User Teste 3",
            fotoUrl: "https://foto.com",
        },
        passageiros: [
            {
                id: 1,
                nome: "User Teste 2",
                fotoUrl: "https://foto.com"
            }
        ]
    });
    const [corCarro, setCorCarro] = useState();

    const getDetalhesViagem = async () => {
        try {
            const response = await api.get(`/viagens/detalhes/${idViagem}`);
            setViagem(response.data)
        } catch (error) {
            console.log('Não foi possível buscar detalhes da viagem.');
            console.log('Erro: ', error);
        }
    }

    const definirCorCarro = () => {
        switch (viagem.carro.cor) {
            case 'Preto':
                setCorCarro('#000000')
                break;
            case 'Branco':
                setCorCarro('#F1F1F1')
                break;
            case 'Azul':
                setCorCarro('#173E6D')
                break;
            case 'Verde':
                setCorCarro('#298039')
                break;
            case 'Vermelho':
                setCorCarro('#D82323')
                break;
            case 'Roxo':
                setCorCarro('#8E32A3')
                break;
            case 'Marrom':
                setCorCarro('#6C501D')
                break;
            case 'Laranja':
                setCorCarro('#E85816')
                break;
            case 'Cinza':
                setCorCarro('#808080')
                break;
            case 'Amarelo':
                setCorCarro('#EDE917')
                break;
            case 'Prata':
                setCorCarro('#C0C0C0')
                break;
            case 'Vinho':
                setCorCarro('#781D1D')
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        getDetalhesViagem()
        definirCorCarro()
    }, []);

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
                            <MdMyLocation />
                            <input
                                value={`${viagem.endereco.pontoPartida.cidade}, ${viagem.endereco.pontoPartida.uf}`}
                                className={styles["inputPartida"]}
                                disabled
                            />
                        </div>
                        <FaArrowRightLong className={styles["arrow"]} />
                        <div className={styles["box-input"]}>
                            <IoLocationSharp />
                            <input
                                value={`${viagem.endereco.pontoPartida.cidade}, ${viagem.endereco.pontoPartida.uf}`}
                                className={styles["inputChegada"]}
                                disabled
                            />
                        </div>
                        <div className={styles["box-input-date"]}>
                            <FaCalendarDays />
                            <input
                                value={viagem.data}
                                className={styles["inputDate"]}
                                disabled
                            />
                        </div>

                        <button
                            className={styles["reservar-button"]}
                            onClick={reservarViagem}>
                            Reservar
                        </button>

                    </div>

                    <div className={styles["viagem-quadro"]}>
                        <div className={styles["info"]}>

                            <div className={styles["motorista"]}>
                                <img src={viagem.motorista.fotoUrl ? viagem.motorista.fotoUrl : imgUser} alt={viagem.motorista.nome} />
                                <div className={styles["nome-nota"]}>
                                    <h4>{viagem.motorista.nome}</h4>
                                    <div className={styles["nota"]}>
                                        <FaStar />
                                        <span>{viagem.motorista.notaGeral ? viagem.motorista.notaGeral : "--"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles["separator"]}></div>

                            <div className={styles["hora-endereco"]}>
                                <div className={styles["horarios"]}>
                                    <span className={styles["hora-definida"]}>{viagem.horarioSaida}h</span>
                                    <span className={styles["tempo-estimado"]}>{""}</span>
                                    <span className={styles["hora-definida"]}>{viagem.horarioChegada}h</span>
                                </div>
                                <div className={styles["enderecos"]}>
                                    <span>
                                        {`
                                            ${viagem.endereco.pontoPartida.logradouro} - 
                                            ${viagem.endereco.pontoPartida.cep}, 
                                            ${viagem.endereco.pontoPartida.bairro}, 
                                            ${viagem.endereco.pontoPartida.cidade}/
                                            ${viagem.endereco.pontoPartida.uf}
                                        `}
                                    </span>

                                    <span>
                                        {`
                                            ${viagem.endereco.pontoChegada.logradouro} - 
                                            ${viagem.endereco.pontoChegada.cep}, 
                                            ${viagem.endereco.pontoChegada.bairro}, 
                                            ${viagem.endereco.pontoChegada.cidade}/
                                            ${viagem.endereco.pontoChegada.uf}
                                        `}
                                    </span>
                                </div>
                            </div>

                            <div className={styles["separator"]}></div>

                            <div className={styles["info-carro"]}>
                                <div className={styles["modelo-carro"]}>
                                    <FaCar style={{ color: corCarro}} />
                                    <span>{viagem.carro.marca} {viagem.carro.modelo}</span>
                                </div>
                                <div className={styles["placa-carro"]}>
                                    <img src={placaIcon} alt="Ícone de placa" />
                                    <span>{viagem.carro.placa}</span>
                                </div>
                            </div>

                            <div className={styles["separator"]}></div>

                            <div className={styles["passageiros"]}>
                                <h5>Passageiros</h5>
                                <div className={styles["users"]}>
                                    {
                                        viagem.passageiros.length > 0
                                            ? viagem.passageiros.map((passageiro, index) => (
                                                <CardPassageiro
                                                    key={index}
                                                    foto={passageiro.fotoUrl}
                                                    nome={passageiro.nome}
                                                    nota={'--'}
                                                />
                                            ))
                                            : <p>Nenhum passageiro reservou esta viagem até o momento</p>
                                    }
                                </div>
                            </div>

                        </div>

                        <div className={styles["mapa"]}>
                            <MapGeolocation
                                latitudePartida={viagem.endereco.pontoPartida.latitude}
                                longitudePartida={viagem.endereco.pontoPartida.longitude}
                                latitudeDestino={viagem.endereco.pontoChegada.latitude}
                                longitudeDestino={viagem.endereco.pontoChegada.longitude}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetalhesViagem