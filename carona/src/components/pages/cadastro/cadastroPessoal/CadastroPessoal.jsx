import React from "react";
import styles from "./CadastroPessoal.module.css";
import Input from "../../../layout/input/Input";
import { inputSomenteNumero } from "../../../../utils/InputValidations";

function CadastroPessoal({ handleUserEvent, userPessoalData }) {
  const handleOptionChange = (option) => {
    handleUserEvent({ target: { name: "sexo", value: option } });
  };

  const handleOptionUserChange = (option) => {
    handleUserEvent({ target: { name: "perfil", value: option } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles["div-forms"]}>
      <h1>Dados Pessoais</h1>
      <form className={styles["forms"]} onSubmit={handleSubmit}>
        <div className={styles["box-inputs"]}>
          <Input
            type="text"
            placeholder="Digite o nome"
            name="nome"
            label="Nome"
            id="nome"
            onChangeEvent={handleUserEvent}
            value={userPessoalData.nome}
          />

          <div className={styles["sexo-box-input"]}>
            <h4>Sexo</h4>
            <div className={styles["sexo-options"]}>
              <div className={styles["custom-radio-option"]}>
                <input
                  type="radio"
                  id="masculino"
                  value="masculino"
                  checked={userPessoalData.sexo === "masculino"}
                  onChange={() => handleOptionChange("masculino")}
                />
                <label htmlFor="masculino">Masculino</label>
              </div>
              <div className={styles["custom-radio-option"]}>
                <input
                  type="radio"
                  id="feminino"
                  value="feminino"
                  checked={userPessoalData.sexo === "feminino"}
                  onChange={() => handleOptionChange("feminino")}
                />
                <label htmlFor="feminino">Feminino</label>
              </div>
              <div className={styles["custom-radio-option"]}>
                <input
                  type="radio"
                  id="outros"
                  value="outros"
                  checked={userPessoalData.sexo === "outros"}
                  onChange={() => handleOptionChange("outros")}
                />
                <label htmlFor="outros">Outros</label>
              </div>
            </div>
          </div>

          <Input
            type="text"
            placeholder="Digite o email"
            name="email"
            label="Email"
            id="email"
            onChangeEvent={handleUserEvent}
            value={userPessoalData.email}
          />

          <Input
            type="text"
            placeholder="Digite o CPF"
            name="cpf"
            label="CPF"
            id="cpf"
            onChangeEvent={handleUserEvent}
            value={userPessoalData.cpf}
            onInputEvent={inputSomenteNumero}
          />

          <Input
            type="date"
            placeholder="dd/mm/aaaa"
            onChangeEvent={handleUserEvent}
            value={userPessoalData.dataNascimento}
            name="dataNascimento"
            label="Data de Nascimento"
            id="dataNascimento"
          />

          <div className={styles["perfil-box-input"]}>
            <h4>Perfil</h4>
            <div className={styles["perfil-options"]}>
              <div className={styles["custom-radio-option"]}>
                <input
                  type="radio"
                  id="motorista"
                  value="motorista"
                  checked={userPessoalData.perfil === "motorista"}
                  onChange={() => handleOptionUserChange("motorista")}
                />
                <label htmlFor="motorista">Motorista</label>
              </div>

              <div className={styles["custom-radio-option"]}>
                <input
                  type="radio"
                  id="passageiro"
                  value="passageiro"
                  checked={userPessoalData.perfil === "passageiro"}
                  onChange={() => handleOptionUserChange("passageiro")}
                />
                <label htmlFor="passageiro">Passageiro</label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CadastroPessoal;