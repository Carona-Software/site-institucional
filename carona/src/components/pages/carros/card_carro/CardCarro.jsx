import React, { useEffect, useState } from "react";
import styles from "./CardCarro.module.css";
import carroPreto from "../../../../utils/assets/image-carro-preto.svg";
import carroBranco from "../../../../utils/assets/image-carro-branco.svg";
import carroAzul from "../../../../utils/assets/image-carro-azul.svg";
import carroVerde from "../../../../utils/assets/image-carro-verde.svg";
import carroVermelho from "../../../../utils/assets/image-carro-vermelho.svg";
import carroRoxo from "../../../../utils/assets/image-carro-roxo.svg";
import carroMarrom from "../../../../utils/assets/image-carro-marrom.svg";
import carroLaranja from "../../../../utils/assets/image-carro-laranja.svg";
import carroCinza from "../../../../utils/assets/image-carro-cinza.svg";
import carroAmarelo from "../../../../utils/assets/image-carro-amarelo.svg";
import carroPrata from "../../../../utils/assets/image-carro-prata.svg";
import carroVinho from "../../../../utils/assets/image-carro-vinho.svg";
import { BsPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

function CardCarro({
  marca,
  modelo,
  placa,
  cor,
  handleEditCarro,
  handleRemoveCarro
}) {
  const [imagemCarro, setImagemCarro] = useState('')

  const definirCorCarro = () => {
    switch (cor) {
      case 'Preto':
        setImagemCarro(carroPreto)
        break;
      case 'Branco':
        setImagemCarro(carroBranco)
        break;
      case 'Azul':
        setImagemCarro(carroAzul)
        break;
      case 'Verde':
        setImagemCarro(carroVerde)
        break;
      case 'Vermelho':
        setImagemCarro(carroVermelho)
        break;
      case 'Roxo':
        setImagemCarro(carroRoxo)
        break;
      case 'Marrom':
        setImagemCarro(carroMarrom)
        break;
      case 'Laranja':
        setImagemCarro(carroLaranja)
        break;
      case 'Cinza':
        setImagemCarro(carroCinza)
        break;
      case 'Amarelo':
        setImagemCarro(carroAmarelo)
        break;
      case 'Prata':
        setImagemCarro(carroPrata)
        break;
      case 'Vinho':
        setImagemCarro(carroVinho)
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    definirCorCarro()
  }, [])

  return (
    <div className={styles["box-carro"]}>
      <div className={styles["carro-img"]}>
        <img src={imagemCarro} alt="Imagem de carro" />
      </div>

      <span className={styles["column-separator"]}></span>

      <div className={styles["carro-info"]}>
        <div className={styles["nome-info"]}>
          <span id="nome-carro">{marca} {modelo}</span>
        </div>

        <div className={styles["placa-info"]}>
          <span id="placa">{placa}</span>
        </div>
      </div>

      <div className={styles["carro-actions"]}>
        <button className={styles["detalhes"]} onClick={handleEditCarro}>
          <BsPencilFill />
          Editar
        </button>
        <button className={styles["cancelar"]} onClick={handleRemoveCarro}>
          <FaTrash />
          Excluir
        </button>
      </div>
    </div>
  );
}

export default CardCarro;
