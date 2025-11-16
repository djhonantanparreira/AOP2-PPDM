import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAdoption } from '../contexts/AdoptionContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { SuccessModal } from '../components/SuccessModal';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../shared/theme';

export const AdoptionFormScreen = ({ route, navigation }) => {
  const { petId, petName } = route.params;
  const { submitForm, loading } = useAdoption();

  const [formData, setFormData] = useState({
    nomeCompleto: '',
    idade: '',
    nomePet: petName || '',
    tipoMoradia: '',
    email: '',
    telefone: '',
  });

  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (field, value) => {
    // Formatação de telefone em tempo real
    if (field === 'telefone') {
      value = formatPhone(value);
    }
    
    // Formatação de idade (apenas números)
    if (field === 'idade') {
      value = value.replace(/[^0-9]/g, '');
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const formatPhone = (text) => {
    // Remove tudo que não é número
    const numbers = text.replace(/[^0-9]/g, '');
    
    // Aplica a máscara (00) 00000-0000
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const validateNomeCompleto = (nome) => {
    const trimmed = nome.trim();
    if (!trimmed) {
      return 'Nome completo é obrigatório';
    }
    
    // Verifica se tem pelo menos nome e sobrenome
    const palavras = trimmed.split(' ').filter(p => p.length > 0);
    if (palavras.length < 2) {
      return 'Digite seu nome completo (nome e sobrenome)';
    }
    
    // Verifica se contém apenas letras e espaços
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmed)) {
      return 'Nome deve conter apenas letras';
    }
    
    return null;
  };

  const validateIdade = (idade) => {
    if (!idade.trim()) {
      return 'Idade é obrigatória';
    }
    
    const idadeNum = parseInt(idade);
    
    if (isNaN(idadeNum)) {
      return 'Digite uma idade válida';
    }
    
    if (idadeNum < 18) {
      return 'Você deve ter pelo menos 18 anos para adotar';
    }
    
    if (idadeNum > 120) {
      return 'Digite uma idade válida';
    }
    
    return null;
  };

  const validateTelefone = (telefone) => {
    if (!telefone.trim()) {
      return 'Telefone é obrigatório';
    }
    
    // Remove caracteres especiais para validar
    const numbers = telefone.replace(/[^0-9]/g, '');
    
    if (numbers.length < 10) {
      return 'Telefone incompleto';
    }
    
    if (numbers.length !== 10 && numbers.length !== 11) {
      return 'Telefone inválido';
    }
    
    return null;
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email é obrigatório';
    }
    
    // Regex mais completo para validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return 'Email inválido';
    }
    
    return null;
  };

  const validateForm = () => {
    const newErrors = {};

    // Validação do nome completo
    const nomeError = validateNomeCompleto(formData.nomeCompleto);
    if (nomeError) newErrors.nomeCompleto = nomeError;

    // Validação da idade
    const idadeError = validateIdade(formData.idade);
    if (idadeError) newErrors.idade = idadeError;

    // Validação do nome do pet
    if (!formData.nomePet.trim()) {
      newErrors.nomePet = 'Nome do PET é obrigatório';
    } else if (formData.nomePet.trim().length < 2) {
      newErrors.nomePet = 'Nome do PET muito curto';
    }

    // Validação do tipo de moradia
    if (!formData.tipoMoradia.trim()) {
      newErrors.tipoMoradia = 'Tipo de moradia é obrigatório';
    } else if (formData.tipoMoradia.trim().length < 3) {
      newErrors.tipoMoradia = 'Descreva o tipo de moradia';
    }

    // Validação do email
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    // Validação do telefone
    const telefoneError = validateTelefone(formData.telefone);
    if (telefoneError) newErrors.telefone = telefoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert(
        'Campos inválidos',
        'Por favor, corrija os erros nos campos destacados.',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = await submitForm({
      ...formData,
      petId,
    });

    if (result.success) {
      setShowSuccessModal(true);
    } else {
      Alert.alert(
        'Erro ao enviar',
        'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Formulário para adoção de PET</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formCard}>
          <Input
            label="Nome completo:"
            value={formData.nomeCompleto}
            onChangeText={(value) => handleChange('nomeCompleto', value)}
            placeholder="Fulano de Tal Dondé"
            error={errors.nomeCompleto}
          />

          <Input
            label="Idade:"
            value={formData.idade}
            onChangeText={(value) => handleChange('idade', value)}
            placeholder="Ex: 25"
            error={errors.idade}
            keyboardType="numeric"
            maxLength={3}
          />

          <Input
            label="Qual nome do PET que gostaria de adotar?"
            value={formData.nomePet}
            onChangeText={(value) => handleChange('nomePet', value)}
            placeholder="Ex: Lucky"
            error={errors.nomePet}
          />

          <Input
            label="Você mora em apartamento ou casa?"
            value={formData.tipoMoradia}
            onChangeText={(value) => handleChange('tipoMoradia', value)}
            placeholder="Os PETs gostam de espaço!"
            error={errors.tipoMoradia}
          />

          <Input
            label="Email para contato:"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            placeholder="exemplo@adote.seupet"
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Telefone para contato:"
            value={formData.telefone}
            onChangeText={(value) => handleChange('telefone', value)}
            placeholder="(00) 00000-0000"
            error={errors.telefone}
            keyboardType="phone-pad"
            maxLength={15}
          />

          <Button
            title="Enviar Formulário"
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>

      <SuccessModal
        visible={showSuccessModal}
        onClose={handleModalClose}
        title="Formulário Enviado!"
        message={`Seu formulário de adoção para ${formData.nomePet} foi enviado com sucesso! Entraremos em contato em breve.`}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 4,
    borderBottomColor: colors.primary,
  },
  backButton: {
    marginRight: spacing.md,
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    padding: spacing.lg,
  },
  submitButton: {
    marginTop: spacing.md,
  },
});
