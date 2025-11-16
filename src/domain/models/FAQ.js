// Domain Model: FAQ
export class FAQ {
  constructor({ id, pergunta, resposta, expandido = false }) {
    this.id = id;
    this.pergunta = pergunta;
    this.resposta = resposta;
    this.expandido = expandido;
  }
}
