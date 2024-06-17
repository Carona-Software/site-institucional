import styles from './CardViagem.module.css';
import { FaCar, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function CardViagem({ fotoUser, nomeUser, notaUser, horarioPartida, horarioChegada, preco, distancia, onClickEvent }) {
    
    const getCarColor = (distance) => {
        if (distance < 30) {
            return 'green';
        } else if (distance >= 31 && distance < 60) {
            return 'yellow';
        } else {
            return 'red';
        }
    };

    const carColor = getCarColor(distancia);

    return (
        <div className={styles["card"]}>
            <div className={styles["infos-motorista"]}>
                <img src={fotoUser} alt={"Foto de " + nomeUser} />
                <div className={styles["nome-nota"]}>
                    <h4>{nomeUser}</h4>
                    <div className={styles["nota-user"]}>
                        <FaStar />
                        <span>{notaUser}</span>
                    </div>
                </div>
            </div>

            <div className={styles["line-separator"]}></div>

            <div className={styles["info-viagem"]}>
                <div className={styles["horarios-indicadores"]}>
                    <div className={styles["horarios"]}>
                        <div className={styles["horario"]}>
                            <FaLocationDot />
                            <span>{horarioPartida}h</span>
                        </div>

                        <div className={styles["dashed-line"]}></div>

                        <div className={styles["horario"]}>
                            <FaLocationDot />
                            <span>{horarioChegada}h</span>
                        </div>
                    </div>

                    <div className={styles["carros-indicadores"]}>
                        <div className={styles["carros"]}>
                            <FaCar style={{ color: carColor }} />
                            <FaCar style={{ color: carColor }} />
                            <FaCar style={{ color: carColor }} />
                        </div>
                        <div className={styles["carros"]}>
                            <FaCar style={{ color: carColor }} />
                            <FaCar style={{ color: carColor }} />
                            <FaCar style={{ color: carColor }} />
                        </div>
                    </div>
                </div>

                <div className={styles["preco-action-button"]}>
                    <span>R$ <span>{preco}</span></span>

                    <button
                        onClick={onClickEvent}
                    >
                        Reservar
                    </button>
                </div>
            </div>

        </div>
    );
}

export default CardViagem;
