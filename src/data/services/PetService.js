import { apiRequest, API_CONFIG } from '../../config/api';
import { Pet } from '../../domain/models/Pet';
import { mockPets } from '../mockData';

export class PetService {
  // GET - Buscar todos os pets
  static async getAllPets() {
    try {
      const result = await apiRequest(API_CONFIG.ENDPOINTS.PETS, {
        method: 'GET',
      });

      if (result.success) {
        return result.data.map(pet => new Pet(pet));
      } else {
        // Fallback para mockData em caso de erro
        console.warn('Usando dados locais - API indisponível');
        return mockPets.map(pet => new Pet(pet));
      }
    } catch (error) {
      console.error('Erro ao buscar pets:', error);
      return mockPets.map(pet => new Pet(pet));
    }
  }

  // GET - Buscar pet por ID
  static async getPetById(id) {
    try {
      const result = await apiRequest(`${API_CONFIG.ENDPOINTS.PETS}/${id}`, {
        method: 'GET',
      });

      if (result.success) {
        return new Pet(result.data);
      } else {
        console.warn('Pet não encontrado na API, usando dados locais');
        const pet = mockPets.find(p => p.id === id);
        return pet ? new Pet(pet) : null;
      }
    } catch (error) {
      console.warn('API indisponível para buscar pet, usando dados locais');
      const pet = mockPets.find(p => p.id === id);
      return pet ? new Pet(pet) : null;
    }
  }

  // GET - Buscar pets com filtros (busca do lado do cliente)
  static async searchPets(filters) {
    try {
      const allPets = await this.getAllPets();
      let filteredPets = [...allPets];

      if (filters.sexo && filters.sexo !== 'Todos') {
        filteredPets = filteredPets.filter(pet => pet.sexo === filters.sexo);
      }

      if (filters.idade && filters.idade !== 'Todas') {
        filteredPets = filteredPets.filter(pet => pet.idade === filters.idade);
      }

      if (filters.porte && filters.porte !== 'Todos') {
        filteredPets = filteredPets.filter(pet => pet.porte === filters.porte);
      }

      if (filters.query) {
        const query = filters.query.toLowerCase();
        filteredPets = filteredPets.filter(pet =>
          pet.nome.toLowerCase().includes(query)
        );
      }

      return filteredPets;
    } catch (error) {
      console.error('Erro ao filtrar pets:', error);
      return [];
    }
  }

  // PUT - Atualizar favorito (ou manter local se preferir)
  static async toggleFavorite(petId) {
    try {
      // Busca o pet atual
      const pet = await this.getPetById(petId);
      if (!pet) return null;

      // Atualiza o favorito
      const updatedPet = { ...pet, favorito: !pet.favorito };

      // Envia PUT para a API
      const result = await apiRequest(`${API_CONFIG.ENDPOINTS.PETS}/${petId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedPet),
      });

      if (result.success) {
        return new Pet(result.data);
      }
      
      return new Pet(updatedPet);
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
      return null;
    }
  }
}
