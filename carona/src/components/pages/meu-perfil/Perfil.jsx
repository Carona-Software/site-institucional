import Sidebar from "../../layout/sidebar/Sidebar";
import styles from "./Perfil.module.css";
import distanciaIcon from "../../../utils/assets/distanciaIcon.svg";
import transacaoIcon from "../../../utils/assets/transacaoIcon.svg";
import { IoIosInformation } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { IoTime } from "react-icons/io5";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { IoMdChatbubbles } from "react-icons/io";
import { PiSteeringWheelFill } from "react-icons/pi";
import ActionButton from "../../layout/action_button/ActionButton";
import { BsPencilFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import api from "../../../Api";

function Perfil() {
  let local = useLocation();
  const [isFocused, setIsFocused] = useState(false);
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [sexo, setSexo] = useState("");
  const [perfil, setPerfil] = useState("");
  const [quantidadeViagens, setQuantidadeViagens] = useState("");

  const chamarApi = async () => {
    try {
      const userId = sessionStorage.getItem("idUsuario");

      if (!userId) {
        console.log("idUsuario não encontrado em sessionStorage");
        return;
      }

      const response = await api.post(`/usuario/detalhes/${userId}`);
      setNome(response.data.nome);
      let dataNascimento = response.data.dataNascimento;
      dataNascimento = dataNascimento.split("-").reverse().join("-");
      setDataNascimento(dataNascimento);
      setCpf(response.data.cpf);
      setCep(response.data.cep);
      setEmail(response.data.email);
      setNumero(response.data.numero);
      setSexo(response.data.genero);

      let tipoUsuario = response.data.tipoUsuario;
      tipoUsuario =
        tipoUsuario.charAt(0).toUpperCase() +
        tipoUsuario.slice(1).toLowerCase();
      setPerfil(tipoUsuario);
      setQuantidadeViagens(response.data.quantidadeViagens);

      sessionStorage.setItem(
        "tipoUsuario",
        JSON.stringify(response.data.tipoUsuario)
      );

      // Redirecionar somente se não estamos já na página de perfil
      if (window.location.pathname !== "/meu-perfil") {
        window.location = "/meu-perfil";
      }
    } catch (error) {
      console.log("Erro ao obter detalhes do perfil:", error);
    }
  };

  useEffect(() => {
    chamarApi();
  }, []);

  const handleOnFocus = () => {
    console.log("focus");
    setIsFocused(true);
  };
  const handleBlur = () => {
    console.log("blur");
    setIsFocused(false);
  };
  return (
    <>
      <Sidebar currentPageName={local.pathname} />
      <div className={styles["main"]}>
        <h3>Meu Perfil</h3>
        <div className={styles["metricas"]}>
          <div className={styles["kpis"]}>
            <div className={styles["viagens"]}>
              <img src={distanciaIcon} alt="icon viagens" />
              <div className={styles["registros"]}>
                <span>{quantidadeViagens}</span>
                <span>viagens realizadas</span>
              </div>
            </div>
            <div className={styles["transacoes"]}>
              <img src={transacaoIcon} alt="icon transacoes" />
              <div className={styles["registros"]}>
                <span>4</span>
                <span>Transações realizadas</span>
              </div>
            </div>
          </div>
          <div className={styles["grafico"]}>
            <IoIosInformation
              className={styles["info"]}
              onMouseOver={handleOnFocus}
              onBlur={handleBlur}
            />
            <div
              className={styles[isFocused ? "visible" : "disabled"]}
              onMouseOut={handleBlur}
            >
              <div className={styles["conjunto-info"]}>
                <IoTime />
                <span>Pontualidade</span>
              </div>
              <div className={styles["conjunto-info"]}>
                <AiFillSafetyCertificate />
                <span>Segurança</span>
              </div>
              <div className={styles["conjunto-info"]}>
                <IoMdChatbubbles />
                <span>Comunicação</span>
              </div>
              <div className={styles["conjunto-info"]}>
                <PiSteeringWheelFill />
                <span>Dirigibilidade</span>
              </div>
            </div>
            <div className={styles["charts"]}>
              <div className={styles["conjunto-chart"]}>
                <div className={styles["chart"]}>
                  <div className={styles["metrica"]}></div>
                </div>
                <IoTime />
              </div>
              <div className={styles["conjunto-chart"]}>
                <div className={styles["chart"]}>
                  <div className={styles["metrica"]}></div>
                </div>
                <AiFillSafetyCertificate />
              </div>
              <div className={styles["conjunto-chart"]}>
                <div className={styles["chart"]}>
                  <div className={styles["metrica"]}></div>
                </div>
                <IoMdChatbubbles />
              </div>
              <div className={styles["conjunto-chart"]}>
                <div className={styles["chart"]}>
                  <div className={styles["metrica"]}></div>
                </div>
                <PiSteeringWheelFill />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["divisoria"]}></div>
        <div className={styles["dados"]}>
          <div className={styles["header"]}>
            <h3>Dados Pessoais</h3>
            <div className={styles["button"]}>
              <BsPencilFill />
              <span>Editar</span>
            </div>
          </div>
          <div className={styles["info-user"]}>
            <div className={styles["conjunto-user"]}>
              <h4>Nome</h4>
              <span>{nome}</span>
            </div>
            <div className={styles["conjunto-user"]}>
              <h4>Data</h4>
              <span>{dataNascimento}</span>
            </div>
            <div className={styles["conjunto-user"]}>
              <h4>CPF</h4>
              <span>{cpf}</span>
            </div>
            <div className={styles["conjunto-user"]}>
              <h4>CEP</h4>
              <span>{cep}</span>
            </div>
            <div className={styles["conjunto-user"]}>
              <h4>Email</h4>
              <span>{email}</span>
            </div>
            <div className={styles["conjunto-user"]}>
              <h4>Número</h4>
              <span>{numero}</span>
            </div>
            <div className={styles["conjunto-user"]}>
              <h4>Sexo</h4>
              <span>{sexo}</span>
            </div>
            <div className={styles["conjunto-user"]}>
              <h4>Perfil</h4>
              <span>{perfil}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;
