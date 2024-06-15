import styles from './FidelizadoCard.module.css'
import { IoChatbubblesSharp } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";

function FidelizadoCard({ nome, idade, totalViagens }) {
    return (
        <div className={styles["box-fidelizado"]}>

            <img src={''} alt="Imagem de Transação" />

            <div className={styles["fidelizado-info"]}>
                <h4 id="nome-fidelizado">{nome}</h4>
                <span id="idade-fidelizado">{idade}</span>
                <span id="total-viagens">{totalViagens} viagens realizadas juntos</span>
            </div>

            <div className={styles["fidelizado-actions"]}>
                <button className={styles["button-conversar"]} onClick={''}>
                    <IoChatbubblesSharp />
                    <span>Conversar</span>
                </button>
                <button className={styles["button-remover"]} onClick={''}>
                    <FaTrashAlt />
                    <span>Remover</span>
                </button>
            </div>
        </div>
    )
}

export default FidelizadoCard