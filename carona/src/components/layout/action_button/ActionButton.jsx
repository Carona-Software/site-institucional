import styles from "./ActionButton.module.css";
import loadingGif from '../../../utils/assets/loading.gif'

function ActionButton({ type, iconLabel, label, onClickEvent, loading }) {
  return (
    <button onClick={onClickEvent} className={`${styles['button']} ${styles[type]}`}>
      {iconLabel && !loading && iconLabel}
      {label && !loading && label}
      {loading && <img src={loadingGif} alt="Carregando" />}
    </button>
  );
}

export default ActionButton;
