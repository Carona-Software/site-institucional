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
import api from '../../../Api';
import { toast } from 'react-toastify';

function Dashboard() {
    const perfilUser = sessionStorage.getItem('perfilUser');
    const idUser = sessionStorage.getItem('idUser');

    const isMotorista = perfilUser.toUpperCase() === "MOTORISTA"

    const [userData, setUserData] = useState({
        id: 1,
        nome: "User Teste",
        email: "user@email.com",
        cpf: "11122233344",
        genero: "Masculino",
        dataNascimento: "18/03/2004",
        perfil: "Passageiro",
        fotoUrl: "https://foto.com",
        endereco: {
            latitude: -10.0000,
            longitude: -23.40,
            cidade: "São Paulo",
            uf: "SP",
            cep: "012345-000",
            bairro: "Consolação",
            logradouro: "Rua Haddock Lobo",
            numero: 300
        },
        viagens: [],
        avaliacoes: [],
        fidelizados: {
            id: null,
            nome: "",
            fotoUrl: "",
            notaGeral: null,
            qtdViagensJuntos: null,
            ufLocalidade: "",
            cidadeLocalidade: ""
        },
        principalTrajeto: {
            cidadePartida: "",
            ufPartida: "",
            cidadeChegada: "",
            ufChegada: ""
        }
    })

    const messageSemFidelizado = isMotorista ? "Sem passageiro(s) fidelizado(s) por enquanto" : "Sem motorista fidelizado por enquanto"

    const getUserInfo = async () => {
        try {
            const response = await api.get(`/usuarios/${idUser}`)
            setUserData(response.data)
            console.log(response.data)

            sessionStorage.setItem('notaGeralUser', response.data.notaMedia)
            sessionStorage.setItem('fotoUser', response.data.fotoUrl)
            sessionStorage.setItem('nomeUser', response.data.nome)

        } catch (error) {
            console.log("Erro ao obter informações do usuário: ", error);
            toast.error("Não foi possível consultar suas informações")
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    const [showNotaComunicacao, setShowNotaComunicacao] = useState(false)
    const [showNotaPontualidade, setShowNotaPontualidade] = useState(false)
    const [showNotaDirigibilidade, setShowNotaDirigibilidade] = useState(false)
    const [showNotaSeguranca, setShowNotaSeguranca] = useState(false)
    const [showNotaComportamento, setShowNotaComportamento] = useState(false)

    const [notaGeralComunicacao, setNotaGeralComunicacao] = useState(0)
    const [notaGeralPontualidade, setNotaGeralPontualidade] = useState(0)
    const [notaGeralDirigibilidade, setNotaGeralDirigibilidade] = useState(0)
    const [notaGeralSeguranca, setNotaGeralSeguranca] = useState(0)
    const [notaGeralComportamento, setNotaGeralComportamento] = useState(0)

    const [notaMediaComunicacao, setNotaMediaComunicacao] = useState(0)
    const [notaMediaPontualidade, setNotaMediaPontualidade] = useState(0)
    const [notaMediaDirigibilidade, setNotaMediaDirigibilidade] = useState(0)
    const [notaMediaSeguranca, setNotaMediaSeguranca] = useState(0)
    const [notaMediaComportamento, setNotaMediaComportamento] = useState(0)

    const calculateTotalPorcentageCriterio = (media) => {
        return ((media / 5) * 100).toFixed(1)
    }

    const calculateMediaCriterios = () => {
        if (userData.avaliacoes.length > 0) {

            let somaTotalComunicacao = 0
            let somaTotalSeguranca = 0
            let somaTotalComportamento = 0
            let somaTotalPontualidade = 0
            let somaTotalDirigibilidade = 0

            userData.avaliacoes.forEach(avaliacao => {
                avaliacao.notasCriterios.forEach(criterio => {
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

            setNotaMediaComunicacao(mediaComunicacao)
            setNotaMediaPontualidade(mediaPontualidade)
            setNotaMediaDirigibilidade(mediaDirigibilidade)
            setNotaMediaSeguranca(mediaSeguranca)
            setNotaMediaComportamento(mediaComportamento)

            setNotaGeralComunicacao(calculateTotalPorcentageCriterio(mediaComunicacao))
            setNotaGeralPontualidade(calculateTotalPorcentageCriterio(mediaPontualidade))
            setNotaGeralDirigibilidade(calculateTotalPorcentageCriterio(mediaDirigibilidade))
            setNotaGeralSeguranca(calculateTotalPorcentageCriterio(mediaSeguranca))
            setNotaGeralComportamento(calculateTotalPorcentageCriterio(mediaComportamento))
        }
    }

    useEffect(() => {
        calculateMediaCriterios()
    }, [userData.avaliacoes])

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
                                            <p>{userData.viagens.length}</p>
                                            <span>viagens realizadas</span>
                                        </div>
                                    </div>
                                    <div className={styles["simple-box"]}>
                                        <FaStar />
                                        <div className={styles["valor"]}>
                                            <p>{userData.notaMedia > 0.0 ? userData.notaMedia : "--"}</p>
                                            <span>nota média</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles["row-principal-trajeto"]}>
                                    <h4>Trajeto mais realizado</h4>
                                    <div className={styles["trajeto"]}>
                                        <div className={styles["cidade-uf"]}>
                                            <MdMyLocation />
                                            <span>
                                                {
                                                    (userData.principalTrajeto.cidadePartida !== undefined && userData.principalTrajeto.cidadePartida !== "" && userData.principalTrajeto.cidadePartida !== null)
                                                        ? `${userData.principalTrajeto.cidadePartida}, ${userData.principalTrajeto.ufPartida}`
                                                        : "--"
                                                }
                                            </span>
                                        </div>
                                        <div className={styles["cidade-uf"]}>
                                            <IoLocationSharp />
                                            <span>
                                                {
                                                    (userData.principalTrajeto.cidadeChegada !== undefined && userData.principalTrajeto.cidadeChegada !== "" && userData.principalTrajeto.cidadePartida !== null)
                                                        ? `${userData.principalTrajeto.cidadeChegada}, ${userData.principalTrajeto.ufChegada}`
                                                        : "--"
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles["right"]}>
                                <div className={styles["criterio"]}>
                                    <IoMdChatbubbles />
                                    <span>0</span>
                                    <div className={styles["total-nota"]}>
                                        <div
                                            className={styles["nota"]}
                                            style={{ width: `${notaGeralComunicacao}%` }}
                                            onMouseEnter={() => setShowNotaComunicacao(true)}
                                            onMouseLeave={() => setShowNotaComunicacao(false)}
                                        >
                                            {
                                                showNotaComunicacao &&
                                                <div className={styles["tooltip"]}>
                                                    <span>{notaMediaComunicacao}</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <span>5</span>
                                </div>

                                <div className={styles["criterio"]}>
                                    <IoShieldCheckmarkSharp />
                                    <span>0</span>
                                    <div className={styles["total-nota"]}>
                                        <div
                                            className={styles["nota"]}
                                            style={{ width: `${notaGeralSeguranca}%` }}
                                            onMouseEnter={() => setShowNotaSeguranca(true)}
                                            onMouseLeave={() => setShowNotaSeguranca(false)}
                                        >
                                            {
                                                showNotaSeguranca &&
                                                <div className={styles["tooltip"]}>
                                                    <span>{notaMediaSeguranca}</span>
                                                </div>
                                            }
                                        </div>
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
                                                    <div
                                                        className={styles["nota"]}
                                                        style={{ width: `${notaGeralDirigibilidade}%` }}
                                                        onMouseEnter={() => setShowNotaDirigibilidade(true)}
                                                        onMouseLeave={() => setShowNotaDirigibilidade(false)}
                                                    >
                                                        {
                                                            showNotaDirigibilidade &&
                                                            <div className={styles["tooltip"]}>
                                                                <span>{notaMediaDirigibilidade}</span>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <span>5</span>
                                            </div>
                                        ) : (
                                            <div className={styles["criterio"]}>
                                                <PiPersonFill />
                                                <span>0</span>
                                                <div className={styles["total-nota"]}>
                                                    <div
                                                        className={styles["nota"]}
                                                        style={{ width: `${notaGeralComportamento}%` }}
                                                        onMouseEnter={() => setShowNotaComportamento(true)}
                                                        onMouseLeave={() => setShowNotaComportamento(false)}
                                                    >
                                                        {
                                                            showNotaComportamento &&
                                                            <div className={styles["tooltip"]}>
                                                                <span>{notaMediaComportamento}</span>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <span>5</span>
                                            </div>
                                        )
                                }

                                <div className={styles["criterio"]}>
                                    <FaClock />
                                    <span>0</span>
                                    <div className={styles["total-nota"]}>
                                        <div
                                            className={styles["nota"]}
                                            style={{ width: `${notaGeralPontualidade}%` }}
                                            onMouseEnter={() => setShowNotaPontualidade(true)}
                                            onMouseLeave={() => setShowNotaPontualidade(false)}
                                        >
                                            {
                                                showNotaPontualidade &&
                                                <div className={styles["tooltip"]}>
                                                    <span>{notaMediaPontualidade}</span>
                                                </div>
                                            }
                                        </div>
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

                                <div className={
                                    userData.avaliacoes.length > 0
                                        ? `${styles["avaliacoes"]} ${styles["start"]}`
                                        : `${styles["avaliacoes"]} ${styles["center"]}`
                                }>
                                    {
                                        userData.avaliacoes.length > 0
                                            ?
                                            userData.avaliacoes.map((avaliacao, index) => (
                                                <CardAvaliacao
                                                    key={index}
                                                    comentario={avaliacao.comentario}
                                                    fotoUser={avaliacao.avaliador.fotoUrl}
                                                    nome={avaliacao.avaliador.nome}
                                                    data={avaliacao.data}
                                                    notaMedia={avaliacao.notaMedia}
                                                />
                                            ))
                                            : <p>Sem avaliações por enquanto</p>
                                    }
                                </div>
                            </div>

                            <div className={styles["right"]}>
                                {
                                    perfilUser === "PASSAGEIRO"
                                        ? <h4>Motoristas fidelizados</h4>
                                        : <h4>Passageiros fidelizados</h4>
                                }

                                <div className={styles["fidelizado"]}>
                                    {
                                        userData.fidelizados.length > 0
                                            ? userData.fidelizados.map((fidelizado, index) => (
                                                <CardFidelizado
                                                    key={index}
                                                    fotoUser={fidelizado.fotoUrl}
                                                    nomeUser={fidelizado.nome}
                                                    cidade={fidelizado.cidadeLocalidade}
                                                    uf={fidelizado.ufLocalidade}
                                                    notaGeral={fidelizado.notaGeral}
                                                    qtdViagensJuntos={fidelizado.qtdViagensJuntos}
                                                />
                                            ))
                                            : <p>{messageSemFidelizado}</p>
                                    }
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