import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BudgetCard } from "../components/BudgetCard";
import { useNavigate } from 'react-router-dom';

// Mock data for demonstration
const mockBudgets = [
  {
    id: "1",
    clientName: "João Silva",
    serviceType: "Instalação de Ar Condicionado",
    status: "pending" as const,
    value: 2500.00,
    createdAt: "2024-03-20",
  },
  {
    id: "2",
    clientName: "Maria Santos",
    serviceType: "Manutenção Preventiva",
    status: "approved" as const,
    value: 350.00,
    createdAt: "2024-03-19",
  },
  {
    id: "3",
    clientName: "Pedro Oliveira",
    serviceType: "Reparo de Unidade",
    status: "rejected" as const,
    value: 800.00,
    createdAt: "2024-03-18",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "warning";
    case "approved":
      return "success";
    case "rejected":
      return "error";
    default:
      return "default";
  }
};

export const Budgets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const filteredBudgets = mockBudgets.filter((budget) => {
    const matchesSearch = budget.clientName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || budget.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (id: string) => {
    console.log("Edit budget:", id);
    // Implement edit functionality
  };

  const handleDelete = (id: string) => {
    console.log("Delete budget:", id);
    // Implement delete functionality
  };

  const handleCreateClick = () => {
    navigate('/budgets/new');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Orçamentos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
        >
          Novo Orçamento
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar por cliente..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleStatusFilter}
                label="Status"
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="pending">Pendente</MenuItem>
                <MenuItem value="approved">Aprovado</MenuItem>
                <MenuItem value="rejected">Rejeitado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Data de Criação</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBudgets.map((budget) => (
              <TableRow key={budget.id}>
                <TableCell>{budget.clientName}</TableCell>
                <TableCell>{budget.serviceType}</TableCell>
                <TableCell>
                  <Chip
                    label={budget.status}
                    color={getStatusColor(budget.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{budget.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                <TableCell>{budget.createdAt}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(budget.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(budget.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}; 