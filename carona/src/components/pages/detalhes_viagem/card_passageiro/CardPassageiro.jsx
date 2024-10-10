import { useState } from 'react';
import styles from './CardPassageiro.module.css'
import { FaStar } from "react-icons/fa";
import { isImageUrlValid } from '../../../../utils/functions';
import defaultImgUser from '../../../../utils/assets/user-image.png'


function CardPassageiro({ foto, nome, nota }) {
    const [isFotoValid, setIsFotoValid] = useState(false)

    isImageUrlValid(foto).then(isValid => {
        setIsFotoValid(isValid)
    })
    
    return (
        <div className={styles["user"]}>
            <div className={styles["box-image"]}>
                <img src={isFotoValid ? foto : defaultImgUser} alt="Foto do passageiro" />
            </div>

            <div className={styles["nome-nota"]}>
                <h5>{nome}</h5>
                <div className={styles["nota-passageiro"]}>
                    <FaStar />
                    <span>{(nota == null || nota <= 0.0) ? "--" : nota}</span>
                </div>
            </div>
        </div>
    )
}

export default CardPassageiro