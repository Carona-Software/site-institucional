import React, { useState, useEffect } from "react";
import styles from "./Carros.module.css";
import Sidebar from "../../layout/sidebar/Sidebar";
import { MdOutlineAddCircle } from "react-icons/md";
import CardCarro from "./card_carro/CardCarro";
import { toast } from "react-toastify";
import ModalCarro from "./modal_carro/ModalCarro";
import api from '../../../Api'
import imgSemCarros from '../../../utils/assets/image-not-found-viagem.svg'

const Carros = () => {
  const idUser = sessionStorage.getItem('idUser')

  const [carrosUser, setCarrosUser] = useState([])

  const [isEditMode, setIsEditMode] = useState(false)

  const [novoCarroData, setNovoCarroData] = useState({
    marca: "",
    modelo: "",
    placa: "",
    cor: "",
    fkUsuario: idUser
  });

  const [editCarroData, setEditCarroData] = useState({
    id: null,
    marca: "",
    modelo: "",
    placa: "",
    cor: "",
    fkUsuario: null
  });

  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const getCarrosUser = async () => {
    await api.get(`/carros/usuario/${idUser}`)
      .then((res) => {
        console.log(res.data);
        setCarrosUser(res.data)
      })
      .catch(error => console.log('Erro ao buscar carros do usuário: ', error))
  }

  useEffect(() => {
    getCarrosUser();
  }, []);

  const handleOnChange = (e) => {
    if (isEditMode) {
      setEditCarroData({ ...editCarroData, [e.target.name]: e.target.value });
    } else {
      setNovoCarroData({ ...novoCarroData, [e.target.name]: e.target.value });
    }
  };

  const handleOnMarcaChange = (e) => {
    if (isEditMode) {
      setEditCarroData({ ...editCarroData, modelo: '', marca: e.target.value });
    } else {
      setNovoCarroData({ ...novoCarroData, modelo: '', marca: e.target.value });
    }
  }

  const fetchMarcasCarro = async () => {
    try {
      const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      let marcasCarro = [];

      for (let i = 0; i < data.Results.length; i++) {
        const element = data.Results[i];
        marcasCarro.push(element.MakeName)
      }

      let marcasOrdenadas = capitalizarEOrdenarLista(marcasCarro)
      marcasOrdenadas.unshift('Selecione a marca')

      setMarcas(marcasOrdenadas);
    } catch (error) {
      console.error("Catch -> Erro ao carregar modelos:", error);
      toast.error('Erro ao carregar marcas')
      setModelos(["Nenhum modelo disponível"]);
    }
  };

  function capitalizarPalavras(lista) {
    const capitalizar = (palavra) => {
      return palavra
        .split(' ')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
        .join(' ');
    };

    return lista.map(capitalizar);
  }

  function capitalizarEOrdenarLista(lista) {
    const listaCapitalizada = capitalizarPalavras(lista)

    return listaCapitalizada.sort((a, b) => a.localeCompare(b));
  }

  const fetchModelosCarro = async () => {
    try {
      if (isEditMode) {
        if (editCarroData.marca !== '') {
          const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${editCarroData.marca}?format=json`;
          const response = await fetch(apiUrl);
          const data = await response.json();

          const modelosCarro = data.Results.map((result) => result.Model_Name);
          let modelosOrdenados = capitalizarEOrdenarLista(modelosCarro)
          modelosOrdenados.unshift('Selecione o modelo')

          setModelos(modelosOrdenados);
        } else {
          setModelos([]);
        }
      } else {
        if (novoCarroData.marca !== '') {
          const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${novoCarroData.marca}?format=json`;
          const response = await fetch(apiUrl);
          const data = await response.json();

          const modelosCarro = data.Results.map((result) => result.Model_Name);
          let modelosOrdenados = capitalizarEOrdenarLista(modelosCarro)
          modelosOrdenados.unshift('Selecione o modelo')

          setModelos(modelosOrdenados);
        } else {
          setModelos([]);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar modelos:", error);
      toast.error('Erro ao carregar modelos')
      setModelos(["Erro ao carregar modelos"]);
    }
  };

  useEffect(() => {
    fetchMarcasCarro();
  }, []);

  useEffect(() => {
    fetchModelosCarro();
  }, [novoCarroData.marca]);

  const validateForm = (carroData) => {
    if (
      validarMarca(carroData.marca) &&
      validarModelo(carroData.modelo) &&
      validarPlaca(carroData.placa) &&
      validarCor(carroData.cor)
    ) {
      return true;
    }
    return false;

  };

  const validarMarca = (marca) => {
    if (marca === '' || marca === 'Selecione a marca') {
      toast.error('Selecione a marca do carro')
      return false
    }
    return true
  }

  const validarModelo = (modelo) => {
    if (modelo === '' || modelo === 'Selecione o modelo') {
      toast.error('Selecione o modelo do carro')
      return false
    }
    return true
  }

  const validarPlaca = (placa) => {
    let placaFormatada = placa.replace(/[-_]/g, '')

    if (placaFormatada === '' || placaFormatada.length !== 7) {
      toast.error('Digite uma placa válida')
      return false
    } else {
      if (isEditMode) {
        setEditCarroData({ ...editCarroData, placa: placaFormatada })
      } else {
        setNovoCarroData({ ...novoCarroData, placa: placaFormatada })
      }
      return true
    }
  }

  const validarCor = (cor) => {
    if (cor === '' || cor === 'Selecione a cor') {
      toast.error('Selecione a cor do carro')
      return false
    }
    return true
  }

  const handleOpenEditModal = (carro) => {
    setIsEditMode(true)
    setEditCarroData({
      id: carro.id,
      marca: carro.marca,
      modelo: carro.modelo,
      placa: carro.placa,
      cor: carro.cor,
      fkUsuario: carro.motorista.id,
    })
    setShowForm(true)
  }

  const handleSaveCarro = () => {
    if (validateForm(isEditMode ? editCarroData : novoCarroData)) {
      if (isEditMode) {
        handleEditCarro(editCarroData.id)
      } else {
        handlePostCarro()
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditMode(false);
  };


  const handlePostCarro = async () => {
    await api.post(`/carros`, novoCarroData)
      .then(() => {
        getCarrosUser()
        toast.success('Carro cadastrado com sucesso')
        setShowForm(false);
        setNovoCarroData({
          marca: "",
          modelo: "",
          placa: "",
          cor: "",
          fkUsuario: idUser
        })
      })
      .catch(error => {
        console.log('Erro ao cadastrar carro: ', error);
        toast.warning('Não foi possível cadastrar o carro')
      })
  }

  const handleEditCarro = async (idCarro) => {
    delete editCarroData.id
    await api.put(`/carros/${idCarro}`, editCarroData)
      .then(() => {
        getCarrosUser()
        toast.success('Carro atualizado com sucesso')
        setShowForm(false);
      })
      .catch(error => {
        console.log('Erro ao atualizar carro: ', error);
        toast.warning('Não foi possível atualizar o carro')
      })
  }

  const handleRemoveCarro = async (idCarro) => {
    await api.delete(`/carros/${idCarro}`)
      .then(() => {
        getCarrosUser()
        toast.success('Carro removido com sucesso')
      })
      .catch(error => {
        console.log('Erro ao deletar carro: ', error);
        toast.error('Houve um erro ao deletar o carro')
      })
  }

  return (
    <>
      <Sidebar currentPageName={"/carros"} />
      <div className={styles["main"]}>
        <div className={styles["container"]}>
          <div className={styles["title-action"]}>
            <h3>Meus Carros</h3>
            <button
              onClick={() => setShowForm(true)}
            >
              <MdOutlineAddCircle />
              Novo
            </button>
          </div>

          <div className={
            carrosUser.length > 0
              ? `${styles["container-carros"]} ${styles["start"]}`
              : `${styles["container-carros"]} ${styles["center"]}`
          }>
            {
              carrosUser.length > 0
                ? (
                  carrosUser.map((carro, index) => (
                    <CardCarro
                      key={index}
                      marca={carro.marca}
                      modelo={carro.modelo}
                      placa={carro.placa}
                      cor={carro.cor}
                      handleEditCarro={() => handleOpenEditModal(carro)}
                      handleRemoveCarro={() => handleRemoveCarro(carro.id)}
                    />
                  ))
                )
                : (
                  <div className={styles["sem-carros"]}>
                    <h4>Nenhum carro cadastrado</h4>
                    <img src={imgSemCarros} alt="Nenhum carro cadastrado" />
                  </div>
                )
            }
          </div>

          {showForm && (
            <ModalCarro
              carroData={isEditMode ? editCarroData : novoCarroData}
              // isEditMode={isEditMode}
              onChangeEvent={handleOnChange}
              onMarcaChange={handleOnMarcaChange}
              marcasCarro={marcas}
              modelosCarro={modelos}
              selectedColor={isEditMode ? editCarroData.cor : novoCarroData.cor}
              onCancelEvent={handleCancel}
              onSaveEvent={handleSaveCarro}
            />
          )}
        </div>
        {showForm && (
          <div className={styles["background-modal"]}></div>
        )}
      </div>
    </>
  );
};

export default Carros;
