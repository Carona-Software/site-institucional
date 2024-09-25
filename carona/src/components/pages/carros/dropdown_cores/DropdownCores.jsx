import { useEffect, useState } from 'react';
import styles from './DropdownCores.module.css'
import { IoChevronDownSharp } from "react-icons/io5";

function DropdownCores({
    handleColorSelected,
    selectedColor
}) {
    const [showDropdwon, setShowDropdown] = useState(false)
    const [corSelecionada, setCorSelecionada] = useState({
        label: '',
        hex: '',
        value: ''
    })

    const coresCarro = [
        {
            label: 'Preto',
            hex: '#000000',
            value: 'Preto'
        },
        {
            label: 'Branco',
            hex: '#FFFFFF',
            value: 'Branco'
        },
        {
            label: 'Azul',
            hex: '#173E6D',
            value: 'Azul'
        },
        {
            label: 'Verde',
            hex: '#298039',
            value: 'Verde'
        },
        {
            label: 'Vermelho',
            hex: '#D82323',
            value: 'Vermelho'
        },
        {
            label: 'Roxo',
            hex: '#8E32A3',
            value: 'Roxo'
        },
        {
            label: 'Marrom',
            hex: '#6C501D',
            value: 'Marrom'
        },
        {
            label: 'Laranja',
            hex: '#E85816',
            value: 'Laranja'
        },
        {
            label: 'Cinza',
            hex: '#808080',
            value: 'Cinza'
        },
        {
            label: 'Amarelo',
            hex: '#EDE917',
            value: 'Amarelo'
        },
        {
            label: 'Prata',
            hex: '#C0C0C0',
            value: 'Prata'
        },
        {
            label: 'Vinho',
            hex: '#781D1D',
            value: 'Vinho'
        },
    ]

    const definirCorCarro = () => {
        switch (selectedColor) {
            case 'Preto':
                setCorSelecionada({
                    label: coresCarro[0].label,
                    hex: coresCarro[0].hex,
                    value: coresCarro[0].value
                })
                break;
            case 'Branco':
                setCorSelecionada({
                    label: coresCarro[1].label,
                    hex: coresCarro[1].hex,
                    value: coresCarro[1].value
                })
                break;
            case 'Azul':
                setCorSelecionada({
                    label: coresCarro[2].label,
                    hex: coresCarro[2].hex,
                    value: coresCarro[2].value
                })
                break;
            case 'Verde':
                setCorSelecionada({
                    label: coresCarro[3].label,
                    hex: coresCarro[3].hex,
                    value: coresCarro[3].value
                })
                break;
            case 'Vermelho':
                setCorSelecionada({
                    label: coresCarro[4].label,
                    hex: coresCarro[4].hex,
                    value: coresCarro[4].value
                })
                break;
            case 'Roxo':
                setCorSelecionada({
                    label: coresCarro[5].label,
                    hex: coresCarro[5].hex,
                    value: coresCarro[5].value
                })
                break;
            case 'Marrom':
                setCorSelecionada({
                    label: coresCarro[6].label,
                    hex: coresCarro[6].hex,
                    value: coresCarro[6].value
                })
                break;
            case 'Laranja':
                setCorSelecionada({
                    label: coresCarro[7].label,
                    hex: coresCarro[7].hex,
                    value: coresCarro[7].value
                })
                break;
            case 'Cinza':
                setCorSelecionada({
                    label: coresCarro[8].label,
                    hex: coresCarro[8].hex,
                    value: coresCarro[8].value
                })
                break;
            case 'Amarelo':
                setCorSelecionada({
                    label: coresCarro[9].label,
                    hex: coresCarro[9].hex,
                    value: coresCarro[9].value
                })
                break;
            case 'Prata':
                setCorSelecionada({
                    label: coresCarro[10].label,
                    hex: coresCarro[10].hex,
                    value: coresCarro[10].value
                })
                break;
            case 'Vinho':
                setCorSelecionada({
                    label: coresCarro[11].label,
                    hex: coresCarro[11].hex,
                    value: coresCarro[11].value
                })
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        definirCorCarro()
    }, [selectedColor])

    return (
        <div className={styles['dropdown']} onClick={() => setShowDropdown(!showDropdwon)}>
            {
                corSelecionada.value !== ''
                    ? (
                        <div className={styles["selected-color"]}>
                            <div className={styles["circle-color"]} style={{ backgroundColor: corSelecionada.hex }}></div>
                            <span>{corSelecionada.label}</span>
                        </div>
                    )
                    : <span>Selecione a cor</span>
            }
            <IoChevronDownSharp />
            {
                showDropdwon &&
                <div className={styles['colors-list']}>
                    {
                        coresCarro.map((color, index) => (
                            <div key={index} className={styles["option"]} onClick={() => handleColorSelected(color.value)} >
                                <div className={styles["circle-color"]} style={{ backgroundColor: color.hex }}></div>
                                <span>{color.label}</span>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default DropdownCores