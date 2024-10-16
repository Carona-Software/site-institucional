import { FaStar } from 'react-icons/fa6'
import styles from './CardFidelizado.module.css'
import defaultImgUser from '../../../../utils/assets/user-image.png'
import { IoLocationSharp } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { isImageUrlValid } from '../../../../utils/functions';
import { useState } from 'react';

function CardAvaliacao({
    fotoUser,
    nomeUser,
    notaGeral,
    qtdViagensJuntos,
    cidade,
    uf
}) {
    const [isFotoValid, setIsFotoValid] = useState(false)

    isImageUrlValid(fotoUser).then(isValid => {
        setIsFotoValid(isValid)
    })

    return (
        <div className={styles["card"]}>
            <div className={styles["top"]}>
                <div className={styles["box-image"]}>
                    <img src={isFotoValid ? fotoUser : defaultImgUser} alt={nomeUser} />
                </div>

                <div className={styles["nome-nota"]}>
                    <h5>{nomeUser}</h5>
                    <div className={styles["nota"]}>
                        <FaStar />
                        <span>{notaGeral == null || notaGeral <= 0.0 ? "--" : notaGeral}</span>
                    </div>
                </div>
            </div>

            <div className={styles["bottom"]}>
                <div className={styles["info"]}>
                    <IoLocationSharp />
                    <p>{`${cidade}, ${uf}`}</p>
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