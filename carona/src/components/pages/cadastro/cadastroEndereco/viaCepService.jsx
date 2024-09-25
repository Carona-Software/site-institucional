import axios from 'axios';

const viaCepService = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados do CEP:', error);
    throw error;
  }
};

export default viaCepService;