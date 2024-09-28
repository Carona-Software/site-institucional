import { useNavigate, useParams } from "react-router-dom"
import Sidebar from "../../layout/sidebar/Sidebar"
import styles from './Viagens.module.css'
import CardProximaViagem from './card_proxima_viagem/CardProximaViagem'
import CardViagemFeita from './card_viagem_feita/CardViagemFeita'
import { useEffect, useState } from "react"
import notFound from '../../../utils/assets/image-not-found-viagem.svg'
import api from "../../../Api"


function Viagens() {
    const navigate = useNavigate()
    const { idUser } = useParams()

    const [viagens, setViagens] = useState([{
        id: 1,
        cidadeOrigem: 'São Paulo',
        cidadeDestino: 'Campinas',
        dataHora: '17/05/2024 13:00',
        preco: 36,
        status: 'PENDENTE'
    }])

    const [viagemPendente, setViagemPendente] = useState({})

    const getViagensUser = async () => {
        try {
            const response = await api.get(`/viagens/${idUser}`)

            response.data.forEach(viagem => {
                if (viagem.status.toLocaleUpperCase() === 'PENDENTE' || viagem.status.toUpperCase() === 'EM ANDAMENTO') {
                    setViagemPendente(viagem)
                }
            });

            const viagensFiltradas = response.data.filter(viagem => viagem !== viagemPendente.id)
            setViagens(viagensFiltradas)
        } catch (error) {
            console.log('Não foi possível buscar as viagens.');
            console.log('Erro: ', error);
        }
    }

    useEffect(() => {
        getViagensUser()
    }, [])

    function filtrarViagens() {
        // useEffect(() => {
        //     api.get(`viagens/${idUser}/filtro`)
        //         .then(res => {
        //             console.log(res);
        //             setViagens(res.data)
        //             viagens.forEach(viagem => {
        //                 if (viagem.status == 'PENDENTE') {
        //                     setTemViagemPendente(true)
        //                 }
        //             });
        //         })
        //         .catch(error => console.log(error))
        // }, [idUser])
    }

    const handleDetalhesViagem = (idViagem) => {
        navigate(`/viagens/detalhes/${idViagem}`)
    }

    const handleCancelarViagem = (id) => {}

    return (
        <>
            <Sidebar currentPageName={'/viagens'} />

            <div className={styles["main"]}>
                <div className={styles["container"]}>
                    {
                        viagemPendente &&
                        <div className={styles["container-proxima-viagem"]}>
                            <div className={styles["header-proxima-viagem"]}>
                                {viagemPendente.status === 'PENDENTE' ?
                                    <h3>Próxima viagem</h3>
                                    :
                                    <h3>Viagem em andamento</h3>
                                }
                                <div className={viagemPendente.status === 'PENDENTE' ? `${styles["alerta-viagem"]} ${styles["pendente"]}` : `${styles["alerta-viagem"]} ${styles["em-andamento"]}`}>
                                    <div className={viagemPendente.status === 'PENDENTE' ? `${styles["alerta-viagem-circle"]} ${styles["circle-pendente"]}` : `${styles["alerta-viagem-circle"]} ${styles["circle-em-andamento"]}`}></div>
                                </div>
                            </div>
                            <CardProximaViagem
                                cidadeOrigem='São Paulo, SP'
                                cidadeDestino={'Campinas, SP'}
                                valor={36}
                                data='17/05/2024'
                                onDetalhesClick={() => handleDetalhesViagem(viagemPendente.id)} onCancelarClick={() => handleCancelarViagem(viagemPendente.id)}
                            />
                        </div>
                    }

                    {viagemPendente && <div className={styles["line-separator"]}></div>}

                    <div className={styles["historico"]}>
                        <div className={styles["historico-header"]}>
                            <h3>Últimas viagens</h3>
                            <div className={styles["historico-header-filtros"]}>
                                <div className={styles["box-filtro"]}>
                                    <span>Data</span>
                                    <select name="tipoTransacao" id="tipo-transacao" className={styles["box-select"]} onChange={filtrarViagens} >
                                        <option value="sempre">Sempre</option>
                                        <option value="hoje">Hoje</option>
                                        <option value="ultima-semana">Últimos 7 dias</option>
                                        <option value="ultimo-mes">Último mês</option>
                                    </select>
                                </div>

                            </div>
                        </div>

                        {viagens.length > 0 ?
                            viagens.map((viagem, index) => (
                                <div className={styles["historico-viagens"]}>
                                    <CardViagemFeita
                                        key={index}
                                        cidadeOrigem={`${viagem.endereco.pontoPartida.cidade}, ${viagem.endereco.pontoPartida.uf}`}
                                        cidadeDestino={`${viagem.endereco.pontoChegada.cidade}, ${viagem.endereco.pontoPartida.uf}`}
                                        valor={viagem.preco}
                                        data={`${viagem.data} - ${viagem.horarioSaida}`}
                                        onDetalhesClick={() => handleDetalhesViagem(viagem.id)}
                                    />
                                </div>
                            ))
                            :
                            <div className={styles["not-found"]}>
                                <h4>Nenhuma viagem para mostrar</h4>
                                <img src={notFound} alt="Imagem de nenhuma viagem encontrada" />
                            </div>
                        }

                    </div>

                </div>
            </div>
        </>

    )
}

export default Viagens