import React from "react";
import styles from "./CadastroEndereco.module.css";
import Input from "../../../layout/input/Input";
import { FaSearch } from "react-icons/fa";
import { inputSomenteNumero } from '../../../../utils/InputValidations'

function CadastroEndereco({ handleUserEvent, handleCepSearch, enderecoData, userPessoalData }) {
  const handleInputChange = (e) => {
    handleUserEvent(e)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCepSearch()
    }
  };

  return (
    <div className={styles["div-forms"]}>
      <h1>Endereço</h1>
      <form className={styles["forms"]} onSubmit={handleSubmit}>
        <div className={styles["box-inputs"]}>
          <Input
            label="CEP"
            placeholder="Digite o CEP"
            onChangeEvent={handleInputChange}
            onInputEvent={inputSomenteNumero}
            value={userPessoalData.cep}
            type="text"
            id="cep"
            name="cep"
            icon={<FaSearch />}
            iconHandleEvent={handleCepSearch}
            onKeyPress={handleKeyDown}
          />

          <Input
            label="UF"
            placeholder="UF"
            value={enderecoData.uf}
            type="text"
            id="uf"
            disabled
          />

          <Input
            label="Cidade"
            placeholder="Cidade"
            value={enderecoData.cidade}
            type="text"
            id="cidade"
            disabled
          />

          <Input
            label="Logradouro"
            placeholder="Logradouro"
            value={enderecoData.logradouro}
            type="text"
            id="logradouro"
            disabled
          />

          <Input
            label="Bairro"
            placeholder="Bairro"
            value={enderecoData.bairro}
            type="text"
            id="bairro"
            disabled
          />

          <Input
            label="Número"
            placeholder="Digite o número"
            type="text"
            name="numero"
            value={userPessoalData.numero}
            onChangeEvent={handleInputChange}
            onInputEvent={inputSomenteNumero}
          />
        </div>
      </form>
    </div>
  );
}

export default CadastroEndereco;