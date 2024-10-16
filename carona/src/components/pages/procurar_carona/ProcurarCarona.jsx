import styles from './ProcurarCarona.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../layout/sidebar/Sidebar";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import AnimacaoEstrada from '../../layout/animacao_estrada/AnimacaoEstrada';
import SearchGeocode from '../../map/search_geocode/SearchGeocode';
import CardViagem from './card_viagem/CardViagem';
import notFound from '../../../utils/assets/image-not-found-viagem.svg';
import { toast } from "react-toastify";
import api from '../../../Api';
import { inputSomenteNumero } from '../../../utils/InputValidations';
import withAuthentication from '../../../authentication';
import { IoLocationSharp } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';


function ProcurarCarona() {
    let local = useLocation();
    const navigate = useNavigate();

    const generoUser = localStorage.getItem('generoUser')
    // const generoUser = "FEMININO";

    const [viagemPesquisaData, setViagemPesquisaData] = useState({
        pontoPartida: {
            latitude: '',
            longitude: '',
        },
        pontoDestino: {
            latitude: '',
            longitude: '',
        },
        data: '',
        apenasMulheres: false,
        capacidadePassageiros: 4,
        precoMinimo: null,
        precoMaximo: null
    });

    const [viagensEncontradas, setViagensEncontradas] = useState([
        // {
        //     id: 1,
        //     apenasMulheres: false,
        //     data: "2025-10-03",
        //     preco: 30,
        //     horarioSaida: "10:25:41",
        //     horarioChegada: "12:00:00",
        //     status: "PENDENTE",
        //     motorista: {
        //         id: 1,
        //         nome: "Gustavo Medeiros",
        //         perfil: "MOTORISTA",
        //         urlFoto: "urlFoto_1dac3571d57d",
        //         notaGeral: 3.4
        //     },
        //     trajeto: {
        //         pontoPartida: {
        //             latitude: null,
        //             longitude: null,
        //             cep: null,
        //             cidade: null,
        //             uf: null,
        //             bairro: null,
        //             logradouro: null,
        //             numero: null
        //         },
        //         pontoChegada: {
        //             latitude: null,
        //             longitude: null,
        //             cep: null,
        //             cidade: null,
        //             uf: null,
        //             bairro: null,
        //             logradouro: null,
        //             numero: null
        //         }
        //     }
        // }
    ]);

    const handleNavigateViagem = (idViagem) => {
        navigate(`/viagens/detalhes/${idViagem}`);
    };

    const handleSubmitViagem = async () => {
        console.log("Viagem a pesquisar: " + JSON.stringify(viagemPesquisaData));

        try {
            const response = await api.post('/viagem/buscar-viagens', viagemPesquisaData);
            if (response.data.length > 0) {
                setViagensEncontradas(response.data);
                // toast.success('Viagens encontradas com sucesso!');
            } else {
                setViagensEncontradas([]);
                toast.info('Nenhuma viagem encontrada.');
            }

            console.log('Data: ' + response.data);
            setViagensEncontradas(response.data);
        } catch (error) {
            console.log(error);
            toast.error('Erro ao buscar viagens');
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
                            startIcon={<MdMyLocation />}
                            name='cidadeOrigem'
                            className={styles["box-input"]}
                            onClickEvent={(place) => setViagemPesquisaData({
                                ...viagemPesquisaData,
                                pontoPartida: {
                                    latitude: place.geometry.coordinates[1],
                                    longitude: place.geometry.coordinates[0]
                                }
                            })}
                        />

                        <FaArrowRightLong className={styles["arrow"]} />

                        <SearchGeocode
                            placeholder='Chegada'
                            startIcon={<IoLocationSharp />}
                            name='cidadeDestino'
                            className={styles["box-input"]}
                            onClickEvent={(place) => setViagemPesquisaData({
                                ...viagemPesquisaData,
                                pontoDestino: {
                                    latitude: place.geometry.coordinates[1],
                                    longitude: place.geometry.coordinates[0]
                                }
                            })}
                        />

                        <div className={styles["box-input-date"]}>
                            <label htmlFor="dateId"><FaCalendarAlt /></label>
                            <input
                                type="date"
                                className={styles["inputDate"]}
                                onChange={(e) => setViagemPesquisaData({
                                    ...viagemPesquisaData,
                                    data: e.target.value
                                })}
                            />
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

                            <div className={styles["box-filtro"]} >
                                <span>Passageiros</span>
                                <div className={styles["input-qtd-passageiro"]}>
                                    <button className={styles["button-diminuir"]} onClick={() => setViagemPesquisaData({
                                        ...viagemPesquisaData,
                                        capacidadePassageiros: viagemPesquisaData.capacidadePassageiros > 1 ? viagemPesquisaData.capacidadePassageiros - 1 : viagemPesquisaData.capacidadePassageiros
                                    })} >
                                        <AiOutlineMinus />
                                    </button>

                                    <input disabled value={viagemPesquisaData.capacidadePassageiros} />

                                    <button className={styles["button-aumentar"]} onClick={() => setViagemPesquisaData({
                                        ...viagemPesquisaData,
                                        capacidadePassageiros: viagemPesquisaData.capacidadePassageiros < 4 ? viagemPesquisaData.capacidadePassageiros + 1 : viagemPesquisaData.capacidadePassageiros
                                    })} >
                                        <AiOutlinePlus />
                                    </button>
                                </div>
                            </div>

                            <div className={styles["box-filtro"]} >
                                <span>Preço mínimo</span>
                                <div className={styles["input-div-preco"]}>
                                    <span>R$</span>
                                    <input
                                        className={styles["input-preco"]}
                                        type="text"
                                        name="preco"
                                        placeholder="00,00"
                                        onChange={(e) => setViagemPesquisaData({ ...viagemPesquisaData, precoMinimo: e.target.value })}
                                        value={viagemPesquisaData.precoMinimo}
                                        onInput={inputSomenteNumero}
                                    />
                                </div>
                            </div>

                            <div className={styles["box-filtro"]} >
                                <span>Preço máximo</span>
                                <div className={styles["input-div-preco"]}>
                                    <span>R$</span>
                                    <input
                                        className={styles["input-preco"]}
                                        type="text"
                                        name="preco"
                                        placeholder="00,00"
                                        onChange={(e) => setViagemPesquisaData({ ...viagemPesquisaData, precoMaximo: e.target.value })}
                                        value={viagemPesquisaData.precoMaximo}
                                        onInput={inputSomenteNumero}
                                    />
                                </div>
                            </div>

                            {
                                generoUser === "FEMININO" &&
                                <div className={styles["box-filtro"]} style={{ width: '15%' }}>
                                    <span>Apenas mulheres</span>

                                    <div
                                        className={viagemPesquisaData.apenasMulheres ? `${styles["toggle-button"]} ${styles["ativado"]}` : styles["toggle-button"]}
                                        onClick={() => setViagemPesquisaData({ ...viagemPesquisaData, apenasMulheres: !viagemPesquisaData.apenasMulheres })}
                                    >
                                        <input type="checkbox" name="soMulheres" value={viagemPesquisaData.apenasMulheres} />
                                    </div>
                                </div>
                            }

                        </div>
                    }

                    {
                        viagensEncontradas.length > 0
                            ? <div className={styles["viagens"]}>
                                {viagensEncontradas.map((viagem) => {
                                    return (
                                        <CardViagem
                                            key={viagem.id}
                                            viagemData={viagem}
                                            onClickEvent={() => handleNavigateViagem(viagem.id)}
                                        />
                                    );
                                })}
                            </div>
                            : <div className={styles["not-to-show"]}>
                                <h4>Nenhuma viagem para mostrar</h4>
                                <img src={notFound} alt="Nenhuma viagem encontrada" />
                            </div>
                    }
                </div>
            </div>
        </>
    );
}

export default withAuthentication(ProcurarCarona, 'PASSAGEIRO');