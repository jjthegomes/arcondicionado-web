import React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Button,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ServiceCard from "../components/ServiceCard";
import { useNavigate } from "react-router-dom";

export const Services = () => {
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(
    null
  );

  const serviceTypes = ["Tipo", "Status", "Cliente"];

  // Example services data
  const services = [
    {
      type: "Manutenção",
      description: "Manutenção preventiva semestral",
      price: 708.2,
      status: "Em Andamento",
      date: "16/03/2025",
    },
    {
      type: "Reparo",
      description: "Reparo em sistema de ar condicionado central",
      price: 566.9,
      status: "Concluído",
      date: "27/03/2025",
    },
    {
      type: "Inspeção",
      description: "Inspeção técnica para avaliação de sistema",
      price: 990.8,
      status: "Pendente",
      date: "14/03/2025",
    },
  ] as const;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Serviços
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/services/new")}
          >
            Novo Serviço
          </Button>
        </Box>
        {/* Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar serviços..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "background.paper",
              borderRadius: 2,
            },
          }}
        />

        {/* Filter Chips */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 3, overflowX: "auto", pb: 1 }}
        >
          {serviceTypes.map((type) => (
            <Chip
              key={type}
              label={type}
              onClick={() => {}}
              sx={{
                borderRadius: "16px",
                backgroundColor: "background.paper",
                "&:hover": {
                  backgroundColor: "primary.light",
                },
              }}
            />
          ))}
        </Stack>

        {/* Services List */}
        <Box>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              type={service.type}
              description={service.description}
              price={service.price}
              status={service.status}
              date={service.date}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Services;
