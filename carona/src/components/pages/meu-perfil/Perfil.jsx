import api from "../../../Api";
import axios from 'axios';
import styles from "./Perfil.module.css";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Sidebar from "../../layout/sidebar/Sidebar";
import { BsPencilFill } from "react-icons/bs";
import ViewForm from "./forms/ViewForm";
import EditForm from "./forms/EditForm";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Perfil() {
  let local = useLocation();
  const idUser = sessionStorage.getItem("idUser");

  const [isOnEditForm, setIsOnEditForm] = useState(false);
  const [isOnEditPassword, setIsOnEditPassword] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [codigoFoiEnviado, setCodigoFoiEnviado] = useState(false)
  const [codigoSenha, setCodigoSenha] = useState()

  const [userData, setUserData] = useState({
    id: 1,
    nome: "",
    email: "",
    cpf: "",
    genero: "",
    dataNascimento: "",
    perfil: "",
    fotoUrl: "",
    endereco: {
      latitude: null,
      longitude: null,
      cidade: "",
      uf: "",
      cep: "",
      bairro: "",
      logradouro: "",
      numero: null
    },
    viagens: [],
    avaliacoes: [],
    motoristaFidelizado: {
      id: null,
      nome: "",
      fotoUrl: "",
      notaGeral: null,
      qtdViagensJuntos: null,
      localidade: "" // cidade + uf do endereço
    },
    principalTrajeto: {
      partida: "", // cidade + uf do endereço
      chegada: "" // cidade + uf do endereço
    }
  })


  const [userEditData, setUserEditData] = useState({})

  const getUserInfo = async () => {
    try {
      const response = await api.get(`/usuarios/${idUser}`)
      setUserData(response.data)
      console.log('userData: ', response.data);

      sessionStorage.setItem('notaGeralUser', response.data.notaMedia)
      sessionStorage.setItem('fotoUser', response.data.fotoUrl)
      sessionStorage.setItem('nomeUser', response.data.nome)

      setUserData({
        nome: response.data.nome,
        cpf: response.data.cpf,
        email: response.data.email,
        senha: response.data.senha,
        dataNascimento: response.data.dataNascimento,
        genero: response.data.genero,
        perfil: response.data.perfil,
        fotoUrl: response.data.fotoUrl,
        endereco: {
          cep: response.data.endereco.cep,
          logradouro: response.data.endereco.logradouro,
          cidade: response.data.endereco.cidade,
          uf: response.data.endereco.uf,
          bairro: response.data.endereco.bairro,
          numero: response.data.endereco.numero,
        }
      })

    } catch (error) {
      console.log("Erro ao obter informações do usuário: ", error);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    setUserEditData({
      nome: userData.nome,
      cpf: userData.cpf,
      email: userData.email,
      senha: userData.senha,
      dataNascimento: userData.dataNascimento,
      genero: userData.genero,
      perfil: userData.perfil,
      fotoUrl: userData.fotoUrl,
      endereco: {
        cep: userData.endereco.cep,
        logradouro: userData.endereco.logradouro,
        cidade: userData.endereco.cidade,
        uf: userData.endereco.uf,
        bairro: userData.endereco.bairro,
        numero: userData.endereco.numero,
      }
    })
  }, [userData])

  const handleCancelEdit = () => {
    setIsOnEditForm(false)
  }

  const handleOnEditChange = (e) => {
    setUserEditData({
      ...userEditData,
      [e.target.name]: e.target.value
    })
  }

  const handleCepSearch = async () => {
    await axios.get(
      `https://viacep.com.br/ws/${encodeURIComponent(userEditData.endereco.cep)}/json/`
    ).then((res) => {
      if (res.data.erro === 'true') {
        toast.error("Insira um CEP válido");
        setUserEditData({
          ...userEditData, endereco: {
            logradouro: '',
            cidade: '',
            uf: '',
            bairro: ''
          }
        })
      } else {
        setUserEditData({
          ...userEditData, endereco: {
            logradouro: res.data.logradouro,
            cidade: res.data.localidade,
            uf: res.data.uf,
            bairro: res.data.bairro
          }
        })
      }
    })
      .catch(error => {
        console.log(`Erro ao consultar CEP (${userEditData.endereco.cep}): `, error);
        toast.warning("Houve um erro ao buscar CEP");
      })
  }

  const handleAddressChange = (e) => {
    setUserEditData({ ...userEditData, endereco: { [e.target.name]: e.target.value } })
  }

  const handleSaveChanges = async () => {
    console.log('userEditData: ', userEditData);
    
    try {
      const response = await api.put(`/usuarios/${idUser}`, userEditData)
      setUserData(response.data)
      setIsOnEditForm(false)
      toast.success("Dados atualizados com sucesso")
    } catch (error) {
      console.log("Erro ao atualizar informações do usuário: ", error);
      toast.error("Não foi possível atualizar os dados")
    }
  }

  const handleAlterarSenha = () => {
    if (codigoFoiEnviado) {
      // alterar senha
    } else {
      setShowChangePasswordModal(true)
    }
  }

  const enviarCodigoNovaSenha = () => {
    setShowChangePasswordModal(false)
    setIsOnEditPassword(true)
    setCodigoFoiEnviado(true)
  }

  return (
    <>
      <Sidebar currentPageName={local.pathname} />

      <div className={styles["main"]}>
        <div className={styles["container"]}>
          <div className={styles["title-action"]}>
            <h3>Meus Dados Pessoais</h3>

            <div className={styles["actions"]}>
              {
                isOnEditForm &&
                <button
                  onClick={handleCancelEdit}
                  className={styles['white']}
                >
                  Cancelar
                </button>
              }
              {
                isOnEditForm ? (
                  <button
                    onClick={handleSaveChanges}
                    className={styles['yellow']}
                  >
                    Finalizar
                  </button>) : (
                  <button
                    onClick={() => setIsOnEditForm(true)}
                    className={styles['yellow']}
                  >
                    <BsPencilFill />
                    Editar
                  </button>
                )
              }

            </div>
          </div>

          <div className={styles["container-user-info"]}>
            {
              isOnEditForm ?
                <EditForm
                  userData={userEditData}
                  onChangeEvent={handleOnEditChange}
                  onAddressChange={handleAddressChange}
                  handleCepSearch={handleCepSearch}
                /> :
                <ViewForm userData={userData} />
            }
            <div className={styles["password-container"]}>
              <div className={styles["senha-action"]}>
                <h3>Segurança</h3>
                <button onClick={handleAlterarSenha}>
                  Alterar senha
                </button>
              </div>

              <div className={styles["info"]}>
                <h4>Senha</h4>
                {
                  isOnEditPassword
                    ? (
                      <div className={styles["password-box"]}>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={userEditData.senha}
                          name='senha'
                          onChange={handleOnEditChange}
                        />
                        {
                          showPassword
                            ? <FiEyeOff onClick={() => setShowPassword(!showPassword)} />
                            : <FiEye onClick={() => setShowPassword(!showPassword)} />
                        }
                      </div>
                    )
                    : <span>*************</span>
                }
              </div>

              {
                isOnEditPassword && (
                  <div className={styles["info"]}>
                    <h4>Código</h4>
                    <input className={styles["input"]}
                      type="text"
                      maxLength={6}
                      value={codigoSenha}
                      onChange={(e) => setCodigoSenha(e.target.value)}
                    />
                  </div>
                )

              }
            </div>
            {
              showChangePasswordModal &&
              (
                <div className={styles["background-modal"]}>
                  <div className={styles["change-passowrd-modal"]}>
                    <span>Ao clicar em Alterar a senha, será enviado um código ao email cadastrado, que deve ser informado junto a nova senha</span>

                    <div className={styles["actions"]}>
                      <button className={styles['fechar']} onClick={() => setShowChangePasswordModal(false)}>
                        Fechar
                      </button>

                      <button className={styles['alterar-senha']} onClick={enviarCodigoNovaSenha}>
                        Alterar a senha
                      </button>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;
