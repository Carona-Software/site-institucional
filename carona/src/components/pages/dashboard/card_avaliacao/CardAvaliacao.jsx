import { FaStar } from 'react-icons/fa6'
import styles from './CardAvaliacao.module.css'

function CardAvaliacao({
    fotoUser,
    nome,
    data,
    notaGeral,
    comentario
}) {
    return (
        <div className={styles["card"]}>
            <div className={styles["header"]}>
                <div className={styles["foto-nome"]}>
                    <div className={styles["box-image"]}>
                        <img src={fotoUser} alt={nome} />
                    </div>

                    <div className={styles["nome-data"]}>
                        <h5>{nome}</h5>
                        <span>{data}</span>
                    </div>
                </div>

                <div className={styles["nota-geral"]}>
                    <FaStar />
                    <span>{notaGeral}</span>
                </div>
            </div>

            <p>{comentario}</p>
        </div>
    )
}

export default CardAvaliacao