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
import defaultImgUser from '../../../utils/assets/user-image.png'
import { formatarData, formatTime, isImageUrlValid } from '../../../utils/functions';

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

    const [isLoading, setIsLoading] = useState(true)

    const [viagemData, setViagemData] = useState({
        id: null,
        capacidadePassageiros: null,
        apenasMulheres: false,
        data: null,
        horarioSaida: null,
        horarioChegada: null,
        preco: null,
        status: "",
        trajeto: {
            pontoPartida: {
                latitude: -23.6323164,
                longitude: -46.5831203,
                cidade: null,
                uf: null,
                cep: null,
                bairro: null,
                logradouro: null,
                numero: null
            },
            pontoChegada: {
                latitude: -23.6323164,
                longitude: -46.60,
                cidade: null,
                uf: null,
                cep: null,
                bairro: null,
                logradouro: null,
                numero: null
            },
        },
        carro: {},
        motorista: {},
        passageiros: []
    });

    const [corCarro, setCorCarro] = useState();

    const [isFotoMotoristaValid, setIsFotoMotoristaValid] = useState(false)

    const getDetalhesViagem = async () => {
        try {
            const response = await api.get(`/viagens/${idViagem}`);
            setViagemData(response.data)

            isImageUrlValid(response.data.motorista.urlFoto).then(isValid => {
                setIsFotoMotoristaValid(isValid)
            })

            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log('Não foi possível buscar detalhes da viagem.');
            console.log('Erro: ', error);
        }
    }

    const definirCorCarro = () => {
        switch (viagemData.carro.cor) {
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
    }, []);

    useEffect(() => {
        definirCorCarro()
    }, [viagemData.carro]);

    const reservarViagem = () => {
        console.log('');
    }

    return (
        <>
            <Sidebar currentPageName={'/viagens'} />

            <AnimacaoEstrada />

            <div className={styles["main"]}>
                {
                    !isLoading &&
                    <div className={styles["container"]}>

                        <div className={styles["search-bar"]}>

                            <div className={styles["box-input"]}>
                                <MdMyLocation />
                                <input
                                    value={`${viagemData.trajeto.pontoPartida.cidade}, ${viagemData.trajeto.pontoPartida.uf}`}
                                    className={styles["inputPartida"]}
                                    disabled
                                />
                            </div>
                            <FaArrowRightLong className={styles["arrow"]} />
                            <div className={styles["box-input"]}>
                                <IoLocationSharp />
                                <input
                                    value={`${viagemData.trajeto.pontoPartida.cidade}, ${viagemData.trajeto.pontoPartida.uf}`}
                                    className={styles["inputChegada"]}
                                    disabled
                                />
                            </div>
                            <div className={styles["box-input-date"]}>
                                <FaCalendarDays />
                                <input
                                    value={formatarData(viagemData.data)}
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
                                    <img src={isFotoMotoristaValid ? viagemData.motorista.fotoUrl : defaultImgUser} alt={viagemData.motorista.nome} />
                                    <div className={styles["nome-nota"]}>
                                        <h4>{viagemData.motorista.nome}</h4>
                                        <div className={styles["nota"]}>
                                            <FaStar />
                                            <span>
                                                {
                                                    (viagemData.motorista.notaGeral != null || viagemData.motorista.notaGeral <= 0.0)
                                                        ? "--"
                                                        : viagemData.motorista.notaGeral
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles["separator"]}></div>

                                <div className={styles["hora-endereco"]}>
                                    <div className={styles["horarios"]}>
                                        <span className={styles["hora-definida"]}>{formatTime(viagemData.horarioSaida)}h</span>
                                        <span className={styles["tempo-estimado"]}>{""}</span>
                                        <span className={styles["hora-definida"]}>{formatTime(viagemData.horarioChegada)}h</span>
                                    </div>
                                    <div className={styles["enderecos"]}>
                                        <span>
                                            {`
                                            ${viagemData.trajeto.pontoPartida.logradouro} - 
                                            ${viagemData.trajeto.pontoPartida.cep}, 
                                            ${viagemData.trajeto.pontoPartida.bairro}, 
                                            ${viagemData.trajeto.pontoPartida.cidade}/
                                            ${viagemData.trajeto.pontoPartida.uf}
                                        `}
                                        </span>

                                        <span>
                                            {`
                                            ${viagemData.trajeto.pontoChegada.logradouro} - 
                                            ${viagemData.trajeto.pontoChegada.cep}, 
                                            ${viagemData.trajeto.pontoChegada.bairro}, 
                                            ${viagemData.trajeto.pontoChegada.cidade}/
                                            ${viagemData.trajeto.pontoChegada.uf}
                                        `}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles["separator"]}></div>

                                <div className={styles["info-carro"]}>
                                    <div className={styles["modelo-carro"]}>
                                        <FaCar color={corCarro} />
                                        <span>{viagemData.carro.marca} {viagemData.carro.modelo}</span>
                                    </div>
                                    <div className={styles["placa-carro"]}>
                                        <img src={placaIcon} alt="Ícone de placa" />
                                        <span>{viagemData.carro.placa}</span>
                                    </div>
                                </div>

                                <div className={styles["separator"]}></div>

                                <div className={styles["passageiros"]}>
                                    <h5>Passageiros</h5>
                                    <div className={styles["users"]}>
                                        {
                                            viagemData.passageiros.length > 0
                                                ? viagemData.passageiros.map((passageiro, index) => (
                                                    <CardPassageiro
                                                        key={index}
                                                        foto={passageiro.urlFoto}
                                                        nome={passageiro.nome}
                                                        nota={passageiro.notaGeral}
                                                    />
                                                ))
                                                : <p>Sem passageiros por enquanto</p>
                                        }
                                    </div>
                                </div>

                            </div>

                            <div className={styles["mapa"]}>
                                <MapGeolocation
                                    latitudePartida={viagemData.trajeto.pontoPartida.latitude}
                                    longitudePartida={viagemData.trajeto.pontoPartida.longitude}
                                    latitudeDestino={viagemData.trajeto.pontoChegada.latitude}
                                    longitudeDestino={viagemData.trajeto.pontoChegada.longitude}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default DetalhesViagem