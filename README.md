# Ar Condicionado Web

Sistema de gerenciamento de serviços de ar condicionado desenvolvido com React e Material-UI.

## Funcionalidades

- Gerenciamento de serviços (manutenção, reparo, inspeção, instalação)
- Cadastro e gestão de clientes
- Agendamento de serviços
- Geração de orçamentos
- Relatórios e métricas
- Sistema de notificações

## Tecnologias Utilizadas

- React
- TypeScript
- Material-UI (MUI)
- React Router
- Vite

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/arcondicionado-web.git
cd arcondicionado-web
```

2. Instale as dependências:
```bash
npm install
# ou
yarn
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm run preview` - Visualiza a versão de produção localmente

## Estrutura do Projeto

```
src/
  ├── assets/      # Imagens e recursos estáticos
  ├── components/  # Componentes React reutilizáveis
  ├── pages/       # Páginas/rotas da aplicação
  ├── utils/       # Funções utilitárias
  ├── types/       # Definições de tipos TypeScript
  ├── theme.ts     # Configuração do tema Material-UI
  └── App.tsx      # Componente principal
```

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
