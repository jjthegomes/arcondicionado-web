import { Client, User } from "../types/user";
import { Service } from "../types/service";
import { Budget } from "../types/budget";

export const mockClients: Client[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(32) 99999-9999",
    document_type: "cpf",
    document: "123.456.789-00",
    cep: "36036-000",
    address: {
      cep: "36036-000",
      logradouro: "Rua das Flores",
      complemento: "",
      bairro: "Centro",
      localidade: "Juiz de Fora",
      uf: "MG",
    },
    number: "123",
    complement: "Apto 45",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "(32) 98888-8888",
    document_type: "cpf",
    document: "987.654.321-00",
    cep: "36036-100",
    address: {
      cep: "36036-100",
      logradouro: "Avenida dos Pássaros",
      complemento: "",
      bairro: "Santa Helena",
      localidade: "Juiz de Fora",
      uf: "MG",
    },
    number: "456",
    complement: "",
    created_at: "2025-01-02T00:00:00Z",
    updated_at: "2025-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Empresa XYZ Ltda",
    email: "contato@empresaxyz.com.br",
    phone: "(32) 97777-7777",
    document_type: "cnpj",
    document: "12.345.678/0001-90",
    cep: "36036-200",
    address: {
      cep: "36036-200",
      logradouro: "Rua das Indústrias",
      complemento: "",
      bairro: "Industrial",
      localidade: "Juiz de Fora",
      uf: "MG",
    },
    number: "789",
    complement: "Sala 101",
    created_at: "2025-01-03T00:00:00Z",
    updated_at: "2025-01-03T00:00:00Z",
  },
  {
    id: "4",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    phone: "(32) 96666-6666",
    document_type: "cpf",
    document: "456.789.123-00",
    cep: "36036-300",
    address: {
      cep: "36036-300",
      logradouro: "Rua das Palmeiras",
      complemento: "",
      bairro: "Jardim Glória",
      localidade: "Juiz de Fora",
      uf: "MG",
    },
    number: "321",
    complement: "Casa",
    created_at: "2025-01-04T00:00:00Z",
    updated_at: "2025-01-04T00:00:00Z",
  },
  {
    id: "5",
    name: "Ana Costa",
    email: "ana.costa@email.com",
    phone: "(32) 95555-5555",
    document_type: "cpf",
    document: "789.123.456-00",
    cep: "36036-400",
    address: {
      cep: "36036-400",
      logradouro: "Avenida Rio Branco",
      complemento: "",
      bairro: "Centro",
      localidade: "Juiz de Fora",
      uf: "MG",
    },
    number: "654",
    complement: "Loja 12",
    created_at: "2025-01-05T00:00:00Z",
    updated_at: "2025-01-05T00:00:00Z",
  },
  {
    id: "6",
    name: "Carlos Ferreira",
    email: "carlos.ferreira@email.com",
    phone: "(21) 95678-1234",
    document_type: "cpf",
    document: "321.654.987-00",
    cep: "36036-500",
    address: {
      cep: "36036-500",
      logradouro: "Rua das Acácias",
      complemento: "",
      bairro: "Jardim América",
      localidade: "Juiz de Fora",
      uf: "MG",
    },
    number: "789",
    complement: "Apto 23",
    created_at: "2025-01-06T00:00:00Z",
    updated_at: "2025-01-06T00:00:00Z",
  },
  {
    id: "7",
    name: "Beatriz Lima",
    email: "beatriz.lima@email.com",
    phone: "(21) 93456-7890",
    document_type: "cpf",
    document: "654.987.321-00",
    cep: "36036-600",
    address: {
      cep: "36036-600",
      logradouro: "Avenida dos Ipês",
      complemento: "",
      bairro: "Santa Cruz",
      localidade: "Juiz de Fora",
      uf: "MG",
    },
    number: "456",
    complement: "",
    created_at: "2025-01-07T00:00:00Z",
    updated_at: "2025-01-07T00:00:00Z",
  },
  {
    id: "8",
    name: "Rafael Pereira",
    email: "rafael.pereira@email.com",
    phone: "(21) 96789-0123",
    document_type: "cpf",
    document: "987.321.654-00",
    cep: "36036-700",
    address: {
      cep: "36036-700",
      logradouro: "Rua das Orquídeas",
      complemento: "",
      bairro: "São Mateus",
      localidade: "Juiz de Fora",
      uf: "MG",
    },
    number: "123",
    complement: "Casa",
    created_at: "2025-01-08T00:00:00Z",
    updated_at: "2025-01-08T00:00:00Z",
  },
  {
    id: "9",
    name: "Juliana Almeida",
    email: "juliana.almeida@email.com",
    phone: "(21) 94567-8901",
    document_type: "cpf",
    document: "147.258.369-00",
    cep: "36036-800",
    address: {
      cep: "36036-800",
      logradouro: "Avenida das Flores",
      complemento: "",
      bairro: "Benfica",
      localidade: "Juiz de Fora",
      uf: "MG",
    },
    number: "789",
    complement: "Apto 45",
    created_at: "2025-01-09T00:00:00Z",
    updated_at: "2025-01-09T00:00:00Z",
  },
  {
    id: "10",
    name: "Marcos Rodrigues",
    email: "marcos.rodrigues@email.com",
    phone: "(21) 97890-1234",
    document_type: "cpf",
    document: "258.369.147-00",
    cep: "36036-900",
    address: {
      cep: "36036-900",
      logradouro: "Rua dos Lírios",
      complemento: "",
      bairro: "Santa Luzia",
      localidade: "Juiz de Fora",
      uf: "MG",
    },
    number: "321",
    complement: "Casa",
    created_at: "2025-01-10T00:00:00Z",
    updated_at: "2025-01-10T00:00:00Z",
  },
  {
    id: "11",
    name: "Carolina Souza",
    email: "carolina.souza@email.com",
    phone: "(21) 91234-5678",
    document_type: "cpf",
    document: "369.147.258-00",
    cep: "36037-000",
    address: {
      cep: "36037-000",
      logradouro: "Avenida dos Girassóis",
      complemento: "",
      bairro: "São Pedro",
      localidade: "Juiz de Fora",
      uf: "MG",
    },
    number: "654",
    complement: "Apto 12",
    created_at: "2025-01-11T00:00:00Z",
    updated_at: "2025-01-11T00:00:00Z",
  },
];

