import React, { useState, useEffect } from "react";
import Sidebar from "../../layout/sidebar/Sidebar";
import styles from './Viagens.module.css';
import CardProximaViagem from './card_proxima_viagem/CardProximaViagem';
import CardViagemFeita from './card_viagem_feita/CardViagemFeita';
import notFound from '../../../utils/assets/image-not-found-viagem.svg';
import axios from "axios";
import { toast } from "react-toastify";

function Viagens() {
    const [viagensPendentes, setViagensPendentes] = useState([]);
    const [viagensFinalizadas, setViagensFinalizadas] = useState([]);

    useEffect(() => {
        const buscarViagens = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/viagem/listar-viagens/${sessionStorage.idUsuario}`);
                const viagensData = response.data[0].viagens;

                const viagensPendentes = viagensData.filter(viagem => viagem.status === 'PENDENTE');
                const viagensFinalizadas = viagensData.filter(viagem => viagem.status === 'FINALIZADA');

                setViagensPendentes(viagensPendentes);
                setViagensFinalizadas(viagensFinalizadas);
            } catch (error) {
                console.error('Erro ao buscar viagens:', error);
            }
        };

        buscarViagens();
    }, []);

    function formatDate(dateString) {
        return dateString.split('-').reverse().join('-');
    }

    const handleDetalhesViagem = (id) => {
        // Implemente a lógica para exibir os detalhes da viagem com o ID fornecido
    };

    const handleCancelarViagem = (id) => {
      console.log("cancelando a viagem " + id)
      alert("Viagem cancelada com sucesso!")
      if(sessionStorage.tipoUsuario === "MOTORISTA"){
        axios.put(`http://localhost:8080/viagem/cancelar-viagem-motorista/${id}`)
        toast.success("Viagem cancelada com sucesso!")
      }
      else{
        axios.put(`http://localhost:8080/viagem/cancelar-viagem-passageiro/${id}`)
        toast.success("Viagem cancelada com sucesso!")
      }
    };

    return (
        <>
            <Sidebar currentPageName={'/viagens'} />

            <div className={styles["main"]}>
                <div className={styles["container"]}>
                    {viagensPendentes.length > 0 && (
                        <div className={styles["container-proxima-viagem"]}>
                            <div className={styles["header-proxima-viagem"]}>
                                <h3>Próximas viagens</h3>
                                <div className={styles["alerta-viagem"]}>
                                    <div className={styles["alerta-viagem-circle"]}></div>
                                </div>
                            </div>
                            {viagensPendentes.map(viagem => (
                                <CardProximaViagem
                                    key={viagem.idViagem}
                                    cidadeOrigem={viagem.origem}
                                    cidadeDestino={viagem.destino}
                                    valor={viagem.valor}
                                    data={formatDate(viagem.dataViagem)}
                                    onDetalhesClick={() => handleDetalhesViagem(viagem.idViagem)}
                                    onCancelarClick={() => handleCancelarViagem(viagem.idViagem)}
                                />
                            ))}
                        </div>
                    )}

                    {viagensPendentes.length > 0 && <div className={styles["line-separator"]}></div>}

                    <div className={styles["historico"]}>
                        <div className={styles["historico-header"]}>
                            <h3>Últimas viagens</h3>
                        </div>

                        {viagensFinalizadas.length > 0 ? (
                            <div className={styles["historico-viagens"]}>
                                {viagensFinalizadas.map(viagem => (
                                    <CardViagemFeita
                                        key={viagem.idViagem}
                                        cidadeOrigem={viagem.origem}
                                        cidadeDestino={viagem.destino}
                                        valor={viagem.valor}
                                        data={formatDate(viagem.dataViagem)}
                                        onDetalhesClick={() => handleDetalhesViagem(viagem.idViagem)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={styles["not-found"]}>
                                <h4>Nenhuma viagem finalizada para mostrar</h4>
                                <img src={notFound} alt="Imagem de nenhuma viagem encontrada" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Viagens;
