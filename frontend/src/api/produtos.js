
// Detectar ambiente automaticamente
const getApiUrl = () => {
  // Produção: usar variável de ambiente ou URL padrão
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || 'https://campustradepedropintor-cxf0cjhseqf4a2ab.eastus2-01.azurewebsites.net';
  }
  console.log("Ambiente de desenvolvimento detectado");
  return process.env.REACT_APP_API_URL;
};

const BASE_URL = getApiUrl();



// Função para listar produtos
export const listarProdutos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/produtos`);
    if (!response.ok) throw new Error('Erro ao buscar produtos');
    return await response.json();
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    throw error;
  }
};

// Função para criar produto
export const criarProduto = async (produto) => {
  try {
    const response = await fetch(`${BASE_URL}/produtos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto)
    });
    
    if (!response.ok) throw new Error('Erro ao criar produto');
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
};