import { useNavigate, useParams } from "react-router-dom"
import Sidebar from "../../layout/sidebar/Sidebar"
import styles from './Viagens.module.css'
import CardProximaViagem from './card_proxima_viagem/CardProximaViagem'
import CardViagemFeita from './card_viagem_feita/CardViagemFeita'
import { useEffect, useState } from "react"
import notFound from '../../../utils/assets/image-not-found-viagem.svg'
import api from "../../../Api"
import { formatarData, formatTime } from "../../../utils/functions"


function Viagens() {
    const navigate = useNavigate()
    const { idUser } = useParams()

    const [viagens, setViagens] = useState([])
    const [viagemPendente, setViagemPendente] = useState({})

    const getViagensUser = async () => {
        try {
            const response = await api.get(`/viagens/usuario/${idUser}`)

            // console.log('viagens: ', response.data);

            response.data.forEach(viagem => {;
                if (viagem.status.toLocaleUpperCase() === 'PENDENTE' || viagem.status.toUpperCase() === 'EM ANDAMENTO') {
                    setViagemPendente(viagem)
                }
            });

            const viagensFiltradas = response.data.filter(viagem => viagem.status !== 'PENDENTE' || viagem.status !== 'EM ANDAMENTO')
            setViagens(viagensFiltradas)
        } catch (error) {
            console.log('Não foi possível buscar as viagens.');
            console.log('Erro: ', error);
        }
    }

    useEffect(() => {
        getViagensUser()
    }, [])

    const navigateDetalhesViagem = (idViagem) => {
        navigate(`/viagens/detalhes/${idViagem}`)
    }

    const handleCancelarViagem = (id) => { }

    return (
        <>
            <Sidebar currentPageName={'/viagens'} />

            <div className={styles["main"]}>
                <div className={styles["container"]}>
                    {/* {
                        viagemPendente != null &&
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
                                cidadeOrigem={`${viagemPendente.trajeto.pontoPartida.cidade}, ${viagemPendente.trajeto.pontoPartida.uf}`}
                                cidadeDestino={`${viagemPendente.trajeto.pontoChegada.cidade}, ${viagemPendente.trajeto.pontoPartida.uf}`}
                                valor={viagemPendente.preco}
                                data={`${formatarData(viagemPendente.data)} - ${formatTime(viagemPendente.horarioSaida)}`}
                                onCancelarClick={() => handleCancelarViagem(viagemPendente.id)}
                            />
                        </div>
                    }

                    {viagemPendente && <div className={styles["line-separator"]}></div>} */}

                    <div className={styles["historico"]}>
                        <div className={styles["historico-header"]}>
                            <h3>Últimas viagens</h3>
                            <div className={styles["historico-header-filtros"]}>
                                <div className={styles["box-filtro"]}>
                                    <span>Data</span>
                                    <select
                                        className={styles["box-select"]}
                                        onChange={() => { }}
                                    >
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
                                        cidadeOrigem={`${viagem.trajeto.pontoPartida.cidade}, ${viagem.trajeto.pontoPartida.uf}`}
                                        cidadeDestino={`${viagem.trajeto.pontoChegada.cidade}, ${viagem.trajeto.pontoPartida.uf}`}
                                        valor={viagem.preco}
                                        data={`${formatarData(viagem.data)} - ${formatTime(viagem.horarioSaida)}`}
                                        onDetalhesClick={() => navigateDetalhesViagem(viagem.id)}
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