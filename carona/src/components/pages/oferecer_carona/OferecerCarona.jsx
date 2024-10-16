import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../layout/sidebar/Sidebar"
import styles from './OferecerCarona.module.css'
import { FaSearch } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useEffect, useState } from "react";
import MapGeolocation from "../../map/MapGeolocation";
import SearchGeocode from "../../map/search_geocode/SearchGeocode";
import api from "../../../Api";
import loading from "../../../utils/assets/loading.gif";
import { inputSomenteNumero } from "../../../utils/InputValidations";
import { toast } from "react-toastify";
import withAuthentication from "../../../authentication";

function OferecerCarona() {

  const idUser = sessionStorage.getItem("idUser");
  const generoUser = sessionStorage.getItem('generoUser')

  let local = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [carrosUser, setCarrosUser] = useState([]);

  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const [viagem, setViagem] = useState({
    motoristaId: idUser,
    pontoPartida: {
      latitude: "",
      longitude: ""
    },
    pontoDestino: {
      latitude: "",
      longitude: ""
    },
    data: formatDateForInput(new Date()),
    hora: "",
    carroId: '',
    preco: "",
    capacidadePassageiros: 1,
    apenasMulheres: false,
  });

  const getCarrosUser = async () => {
    await api.get(`/carros/usuario/${idUser}`)
      .then((res) => {
        setCarrosUser(res.data)
        if (res.data.length > 0) {
          setViagem({...viagem, carroId: res.data[0].id})
        }
      })
      .catch(error => console.log('Erro ao buscar carros do usuário: ', error))
  }

  useEffect(() => {
    getCarrosUser();
  }, []);

  // gerar horarios para combo box a partir da hora atual
  function gerarHorarioComboBox() {
    const timestamps = [];

    let horaAtual = new Date().getHours();
    let minutoAtual = new Date().getMinutes();
    let hoje = new Date();

    const fullDateString = `${viagem.data}T00:00:00`;
    let dataEscolhida = new Date(fullDateString)

    hoje.setHours(0, 0, 0, 0);
    dataEscolhida.setHours(0, 0, 0, 0);

    let dataSelecionadaIsFuture = dataEscolhida > hoje
    
    for (let hour = dataSelecionadaIsFuture ? 0 : horaAtual; hour <= 23; hour++) {

      if (hour > horaAtual) {
        timestamps.push(formatHour(hour, 0));
        timestamps.push(formatHour(hour, 30));
        continue;
      }

      if (minutoAtual < 30) {
        timestamps.push(formatHour(hour, 30));
      }
    }

    if (dataSelecionadaIsFuture) {
      timestamps.unshift(formatHour(0, 0));
    }

    timestamps.unshift('Selecione o horário')
    setHorariosComboBox(timestamps)
    // return timestamps;
  }

  const formatHour = (hour, minute) => {
    const date = new Date(0, 0, 0, hour, minute, 0);
    return date.toLocaleTimeString("pt-BR", {
      hour: "numeric",
      minute: "numeric",
    });
  };

  const [horariosComboBox, setHorariosComboBox] = useState([]);

  const handleDataChange = (e) => {
    setViagem({ ...viagem, data: e.target.value })
  }
  
  useEffect(() => {
    gerarHorarioComboBox()
  }, [viagem.data])

  const handleViagemSave = async () => {
    console.log("viagem: ", viagem);

    if (
      !viagem.pontoPartida.latitude ||
      !viagem.pontoPartida.longitude ||
      !viagem.pontoDestino.latitude ||
      !viagem.pontoDestino.longitude ||
      !viagem.data ||
      !viagem.hora ||
      !viagem.preco ||
      !viagem.carroId
    ) {
      toast.error("Preencha todos os campos!");
    } else {
      try {
        // let response = await api.post('/cadastrar', viagem)
        // console.log(response);
        // console.log("viagem: ", viagem);
        toast.success("Viagem cadastrada com sucesso!");
      } catch (error) {
        toast.error("Erro ao cadastrar a viagem.");
      }

      console.log(viagem);
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
                      pontoPartida: {
                        latitude: place.geometry.coordinates[1],
                        longitude: place.geometry.coordinates[0]
                      }
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
                      pontoDestino: {
                        latitude: place.geometry.coordinates[1],
                        longitude: place.geometry.coordinates[0]
                      }
                    })}
                  />
                </div>

                <div className={styles["box-input"]} style={{ width: "44%" }}>
                  <h4>Data da Viagem</h4>
                  <div className={styles["input-div"]}>
                    <input
                      type="date"
                      onChange={handleDataChange}
                      value={viagem.data} />
                  </div>
                </div>

                <div className={styles["box-select"]} name="hora">
                  <h4>Horário de Partida</h4>
                  <select onClick={(e) => setViagem({ ...viagem, hora: e.target.value })}>
                    {
                      horariosComboBox.map((horario, index) => (
                        <option
                          key={index}
                          value={horario}
                        >
                          {horario}{horario !== 'Selecione o horário' && 'h'}
                        </option>
                      ))
                    }
                  </select>
                </div>

                <div className={styles["box-select"]}>
                  <h4>Carro</h4>
                  <select onClick={(e) => setViagem({ ...viagem, carroId: Number(e.target.value) })}>
                    {
                      carrosUser.length > 0 ?
                        carrosUser.map(carro => (
                          <option
                            key={carro.id}
                            value={carro.id}
                          >
                            {carro.marca} {carro.modelo}
                          </option>
                        ))
                        : <option value={null}>Não há carros</option>
                    }
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
                      onChange={(e) => setViagem({ ...viagem, preco: e.target.value })}
                      onInput={inputSomenteNumero}
                    />
                  </div>
                </div>

                <div className={styles["box-input"]} style={{ width: "44%" }}>
                  <h4>Passageiros</h4>
                  <div className={styles["input-qtd-passageiro"]}>
                    <button className={styles["button-diminuir"]} onClick={() => setViagem({ ...viagem, capacidadePassageiros: viagem.capacidadePassageiros > 1 ? viagem.capacidadePassageiros - 1 : viagem.capacidadePassageiros })} >
                      <AiOutlineMinus />
                    </button>

                    <input disabled value={viagem.capacidadePassageiros} />

                    <button className={styles["button-aumentar"]} onClick={() => setViagem({ ...viagem, capacidadePassageiros: viagem.capacidadePassageiros < 4 ? viagem.capacidadePassageiros + 1 : viagem.capacidadePassageiros })} >
                      <AiOutlinePlus />
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
              <MapGeolocation
                latitudePartida={viagem.pontoPartida.latitude}
                longitudePartida={viagem.pontoPartida.longitude}
                latitudeDestino={viagem.pontoDestino.latitude}
                longitudeDestino={viagem.pontoDestino.longitude}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthentication(OferecerCarona, 'MOTORISTA');