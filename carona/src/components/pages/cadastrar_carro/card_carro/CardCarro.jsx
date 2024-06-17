import React, { useState } from "react";
import styles from "./CardCarro.module.css";
import image from "../../../../utils/assets/image-proxima-viagem.svg";
import { BsPencilFill } from "react-icons/bs";
import { TiTrash } from "react-icons/ti";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '550px', 
    maxHeight: '300px', 
  },
};


Modal.setAppElement('#root');

function CardCarro({ id, nomeCarro, placa, cor, onDelete, onEdit }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = () => {
    onDelete(id);
    closeModal();
  };

  return (
    <div className={styles["box-carro"]}>
      <div className={styles["carro-img"]}>
        <img src={image} alt="Imagem de carro" />
      </div>

      <span className={styles["column-separator"]}></span>

      <div className={styles["carro-info"]}>
        <div className={styles["nome-info"]}>
          <span id="nome-carro">{nomeCarro}</span>
        </div>

        <div className={styles["placa-info"]}>
          <span id="placa">{placa}</span>
        </div>
      </div>

      <div className={styles["carro-actions"]}>
        <button className={styles["button-detalhes"]} onClick={onEdit}>
          <BsPencilFill />
          Editar
        </button>
        <button className={styles["button-cancelar"]} onClick={openModal}>
          <TiTrash />
          Excluir
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal de Confirmação de Exclusão"
      >
        <h2>Deseja realmente excluir este carro?</h2>
        <div className={styles["modal-buttons"]}>
          <button onClick={handleDelete} className={styles["confirm-button"]}>
            Confirmar
          </button>
          <button onClick={closeModal} className={styles["cancel-button"]}>
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CardCarro;
