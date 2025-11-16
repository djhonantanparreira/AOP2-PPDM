import React, { createContext, useState, useContext } from 'react';
import { AdoptionService } from '../data/services/AdoptionService';

const AdoptionContext = createContext();

export const useAdoption = () => {
  const context = useContext(AdoptionContext);
  if (!context) {
    throw new Error('useAdoption deve ser usado dentro de um AdoptionProvider');
  }
  return context;
};

export const AdoptionProvider = ({ children }) => {
  const [adoptionForms, setAdoptionForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const newForm = await AdoptionService.submitAdoptionForm(formData);
      setAdoptionForms(prev => [...prev, newForm]);
      return { success: true, form: newForm };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const getAllForms = async () => {
    try {
      setLoading(true);
      setError(null);
      const forms = await AdoptionService.getAllAdoptionForms();
      setAdoptionForms(forms);
      return forms;
    } catch (err) {
      setError('Erro ao carregar formulários');
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getFormsByPet = async (petId) => {
    try {
      return await AdoptionService.getAdoptionFormsByPet(petId);
    } catch (err) {
      console.error('Erro ao buscar formulários do pet:', err);
      return [];
    }
  };

  const value = {
    adoptionForms,
    loading,
    error,
    submitForm,
    getAllForms,
    getFormsByPet
  };

  return (
    <AdoptionContext.Provider value={value}>
      {children}
    </AdoptionContext.Provider>
  );
};
