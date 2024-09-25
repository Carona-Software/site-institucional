import styles from './ModalCarro.module.css'
import InputMask from "react-input-mask";
import DropdownCores from "../dropdown_cores/DropdownCores";

function ModalCarro({
    carroData,
    onChangeEvent,
    onMarcaChange,
    marcasCarro,
    modelosCarro,
    selectedColor,
    onCancelEvent,
    onSaveEvent
}) {
    const handleSelectOption = (name, value) => {
        onChangeEvent({ target: { name: name, value: value } })
    }

    const handleMarcaChange = (name, value) => {
        onMarcaChange({ target: { name: name, value: value } })
    }

    return (
        <div className={styles["form-container"]}>
            <h3>{(carroData.id !== null && carroData.id !== undefined) ? 'Editar Carro' : 'Novo Carro'}</h3>
            <div className={styles["box-inputs"]}>
                <div className={styles["conjunto-input"]}>
                    <label htmlFor="marca">Marca</label>
                    <select
                        id="marca"
                        name="marca"
                        disabled={marcasCarro.length === 0}
                        value={carroData.marca}
                        onChange={(e) => handleMarcaChange('marca', e.target.value)}
                    >
                        {
                            marcasCarro.map((marca, index) => (
                                <option key={index} value={marca}>
                                    {marca}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className={styles["conjunto-input"]}>
                    <label htmlFor="modelo">Modelo</label>
                    <select
                        id="modelo"
                        name="modelo"
                        disabled={modelosCarro.length === 0}
                        value={carroData.modelo ? carroData.modelo : 'Selecione um modelo'}
                        onChange={(e) => handleSelectOption('modelo', e.target.value)}
                    >
                        {modelosCarro.length === 0 && (
                            <option value="">Selecione a marca</option>
                        )}
                        {modelosCarro.map((modelo, index) => (
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
                        name="placa"
                        value={carroData.placa}
                        onChange={onChangeEvent}
                        placeholder='ABC-0D12'
                    >
                        {(inputProps) => (
                            <input {...inputProps} type="text" id="placa" />
                        )}
                    </InputMask>
                </div>

                <div className={styles["conjunto-input"]}>
                    <label htmlFor="cor">Cor</label>
                    <DropdownCores
                        handleColorSelected={(cor) => handleSelectOption('cor', cor)}
                        selectedColor={selectedColor}
                    />
                </div>
            </div>

            <div className={styles["action-buttons"]}>
                <button onClick={onCancelEvent} className={styles["cancelar"]}>
                    Cancelar
                </button>

                <button onClick={onSaveEvent} className={styles["finalizar"]}>
                    Cadastrar
                </button>
            </div>
        </div>
    )
}

export default ModalCarro