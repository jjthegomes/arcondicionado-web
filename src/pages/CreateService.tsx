import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Divider,
  FormHelperText,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material';
import {
  Person as PersonIcon,
  Build as BuildIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Description as DescriptionIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { ptBR } from 'date-fns/locale';

// Mock data - replace with actual API calls
const mockClients = [
  { id: '1', name: 'João Silva', email: 'joao@example.com', phone: '(32) 99999-9999' },
  { id: '2', name: 'Maria Santos', email: 'maria@example.com', phone: '(32) 98888-8888' },
  { id: '3', name: 'Pedro Oliveira', email: 'pedro@example.com', phone: '(32) 97777-7777' },
];

const SERVICE_TYPES = [
  { value: 'installation', label: 'Instalação' },
  { value: 'maintenance', label: 'Manutenção' },
  { value: 'repair', label: 'Reparo' },
  { value: 'cleaning', label: 'Limpeza' },
  { value: 'inspection', label: 'Inspeção' },
  { value: 'other', label: 'Outro' },
];

const SERVICE_STATUS = [
  { value: 'pending', label: 'Pendente' },
  { value: 'in_progress', label: 'Em Andamento' },
  { value: 'completed', label: 'Concluído' },
  { value: 'cancelled', label: 'Cancelado' },
];

export function CreateService() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [clients, setClients] = useState(mockClients);
  const [filteredClients, setFilteredClients] = useState(mockClients);
  const [showClientSelector, setShowClientSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<typeof mockClients[0] | null>(null);
  
  const [formData, setFormData] = useState({
    clientId: '',
    type: 'maintenance',
    status: 'pending',
    description: '',
    price: '',
    scheduledDate: new Date(),
  });

  const [errors, setErrors] = useState({
    clientId: '',
    type: '',
    status: '',
    description: '',
    price: '',
    scheduledDate: '',
  });

  useEffect(() => {
    // Filter clients based on search query
    if (searchQuery.trim() === '') {
      setFilteredClients(clients);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = clients.filter(
        (client) =>
          client.name.toLowerCase().includes(query) ||
          client.email.toLowerCase().includes(query) ||
          client.phone.toLowerCase().includes(query)
      );
      setFilteredClients(filtered);
    }
  }, [searchQuery, clients]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name as string]: '',
      });
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData({
        ...formData,
        scheduledDate: date,
      });
      // Clear error when user selects a date
      if (errors.scheduledDate) {
        setErrors({
          ...errors,
          scheduledDate: '',
        });
      }
    }
  };

  const handleClientSelect = (client: typeof mockClients[0]) => {
    setSelectedClient(client);
    setFormData({
      ...formData,
      clientId: client.id,
    });
    setShowClientSelector(false);
    setSearchQuery('');
    // Clear error when user selects a client
    if (errors.clientId) {
      setErrors({
        ...errors,
        clientId: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      clientId: '',
      type: '',
      status: '',
      description: '',
      price: '',
      scheduledDate: '',
    };
    let isValid = true;

    if (!formData.clientId) {
      newErrors.clientId = 'Cliente é obrigatório';
      isValid = false;
    }

    if (!formData.type) {
      newErrors.type = 'Tipo de serviço é obrigatório';
      isValid = false;
    }

    if (!formData.status) {
      newErrors.status = 'Status é obrigatório';
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = 'Descrição é obrigatória';
      isValid = false;
    }

    if (!formData.price) {
      newErrors.price = 'Preço é obrigatório';
      isValid = false;
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Preço deve ser maior que zero';
      isValid = false;
    }

    if (!formData.scheduledDate) {
      newErrors.scheduledDate = 'Data é obrigatória';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to services page after successful creation
      navigate('/services');
    } catch (err) {
      setError('Erro ao criar serviço. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Novo Serviço
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Client Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.clientId}>
                <Box sx={{ position: 'relative' }}>
                  <TextField
                    fullWidth
                    label="Cliente"
                    value={selectedClient ? selectedClient.name : ''}
                    onClick={() => setShowClientSelector(true)}
                    onFocus={() => setShowClientSelector(true)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: selectedClient && (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedClient(null);
                              setFormData({ ...formData, clientId: '' });
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  {/* Client Selector Dropdown */}
                  {showClientSelector && (
                    <Paper
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        mt: 0.5,
                        maxHeight: 300,
                        overflow: 'auto',
                        zIndex: 1000,
                        boxShadow: 3,
                      }}
                    >
                      <Box sx={{ p: 1 }}>
                        <TextField
                          fullWidth
                          placeholder="Buscar cliente..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                      </Box>
                      <Divider />
                      {filteredClients.length === 0 ? (
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Nenhum cliente encontrado
                          </Typography>
                        </Box>
                      ) : (
                        <List sx={{ p: 0 }}>
                          {filteredClients.map((client) => (
                            <ListItem
                              key={client.id}
                              button
                              onClick={() => handleClientSelect(client)}
                              sx={{
                                '&:hover': { bgcolor: 'action.hover' },
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                              }}
                            >
                              <ListItemText
                                primary={client.name}
                                secondary={`${client.email} | ${client.phone}`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </Paper>
                  )}
                </Box>
                {errors.clientId && (
                  <FormHelperText>{errors.clientId}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Service Type */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel id="type-label">Tipo de Serviço</InputLabel>
                <Select
                  labelId="type-label"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  label="Tipo de Serviço"
                  startAdornment={
                    <InputAdornment position="start">
                      <BuildIcon color="primary" />
                    </InputAdornment>
                  }
                >
                  {SERVICE_TYPES.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Service Status */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.status}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  label="Status"
                >
                  {SERVICE_STATUS.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Price */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Preço"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                error={!!errors.price}
                helperText={errors.price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: <InputAdornment position="end">R$</InputAdornment>,
                }}
              />
            </Grid>

            {/* Scheduled Date */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                <DatePicker
                  label="Data Agendada"
                  value={formData.scheduledDate}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.scheduledDate,
                      helperText: errors.scheduledDate,
                      InputProps: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarIcon color="primary" />
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/services')}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading ? 'Criando...' : 'Criar Serviço'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
} 