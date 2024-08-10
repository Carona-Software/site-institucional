import React, { useState, useEffect } from "react";
import styles from "./CadastroCarro.module.css";
import Sidebar from "../../layout/sidebar/Sidebar";
import { MdOutlineAddCircle } from "react-icons/md";
import ActionButton from "../../layout/action_button/ActionButton";
import { useLocation } from "react-router-dom";
import CardCarro from "./card_carro/CardCarro";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

const CadastroCarro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    marca: "",
    modelo: "",
    placa: "",
    cor: "",
  });
  const [modelos, setModelos] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleMarcaChange = (e) => {
    const newMarca = e.target.value;
    setFormData({ ...formData, marca: newMarca, modelo: "" });
  };

  useEffect(() => {
    let ignore = false;

    const fetchModelos = async () => {
      try {
        if (formData.marca) {
          const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${formData.marca}?format=json`;
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error("Erro ao carregar modelos");
          }
          const data = await response.json();
          if (!ignore) {
            if (data.Results.length > 0) {
              const modelos = data.Results.map((result) => result.Model_Name);
              setModelos(modelos);
            } else {
              setModelos(["Nenhum modelo encontrado"]);
            }
          }
        } else {
          setModelos([]);
        }
      } catch (error) {
        console.error("Erro ao carregar modelos:", error);
        setModelos(["Erro ao carregar modelos"]);
      }
    };

    fetchModelos();

    return () => {
      ignore = true; // Define a flag como true ao desmontar o componente para evitar atualizações de estado após desmontagem
    };
  }, [formData.marca]);

  const validateForm = () => {
    const { marca, modelo, placa, cor } = formData;
    if (!marca || !modelo || !placa || !cor) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitted(true);
      setShowForm(false);
      toast.success("Carro cadastrado!");
    } else {
      toast.error("Preencha todos os campos!");
    }
  };

  const fechar = () => {
    setIsSubmitted(false);
    setShowForm(false);
  };

  const closeCard = () => {
    setIsSubmitted(false);
  };
  let local = useLocation();

  return (
    <>
      <Sidebar currentPageName={"/carros"} />
      <div className={styles["main"]}>
        <div className={styles["container"]}>
          <div className={styles["container-meu-carro"]}>
            <div className={styles["header-meu-carro"]}>
              <h3>Meus Carros</h3>
              <button
                className={styles["button-editar"]}
                onClick={() => setShowForm(true)}
              >
                <MdOutlineAddCircle />
                Novo
              </button>
            </div>

            <div className={styles["carros"]}>
              {/* <CardCarro nomeCarro="Fiat Mobi" placa={"DDR7F99"} />
              <CardCarro nomeCarro="Fiat Mobi" placa={"DDR7F99"} /> */}
            </div>
          </div>
          {showForm && (
            <div className={styles["form-container"]}>
              <h2>Novo Carro</h2>
              <div className={styles["box-campos"]}>
                <div className={styles["conjunto-input"]}>
                  <label htmlFor="marca">Marca</label>
                  <input
                    type="text"
                    id="marca"
                    value={formData.marca}
                    onChange={handleMarcaChange}
                    placeholder="Digite a marca..."
                  />
                </div>
                <div className={styles["conjunto-input"]}>
                  <label htmlFor="modelo">Modelo</label>
                  <select
                    id="modelo"
                    disabled={modelos.length === 0}
                    value={formData.modelo}
                    onChange={(e) =>
                      setFormData({ ...formData, modelo: e.target.value })
                    }
                  >
                    {modelos.length === 0 && (
                      <option value="">Selecione uma marca</option>
                    )}
                    {modelos.map((modelo, index) => (
                      <option key={index} value={modelo}>
                        {modelo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles["conjunto-input"]}>
                  <label htmlFor="placa">Placa</label>
                  <InputMask
                    mask="aaa-9a99"
                    type="text"
                    id="placa"
                    value={formData.placa}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        placa: e.target.value.toUpperCase(),
                      })
                    }
                  >
                    {(inputProps) => (
                      <input {...inputProps} type="text" id="placa" />
                    )}
                  </InputMask>
                </div>
                <div className={styles["conjunto-input"]}>
                  <label htmlFor="cor">Cor</label>
                  <input
                    type="text"
                    id="cor"
                    value={formData.cor}
                    onChange={(e) =>
                      setFormData({ ...formData, cor: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styles["botoes"]}>
                <button onClick={fechar} className={styles["button-cancelar"]}>
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className={styles["button-finalizar"]}
                >
                  Cadastrar
                </button>
              </div>
            </div>
          )}
          {isSubmitted && (
            <>
              <div className={styles["overlay active"]}></div>
              <CardCarro
                nomeCarro={`${formData.marca} ${formData.modelo}`}
                placa={formData.placa}
                cor={formData.cor}
                closeCard={closeCard}
              />
            </>
          )}
        </div>
      </div>
      {/* <div>
        <label htmlFor="marca">Digite a marca do veículo:</label>
        <input
          type="text"
          id="marca"
          value={marca}
          onChange={handleMarcaChange}
          placeholder="Digite a marca..."
        />

        <br />
        <br />

        <label htmlFor="modelo">Selecione o modelo do veículo:</label>
        <select id="modelo" disabled={modelos.length === 0}>
          {modelos.length === 0 && (
            <option value="">Selecione uma marca para ver os modelos</option>
          )}
          {modelos.map((modelo, index) => (
            <option key={index} value={modelo}>
              {modelo}
            </option>
          ))}
        </select>
      </div> */}
    </>
  );
};

export default CadastroCarro;
