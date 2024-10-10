import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const authentication = (Component, perfilPermitido) => {
    return (props) => {
        const perfilUser = sessionStorage.getItem('perfilUser');
        const idUser = sessionStorage.getItem('idUser');
        const navigate = useNavigate()

        if (perfilPermitido.toUpperCase() === perfilUser) {
            return <Component {...props} />;
        } else {
            useEffect(() => {
                navigate(`/dashboard/${idUser}`)
            })
        }
    };
};

export default authentication;