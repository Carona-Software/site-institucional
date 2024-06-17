import React, { useState, useEffect } from "react";
import ContactList from "../lista_contatos/ListaContatos";
import Chat from "../Chat";
import styles from "./ChatContainer.module.css";
import Sidebar from "../../../layout/sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ChatContainer = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const tipoUsuario = sessionStorage.tipoUsuario.replace(/"/g, '');
      const uniqueContacts = {};
      const url = tipoUsuario === "MOTORISTA"
        ? `http://localhost:8080/mensagem/buscar-participantes-viagens-motorista/${sessionStorage.idUsuario}`
        : `http://localhost:8080/mensagem/buscar-participantes-viagens-passageiro/${sessionStorage.idUsuario}`;

       
      const response = await axios.get(url);

      const contacts = tipoUsuario === "MOTORISTA" ? response.data.passageiros : response.data;
      contacts.forEach(contact => {
        const id = tipoUsuario === "MOTORISTA" ? contact.idUsuario : contact.idMotorista;
        uniqueContacts[id] = {
          id,
          name: contact.nome,
        };
      });

      setContacts(Object.values(uniqueContacts));
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    if (selectedContact && selectedContact.id) { 
      const interval = setInterval(() => {
        fetchMessages(selectedContact.id);
      }, 2000);
  
      return () => clearInterval(interval);
    }
  }, [selectedContact]);

  const fetchMessages = async (contactId) => {
    const usuarioId = sessionStorage.idUsuario;
    const tipoUsuario = sessionStorage.tipoUsuario.replace(/"/g, '');
    const url = `http://localhost:8080/mensagem/buscar-mensagens-entre-usuarios?usuarioId=${usuarioId}&contactId=${contactId}`;
    try {
      const response = await axios.get(url);
      setMessages(response.data);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    }
  };

  const handleContactClick = async (contact) => {
    setSelectedContact(contact);
  
    const url = `http://localhost:8080/mensagem/contar-mensagens-recebidas/${contact.id}`;
    try {
      const response = await axios.get(url);

      sessionStorage.setItem("mensagensNaoLidas", response.data);
      console.log(`User ${contact.id} has received ${response.data} messages.`);
    } catch (error) {
      console.error("Error fetching the number of messages received:", error);
    }
  };

  const local = useLocation();

  return (
    <>
      <Sidebar currentPageName={local.pathname} />
      <div className={styles["main"]}>
        <div className={styles["box"]}>
          <ContactList
            contacts={contacts}
            onContactClick={handleContactClick}
          />
          <Chat selectedContact={selectedContact} messages={messages} />
        </div>
      </div>
    </>
  );
};

export default ChatContainer;