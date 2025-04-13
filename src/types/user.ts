export interface Address {
    cep: string
    logradouro: string
    complemento: string
    bairro: string
    localidade: string
    uf: string
  }
  
  export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    document_type: "cpf" | "cnpj";
    document: string;
    cep: string;
    address: Address;
    number: string;
    complement: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    isLoggedIn?: boolean;
    lastLogin?: string;
    profilePicture?: string;
  } 