// Script para popular a MockAPI com dados iniciais
// MockAPI versão gratuita: apenas 2 resources (pets + adoptions)
// FAQs ficam apenas em mockData.js local

const API_BASE_URL = "https://691a0de89ccba073ee94bb20.mockapi.io/api";

// Dados de pets para popular
const pets = [
  {
    nome: "Rex",
    tipo: "Cachorro",
    idade: "Adulto",
    sexo: "Macho",
    porte: "Grande",
    descricao:
      "Rex é um cão amigável e muito protetor. Adora brincar e é ótimo com crianças.",
    imagem:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
    favorito: false,
    vacinado: true,
    castrado: true,
    dono: {
      nome: "Maria Silva",
      avatar: "https://i.imgur.com/8Km9tLL.png",
      descricao: "Dona do Rex",
    },
  },
  {
    nome: "Luna",
    tipo: "Gato",
    idade: "Filhote",
    sexo: "Fêmea",
    porte: "Pequeno",
    descricao:
      "Luna é uma gatinha carinhosa e brincalhona. Adora colo e petiscos.",
    imagem:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
    favorito: false,
    vacinado: true,
    castrado: false,
    dono: {
      nome: "João Pedro",
      avatar: "https://i.imgur.com/8Km9tLL.png",
      descricao: "Dono da Luna",
    },
  },
  {
    nome: "Bob",
    tipo: "Cachorro",
    idade: "Adulto",
    sexo: "Macho",
    porte: "Médio",
    descricao:
      "Bob é calmo e obediente. Perfeito para apartamentos e famílias.",
    imagem: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400",
    favorito: false,
    vacinado: true,
    castrado: true,
    dono: {
      nome: "Ana Costa",
      avatar: "https://i.imgur.com/8Km9tLL.png",
      descricao: "Dona do Bob",
    },
  },
  {
    nome: "Mia",
    tipo: "Gato",
    idade: "Filhote",
    sexo: "Fêmea",
    porte: "Pequeno",
    descricao:
      "Mia é independente mas muito carinhosa. Adora dormir em lugares altos.",
    imagem:
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400",
    favorito: false,
    vacinado: true,
    castrado: false,
    dono: {
      nome: "Carlos Mendes",
      avatar: "https://i.imgur.com/8Km9tLL.png",
      descricao: "Dono da Mia",
    },
  },
  {
    nome: "Thor",
    tipo: "Cachorro",
    idade: "Adulto",
    sexo: "Macho",
    porte: "Grande",
    descricao: "Thor é forte e leal. Excelente cão de guarda e companheiro.",
    imagem:
      "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400",
    favorito: false,
    vacinado: true,
    castrado: true,
    dono: {
      nome: "Roberto Lima",
      avatar: "https://i.imgur.com/8Km9tLL.png",
      descricao: "Dono do Thor",
    },
  },
  {
    nome: "Nina",
    tipo: "Gato",
    idade: "Adulto",
    sexo: "Fêmea",
    porte: "Pequeno",
    descricao:
      "Nina é tranquila e adora passar o dia descansando. Ideal para ambientes calmos.",
    imagem:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8R2F0b3xlbnwwfHwwfHx8MA%3D%3D",
    favorito: false,
    vacinado: true,
    castrado: true,
    dono: {
      nome: "Paula Santos",
      avatar: "https://i.imgur.com/8Km9tLL.png",
      descricao: "Dona da Nina",
    },
  },
  {
    nome: "Max",
    tipo: "Cachorro",
    idade: "Filhote",
    sexo: "Macho",
    porte: "Médio",
    descricao:
      "Max é super energético e adora brincar. Precisa de espaço para correr.",
    imagem: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400",
    favorito: false,
    vacinado: true,
    castrado: false,
    dono: {
      nome: "Lucas Alves",
      avatar: "https://i.imgur.com/8Km9tLL.png",
      descricao: "Dono do Max",
    },
  },
  {
    nome: "Bella",
    tipo: "Cachorro",
    idade: "Adulto",
    sexo: "Fêmea",
    porte: "Pequeno",
    descricao:
      "Bella é doce e tranquila. Perfeita para pessoas que buscam companhia.",
    imagem:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400",
    favorito: false,
    vacinado: true,
    castrado: true,
    dono: {
      nome: "Fernanda Rocha",
      avatar: "https://i.imgur.com/8Km9tLL.png",
      descricao: "Dona da Bella",
    },
  },
];

// Função para popular pets
async function populatePets() {
  console.log('Populando pets...');
  for (const pet of pets) {
    try {
      const response = await fetch(`${API_BASE_URL}/pets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pet)
      });
      const data = await response.json();
      console.log(`✓ Pet criado: ${data.nome} (ID: ${data.id})`);
    } catch (error) {
      console.error(`✗ Erro ao criar pet ${pet.nome}:`, error.message);
    }
  }
}

// Executar população
async function populateAll() {
  console.log('=== INICIANDO POPULAÇÃO DA MOCKAPI ===\n');
  console.log(`URL Base: ${API_BASE_URL}\n`);
  console.log('⚠️  MockAPI Gratuito: Usando apenas 2 resources (pets + adoptions)');
  console.log('ℹ️  FAQs permanecem apenas no mockData.js local\n');
  
  await populatePets();
  
  console.log('\n=== POPULAÇÃO CONCLUÍDA ===');
  console.log('\n✅ Pets populados com sucesso!');
  console.log('\nPróximos passos:');
  console.log('1. Acesse https://mockapi.io e verifique seus pets');
  console.log('2. O resource "adoptions" será populado automaticamente quando alguém adotar');
  console.log('3. FAQs usam dados locais (mockData.js)');
  console.log('4. Execute o app e teste as funcionalidades');
}

// Executar automaticamente
populateAll();

export { populateAll, populatePets };
