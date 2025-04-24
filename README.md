# Tripleten web_project_api_full

# Links do Projeto

- **Frontend:** [https://around-full.mooo.com](https://around-full.mooo.com)
- **Backend (API):** [https://api.around-full.mooo.com](https://api.around-full.mooo.com

## Descrição

O projeto **"Around the U.S."** é um sistema **Full Stack**, desenvolvido com **React no frontend** e **Node.js/Express no backend**, com banco de dados **MongoDB**. A plataforma continua sendo uma experiência interativa onde usuários podem explorar e compartilhar fotos, histórias e experiências relacionadas às diversas regiões dos Estados Unidos.

Nesta versão, toda a comunicação entre cliente e servidor foi implementada, permitindo funcionalidades como:

- Cadastro e login com autenticação JWT
- Edição de perfil e avatar
- Criação, visualização e exclusão de cards
- Curtidas em cards de outros usuários
- Rotas protegidas por autenticação
- Armazenamento de dados no banco de dados MongoDB

## Tecnologias e Técnicas Utilizadas

### Frontend

- **React e JSX:** Criação de interfaces dinâmicas e intuitivas com componentes reutilizáveis.
- **React Router:** Navegação entre páginas com rotas protegidas.
- **Hooks (`useState`, `useEffect`):** Gerenciamento de estado e efeitos colaterais.
- **Autenticação:** Registro, login e verificação de token com `localStorage`.
- **Componentes customizados:** `Login`, `Register`, `ProtectedRoute`, `InfoTooltip`, entre outros.
- **Responsividade:** Layout adaptado para diferentes tamanhos de tela.
- **CSS modularizado:** Organização e encapsulamento de estilos.

### Backend

- **Node.js e Express:** Criação da API RESTful.
- **MongoDB e Mongoose:** Modelagem e persistência de dados.
- **JWT:** Autenticação com tokens seguros.
- **Validação com Celebrate/Joi:** Garantia de integridade dos dados enviados.
- **Controle de erros e logs personalizados.**
- **Variáveis de ambiente com dotenv.**

## Funcionalidades Principais

- Cadastro e autenticação de usuários
- Login e logout com proteção de rotas
- Edição de perfil e troca de avatar
- Criação e exclusão de cards
- Curtidas em cards
- Validação de dados no frontend e backend
- Feedback visual para ações do usuário

## Planos de Melhoria:

1. **Melhoria na Identidade Visual**

   - Adicionar elementos gráficos que representem visualmente as culturas e regiões dos EUA, como ícones temáticos, bandeiras estaduais, e mapas interativos.
   - Incluir tipografia personalizada e aprimorar o layout para fortalecer a identidade da marca.

2. **Facilitar o Compartilhamento em Redes Sociais**

   - Integrar botões de compartilhamento direto para redes sociais como Facebook, X (Twitter), Instagram e WhatsApp.
   - Gerar links únicos e imagens de pré-visualização ao compartilhar histórias ou postagens.
   - Adicionar um recurso de "Copiar link" para facilitar o envio manual.

3. **Adicionar Suporte a Múltiplos Idiomas**

   - Implementar internacionalização com suporte inicial para português e inglês.
   - Adicionar um seletor de idioma acessível no cabeçalho.
   - Armazenar a preferência de idioma do usuário no localStorage.

4. **Performance e Otimização**

   - Otimizar carregamento de imagens e uso de lazy loading.
   - Minificar arquivos CSS/JS e reduzir requisições HTTP.
   - Aplicar cache local para conteúdos estáticos e uso de CDN quando possível.
