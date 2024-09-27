import styles from './Forms.module.css'
import { inputSomenteNumero } from '../../../../utils/InputValidations'
import { FaSearch } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import imgUser from '../../../../utils/assets/user-image.png'
import { useEffect } from 'react';

function EditForm({
    userData,
    onChangeEvent,
    onAddressChange,
    handleCepSearch
}) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
        script.async = true;
        script.onload = () => {
            // console.log("Cloudinary widget carregou");
        };
        document.body.appendChild(script);
    }, []);

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
                        console.log("URL da imagem salva: ", imageUrl);
                        onChangeEvent({ target: { name: "urlFoto", value: imageUrl } });
                    } else if (error) {
                        console.error("Erro ao fazer upload:", error);
                    }
                }
            )
            .open();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleCepSearch()
        }
    };

    return (
        <>
            <div className={styles["image-box"]}>
                {
                    userData.urlFoto ?
                        (
                            <img src={userData.urlFoto} alt={`Foto de ${userData.nome}`} />
                        ) : (
                            <img src={imgUser} alt={`User`} />
                        )
                }

                <div className={styles["circle-camera-button"]} onClick={openWidget}>
                    <FaCamera className={styles["camera-icon"]} />
                </div>
            </div>

            <div className={styles["pessoal-data"]}>
                <div className={styles["info"]}>
                    <h4>Nome</h4>
                    <input
                        className={styles["input"]}
                        type="text"
                        value={userData.nome}
                        name='nome'
                        onChange={onChangeEvent}
                    />
                </div>
                <div className={styles["info"]}>
                    <h4>Sexo</h4>
                    <span>{userData.genero}</span>
                </div>
                <div className={styles["info"]}>
                    <h4>Email</h4>
                    <input
                        className={styles["input"]}
                        type="text"
                        value={userData.email}
                        name='email'
                        onChange={onChangeEvent}
                    />
                </div>
                <div className={styles["info"]}>
                    <h4>CPF</h4>
                    <span>{userData.cpf}</span>
                </div>
                <div className={styles["info"]}>
                    <h4>Data de Nascimento</h4>
                    <input
                        className={styles["input"]}
                        type="date"
                        value={userData.dataNascimento}
                        name='dataNascimento'
                        onChange={onChangeEvent}
                    />
                </div>
                <div className={styles["info"]}>
                    <h4>Perfil</h4>
                    <span>{userData.perfil}</span>
                </div>
            </div>

            <div className={styles["line-separator"]}></div>

            <div className={styles["address-data"]}>
                <h3 className={styles["title"]}>Meu Endereço</h3>

                <div className={styles["info"]}>
                    <h4>CEP</h4>
                    <div className={styles["input-cep"]}>
                        <input
                            type="text"
                            value={userData.endereco.cep}
                            name='cep'
                            onChange={onAddressChange}
                            onInput={inputSomenteNumero}
                            onKeyDown={handleKeyDown}
                        />
                        <FaSearch onClick={handleCepSearch} />
                    </div>
                </div>
                <div className={styles["info"]}>
                    <h4>UF</h4>
                    <input
                        className={styles["input"]}
                        type="text"
                        value={userData.endereco.uf}
                        name='uf'
                        disabled
                    />
                </div>
                <div className={styles["info"]}>
                    <h4>Cidade</h4>
                    <input
                        className={styles["input"]}
                        type="text"
                        value={userData.endereco.cidade}
                        name='cidade'
                        disabled
                    />
                </div>
                <div className={styles["info"]}>
                    <h4>Bairro</h4>
                    <input
                        className={styles["input"]}
                        type="text"
                        value={userData.endereco.bairro}
                        name='bairro'
                        disabled
                    />
                </div>
                <div className={styles["info"]}>
                    <h4>Logradouro</h4>
                    <input
                        className={styles["input"]}
                        type="text"
                        value={userData.endereco.logradouro}
                        name='logradouro'
                        disabled
                    />
                </div>
                <div className={styles["info"]}>
                    <h4>Número</h4>
                    <input
                        className={styles["input"]}
                        type="text"
                        value={userData.endereco.numero}
                        name='numero'
                        onChange={onAddressChange}
                        onInput={inputSomenteNumero}
                    />
                </div>
            </div>

            <div className={styles["line-separator"]}></div>
        </>
    )
}

export default EditForm