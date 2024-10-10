import { FaStar } from 'react-icons/fa6'
import styles from './CardAvaliacao.module.css'
import defaultImgUser from '../../../../utils/assets/user-image.png'
import { formatarData, isImageUrlValid } from '../../../../utils/functions'
import { useState } from 'react'

function CardAvaliacao({
    fotoUser,
    nome,
    data,
    notaMedia,
    comentario
}) {
    const [isFotoValid, setIsFotoValid] = useState(false)

    isImageUrlValid(fotoUser).then(isValid => {
        setIsFotoValid(isValid)
    })

    return (
        <div className={styles["card"]}>
            <div className={styles["header"]}>
                <div className={styles["foto-nome"]}>
                    <div className={styles["box-image"]}>
                        <img src={isFotoValid ? fotoUser : defaultImgUser} alt={nome} />
                    </div>

                    <div className={styles["nome-data"]}>
                        <h5>{nome}</h5>
                        <span>{formatarData(data)}</span>
                    </div>
                </div>

                <div className={styles["nota-geral"]}>
                    <FaStar />
                    <span>{notaMedia}</span>
                </div>
            </div>

            <p>{comentario}</p>
        </div>
    )
}

export default CardAvaliacao