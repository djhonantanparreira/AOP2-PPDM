// Domain Model: Adoption Form
export class AdoptionForm {
  constructor({
    id,
    nomeCompleto,
    idade,
    nomePet,
    tipoMoradia,
    email,
    telefone,
    petId,
    dataCriacao
  }) {
    this.id = id;
    this.nomeCompleto = nomeCompleto;
    this.idade = idade;
    this.nomePet = nomePet;
    this.tipoMoradia = tipoMoradia;
    this.email = email;
    this.telefone = telefone;
    this.petId = petId;
    this.dataCriacao = dataCriacao || new Date().toISOString();
  }

  validate() {
    const errors = {};
    
    if (!this.nomeCompleto || this.nomeCompleto.trim() === '') {
      errors.nomeCompleto = 'Nome completo é obrigatório';
    }
    
    if (!this.idade || this.idade.trim() === '') {
      errors.idade = 'Idade é obrigatória';
    }
    
    if (!this.nomePet || this.nomePet.trim() === '') {
      errors.nomePet = 'Nome do PET é obrigatório';
    }
    
    if (!this.tipoMoradia || this.tipoMoradia.trim() === '') {
      errors.tipoMoradia = 'Tipo de moradia é obrigatório';
    }
    
    if (!this.email || this.email.trim() === '') {
      errors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(this.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!this.telefone || this.telefone.trim() === '') {
      errors.telefone = 'Telefone é obrigatório';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}
