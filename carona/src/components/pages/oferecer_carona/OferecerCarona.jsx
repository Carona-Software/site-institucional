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

function OferecerCarona() {

  const idUser = sessionStorage.getItem("idUser");
  const generoUser = sessionStorage.getItem('generoUser')

  let local = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [carrosUser, setCarrosUser] = useState([]);

  const getCarrosUser = async () => {
    await api.get(`/carros/usuario/${idUser}`)
      .then((res) => {
        console.log(res.data);
        setCarrosUser(res.data)
      })
      .catch(error => console.log('Erro ao buscar carros do usuário: ', error))
  }

  useEffect(() => {
    getCarrosUser();
  }, []);

  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // dataHora pré formatação para post
  const [dataHora, setDataHora] = useState({
    data: formatDateForInput(new Date()),
    hora: "",
  });

  // gerar horarios para combo box a partir da hora atual
  function gerarHorarioComboBox() {
    const timestamps = [];

    let horaAtual = new Date().getHours();
    let minutoAtual = new Date().getMinutes();
    let hoje = new Date();
    console.log('hoje: ', hoje);
    let dataEscolhida = new Date(dataHora.data)
    console.log('dataEscolhida: ', dataEscolhida);

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

    timestamps.unshift('Selecione o horário')
    return timestamps;
  }

  const formatHour = (hour, minute) => {
    const date = new Date(0, 0, 0, hour, minute, 0);
    return date.toLocaleTimeString("pt-BR", {
      hour: "numeric",
      minute: "numeric",
    });
  };

  const [horariosComboBox, setHorariosComboBox] = useState(gerarHorarioComboBox());

  const handleDataChange = (e) => {
    
    console.log('nova data: ', e.target.value);
    
    setDataHora({ ...dataHora, data: e.target.value })
    const horarios = gerarHorarioComboBox()
    setHorariosComboBox(horarios)
    console.log('horariosComboBox: ', horarios);
  }

  const [viagem, setViagem] = useState({
    idMotorista: idUser,
    latitudePartida: "",
    longitudePartida: "",
    latitudeDestino: "",
    longitudeDestino: "",
    horario: "",
    idCarro: '',
    valor: "",
    qntPassageiros: 1,
    soMulheres: false,
  });

  const handleViagemSave = async () => {
    if (
      !viagem.latitudePartida ||
      !viagem.longitudePartida ||
      !viagem.latitudeDestino ||
      !viagem.longitudeDestino ||
      !dataHora.data ||
      !dataHora.hora ||
      !viagem.valor
    ) {
      toast.error("Preencha todos os campos!");
    } else {
      try {
        // let response = await api.post('/cadastrar', viagem)
        // console.log(response);
        setViagem({
          ...viagem,
          horario: `${dataHora.data}T${dataHora.hora}:00`,
        });
        console.log(viagem);
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
                      latitudePartida: place.geometry.coordinates[1],
                      longitudePartida: place.geometry.coordinates[0]
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
                      latitudeDestino: place.geometry.coordinates[1],
                      longitudeDestino: place.geometry.coordinates[0]
                    })}
                  />
                </div>

                <div className={styles["box-input"]} style={{ width: "44%" }}>
                  <h4>Data da Viagem</h4>
                  <div className={styles["input-div"]}>
                    <input
                      type="date"
                      name="data"
                      onChange={handleDataChange}
                      value={dataHora.data} />
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
                          {horario}{horario !== 'Selecione o horário' && 'h'}
                        </option>
                      ))
                    }
                  </select>
                </div>

                <div className={styles["box-select"]}>
                  <h4>Carro</h4>
                  <select>
                    {
                      carrosUser.length > 0 ?
                        carrosUser.map(carro => (
                          <option
                            key={carro.id}
                            value={carro.id}
                            onClick={() => setViagem({ ...viagem, idCarro: carro.id })}
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
                      onChange={(e) => setViagem({ ...viagem, valor: e.target.value })}
                      onInput={inputSomenteNumero}
                    />
                  </div>
                </div>

                <div className={styles["box-input"]} style={{ width: "44%" }}>
                  <h4>Passageiros</h4>
                  <div className={styles["input-qtd-passageiro"]}>
                    <button className={styles["button-diminuir"]} onClick={() => setViagem({ ...viagem, qntPassageiros: viagem.qntPassageiros > 1 ? viagem.qntPassageiros - 1 : viagem.qntPassageiros })} >
                      <AiOutlineMinus />
                    </button>

                    <input disabled value={viagem.qntPassageiros} />

                    <button className={styles["button-aumentar"]} onClick={() => setViagem({ ...viagem, qntPassageiros: viagem.qntPassageiros < 4 ? viagem.qntPassageiros + 1 : viagem.qntPassageiros })} >
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
                latitudePartida={viagem.latitudePartida}
                longitudePartida={viagem.longitudePartida}
                latitudeDestino={viagem.latitudeDestino}
                longitudeDestino={viagem.longitudeDestino}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default OferecerCarona;
