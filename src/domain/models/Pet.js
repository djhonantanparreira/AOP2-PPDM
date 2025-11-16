// Domain Model: Pet
export class Pet {
  constructor({
    id,
    nome,
    sexo,
    idade,
    porte,
    imagem,
    dono,
    descricao,
    favorito = false
  }) {
    this.id = id;
    this.nome = nome;
    this.sexo = sexo;
    this.idade = idade;
    this.porte = porte;
    this.imagem = imagem;
    this.dono = dono;
    this.descricao = descricao;
    this.favorito = favorito;
  }
}
