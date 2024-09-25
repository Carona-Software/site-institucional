import styles from "./CadastroUser.module.css";
import { useEffect, useState } from "react";
import Input from "../../../layout/input/Input";
import { FaCamera, FaCheck, FaRegCircle, FaUser } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

function CadastroUser({ handleUserEvent, userPessoalData }) {
  const [hasMaiuscula, setHasMaiuscula] = useState(false)
  const [hasMinuscula, setHasMinuscula] = useState(false)
  const [hasNumero, setHasNumero] = useState(false)
  const [hasEspecial, setHasEspecial] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmacao, setShowPasswordConfirmacao] = useState(false)

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    script.onload = () => {
      // console.log("Cloudinary widget carregou");
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    validarSenha(userPessoalData.senha)
  }, [])

  const handleSenhaChange = (event) => {
    let valorAtual = event.target.value
    let nomeCampo = event.target.name

    if (nomeCampo === 'senha') {
      validarSenha(valorAtual)
    }

    handleUserEvent(event);
  };

  function validarSenha(senha) {
    let letrasMaiusculas = /[A-Z]/;
    let letrasMinusculas = /[a-z]/;
    let numeros = /[0-9]/;
    let caracteresEspeciais = /[^A-Za-z0-9]/;

    setHasMaiuscula(letrasMaiusculas.test(senha));
    setHasMinuscula(letrasMinusculas.test(senha));
    setHasNumero(numeros.test(senha));
    setHasEspecial(caracteresEspeciais.test(senha));
  }

  const openWidget = () => {
    window.cloudinary
      .openUploadWidget(
        {
          cloudName: "dkzjrifqn",
          uploadPreset: "profile_pictures",
          sources: ["local", "url", "camera"],
          multiple: false,
          cropping: true,
        },
        (error, result) => {
          if (result && result.event === "success") {
            const imageUrl = result.info.secure_url;
            console.log("URL da imagem salva:", imageUrl);
            handleUserEvent({ target: { name: "imageUrl", value: imageUrl } });
            // localStorage.setItem("userProfileImage", imageUrl);
          } else if (error) {
            console.error("Erro ao fazer upload:", error);
          }
        }
      )
      .open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles["div-forms"]}>
      <h1>Foto e Senha</h1>
      <form className={styles["forms"]} onSubmit={handleSubmit}>
        <div className={styles["box-senhas-foto"]}>
          <div className={styles["box-inputs"]}>
            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              icon={showPassword ? <FiEyeOff /> : <FiEye />}
              iconHandleEvent={() => setShowPassword(!showPassword)}
              placeholder="*************"
              name="senha"
              id="senha"
              onChangeEvent={handleSenhaChange}
              value={userPessoalData.senha}
            />
            <Input
              label="Confirmação de senha"
              type={showPasswordConfirmacao ? 'text' : 'password'}
              icon={showPasswordConfirmacao ? <FiEyeOff /> : <FiEye />}
              iconHandleEvent={() => setShowPasswordConfirmacao(!showPasswordConfirmacao)}
              placeholder="*************"
              id="confirma-senha"
              name="confirmacaoSenha"
              onChangeEvent={handleSenhaChange}
              value={userPessoalData.confirmacaoSenha}
            />
          </div>

          <div className={styles["image-box"]}>
            <div className={styles["circle-input"]}>
              <input type="file" id="file" style={{ display: "none" }} />
              {userPessoalData.imageUrl ? (
                <div className={styles["circle-profile-image"]}>
                  <img
                    src={userPessoalData.imageUrl}
                    alt="User profile"
                    className={styles["profile-image"]}
                  />
                  <div className={styles["circle-camera-button"]} onClick={openWidget}>
                    <FaCamera className={styles["camera-icon"]} />
                  </div>
                </div>
              ) : (
                <div className={styles["placeholder-image"]}>
                  <FaUser style={{fontSize: "100px", color: "#b7b7b775"}} />
                  <div className={styles["circle-camera-button"]} onClick={openWidget}>
                    <FaCamera className={styles["camera-icon"]} />
                  </div>
                </div>
              )}
            </div>
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
        </div>
      </form>
    </div>
  );
}

export default CadastroUser;