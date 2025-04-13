export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  document_type: "cpf" | "cnpj";
  document: string;
  cep: string;
  address: {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
  };
  number: string;
  complement: string;
  created_at: string;
  updated_at: string;
}

export interface ClientCreateDTO {
  name: string;
  email: string;
  phone: string;
  document_type: "cpf" | "cnpj";
  document: string;
  cep: string;
  address: {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
  };
  number: string;
  complement: string;
}

export interface ClientUpdateDTO {
  name?: string;
  email?: string;
  phone?: string;
  document_type?: "cpf" | "cnpj";
  document?: string;
  cep?: string;
  address?: {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
  };
  number?: string;
  complement?: string;
} 