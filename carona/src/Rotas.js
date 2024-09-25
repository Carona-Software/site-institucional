import { Routes, Route } from "react-router-dom";

// Importando as páginas
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import Viagens from "./components/pages/viagens/Viagens";
import Perfil from "./components/pages/meu-perfil/Perfil";
import Feedback from "./components/pages/feedback/Feedback";
import Cadastro from "./components/pages/cadastro/Cadastro";
import PerfilUser from "./components/pages/perfil/PerfilUser";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Transacoes from "./components/pages/transacoes/Transacoes";
import Fidelizados from "./components/pages/fidelizados/Fidelizados";
import Carros from "./components/pages/carros/Carros";
import RedefinirSenha from "./components/pages/redefinir_senha/RedefinirSenha";
import OferecerCarona from "./components/pages/oferecer_carona/OferecerCarona";
import ProcurarCarona from "./components/pages/procurar_carona/ProcurarCarona";
import DetalhesViagem from "./components/pages/detalhes_viagem/DetalhesViagem";

function Rotas() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/redefinir-senha" element={<RedefinirSenha />} />
            <Route path="/meu-perfil" element={<Perfil />} />
            <Route path="/perfil/:idUser" element={<PerfilUser />} />
            <Route path="/dashboard/:idUser" element={<Dashboard />} />
            <Route path="/viagens/:idUser" element={<Viagens />} />
            <Route path="/transacoes/:idUser" element={<Transacoes />} />
            <Route path="/fidelizados/:idUser" element={<Fidelizados />} />
            <Route path="/viagens/oferecer" element={<OferecerCarona />} />
            <Route path="/viagens/procurar" element={<ProcurarCarona />} />
            <Route path="/viagens/detalhes/:idViagem" element={<DetalhesViagem />} />
            <Route path="/feedback/:idUser" element={<Feedback />} />
            <Route path="/carros/:idUser" element={<Carros />} />
        </Routes>
    )
}

export default Rotas