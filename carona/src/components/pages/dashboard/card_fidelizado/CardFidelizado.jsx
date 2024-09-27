import { FaStar } from 'react-icons/fa6'
import styles from './CardFidelizado.module.css'
import { IoLocationSharp } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";

function CardAvaliacao({
    fotoUser,
    nomeUser,
    notaGeral,
    qtdViagensJuntos,
    localidade
}) {
    return (
        <div className={styles["card"]}>
            <div className={styles["top"]}>
                <div className={styles["box-image"]}>
                    <img src={fotoUser} alt={nomeUser} />
                </div>

                <div className={styles["nome-nota"]}>
                    <h5>{nomeUser}</h5>
                    <div className={styles["nota"]}>
                        <FaStar />
                        <span>{notaGeral}</span>
                    </div>
                </div>
            </div>

            <div className={styles["bottom"]}>
                <div className={styles["info"]}>
                    <IoLocationSharp />
                    <p>{localidade}</p>
                </div>

                <div className={styles["info"]}>
                    <FaMapLocationDot />
                    <p>
                        <span>{qtdViagensJuntos} </span>
                        viagens realizadas juntos
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CardAvaliacao