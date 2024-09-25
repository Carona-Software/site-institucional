import React, { useState } from 'react';
import styles from './Login.module.css';
import Container from '../../layout/container/Container';
import img from '../../../utils/assets/login-image.svg';
import Input from '../../layout/input/Input';
import { FiEye, FiEyeOff } from "react-icons/fi";
import ActionButton from '../../layout/action_button/ActionButton';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../Api';
import { FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function Login() {
  const navigate = useNavigate()

  const [isRedefinicaoSenha, setIsRedefinicaoSenha] = useState(false);
  const [emailRedefinicao, setEmailRedefinicao] = useState()
  const [user, setUser] = useState({
    email: '',
    senha: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    api.post('/usuario/login', null, { params: user })
      .then((response) => {
        console.log('Login realizado com sucesso:', response.data);
        sessionStorage.setItem('idUsuario', response.data.idUsuario);
        sessionStorage.setItem('urlImagemUsuario', response.data.urlImagemUsuario)
        obterDetalhesPerfil(response.data.idUsuario);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          console.log('Erro ao realizar login: Credenciais inválidas.');
        } else {
          console.log('Erro ao realizar login:', error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Função para obter os detalhes do perfil
  const obterDetalhesPerfil = (userId) => {
    api.get(`/usuario/detalhes/${userId}`)
      .then((response) => {
        console.log('Detalhes do perfil obtidos com sucesso:', response.data);
        sessionStorage.setItem('idUser', response.data.id)
        sessionStorage.setItem('generoUser', response.data.genero)
        sessionStorage.setItem('perfilUser', response.data.perfil)
        sessionStorage.setItem('nomeUser', response.data.nome)
        sessionStorage.setItem('notaUser', response.data.nota)
        sessionStorage.setItem('fotoUser', response.data.foto)
        navigate("/meu-perfil");
      })
      .catch(error => {
        console.log('Erro ao obter detalhes do perfil:', error);
      });
  }

  const handleRedefenirSenha = () => {
    
  }

  return (
    <div className={styles['login-screen']}>
      <div className={styles["voltar"]} onClick={() => navigate('/')}>
        <FaArrowLeft />
        <h3>Voltar</h3>
      </div>

      <Container customClass='min-height'>
        <div className={styles['div-illustration']}>
          <img src={img} alt="Imagem de Login" />
        </div>

        <div className={styles['div-forms']}>
          <form className={styles['forms']} onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div className={styles['box-inputs']}>
              <Input
                type='text'
                placeholder='Digite o email'
                label='Email'
                id='email'
                onChangeEvent={handleChange}
              />

              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='Digite a senha'
                label='Senha'
                id='senha'
                onChangeEvent={handleChange}
                textLink='Esqueci a senha'
                onClickSubText={() => setIsRedefinicaoSenha(true)}
                icon={showPassword ? <FiEyeOff /> : <FiEye />}
                iconHandleEvent={() => setShowPassword(!showPassword)}
              />

              {isRedefinicaoSenha &&
                <div className={styles["modal-redefinir-senha"]} onBlur={() => setIsRedefinicaoSenha(false)}>
                  <span>Digite o seu email para redefinir a senha</span>
                  <input
                    type="text"
                    value={emailRedefinicao}
                    name="emailRedefinicao"
                    placeholder='user@email.com'
                    onChange={(e) => setEmailRedefinicao(e.target.value)}
                  />
                  <button onClick={handleRedefenirSenha}>
                    Redefinir senha
                  </button>

                  <div className={styles["close-button"]} onClick={() => setIsRedefinicaoSenha(false)} >
                    <IoClose />
                  </div>
                </div>
              }
            </div>

            <div className={styles['button-wrapper']}>
              <ActionButton type='primary' label={isLoading ? 'Carregando...' : 'Entrar'} disabled={isLoading} />
            </div>

            <Link to='/cadastro'><p>Não tenho conta, quero me cadastrar</p></Link>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
