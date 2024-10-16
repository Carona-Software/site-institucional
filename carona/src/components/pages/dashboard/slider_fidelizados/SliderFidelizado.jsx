import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import styles from './SliderFidelizado.module.css'
import CardFidelizado from '../card_fidelizado/CardFidelizado';
import { useState } from 'react';

function SliderFidelizado({
    fidelizados,

}) {
    const [fidelizadoAtual, setFidelizadoAtual] = useState(0)

    const isFirst = fidelizadoAtual === 0
    const isLast = fidelizadoAtual === fidelizados.length - 1

    return (
        <>
            <CardFidelizado
                key={fidelizados[fidelizadoAtual].id}
                fotoUser={fidelizados[fidelizadoAtual].fotoUrl}
                nomeUser={fidelizados[fidelizadoAtual].nome}
                cidade={fidelizados[fidelizadoAtual].cidadeLocalidade}
                uf={fidelizados[fidelizadoAtual].ufLocalidade}
                notaGeral={fidelizados[fidelizadoAtual].notaGeral}
                qtdViagensJuntos={fidelizados[fidelizadoAtual].qtdViagensJuntos}
            />

            {
                !isFirst &&
                <div
                    className={`${styles["arrow-button"]} ${styles["left"]}`}
                    onClick={() => setFidelizadoAtual(fidelizadoAtual - 1)}
                >
                    <IoIosArrowBack />
                </div>
            }

            {
                !isLast &&
                <div
                    className={`${styles["arrow-button"]} ${styles["right"]}`}
                    onClick={() => setFidelizadoAtual(fidelizadoAtual + 1)}
                >
                    <IoIosArrowForward />
                </div>
            }
        </>
    )
}

export default SliderFidelizado