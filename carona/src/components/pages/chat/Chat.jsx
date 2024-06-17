import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Chat.module.css";
import { FaArrowUp } from "react-icons/fa";

const Chat = ({ selectedContact }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const imageUrl = `https://res.cloudinary.com/dkzjrifqn/image/upload/k3xzen0rgeoq9v05lhcb`;

  useEffect(() => {
    if (selectedContact && selectedContact.id) { 
      console.log("Salada com cebola")
      console.log("o id que chega do motorista é " + selectedContact.id)
      const interval = setInterval(() => {
        fetchMessages(selectedContact.id);
      }, 2000);
  
      return () => clearInterval(interval);
    }
  }, [selectedContact]);
  
  const fetchMessages = async (contactId) => {
    const usuarioId = sessionStorage.idUsuario;
    console.log("Salada com cebola")
    try {
      let response = "";
      let tipoUsuario = sessionStorage.tipoUsuario.replace(/"/g, '');
      console.log(tipoUsuario)
      if(tipoUsuario === "MOTORISTA"){
        console.log("entrou")
        console.log(contactId)
        console.log(usuarioId)
       response = await axios.get(`http://localhost:8080/mensagem/buscar-mensagens-entre-usuarios-alternativo?usuarioId=${usuarioId}&contactId=${contactId}`);
       console.log(response.data)
      }
      else if(tipoUsuario === "PASSAGEIRO"){
        console.log("entrou")
        console.log("id do usuario " + sessionStorage.idUsuario)  
        console.log("id do motorista " + contactId)
        response = await axios.get(`http://localhost:8080/mensagem/buscar-mensagens-entre-usuarios-alternativo?usuarioId=${sessionStorage.idUsuario}&contactId=${contactId}`);
        console.log(response.data)
      }
      setMessages(response.data);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    }
  };
  

  const sendMessage = async () => {
    const senderId = sessionStorage.idUsuario;
    const receiverId = selectedContact.id;

    console.log(senderId)
    console.log(receiverId)
    if (!senderId || !receiverId || newMessage.trim() === "") return;

    const newMsg = {
        senderId,
        receiverId,
        texto: newMessage,
    };

    try {
        const response = await axios.post(`http://localhost:8080/mensagem/salvar`, newMsg);
        setMessages([...messages, response.data]);
        setNewMessage("");
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!selectedContact) {
    return (
      <div className={styles["chat-empty"]}>
        <img src={imageUrl} alt="chatImage" />
        <span>Clique em uma conversa para exibir as mensagens</span>
      </div>
    );
  }
  return (
    <div className={styles["chat"]}>
      <h2>{selectedContact.name}</h2>
      <div className={styles["messages-container"]}>
        {messages.length === 0 ? (
          <p className={styles["no-messages"]}>
            Inicie uma conversa com {selectedContact.name}
          </p>
        ) : (
          [...messages].reverse().map((msg, index) => (
            <div
              key={index}
              className={`${styles["message"]} ${
                msg.senderId === sessionStorage.idUsuario
                  ? styles["sent-by-current-user"]
                  : styles["sent-by-other-user"]
              }`}
            >
              {msg.texto}
            </div>
          ))
        )}
      </div>
      <div className={styles["input-container"]}>
        <input
          type="text"
          placeholder="Digite uma mensagem..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <FaArrowUp onClick={sendMessage} />
      </div>
    </div>
  );
}
export default Chat;