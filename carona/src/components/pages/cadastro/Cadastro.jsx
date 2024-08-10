import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../../layout/container/Container";
import img from "../../../utils/assets/cadastro-image.svg";
import styles from "./Cadastro.module.css";
import ActionButton from "../../layout/action_button/ActionButton";
import CadastroPessoal from "../cadastroPessoal/CadastroPessoal";
import CadastroEndereco from "../cadastroEndereco/CadastroEndereco";
import CadastroUser from "../cadastroUser/CadastroUser";
import axios from "axios";
import api from "../../../Api";

function Cadastro() {
  const navigate = useNavigate();

  const [currentComponent, setCurrentComponent] = useState(1);
  const [widthProgressBar, setWidthProgressBar] = useState(33);
  const [pessoalData, setPessoalData] = useState({
    nome: "",
    sexo: "",
    email: "",
    cpf: "",
    dataNascimento: "",
    perfil: "",
    cep: "",
    numero: "",
    senha: "",
    confirmacaoSenha: "",
    imageUrl: ""
  });

  const [enderecoData, setEnderecoData] = useState({
    cep: "",
    logradouro: "",
    numero: "",
    cidade: "",
    uf: "",
    bairro: ""
  });

  const [address, setAddress] = useState({});

  const handleUserEvent = (event) => {
    const { name, value } = event.target;
    setPessoalData({
      ...pessoalData,
      [name]: value,
    });
  };

  const handleCepSearch = async () => {
    await axios.get(
      `https://viacep.com.br/ws/${encodeURIComponent(pessoalData.cep)}/json/`
    ).then((res) => {
      if (res.data.erro === 'true') {
        setAddress({});
        handleAddressData({});
        toast.error("Insira um CEP válido");
      } else {
        setAddress(res.data);
        handleAddressData(res.data);
      }
    })
      .catch(error => {
        console.log(`Erro ao consultar CEP (${pessoalData.cep}): `, error);
        toast.warning("Houve um erro ao buscar CEP");
        setAddress({});
        handleAddressData({});
      })

  }

  const handleAddressData = (data) => {
    setEnderecoData({
      cep: data.cep || "",
      logradouro: data.logradouro || "",
      cidade: data.localidade || "",
      uf: data.uf || "",
      bairro: data.bairro || "",
      numero: pessoalData.numero
    });
  };

  const validarDadosPessoais = () => {
    if (!validarNome(pessoalData.nome)) {
      toast.error('Digite um Nome com pelo menos 3 letras')
      return false
    }

    if (!validarSexo(pessoalData.sexo)) {
      toast.error('Defina o Sexo')
      return false
    }

    if (!validarEmail(pessoalData.email)) {
      toast.error('Digite um email válido')
      return false
    }

    if (!validarCPF(pessoalData.cpf)) {
      toast.error('Digite um CPF válido')
      return false
    }

    if (!validarDataNascimento(pessoalData.dataNascimento)) {
      toast.error('É preciso ter ao menos 18 anos para o cadastro')
      return false
    }

    if (!validarPerfil(pessoalData.perfil)) {
      toast.error('Escolha o tipo de Perfil')
      return false
    }

    return true
  };

  // Validações dos campos pessoais

  function validarNome(nome) {
    return ((
      nome !== null ||
      nome !== '') &&
      nome.length >= 3)
  }

  function validarCPF(cpf) {
    return cpf.length === 11
  }

  function validarEmail(email) {
    var regex = /\S+@\S+\.\S+/;
    return regex.test(email)
  }

  function validarPerfil(perfil) {
    return perfil !== ''
  }

  function validarSexo(sexo) {
    return sexo !== ''
  }

  function validarDataNascimento(data) {
    var dataAtual = new Date()
    var dataNasc = new Date(data)

    // Calcula a diferença em milissegundos
    const diferencaEmMs = dataAtual - dataNasc;
    // Converte a diferença em milissegundos para dias
    const diferencaEmDias = Math.floor(diferencaEmMs / (1000 * 60 * 60 * 24));
    // Calcula a idade em anos, meses e dias
    const anos = Math.floor(diferencaEmDias / 365.25);

    return anos >= 18
  }

  // validação dos dados de endereço
  const validarDadosDeEndereco = () => {
    if (enderecoData.logradouro === "" &&
      enderecoData.bairro === "" &&
      enderecoData.cidade === "" &&
      enderecoData.uf === "") {
      toast.error('As informações de endereço devem ser preenchidas')
      return false
    }

    if (Number(pessoalData.numero) === 0) {
      toast.error('Insira um Número válido')
      return false
    }

    return true
  };

  // validação de senhas e foto
  const validarSenhasEFoto = () => {
    if (!validarSenhas()) {
      return false
    }

    if (!validarFoto()) {
      toast.error('Escolha uma foto de perfil')
      return false
    }

    return true
  }

  function validarSenhas() {
    let letrasMaiusculas = /[A-Z]/;
    let letrasMinusculas = /[a-z]/;
    let numeros = /[0-9]/;
    let caracteresEspeciais = /[^A-Za-z0-9]/;

    if (!(letrasMaiusculas.test(pessoalData.senha) &&
      letrasMinusculas.test(pessoalData.senha) &&
      numeros.test(pessoalData.senha) &&
      caracteresEspeciais.test(pessoalData.senha))) {
      toast.error('Digite uma senha válida')
      return false
    }

    if (pessoalData.senha !== pessoalData.confirmacaoSenha) {
      toast.error('As senhas devem ser iguais')
      return false
    }

    return true
  }

  function validarFoto() {
    return pessoalData.imageUrl !== ''
  }

  const handleClick = () => {
    if (currentComponent === 1) {
      if (validarDadosPessoais()) {
        setWidthProgressBar(66)
        setCurrentComponent(2)
      }
    } else if (currentComponent === 2) {
      if (validarDadosDeEndereco()) {
        setWidthProgressBar(100)
        setCurrentComponent(3)
      }
    } else {
      if (validarSenhasEFoto()) {
        // cadastrar
        // cadastrarUsuario();
      }
    }
  };

  const backHandleClick = () => {
    if (currentComponent === 2) {
      setCurrentComponent(1);
      setWidthProgressBar(33);
    } else {
      setCurrentComponent(2);
      setWidthProgressBar(66);
    }
  };

  const cadastrarUsuario = () => {
    const usuarioCriacaoDto = {
      nome: pessoalData.nome,
      cpf: pessoalData.cpf,
      email: pessoalData.email,
      senha: pessoalData.senha,
      dataNascimento: pessoalData.dataNascimento,
      genero: pessoalData.sexo,
      tipoUsuario: pessoalData.perfil.toUpperCase(),
      urlImagemUsuario: pessoalData.imageUrl,
      endereco: {
        cep: enderecoData.cep,
        logradouro: enderecoData.logradouro,
        cidade: enderecoData.cidade,
        uf: enderecoData.uf.toUpperCase(),
        numero: pessoalData.numero,
      },
    };

    console.log("Enviando dados para o cadastro: ", JSON.stringify(usuarioCriacaoDto));

    api
      .post("/usuarios", usuarioCriacaoDto)
      .then((response) => {
        console.log('Sucesso no cadastro: ', response);
        toast.success("Cadastro realizado com sucesso!");
        navigate("/login")
      })
      .catch((error) => {
        toast.error("Houve um erro ao realizar cadastro")
        console.error("Erro ao cadastrar usuário: ", error);
      });
  };

  return (
    <Container customClass="min-height">
      <div className={styles["main"]}>
        <div className={styles["div-illustration"]}>
          <h1>Cadastro</h1>
          <img src={img} alt="login-imagem" />
        </div>

        <div className={styles["grupo-cadastro"]}>
          {currentComponent === 1 && (
            <CadastroPessoal handleUserEvent={handleUserEvent} userPessoalData={pessoalData} />
          )}
          {currentComponent === 2 && (
            <CadastroEndereco
              handleUserEvent={handleUserEvent}
              handleCepSearch={handleCepSearch}
              enderecoData={enderecoData}
              userPessoalData={pessoalData}
            />
          )}
          {currentComponent === 3 && (
            <CadastroUser handleUserEvent={handleUserEvent} userPessoalData={pessoalData} />
          )}

          <div className={styles["grupo-progress"]}>
            <h4>Etapa {currentComponent} de 3</h4>
            <div className={styles["progress-container"]}>
              <div
                className={styles["progress-bar"]}
                style={{ width: `${widthProgressBar}%` }}
              />
            </div>
          </div>

          <div className={currentComponent === 1 ? `${styles["botoes"]} ${styles["center"]}` : `${styles["botoes"]} ${styles["space-between"]}`}>
            {(currentComponent === 2 || currentComponent === 3) &&
              <ActionButton
                onClickEvent={backHandleClick}
                type="secondary"
                label="Voltar"
              />
            }
            <ActionButton
              onClickEvent={handleClick}
              type="primary"
              label={currentComponent === 3 ? "Finalizar" : "Próximo"}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Cadastro;
