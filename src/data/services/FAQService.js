import { apiRequest, API_CONFIG } from '../../config/api';
import { FAQ } from '../../domain/models/FAQ';
import { mockFAQs } from '../mockData';

export class FAQService {
  // GET - Buscar todas as FAQs
  static async getAllFAQs() {
    try {
      const result = await apiRequest(API_CONFIG.ENDPOINTS.FAQS, {
        method: 'GET',
      });

      if (result.success) {
        return result.data.map(faq => new FAQ(faq));
      } else {
        console.warn('Usando FAQs locais - API indisponível');
        return mockFAQs.map(faq => new FAQ(faq));
      }
    } catch (error) {
      console.error('Erro ao buscar FAQs:', error);
      return mockFAQs.map(faq => new FAQ(faq));
    }
  }

  // GET - Buscar FAQs com filtro (busca do lado do cliente)
  static async searchFAQs(query) {
    try {
      const allFAQs = await this.getAllFAQs();
      
      if (!query || query.trim() === '') {
        return allFAQs;
      }

      const lowerQuery = query.toLowerCase();
      const filtered = allFAQs.filter(faq =>
        faq.pergunta.toLowerCase().includes(lowerQuery) ||
        faq.resposta.toLowerCase().includes(lowerQuery)
      );

      return filtered;
    } catch (error) {
      console.error('Erro ao buscar FAQs:', error);
      return [];
    }
  }
}
