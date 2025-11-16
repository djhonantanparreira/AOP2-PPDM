// Configuração da API
// Para usar sua própria MockAPI:
// 1. Acesse https://mockapi.io/
// 2. Crie uma conta gratuita
// 3. Crie um novo projeto
// 4. Crie os endpoints: pets, adoptions, faqs
// 5. Substitua a URL abaixo pela sua URL do MockAPI

export const API_CONFIG = {
  BASE_URL: "https://691a0de89ccba073ee94bb20.mockapi.io/api",
  ENDPOINTS: {
    PETS: "/pets",
    ADOPTIONS: "/adoptions",
    FAQS: "/faqs",
  },
  TIMEOUT: 10000,
};

// Função auxiliar para fazer requisições
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: API_CONFIG.TIMEOUT,
  };

  const config = { ...defaultOptions, ...options };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('API Request Error:', error);
    return { 
      success: false, 
      error: error.message || 'Erro ao conectar com a API' 
    };
  }
};