export const mockServices: Service[] = [
  {
    id: "SER001",
    client_id: "1",
    type: "installation",
    status: "pending",
    description: "Instalação de ar condicionado split 9000 BTUs",
    price: 1650.0,
    scheduled_date: "2025-03-15T09:00:00Z",
    notes: "Instalação em apartamento, 2º andar",
    created_at: "2025-03-01T00:00:00Z",
    updated_at: "2025-03-01T00:00:00Z",
  },
  {
    id: "SER002",
    client_id: "2",
    type: "maintenance",
    status: "completed",
    description: "Manutenção preventiva anual",
    price: 700.0,
    scheduled_date: "2025-03-10T14:00:00Z",
    completed_date: "2025-03-10T16:00:00Z",
    notes: "Manutenção preventiva anual realizada",
    created_at: "2025-03-02T00:00:00Z",
    updated_at: "2025-03-10T16:00:00Z",
  },
  {
    id: "SER003",
    client_id: "3",
    type: "repair",
    status: "in_progress",
    description: "Reparo em ar condicionado comercial",
    price: 1650.0,
    scheduled_date: "2025-03-20T10:00:00Z",
    notes: "Reparo em ar condicionado comercial",
    created_at: "2025-03-03T00:00:00Z",
    updated_at: "2025-03-03T00:00:00Z",
  },
  {
    id: "SER004",
    client_id: "4",
    type: "cleaning",
    status: "pending",
    description: "Limpeza em ar condicionado residencial",
    price: 990.0,
    scheduled_date: "2025-03-25T09:00:00Z",
    notes: "Limpeza em ar condicionado residencial",
    created_at: "2025-03-04T00:00:00Z",
    updated_at: "2025-03-04T00:00:00Z",
  },
  {
    id: "SER005",
    client_id: "5",
    type: "inspection",
    status: "cancelled",
    description: "Inspeção de rotina em sistema comercial",
    price: 300.0,
    scheduled_date: "2025-03-05T14:00:00Z",
    completed_date: "2025-03-05T15:30:00Z",
    notes: "Inspeção de rotina em sistema comercial",
    created_at: "2025-03-05T00:00:00Z",
    updated_at: "2025-03-05T15:30:00Z",
  },
];

