import styles from "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";

// Importando elementos de layout
import Container from "./components/layout/container/Container";
import "mapbox-gl/dist/mapbox-gl.css";
import Rotas from "./Rotas";

function App() {
  return (
    <Router>
      <Container customClass="min-height">
        <ToastContainer className={styles["toast-body"]} />
        <Rotas />
      </Container>
    </Router>
  );
}

export default App;
