import styles from './RedefinirSenha.module.css'
import img from '../../../utils/assets/esqueci-senha-image.svg'
import Input from '../../layout/input/Input'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRef, useState, useEffect } from 'react';
import { FaRegCircle, FaCheck } from "react-icons/fa";
import ActionButton from '../../layout/action_button/ActionButton';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../../Api';
import axios from 'axios';


const apiUrl = "http://localhost:8080";

function RedefinirSenha() {
    const [codigo, setCodigo] = useState({})
    const [codigoFormatado, setCodigoFormatado] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmacao, setShowPasswordConfirmacao] = useState(false)

    const [novaSenha, setNovaSenha] = useState('')
    const [confirmacaoNovaSenha, setConfirmacaoNovaSenha] = useState('')

    const [hasMaiuscula, setHasMaiuscula] = useState(false)
    const [hasMinuscula, setHasMinuscula] = useState(false)
    const [hasNumero, setHasNumero] = useState(false)
    const [hasEspecial, setHasEspecial] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(true);
    const [email, setEmail] = useState('');

    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const inputRef5 = useRef(null);
    const inputRef6 = useRef(null);

    useEffect(() => {
        setIsModalOpen(true);
    }, []);

    function handleCodigoChange(event, nextInputRef, prevInputRef) {
        setCodigo({ ...codigo, [event.target.name]: event.target.value })
        nextInputRef.current.focus()
    }

    function handleSenha(e) {
        let senhaAtual = e.target.value

        // Validações de senha
        let letrasMaiusculas = /[A-Z]/;
        let letrasMinusculas = /[a-z]/;
        let numeros = /[0-9]/;
        let caracteresEspeciais = /[^A-Za-z0-9]/;

        setHasMaiuscula(letrasMaiusculas.test(senhaAtual));
        setHasMinuscula(letrasMinusculas.test(senhaAtual));
        setHasNumero(numeros.test(senhaAtual));
        setHasEspecial(caracteresEspeciais.test(senhaAtual));

        setNovaSenha(e.target.value)
    }

    function submitNovaSenha() {
        const formattedString = Object.values(codigo).join('').toUpperCase();
        setCodigoFormatado(formattedString)
    }
    async function handleEmailSubmit() {
        console.log('Email para recuperação de senha:', email);
    
        try {
            const response = await axios.post(`${apiUrl}usuario/solicitarRecuperacaoSenha`, { email });
            if (response.status === 200) {
                toast.success('Email enviado com sucesso!');
                console.log('Email enviado com sucesso!');
            } else {
                toast.error('Erro ao enviar email de recuperação de senha');
            }
        } catch (error) {
            toast.error('Erro ao enviar email de recuperação de senha');
        }
    }
    
    return (
        <div className={styles.main}>
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Recuperar Senha</h2>
                        <Input
                        label="Email"
                        name="email"
                        id="email"
                        placeholder="Digite seu email"
                        type="email"
                        onChangeEvent={(e) => setEmail(e.target.value)}
                        style={{ width: '500px', height: '40px' }} // Adicione esta linha
                    />
                        <ActionButton type="primary" label="Enviar" onClickEvent={handleEmailSubmit} />
                    </div>
                </div>
            )}
            {/* div de imagem */}
            <div className={styles['div-illustration']}>
                <h1>Redefinição de Senha</h1>
                <img src={img} alt="Imagem de Esqueci a Senha" />
            </div>

            {/* div de forms */}

            <div className={styles['div-info']}>
                <h3>Foi gerado um código para seu endereço de email cadastrado. Verifique sua caixa de entrada e redefina a senha.</h3>

                <div className={styles["box-codigo"]}>
                    <h4>Código</h4>

                    <div className={styles["codigo-inputs"]}>
                        <input autoComplete='off' type="text" maxLength={1} name={`c${1}`} ref={inputRef1} onChange={(e) => handleCodigoChange(e, inputRef2, inputRef1)} />
                        <input autoComplete='off' type="text" maxLength={1} name={`c${2}`} ref={inputRef2} onChange={(e) => handleCodigoChange(e, inputRef3, inputRef1)} />
                        <input autoComplete='off' type="text" maxLength={1} name={`c${3}`} ref={inputRef3} onChange={(e) => handleCodigoChange(e, inputRef4, inputRef2)} />
                        <input autoComplete='off' type="text" maxLength={1} name={`c${4}`} ref={inputRef4} onChange={(e) => handleCodigoChange(e, inputRef5, inputRef3)} />
                        <input autoComplete='off' type="text" maxLength={1} name={`c${5}`} ref={inputRef5} onChange={(e) => handleCodigoChange(e, inputRef6, inputRef4)} />
                        <input autoComplete='off' type="text" maxLength={1} name={`c${6}`} ref={inputRef6} onChange={(e) => handleCodigoChange(e, inputRef6, inputRef5)} />
                    </div>
                </div>

                <div className={styles["box-senhas"]}>
                    <Input label='Nova senha' name='novaSenha' id='nova-senha' placeholder='************' type={showPassword ? 'text' : 'password'} icon={showPassword ? <FiEyeOff /> : <FiEye />} iconHandleEvent={() => setShowPassword(!showPassword)} onChangeEvent={handleSenha} />

                    <Input label='Confirmação da senha' name='confirmacaoNovaSenha' id='confirmacao-nova-senha' placeholder='************' type={showPasswordConfirmacao ? 'text' : 'password'} icon={showPasswordConfirmacao ? <FiEyeOff /> : <FiEye />} iconHandleEvent={() => setShowPasswordConfirmacao(!showPasswordConfirmacao)} onChangeEvent={(e) => setConfirmacaoNovaSenha(e.target.value)} />
                </div>

                <div className={styles["validations"]}>
                    <p>A senha deve conter:</p>
                    <div className={styles["box-validators"]}>
                        <div className={hasMaiuscula ? `${styles["validator"]} ${styles["valid"]}` : `${styles["validator"]} ${styles["invalid"]}`}>
                            {hasMaiuscula ? <FaCheck /> : <FaRegCircle />}
                            <span>Letra maiúscula</span>
                        </div>
                        <div className={hasMinuscula ? `${styles["validator"]} ${styles["valid"]}` : `${styles["validator"]} ${styles["invalid"]}`}>
                            {hasMinuscula ? <FaCheck /> : <FaRegCircle />}
                            <span>Letra minúscula</span>
                        </div>
                        <div className={hasNumero ? `${styles["validator"]} ${styles["valid"]}` : `${styles["validator"]} ${styles["invalid"]}`}>
                            {hasNumero ? <FaCheck /> : <FaRegCircle />}
                            <span>Número</span>
                        </div>
                        <div className={hasEspecial ? `${styles["validator"]} ${styles["valid"]}` : `${styles["validator"]} ${styles["invalid"]}`}>
                            {hasEspecial ? <FaCheck /> : <FaRegCircle />}
                            <span>Caracter especial</span>
                        </div>
                    </div>
                </div>

                <div className={styles["box-button"]}>
                    <ActionButton type='primary' label='Redefinir senha' onClickEvent={submitNovaSenha} />
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default RedefinirSenha
