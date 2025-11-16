# 🐾 Adote PET - Sistema de Adoção de Animais

> **AOP 2 - Desenvolvimento Mobile com React Native**

Aplicativo mobile completo para facilitar a adoção de animais domésticos, conectando pets resgatados com seus futuros donos através de uma interface intuitiva e processo simplificado.

## 📱 Sobre o Projeto

Este é um aplicativo desenvolvido em **React Native/Expo** que implementa um sistema completo de adoção de pets, incluindo:
- Listagem e busca de animais disponíveis
- Filtros avançados personalizáveis
- Formulário de adoção com validação
- **Integração com API REST** (GET e POST)
- Sistema de gerenciamento de estado com Context API

## ✨ Funcionalidades

### 🔍 Busca e Filtros
- ✅ **Listagem de Pets**: Navegue por todos os pets disponíveis para adoção
- ✅ **Filtros Avançados**: Filtre por sexo, idade e porte usando RNPicker
- ✅ **Busca por Nome**: Encontre pets específicos rapidamente
- ✅ **Atualização em Tempo Real**: Dados carregados da API

### 🐶 Informações dos Pets
- ✅ **Detalhes Completos**: Veja informações detalhadas sobre cada animal
- ✅ **Fotos dos Pets**: Imagens de alta qualidade
- ✅ **Status Veterinário**: Vacinação e castração
- ✅ **Sistema de Favoritos**: Marque seus pets preferidos

### 📝 Processo de Adoção
- ✅ **Formulário Completo**: Cadastro com todos os dados necessários
- ✅ **Validação de Campos**: Email, campos obrigatórios, etc
- ✅ **Envio via API**: POST para salvar formulário
- ✅ **Feedback Visual**: Mensagens de sucesso/erro

### ℹ️ Suporte
- ✅ **FAQ**: Perguntas frequentes sobre adoção
- ✅ **Busca no FAQ**: Encontre respostas rapidamente
- ✅ **Navegação Drawer**: Menu lateral customizado

## 🏗️ Arquitetura

O projeto segue **Clean Architecture** com separação clara de responsabilidades:

```
src/
├── components/        → Componentes reutilizáveis (UI)
├── contexts/          → Gerenciamento de estado (Context API)
├── data/              → Camada de dados
│   ├── mockData.js    → Dados locais (fallback)
│   └── services/      → Serviços de API (PetService, AdoptionService)
├── domain/
│   └── models/        → Modelos de domínio (Pet, AdoptionForm, FAQ)
├── navigation/        → Configuração de navegação
├── screens/           → Telas do aplicativo
├── shared/            → Recursos compartilhados (theme)
└── config/            → Configurações (API)
```

## 🎨 Tecnologias

### Core
- **React Native** 0.81.5
- **Expo** ~54.0.23
- **React** 19.1.0

### Navegação
- **React Navigation** 6.x
  - Drawer Navigator (menu lateral)
  - Stack Navigator (pilha de telas)

### Estado
- **Context API** (useContext, createContext)

### UI/UX
- **React Native Picker** 2.10.0
- **Expo Vector Icons** 15.0.3
- **React Native Paper** 4.9.2

### API
- **MockAPI** (REST API)
- **Fetch API** nativa

## 🌐 API REST Implementada

### Configuração
```javascript
// src/config/api.js
BASE_URL: 'https://sua-url.mockapi.io/api'
```

### Endpoints
```
GET    /pets              → Buscar todos os pets
GET    /pets/:id          → Buscar pet específico
PUT    /pets/:id          → Atualizar favorito
POST   /adoptions         → Enviar formulário de adoção
GET    /adoptions         → Listar formulários enviados
GET    /faqs              → Buscar perguntas frequentes
```

**📖 Ver documentação completa**: `README_API.md`

## 🚀 Como Executar

### Opção 1: No Expo Snack (Online)
1. Acesse o link do projeto no Snack Expo
2. Escaneie o QR Code com o app **Expo Go** no celular
3. Ou clique em "Web" para executar no navegador

### Opção 2: Localmente
```bash
# Instalar dependências
npm install

# Iniciar projeto
npx expo start

# Escanear QR Code com Expo Go
```

### Configurar API (Obrigatório)
1. Siga instruções em `INSTRUCOES_MOCKAPI.md`
2. Atualize URL em `src/config/api.js`
3. Use script `populate-mockapi.js` para popular dados

## 📂 Estrutura do Projeto

```
src/
├── domain/         # Modelos de negócio
├── data/          # Serviços e dados mock
├── contexts/      # Context API
├── navigation/    # Configuração de rotas
├── screens/       # Telas do app
├── components/    # Componentes reutilizáveis
└── shared/        # Theme e constantes
```

## 📝 Documentação

- **PROJETO_README.md**: Documentação técnica completa
- **DOCUMENTACAO_TELAS.md**: Descrição detalhada de cada tela
- **INSTRUCOES_ENTREGA.md**: Guia para entrega do trabalho

## 👥 Trabalho Acadêmico

Desenvolvido como Atividade Online Pontuada (AOP2).

**Contexto**: Maria Clara resgata pets e precisa de um sistema para facilitar adoções.

**Endereço**: Rua Patati Patata, 171 - Vitória, ES

## 📄 Licença

Projeto acadêmico - AOP2 2025
