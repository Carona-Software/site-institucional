import { FaStar } from "react-icons/fa";
import styles from "./Sidebar.module.css";
import logo from "../../../utils/assets/logoCaRona.svg";
import { LuLogOut } from "react-icons/lu";
import { ImProfile } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import imgUser from '../../../utils/assets/user-image.png'

function Sidebar({ currentPageName }) {
  const navigate = useNavigate();

  const perfilUser = sessionStorage.getItem('perfilUser');
  const nomeUser = sessionStorage.getItem('nomeUser');
  const notaUser = sessionStorage.getItem('notaUser');
  const idUser = sessionStorage.getItem('idUser');
  const fotoUser = sessionStorage.getItem('fotoUser');

  function logout() {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <header>
      <img src={logo} className={styles["img-logo"]} alt="Logo CaRona" />

      <div className={styles["box-user"]}>
        <div className={styles["user-foto"]}>
          <img src={fotoUser ? fotoUser : imgUser} alt="Profile" />
        </div>
        <div className={styles["user-infos"]}>
          <p>{nomeUser}</p>
          <div className={styles["box-nota"]}>
            <FaStar />
            <span id="user-nota">
              {
                (notaUser == null || notaUser === '') ? '--' : notaUser
              }
            </span>
          </div>
        </div>
      </div>

      <ul className={styles["itens-sidebar"]} style={{ height: perfilUser === 'MOTORISTA' ? '332px' : '280px' }}>
        <li onClick={() => navigate("/meu-perfil")} className={currentPageName === '/meu-perfil' ? `${styles["item"]} ${styles["current-page"]}` : styles["item"]}>
          <ImProfile />
          <span>Meu perfil</span>
        </li>

        <li onClick={() => navigate(`/dashboard/${idUser}`)} className={currentPageName === '/dashboard' ? `${styles["item"]} ${styles["current-page"]}` : styles["item"]}>
          <SiGoogleanalytics />
          <span>Dashboard</span>
        </li>

        {
          perfilUser === "MOTORISTA" ?
            <li onClick={() => navigate("/viagens/oferecer")} className={currentPageName === '/viagens/oferecer' ? `${styles["item"]} ${styles["current-page"]}` : styles["item"]}>
              <MdOutlineAddCircle />
              <span>Oferecer Carona</span>
            </li>
            :
            <li onClick={() => navigate("/viagens/procurar")} className={currentPageName === '/viagens/procurar' ? `${styles["item"]} ${styles["current-page"]}` : styles["item"]}>
              <FaSearch />
              <span>Procurar</span>
            </li>
        }

        <li onClick={() => navigate(`/viagens/${idUser}`)} className={currentPageName === '/viagens' ? `${styles["item"]} ${styles["current-page"]}` : styles["item"]}>
          <FaMapLocationDot />
          <span>Viagens</span>
        </li>

        <li onClick={() => navigate(`/transacoes/${idUser}`)} className={currentPageName === '/transacoes' ? `${styles["item"]} ${styles["current-page"]}` : styles["item"]}>
          <GrTransaction />
          <span>Transações</span>
        </li>

        {
          perfilUser === 'MOTORISTA' &&
          <li onClick={() => navigate(`/carros/${idUser}`)} className={currentPageName === '/carros' ? `${styles["item"]} ${styles["current-page"]}` : styles["item"]}>
            <FaCar />
            <span>Carros</span>
          </li>
        }
      </ul>

      <div className={styles["logout"]} onClick={logout}>
        <LuLogOut />
        <span>Sair</span>
      </div>
    </header>
  );
}

export default Sidebar;
