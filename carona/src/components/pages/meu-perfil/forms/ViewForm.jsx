import styles from './Forms.module.css'
import imgUser from '../../../../utils/assets/user-image.png'
import { captializeWord, formatarData, isImageUrlValid } from '../../../../utils/functions'
import { useState } from 'react'

function ViewForm({ userData, onPasswordClick }) {
    const [isFotoValid, setIsFotoValid] = useState(false)

    isImageUrlValid(userData.fotoUrl).then(isValid => {
        setIsFotoValid(isValid)
    })
    
    return (
        <>
            <div className={styles["image-box"]}>
                {
                    isFotoValid ?
                        (
                            <img src={userData.fotoUrl} alt={`Foto de ${userData.nome}`} />
                        ) : (
                            <img src={imgUser} alt={`User`} />
                        )
                }
            </div>

            <div className={styles["pessoal-data"]}>
                <div className={styles["info"]}>
                    <h4>Nome</h4>
                    <span>{userData.nome}</span>
                </div>
                <div className={styles["info"]}>
                    <h4>Sexo</h4>
                    <span>{captializeWord(userData.genero)}</span>
                </div>
                <div className={styles["info"]}>
                    <h4>Email</h4>
                    <span>{userData.email}</span>
                </div>
                <div className={styles["info"]}>
                    <h4>CPF</h4>
                    <span>{userData.cpf}</span>
                </div>
                <div className={styles["info"]}>
                    <h4>Data de Nascimento</h4>
                    <span>{formatarData(userData.dataNascimento)}</span>
                </div>
                <div className={styles["info"]}>
                    <h4>Perfil</h4>
                    <span>{captializeWord(userData.perfil)}</span>
                </div>
            </div>

            <div className={styles["line-separator"]}></div>

            <div className={styles["address-data"]}>
                <h3 className={styles["title"]}>Meu Endereço</h3>

                <div className={styles["info"]}>
                    <h4>CEP</h4>
                    <span>{userData.endereco.cep}</span>
                </div>
                <div className={styles["info"]}>
                    <h4>UF</h4>
                    <span>{userData.endereco.uf}</span>
                </div>
                <div className={styles["info"]}>
                    <h4>Cidade</h4>
                    <span>{userData.endereco.cidade}</span>
                </div>
                <div className={styles["info"]}>
                    <h4>Bairro</h4>
                    <span>{userData.endereco.bairro}</span>
                </div>
                <div className={styles["info"]}>
                    <h4>Logradouro</h4>
                    <span>{userData.endereco.logradouro}</span>
                </div>
                <div className={styles["info"]}>
                    <h4>Número</h4>
                    <span>{userData.endereco.numero}</span>
                </div>
            </div>

            <div className={styles["line-separator"]}></div>

        </>
    )
}

export default ViewForm