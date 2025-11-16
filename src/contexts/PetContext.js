import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { PetService } from '../data/services/PetService';

const PetContext = createContext();

export const usePets = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePets deve ser usado dentro de um PetProvider');
  }
  return context;
};

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    sexo: 'Todos',
    idade: 'Todas',
    porte: 'Todos',
    query: ''
  });

  // Carregar todos os pets inicialmente
  useEffect(() => {
    loadPets();
  }, []);

  // Aplicar filtros quando mudarem
  useEffect(() => {
    applyFilters();
  }, [filters, pets, applyFilters]);

  const loadPets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PetService.getAllPets();
      setPets(data);
      setFilteredPets(data);
    } catch (err) {
      setError('Erro ao carregar pets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback(async () => {
    try {
      setLoading(true);
      const data = await PetService.searchPets(filters);
      setFilteredPets(data);
    } catch (err) {
      setError('Erro ao filtrar pets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const getPetById = async (id) => {
    try {
      return await PetService.getPetById(id);
    } catch (err) {
      console.error('Erro ao buscar pet:', err);
      return null;
    }
  };

  const toggleFavorite = async (petId) => {
    try {
      const updatedPet = await PetService.toggleFavorite(petId);
      if (updatedPet) {
        setPets(prev =>
          prev.map(pet => (pet.id === petId ? updatedPet : pet))
        );
      }
    } catch (err) {
      console.error('Erro ao atualizar favorito:', err);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      sexo: 'Todos',
      idade: 'Todas',
      porte: 'Todos',
      query: ''
    });
  };

  const value = {
    pets,
    filteredPets,
    loading,
    error,
    filters,
    loadPets,
    getPetById,
    toggleFavorite,
    updateFilters,
    resetFilters
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};
