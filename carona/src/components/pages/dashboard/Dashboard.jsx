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
import api from '../../../Api';
import { toast } from 'react-toastify';

function Dashboard() {
    // const perfilUser = sessionStorage.getItem('perfilUser');
    const perfilUser = 'PASSAGEIRO';
    const idUser = sessionStorage.getItem('idUser');

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
            longitude: -10.0000,
            cidade: "São Paulo",
            uf: "SP",
            cep: "012345-000",
            bairro: "Consolação",
            logradouro: "Rua Haddock Lobo",
            numero: 300
        },
        viagens: [
            {
                id: 1,
                data: "18/03/2024",
                horárioSaida: "21:00h",
                horárioChegada: "23:00h",
                preco: 30.0,
                status: "Finalizada"
            }
        ],
        avaliacoes: [

        ],
        motoristaFidelizado: {
            id: 2,
            nome: "User Teste 3",
            fotoUrl: "https://foto.com",
            notaGeral: 4.3,
            qtdViagensJuntos: 6,
            localidade: "São Paulo, SP" // cidade + uf do endereço
        },
        principalTrajeto: {
            partida: "", // cidade + uf do endereço
            chegada: "" // cidade + uf do endereço
        }
    })
    const [hasMotoristaFidelizado, setHasMotoristaFidelizado] = useState(false)
    const [hasPassageirosFidelizados, setHasPassageirosFidelizados] = useState(false)

    const getUserInfo = async () => {
        try {
            const response = await api.get(`/usuarios/${idUser}`)
            setUserData(response.data)

            if (response.data.perfil.toUpperCase() === "MOTORISTA") {
                if (response.data.passageirosFidelizados.length > 0) {
                    setHasPassageirosFidelizados(true)
                }
            } else {
                if (response.data.motoristaFidelizado.nome !== undefined) {
                    setHasMotoristaFidelizado(true)
                }
            }
        } catch (error) {
            console.log("Erro ao obter informações do usuário: ", error);
            toast.error("Não foi possível consultar suas informações")
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    const [notaGeralComunicacao, setNotaGeralComunicacao] = useState(0)
    const [notaGeralPontualidade, setNotaGeralPontualidade] = useState(0)
    const [notaGeralDirigibilidade, setNotaGeralDirigibilidade] = useState(0)
    const [notaGeralSeguranca, setNotaGeralSeguranca] = useState(0)
    const [notaGeralComportamento, setNotaGeralComportamento] = useState(0)
    const [notaMedia, setNotaMedia] = useState(0)

    // const userData = {
    //     id: 1,
    //     nome: "User Teste",
    //     email: "user@email.com",
    //     cpf: "11122233344",
    //     genero: "Masculino",
    //     dataNascimento: "18/03/2004",
    //     perfil: "Motorista",
    //     fotoUrl: "https://foto.com",
    //     viagens: [
    //         {
    //             id: 1,
    //             capacidadePassageiros: 4,
    //             apenasMulheres: false,
    //             data: "18/03/2024",
    //             horárioSaida: "21:00h",
    //             horárioChegada: "23:00h",
    //             preco: 30.0,
    //             pontoPartida: {
    //                 latitude: -10.0000,
    //                 longitude: -10.0000,
    //             },
    //             pontoChegada: {
    //                 latitude: -10.0000,
    //                 longitude: -10.0000,
    //             },
    //             carro: {
    //                 nome: "Fiat Mobi",
    //                 cor: "Preto",
    //                 placa: "ABC1D23"
    //             },
    //             motorista: {
    //                 id: 2,
    //                 nome: "User Teste 3",
    //                 fotoUrl: "https://foto.com"
    //             },
    //             passageiros: [
    //                 {
    //                     id: 1,
    //                     nome: "User Teste 2",
    //                     fotoUrl: "https://foto.com"
    //                 }
    //             ]
    //         }
    //     ],
    //     avaliacoes: [
    //         {
    //             comentario: 'Dirige bem, pontual e respeitoso! Recomendo!',
    //             avaliacao: [
    //                 {
    //                     criterio: "Comunicação",
    //                     nota: 4.3
    //                 },
    //                 {
    //                     criterio: "Segurança",
    //                     nota: 4.3
    //                 },
    //                 {
    //                     criterio: "Comportamento",
    //                     nota: 4.3
    //                 },
    //                 {
    //                     criterio: "Pontualidade",
    //                     nota: 1.0
    //                 },
    //             ]
    //         },
    //         {
    //             avaliacao: [
    //                 {
    //                     criterio: "Comunicação",
    //                     nota: 3.7
    //                 },
    //                 {
    //                     criterio: "Segurança",
    //                     nota: 5.0
    //                 },
    //                 {
    //                     criterio: "Comportamento",
    //                     nota: 2.5
    //                 },
    //                 {
    //                     criterio: "Pontualidade",
    //                     nota: 2.0
    //                 },
    //             ]
    //         },
    //     ]
    // }

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

            setNotaGeralComunicacao(calculateTotalPorcentageCriterio(mediaComunicacao))
            setNotaGeralPontualidade(calculateTotalPorcentageCriterio(mediaPontualidade))
            setNotaGeralDirigibilidade(calculateTotalPorcentageCriterio(mediaDirigibilidade))
            setNotaGeralSeguranca(calculateTotalPorcentageCriterio(mediaSeguranca))
            setNotaGeralComportamento(calculateTotalPorcentageCriterio(mediaComportamento))

            let notaMedia


            if (perfilUser === "MOTORISTA") {
                notaMedia = (mediaComunicacao + mediaSeguranca + mediaPontualidade + mediaDirigibilidade) / 4
            } else {
                notaMedia = (mediaComunicacao + mediaSeguranca + mediaPontualidade + mediaComportamento) / 4
            }

            setNotaMedia(notaMedia.toFixed(1))
        }
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
                                            <p>{userData.viagens.length}</p>
                                            <span>viagens realizadas</span>
                                        </div>
                                    </div>
                                    <div className={styles["simple-box"]}>
                                        <FaStar />
                                        <div className={styles["valor"]}>
                                            <p>{notaMedia > 0.0 ? notaMedia : "--"}</p>
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
                                                    userData.principalTrajeto.partida !== undefined && userData.principalTrajeto.partida !== ""
                                                        ? userData.principalTrajeto.partida
                                                        : "--"
                                                }
                                            </span>
                                        </div>
                                        <div className={styles["cidade-uf"]}>
                                            <IoLocationSharp />
                                            <span>
                                                {
                                                    userData.principalTrajeto.chegada !== undefined && userData.principalTrajeto.chegada !== ""
                                                        ? userData.principalTrajeto.chegada
                                                        : "--"
                                                }
                                            </span>
                                        </div>
                                        {
                                            userData.principalTrajeto.chegada !== undefined
                                            && (
                                                <>

                                                </>)

                                        }
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
                                                    notaGeral={avaliacao.avaliador.notaGeral}
                                                />
                                            ))
                                            : <p>Sem avaliações por enquanto</p>
                                    }
                                </div>
                            </div>

                            <div className={styles["right"]}>
                                {
                                    perfilUser === "PASSAGEIRO"
                                        ? <h4>Motorista fidelizado</h4>
                                        : <h4>Passageiros fidelizados</h4>
                                }

                                <div className={styles["fidelizado"]}>
                                    {
                                        hasMotoristaFidelizado &&
                                        <CardFidelizado
                                            fotoUser={userData.motoristaFidelizado.fotoUrl}
                                            nomeUser={userData.motoristaFidelizado.nome}
                                            localidade={userData.motoristaFidelizado.localidade}
                                            notaGeral={userData.motoristaFidelizado.notaGeral}
                                            qtdViagensJuntos={userData.motoristaFidelizado.qtdViagensJuntos}
                                        />
                                    }

                                    {
                                        hasPassageirosFidelizados &&
                                        userData.passageirosFidelizados.map((fidelizado, index) => (
                                            <CardFidelizado
                                                key={index}
                                                fotoUser={fidelizado.fotoUrl}
                                                nomeUser={fidelizado.nome}
                                                localidade={fidelizado.localidade}
                                                notaGeral={fidelizado.notaGeral}
                                                qtdViagensJuntos={fidelizado.qtdViagensJuntos}
                                            />
                                        ))
                                    }

                                    {
                                        (!hasMotoristaFidelizado && !hasPassageirosFidelizados) && perfilUser === "PASSAGEIRO"
                                            ? <p>Sem motorista fidelizado por enquanto</p>
                                            : <p>Sem passageiro(s) fidelizado(s) por enquanto</p>
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