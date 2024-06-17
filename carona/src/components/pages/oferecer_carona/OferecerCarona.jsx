import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../layout/sidebar/Sidebar"
import styles from './OferecerCarona.module.css'
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useEffect, useState } from "react";
import MapGeolocation from "../../map/MapGeolocation";
import SearchGeocode from "../../map/search_geocode/SearchGeocode";
import api from '../../../Api'
import loading from '../../../utils/assets/loading.gif'
import { inputSomenteNumero } from "../../../utils/InputValidations";
import axios from "axios";

const apiUrl = "http://localhost:8080"; 

function OferecerCarona() {
    const idUser = localStorage.getItem('idUser')
    const generoUser = 'FEMININO'

    let local = useLocation();
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [carrosUser, setCarrosUser] = useState([])
    const [primeiroIdCarro, setPrimeiroIdCarro] = useState(""); 

    useEffect(() => {
        let ignore = false;
    
        const fetchApi = async () => {
            try {
                const response = await axios.get(`${apiUrl}/carro/listar-carros/${sessionStorage.idUsuario}`);
                console.log(response.data);
                if (!ignore) {
                    setCarrosUser(response.data);
                    if (response.data.length > 0) {
                        setPrimeiroIdCarro(response.data[0].idCarro); 
                        setViagem(prevViagem => ({
                            ...prevViagem,
                            idCarro: response.data[0].idCarro
                        }));
                    }
                    console.log(response.data);
                    console.log(primeiroIdCarro)
                }
            } catch (error) {
                console.error("Erro ao obter lista de carros:", error.message);
            }
        };
    
        fetchApi();
    
        return () => {
            ignore = true;
        };
    }, []);
    

    // gerar horas para combo box a partir da hora atual
    function gerarHorarioComboBox() {
        const timestamps = [];

        let horaAtual = new Date().getHours();
        let minutoAtual = new Date().getMinutes()

        for (let hour = horaAtual; hour <= 23; hour++) {
            if (hour > horaAtual) {
                timestamps.push(formatHour(hour, 0));
                timestamps.push(formatHour(hour, 30));
                continue
            }

            if (minutoAtual < 30) {
                timestamps.push(formatHour(hour, 30));
            }
        }

        return timestamps;
    }

    const formatHour = (hour, minute) => {
        const date = new Date(0, 0, 0, hour, minute, 0);
        return date.toLocaleTimeString('pt-BR', { hour: 'numeric', minute: 'numeric' });
    }

    const horariosComboBox = gerarHorarioComboBox();

    // dataHora pré formatação para post
    const [dataHora, setDataHora] = useState({
        data: '',
        hora: ''
    })
    const idMotorista = parseInt(sessionStorage.idUsuario);

    const [viagem, setViagem] = useState({
        idCarro: primeiroIdCarro,
        idMotorista: idMotorista,
        latitudePontoPartida: "",
        longitudePontoPartida: "",
        latitudePontoDestino: "",
        longitudePontoDestino: "",
        diaViagem: "",
        horario: "",
        valor: "",
        qntPassageiros: 1,
        soMulheres: false,
    });

    // useEffect(() => {
    //     api.get(`/listar-carros/${idUser}`)
    //         .then(res => {
    //             console.log(res.data);
    //             setCarrosUser(res.data)
    //         })
    //         .catch(error => console.log(error))
    // }, [idUser])

    const handleViagemSave = async () => {
        if (!dataHora.data || !dataHora.hora) {
            console.error("A data e o horário da viagem devem ser preenchidos.");
            return;
        }
    
        const dataHoraViagem = `${dataHora.data}T${dataHora.hora}:00`;
        const viagemAtualizada = { ...viagem, diaViagem: dataHora.data, horario: dataHora.hora };

        console.log(JSON.stringify(viagemAtualizada))
        
        try {
            const response = await axios.post(`${apiUrl}/viagem/criar-viagem`, viagemAtualizada);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao cadastrar carona:", error.message);
        }
    };
    
    
    
    
    return (
        <>
            <Sidebar currentPageName={local.pathname} />

            <div className={styles["main"]}>
                <div className={styles["container"]}>
                    <h3>Oferecer Carona</h3>

                    <div className={styles["viagem-container"]}>
                        <div className={styles["box-info"]}>
                            <div className={styles["form"]}>

                                <div className={styles["box-input"]} style={{ width: "100%" }}>
                                    <h4>Ponto de Partida</h4>

                                    <SearchGeocode
                                        placeholder='Endereço de Partida'
                                        endIcon={<FaSearch />}
                                        name='pontoPartida'
                                        className={styles["input-div"]}
                                        onClickEvent={(place) => setViagem({
                                            ...viagem,
                                            latitudePontoPartida: place.geometry.coordinates[1],
                                            longitudePontoPartida: place.geometry.coordinates[0]
                                        })}
                                    />

                                </div>

                                <div className={styles["box-input"]} style={{ width: "100%" }}>
                                    <h4>Ponto de Chegada</h4>

                                    <SearchGeocode
                                        placeholder='Endereço de Chegada'
                                        endIcon={<FaSearch />}
                                        name='pontoChegada'
                                        className={styles["input-div"]}
                                        onClickEvent={(place) => setViagem({
                                            ...viagem,
                                            latitudePontoDestino: place.geometry.coordinates[1],
                                            longitudePontoDestino: place.geometry.coordinates[0]
                                        })}
                                    />
                                </div>

                                <div className={styles["box-input"]} style={{ width: "44%" }}>
                                    <h4>Data da Viagem</h4>
                                    <div className={styles["input-div"]}>
                                        <input type="date" name="data" onChange={e => setDataHora({ ...dataHora, data: e.target.value })} />
                                    </div>
                                </div>

                                <div className={styles["box-select"]} name="hora">
                                    <h4>Horário de Partida</h4>
                                    <select onClick={(e) => setDataHora({ ...dataHora, hora: e.target.value })}>
                                        {
                                            horariosComboBox.map((horario, index) => (
                                                <option
                                                    key={index}
                                                    value={horario}
                                                // onClick={handleHoraClick}
                                                >
                                                    {horario}h
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className={styles["box-select"]}>
                                    <h4>Carro</h4>
                                    <select onChange={(e) => setViagem({ ...viagem, idCarro: e.target.value })}>
                                        {carrosUser.length > 0 ? (
                                            carrosUser.map(carro => (
                                                <option
                                                    key={carro.idCarro}
                                                    value={carro.idCarro}
                                                >
                                                    {carro.marca} {carro.modelo}
                                                </option>
                                            ))
                                        ) : (
                                            <option value={null}>Não há carros</option>
                                        )}
                                    </select>

                                </div>


                                <div className={styles["box-input"]} style={{ width: "44%" }}>
                                    <h4>Preço (passageiro)</h4>
                                    <div className={styles["input-div-preco"]}>
                                        <span>R$</span>
                                        <input
                                            className={styles["input-preco"]}
                                            type="text"
                                            name="preco"
                                            placeholder="00,00"
                                            onChange={(e) => setViagem({ ...viagem, valor: e.target.value })}
                                            onInput={inputSomenteNumero}
                                        />
                                    </div>
                                </div>

                                <div className={styles["box-input"]} style={{ width: "44%" }}>
                                    <h4>Passageiros</h4>
                                    <div className={styles["input-qtd-passageiro"]}>
                                        <button className={styles["button-diminuir"]} onClick={() => setViagem({ ...viagem, qntPassageiros: viagem.qntPassageiros > 1 ? viagem.qntPassageiros - 1 : viagem.qntPassageiros })} >
                                            <FaMinus />
                                        </button>

                                        <input disabled value={viagem.qntPassageiros} />

                                        <button className={styles["button-aumentar"]} onClick={() => setViagem({ ...viagem, qntPassageiros: viagem.qntPassageiros < 4 ? viagem.qntPassageiros + 1 : viagem.qntPassageiros })} >
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>

                                {
                                    generoUser === "FEMININO" &&
                                    <div className={styles["box-input"]} style={{ width: "44%" }}>
                                        <h4>Apenas mulheres</h4>

                                        <div
                                            className={viagem.soMulheres ? `${styles["toggle-button"]} ${styles["ativado"]}` : styles["toggle-button"]}
                                            onClick={() => setViagem({ ...viagem, soMulheres: !viagem.soMulheres })}
                                        >
                                            <input type="checkbox" name="soMulheres" value={viagem.soMulheres} />
                                        </div>
                                    </div>
                                }

                                <div className={styles["action-buttons"]}>
                                    <button
                                        className={styles["cancelar"]}
                                        onClick={() => navigate('/meu-perfil')}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className={styles["finalizar"]}
                                        onClick={handleViagemSave}
                                        type="submit"
                                    >
                                        {
                                            isLoading ?
                                                <img src={loading} alt="Carregando" />
                                                : <span>Salvar</span>
                                        }
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div className={styles["box-mapa"]}>
                            {/* <MapGeolocation /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default OferecerCarona