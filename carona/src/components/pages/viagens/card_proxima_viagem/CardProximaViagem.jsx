import styles from './CardProximaViagem.module.css'
import image from '../../../../utils/assets/image-proxima-viagem.svg'
import { IoLocationSharp } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";

function CardProximaViagem({ cidadeOrigem, cidadeDestino, valor, data, onDetalhesClick, onCancelarClick }) {
    return (
        <div className={styles["box-proxima-viagem"]}>
            <div className={styles["viagem-img"]}>
                <img src={image} alt="Imagem de Viagem" />
            </div>

            <span className={styles["column-separator"]}></span>

            <div className={styles["viagem-info"]}>
                <div className={styles["cidade-info"]}>
                    <MdMyLocation />
                    <span id="cidade-origem">{cidadeOrigem}</span>
                </div>

                <div className={styles["cidade-info"]}>
                    <IoLocationSharp />
                    <span id="cidade-destino">{cidadeDestino}</span>
                </div>

                <span>R$ <span id="valor-viagem">{valor}</span></span>
                <span id="data-viagem">{data}</span>
            </div>

            <div className={styles["viagem-actions"]}>
                <button className={styles["button-detalhes"]} onClick={onDetalhesClick} >Detalhes</button>
                <button className={styles["button-cancelar"]} onClick={onCancelarClick} >Cancelar</button>
            </div>
        </div>
    )
}

export default CardProximaViagem