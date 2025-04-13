import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { ClientCard } from "../components/ClientCard";
import { Client } from "../types/client";
import { useState } from "react";

// Mock data for demonstration
const mockClients: Client[] = [
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
    created_at: "2024-04-01",
    updated_at: "2024-04-01",
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
    created_at: "2024-04-02",
    updated_at: "2024-04-02",
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
    created_at: "2024-04-03",
    updated_at: "2024-04-03",
  },
];

export function Clients() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreateClick = () => {
    navigate('/clients/new');
  };

  const handleEditClick = (id: string) => {
    // TODO: Implement edit functionality
    console.log('Edit client:', id);
  };

  const handleDeleteClick = (id: string) => {
    // TODO: Implement delete functionality
    console.log('Delete client:', id);
  };

  const filteredClients = mockClients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.document.includes(searchTerm)
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Clientes</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
        >
          Novo Cliente
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.document}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(client.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(client.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 