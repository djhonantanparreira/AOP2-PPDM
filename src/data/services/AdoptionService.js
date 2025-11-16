import { apiRequest, API_CONFIG } from '../../config/api';
import { AdoptionForm } from '../../domain/models/AdoptionForm';
import { mockAdoptionForms } from '../mockData';

export class AdoptionService {
  // POST - Enviar formulário de adoção
  static async submitAdoptionForm(formData) {
    try {
      const adoptionForm = new AdoptionForm({
        ...formData,
        id: Date.now().toString(),
        dataCriacao: new Date().toISOString(),
      });

      const validation = adoptionForm.validate();
      
      if (!validation.isValid) {
        throw new Error('Dados inválidos: ' + JSON.stringify(validation.errors));
      }

      // POST para a API
      const result = await apiRequest(API_CONFIG.ENDPOINTS.ADOPTIONS, {
        method: 'POST',
        body: JSON.stringify(adoptionForm),
      });

      if (result.success) {
        return new AdoptionForm(result.data);
      } else {
        // Fallback local
        mockAdoptionForms.push(adoptionForm);
        return adoptionForm;
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      throw error;
    }
  }

  // GET - Buscar todos os formulários
  static async getAllAdoptionForms() {
    try {
      const result = await apiRequest(API_CONFIG.ENDPOINTS.ADOPTIONS, {
        method: 'GET',
      });

      if (result.success) {
        return result.data.map(form => new AdoptionForm(form));
      } else {
        return mockAdoptionForms.map(form => new AdoptionForm(form));
      }
    } catch (error) {
      console.error('Erro ao buscar formulários:', error);
      return mockAdoptionForms.map(form => new AdoptionForm(form));
    }
  }

  // GET - Buscar formulários por pet
  static async getAdoptionFormsByPet(petId) {
    try {
      const allForms = await this.getAllAdoptionForms();
      return allForms.filter(form => form.petId === petId);
    } catch (error) {
      console.error('Erro ao buscar formulários por pet:', error);
      return mockAdoptionForms
        .filter(form => form.petId === petId)
        .map(form => new AdoptionForm(form));
    }
  }
}
