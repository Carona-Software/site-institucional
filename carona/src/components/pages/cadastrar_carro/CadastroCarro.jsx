import React, { useState, useEffect } from "react";
import styles from "./CadastroCarro.module.css";
import Sidebar from "../../layout/sidebar/Sidebar";
import { MdOutlineAddCircle } from "react-icons/md";
import CardCarro from "./card_carro/CardCarro";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';// Importa o componente de toast

const apiUrl = "http://localhost:8080"; // URL da sua API

const CadastroCarro = () => {
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    placa: "",
    cor: "",
    tipo: "Carro de Passeio",
    usuarioId: sessionStorage.idUsuario,
  });
  const [modelos, setModelos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [carros, setCarros] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editCarroId, setEditCarroId] = useState(null);

  const handleMarcaChange = (e) => {
    const newMarca = e.target.value;
    setFormData({ ...formData, marca: newMarca, modelo: "" });
  };

  const handleDeleteCarro = async (carroId) => {
    try {
      await axios.delete(`${apiUrl}/carro/deletar-carro/${carroId}`);
      setCarros((prevCarros) => prevCarros.filter((carro) => carro.idCarro !== carroId));
    } catch (error) {
      console.error("Erro ao excluir o carro:", error.message);
    }
  };

  useEffect(() => {
    let ignore = false;

    const fetchCarros = async () => {
      try {
        const response = await axios.get(`${apiUrl}/carro/listar-carros/${sessionStorage.idUsuario}`);
        if (!ignore) setCarros(response.data);
      } catch (error) {
        console.error("Erro ao obter lista de carros:", error.message);
      }
    };

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
            const modelos = data.Results.length > 0
              ? data.Results.map((result) => result.Model_Name)
              : ["Nenhum modelo encontrado"];
            setModelos(modelos);
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
    fetchCarros();

    return () => {
      ignore = true;
    };
  }, [formData.marca]);

  const handleSubmit = async () => {

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!formData.marca || !formData.modelo || !formData.placa || !formData.cor) {
      toast.error("Por favor, preencha todos os campos antes de criar ou editar um carro.");
      return;
    }

    if (isEditing) {
      try {
        const response = await axios.put(`${apiUrl}/carro/atualizar-carro/${editCarroId}`, formData);
        const updatedCarros = carros.map((carro) =>
          carro.idCarro === editCarroId ? response.data : carro
        );
        setCarros(updatedCarros);
        setIsEditing(false);
        setEditCarroId(null);
        resetFormData();
        toast.success("Carro atualizado com sucesso!");
        setShowForm(false);
      } catch (error) {
        console.error("Erro ao atualizar carro:", error.message);
      }
    } else {
      try {
        const response = await axios.post(`${apiUrl}/carro/cadastrar-carro`, formData);
        setCarros([...carros, response.data]);
        resetFormData();
        toast.success("Carro cadastrado com sucesso!");
        setShowForm(false);
      } catch (error) {
        console.error("Erro ao cadastrar carro:", error.message);
      }
    }
  };

  const handleEditCarro = (carroId) => {
    const carro = carros.find((c) => c.idCarro === carroId);
    if (carro) {
      setIsEditing(true);
      setEditCarroId(carroId);
      setFormData({
        marca: carro.marca,
        modelo: carro.modelo,
        placa: carro.placa,
        cor: carro.cor,
        tipo: carro.tipo,
        usuarioId: sessionStorage.idUsuario,
      });
      setShowForm(true);
    } else {
      console.error("Carro não encontrado:", carroId);
    }
  };

  const resetFormData = () => {
    setFormData({
      marca: "",
      modelo: "",
      placa: "",
      cor: "",
      tipo: "Carro de Passeio",
      usuarioId: sessionStorage.idUsuario,
    });
  };

  const fechar = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditCarroId(null);
    resetFormData();
  };

  return (
    <>
      <Sidebar currentPageName={"/carros"} />
      <div className={styles["main"]}>
        <div className={styles["container"]}>
          <div className={styles["button-container"]}>
            <button className={styles["button-novo"]} onClick={() => setShowForm(true)}>
              <MdOutlineAddCircle />
              Novo Carro
            </button>
          </div>
          {showForm && (
            <div className={styles["form-container"]}>
              <h2>{isEditing ? "Editar Dados do Carro" : "Novo Carro"}</h2>
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
                    onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                  >
                    {modelos.length === 0 && <option value="">Selecione uma marca</option>}
                    {modelos.map((modelo, index) => (
                      <option key={index} value={modelo}>
                        {modelo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles["conjunto-input"]}>
                  <label htmlFor="placa">Placa</label>
                  <input
                    type="text"
                    id="placa"
                    value={formData.placa}
                    onChange={(e) => setFormData({ ...formData, placa: e.target.value.toUpperCase() })}
                  />
                </div>
                <div className={styles["conjunto-input"]}>
                  <label htmlFor="cor">Cor</label>
                  <input
                    type="text"
                    id="cor"
                    value={formData.cor}
                    onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
                  />
                </div>
              </div>
              <div className={styles["botoes"]}>
                <button onClick={fechar} className={styles["button-cancelar"]}>
                  Cancelar
                </button>
                <button onClick={handleSubmit} className={styles["button-finalizar"]}>
                  {isEditing ? "Editar" : "Cadastrar"}
                </button>
              </div>
            </div>
          )}
          {carros.map((carro, index) => (
            <CardCarro
              key={index}
              id={carro.idCarro}
              nomeCarro={carro.marca + " " + carro.modelo}
              placa={carro.placa}
              cor={carro.cor}
              onDelete={() => handleDeleteCarro(carro.idCarro)}
              onEdit={() => handleEditCarro(carro.idCarro)}
            />
          ))}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default CadastroCarro;
