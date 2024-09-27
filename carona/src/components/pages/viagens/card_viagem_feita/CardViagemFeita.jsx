import styles from './CardViagemFeita.module.css'
import image from '../../../../utils/assets/image-viagem-passada.svg'
import { IoLocationSharp } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";

function CardViagemFeita({ cidadeOrigem, cidadeDestino, valor, data, onDetalhesClick }) {
    return (
        <div className={styles["box-viagem-feita"]}>
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
                <button className={styles["button-avaliar"]}>Avaliar</button>
                <button className={styles["button-detalhes"]} onClick={onDetalhesClick}>Detalhes</button>
            </div>
        </div>
    )
}

export default CardViagemFeita