export const mockCurrentUser: User = {
  id: "1",
  name: "Admin",
  email: "admin@example.com",
  phone: "(21) 99999-9999",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockBudgets: Budget[] = [
  {
    id: "1",
    client_id: "1",
    type: "installation",
    items: [
      {
        name: "Instalação do Ar Condicionado",
        quantity: 1,
        price: 800.0,
      },
      {
        name: "Materiais de Instalação",
        quantity: 1,
        price: 450.0,
      },
      {
        name: "Mão de Obra",
        quantity: 1,
        price: 400.0,
      },
    ],
    total_price: 1650.0,
    status: "pending",
    valid_until: "2025-04-01",
    notes: "Instalação em apartamento, 2º andar. Necessário acesso por escada.",
    created_at: "2025-03-01T00:00:00Z",
    updated_at: "2025-03-01T00:00:00Z",
  },
  {
    id: "2",
    client_id: "2",
    type: "maintenance",
    items: [
      {
        name: "Limpeza do Sistema",
        quantity: 1,
        price: 200.0,
      },
      {
        name: "Troca de Filtro",
        quantity: 1,
        price: 150.0,
      },
      {
        name: "Higienização",
        quantity: 1,
        price: 350.0,
      },
    ],
    total_price: 700.0,
    status: "approved",
    valid_until: "2025-04-15",
    notes: "Manutenção preventiva anual. Sistema com 2 anos de uso.",
    created_at: "2025-03-02T00:00:00Z",
    updated_at: "2025-03-02T00:00:00Z",
  },
  {
    id: "3",
    client_id: "3",
    type: "repair",
    items: [
      {
        name: "Troca de Placa Eletrônica",
        quantity: 1,
        price: 800.0,
      },
      {
        name: "Mão de Obra",
        quantity: 1,
        price: 400.0,
      },
      {
        name: "Materiais de Reparo",
        quantity: 1,
        price: 450.0,
      },
    ],
    total_price: 1650.0,
    status: "pending",
    valid_until: "2025-04-30",
    notes: "Reparo em ar condicionado comercial. Sistema com 5 anos de uso.",
    created_at: "2025-03-03T00:00:00Z",
    updated_at: "2025-03-03T00:00:00Z",
  },
  {
    id: "4",
    client_id: "4",
    type: "cleaning",
    items: [
      {
        name: "Limpeza Completa",
        quantity: 1,
        price: 400.0,
      },
      {
        name: "Higienização",
        quantity: 1,
        price: 350.0,
      },
      {
        name: "Materiais de Limpeza",
        quantity: 1,
        price: 240.0,
      },
    ],
    total_price: 990.0,
    status: "pending",
    valid_until: "2025-04-20",
    notes: "Limpeza em ar condicionado residencial. Sistema com 1 ano de uso.",
    created_at: "2025-03-04T00:00:00Z",
    updated_at: "2025-03-04T00:00:00Z",
  },
  {
    id: "5",
    client_id: "5",
    type: "inspection",
    items: [
      {
        name: "Inspeção Técnica",
        quantity: 1,
        price: 150.0,
      },
      {
        name: "Relatório",
        quantity: 1,
        price: 100.0,
      },
      {
        name: "Mão de Obra",
        quantity: 1,
        price: 50.0,
      },
    ],
    total_price: 300.0,
    status: "cancelled",
    valid_until: "2025-04-10",
    notes: "Cliente cancelou a inspeção de rotina em sistema comercial.",
    created_at: "2025-03-05T00:00:00Z",
    updated_at: "2025-03-05T00:00:00Z",
  },
];
