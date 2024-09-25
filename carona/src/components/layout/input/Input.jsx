import styles from "./Input.module.css";

function Input(props) {
  return (
    <div className={styles["box-input"]}>
      <h4>{props.label}</h4>

      <div className={styles["div-input"]}>
        <input
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          id={props.id}
          onChange={props.onChangeEvent}
          value={props.value}
          disabled={props.disabled}
          onKeyDown={props.onKeyDown}
          onInput={props.onInputEvent}
        />

        <div className={styles["div-icon"]} onClick={props.iconHandleEvent}>
          {props.icon}
        </div>
      </div>

      {props.textLink && (
        <span onClick={props.onClickSubText}>{props.textLink}</span>
      )}
    </div>
  );
}

export default Input;
