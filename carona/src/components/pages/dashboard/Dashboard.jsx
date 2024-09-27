import { FaMapLocationDot } from 'react-icons/fa6'
import Sidebar from '../../layout/sidebar/Sidebar'
import styles from './Dashboard.module.css'
import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { GiSteeringWheel } from "react-icons/gi";
import { FaClock } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { PiPersonFill } from "react-icons/pi";
import CardAvaliacao from './card_avaliacao/CardAvaliacao';
import CardFidelizado from './card_fidelizado/CardFidelizado';
import imgUser from '../../../utils/assets/user-image.png'

function Dashboard() {
    // const perfilUser = sessionStorage.getItem('perfilUser');
    const perfilUser = 'PASSAGEIRO';

    const [notaGeralComunicacao, setNotaGeralComunicacao] = useState()
    const [notaGeralPontualidade, setNotaGeralPontualidade] = useState()
    const [notaGeralDirigibilidade, setNotaGeralDirigibilidade] = useState()
    const [notaGeralSeguranca, setNotaGeralSeguranca] = useState()
    const [notaGeralComportamento, setNotaGeralComportamento] = useState()
    const [notaMedia, setNotaMedia] = useState()

    const userData = {
        id: 1,
        nome: "User Teste",
        email: "user@email.com",
        cpf: "11122233344",
        genero: "Masculino",
        dataNascimento: "18/03/2004",
        perfil: "Motorista",
        fotoUrl: "https://foto.com",
        viagens: [
            {
                id: 1,
                capacidadePassageiros: 4,
                apenasMulheres: false,
                data: "18/03/2024",
                horárioSaida: "21:00h",
                horárioChegada: "23:00h",
                preco: 30.0,
                pontoPartida: {
                    latitude: -10.0000,
                    longitude: -10.0000,
                },
                pontoChegada: {
                    latitude: -10.0000,
                    longitude: -10.0000,
                },
                carro: {
                    nome: "Fiat Mobi",
                    cor: "Preto",
                    placa: "ABC1D23"
                },
                motorista: {
                    id: 2,
                    nome: "User Teste 3",
                    fotoUrl: "https://foto.com"
                },
                passageiros: [
                    {
                        id: 1,
                        nome: "User Teste 2",
                        fotoUrl: "https://foto.com"
                    }
                ]
            }
        ],
        avaliacoes: [
            {
                comentario: 'Dirige bem, pontual e respeitoso! Recomendo!',
                avaliacao: [
                    {
                        criterio: "Comunicação",
                        nota: 4.3
                    },
                    {
                        criterio: "Segurança",
                        nota: 4.3
                    },
                    {
                        criterio: "Comportamento",
                        nota: 4.3
                    },
                    {
                        criterio: "Pontualidade",
                        nota: 1.0
                    },
                ]
            },
            {
                avaliacao: [
                    {
                        criterio: "Comunicação",
                        nota: 3.7
                    },
                    {
                        criterio: "Segurança",
                        nota: 5.0
                    },
                    {
                        criterio: "Comportamento",
                        nota: 2.5
                    },
                    {
                        criterio: "Pontualidade",
                        nota: 2.0
                    },
                ]
            },
        ]
    }

    const calculateTotalPorcentage = (media) => {
        return ((media / 5) * 100).toFixed(1)
    }

    const calculateMediaCriterios = () => {
        let somaTotalComunicacao = 0
        let somaTotalSeguranca = 0
        let somaTotalComportamento = 0
        let somaTotalPontualidade = 0
        let somaTotalDirigibilidade = 0

        userData.avaliacoes.forEach(avaliacoes => {
            avaliacoes.avaliacao.forEach(criterio => {
                switch (criterio.criterio) {
                    case "Comunicação":
                        somaTotalComunicacao += criterio.nota
                        break;
                    case "Segurança":
                        somaTotalSeguranca += criterio.nota
                        break;
                    case "Comportamento":
                        somaTotalComportamento += criterio.nota
                        break;
                    case "Pontualidade":
                        somaTotalPontualidade += criterio.nota
                        break;
                    case "Dirigibilidade":
                        somaTotalDirigibilidade += criterio.nota
                        break;
                    default:
                        break;
                }
            })
        })

        let length = userData.avaliacoes.length

        let mediaComportamento = somaTotalComportamento / length
        let mediaComunicacao = somaTotalComunicacao / length
        let mediaSeguranca = somaTotalSeguranca / length
        let mediaPontualidade = somaTotalPontualidade / length
        let mediaDirigibilidade = somaTotalDirigibilidade / length

        setNotaGeralComunicacao(calculateTotalPorcentage(mediaComunicacao))
        setNotaGeralPontualidade(calculateTotalPorcentage(mediaPontualidade))
        setNotaGeralDirigibilidade(calculateTotalPorcentage(mediaDirigibilidade))
        setNotaGeralSeguranca(calculateTotalPorcentage(mediaSeguranca))
        setNotaGeralComportamento(calculateTotalPorcentage(mediaComportamento))

        let notaMedia

        if (perfilUser === "MOTORISTA") {
            notaMedia = (mediaComunicacao + mediaSeguranca + mediaPontualidade + mediaDirigibilidade) / 4
        } else {
            notaMedia = (mediaComunicacao + mediaSeguranca + mediaPontualidade + mediaComportamento) / 4
        }

        setNotaMedia(notaMedia.toFixed(1))
    }

    useEffect(() => {
        calculateMediaCriterios()
    }, [])

    return (
        <>
            <Sidebar currentPageName={'/dashboard'} />

            <div className={styles["main"]}>
                <div className={styles["container"]}>
                    <h3>Dashboard</h3>

                    <div className={styles["dashboard"]}>

                        <div className={styles["top"]}>
                            <div className={styles["left"]}>
                                <div className={styles["row-viagens-nota"]}>
                                    <div className={styles["simple-box"]}>
                                        <FaMapLocationDot />
                                        <div className={styles["valor"]}>
                                            <p>6</p>
                                            <span>viagens realizadas</span>
                                        </div>
                                    </div>
                                    <div className={styles["simple-box"]}>
                                        <FaStar />
                                        <div className={styles["valor"]}>
                                            <p>{notaMedia}</p>
                                            <span>nota média</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles["row-principal-trajeto"]}>
                                    <h4>Trajeto mais realizado</h4>
                                    <div className={styles["trajeto"]}>
                                        <div className={styles["cidade-uf"]}>
                                            <MdMyLocation />
                                            <span>Taubaté, SP</span>
                                        </div>
                                        <div className={styles["cidade-uf"]}>
                                            <IoLocationSharp />
                                            <span>São Paulo, SP</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles["right"]}>
                                <div className={styles["criterio"]}>
                                    <IoMdChatbubbles />
                                    <span>0</span>
                                    <div className={styles["total-nota"]}>
                                        <div className={styles["nota"]} style={{ width: `${notaGeralComunicacao}%` }}></div>
                                    </div>
                                    <span>5</span>
                                </div>

                                <div className={styles["criterio"]}>
                                    <IoShieldCheckmarkSharp />
                                    <span>0</span>
                                    <div className={styles["total-nota"]}>
                                        <div className={styles["nota"]} style={{ width: `${notaGeralSeguranca}%` }}></div>
                                    </div>
                                    <span>5</span>
                                </div>

                                {
                                    perfilUser === "MOTORISTA"
                                        ? (
                                            <div className={styles["criterio"]}>
                                                <GiSteeringWheel />
                                                <span>0</span>
                                                <div className={styles["total-nota"]}>
                                                    <div className={styles["nota"]} style={{ width: `${notaGeralDirigibilidade}%` }}></div>
                                                </div>
                                                <span>5</span>
                                            </div>
                                        ) : (
                                            <div className={styles["criterio"]}>
                                                <PiPersonFill />
                                                <span>0</span>
                                                <div className={styles["total-nota"]}>
                                                    <div className={styles["nota"]} style={{ width: `${notaGeralComportamento}%` }}></div>
                                                </div>
                                                <span>5</span>
                                            </div>
                                        )
                                }

                                <div className={styles["criterio"]}>
                                    <FaClock />
                                    <span>0</span>
                                    <div className={styles["total-nota"]}>
                                        <div className={styles["nota"]} style={{ width: `${notaGeralPontualidade}%` }}></div>
                                    </div>
                                    <span>5</span>
                                </div>

                                <div className={styles["info"]}>
                                    <div className={styles["description"]}>
                                        <IoMdChatbubbles />
                                        <span>Comunicação</span>
                                    </div>
                                    <div className={styles["description"]}>
                                        <IoShieldCheckmarkSharp />
                                        <span>Segurança</span>
                                    </div>
                                    {
                                        perfilUser === "MOTORISTA"
                                            ?
                                            <div className={styles["description"]}>
                                                <GiSteeringWheel />
                                                <span>Dirigibilidade</span>
                                            </div>
                                            :
                                            <div className={styles["description"]}>
                                                <PiPersonFill />
                                                <span>Comportamento</span>
                                            </div>
                                    }
                                    <div className={styles["description"]}>
                                        <FaClock />
                                        <span>Pontualidade</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles["bottom"]}>
                            <div className={styles["left"]}>
                                <h4>Avaliações</h4>

                                <div className={styles["avaliacoes"]}>
                                    <CardAvaliacao
                                        comentario={'Dirige bem, pontual e respeitoso! Recomendo!'}
                                        fotoUser={imgUser}
                                        nome={'Lucas Arantes'}
                                        data={'21/09/2024'}
                                        notaGeral={4.3}
                                    />
                                    <CardAvaliacao
                                        comentario={'Dirige bem, pontual e respeitoso! Recomendo!'}
                                        fotoUser={imgUser}
                                        nome={'Lucas Arantes'}
                                        data={'21/09/2024'}
                                        notaGeral={4.3}
                                    />
                                </div>
                            </div>

                            <div className={styles["right"]}>
                                <h4>Motorista fidelizado</h4>

                                <div className={styles["fidelizado"]}>
                                    <CardFidelizado
                                        fotoUser={imgUser}
                                        nomeUser={'Lucas Arantes'}
                                        localidade={'São Paulo, SP'}
                                        notaGeral={4.3}
                                        qtdViagensJuntos={6}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard