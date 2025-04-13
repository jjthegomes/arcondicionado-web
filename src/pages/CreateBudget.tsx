import React, { useState } from 'react';
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
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  SelectChangeEvent,
} from '@mui/material';
import {
  Person as PersonIcon,
  Description as DescriptionIcon,
  AttachMoney as MoneyIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

// Mock data - replace with actual API calls
const mockClients = [
  { id: 1, name: 'João Silva', document: '123.456.789-00' },
  { id: 2, name: 'Maria Santos', document: '987.654.321-00' },
];

const mockServiceTypes = [
  { id: 1, name: 'Instalação', basePrice: 150 },
  { id: 2, name: 'Manutenção', basePrice: 100 },
  { id: 3, name: 'Limpeza', basePrice: 80 },
];

export function CreateBudget() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showClientSelector, setShowClientSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<typeof mockClients[0] | null>(null);
  
  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    description: '',
    items: [] as Array<{
      id: number;
      serviceTypeId: number;
      serviceTypeName: string;
      quantity: number;
      unitPrice: number;
      total: number;
    }>,
    total: 0,
  });

  const [errors, setErrors] = useState({
    clientId: '',
    description: '',
    items: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData({
        ...formData,
        [name]: value,
      });
      
      // Clear error when user starts typing
      if (errors[name as keyof typeof errors]) {
        setErrors({
          ...errors,
          [name]: '',
        });
      }
    }
  };

  const handleClientSelect = (client: typeof mockClients[0]) => {
    setSelectedClient(client);
    setFormData({
      ...formData,
      clientId: client.id.toString(),
      clientName: client.name,
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

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      serviceTypeId: 0,
      serviceTypeName: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    setFormData({
      ...formData,
      items: [...formData.items, newItem],
    });
  };

  const handleRemoveItem = (itemId: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.id !== itemId),
      total: formData.items
        .filter(item => item.id !== itemId)
        .reduce((sum, item) => sum + item.total, 0),
    });
  };

  const handleItemChange = (itemId: number, field: string, value: string | number) => {
    const updatedItems = formData.items.map(item => {
      if (item.id === itemId) {
        if (field === 'serviceTypeId') {
          const serviceType = mockServiceTypes.find(st => st.id === value);
          return {
            ...item,
            serviceTypeId: value as number,
            serviceTypeName: serviceType?.name || '',
            unitPrice: serviceType?.basePrice || 0,
            total: (serviceType?.basePrice || 0) * item.quantity,
          };
        } else if (field === 'quantity') {
          return {
            ...item,
            quantity: value as number,
            total: item.unitPrice * (value as number),
          };
        }
      }
      return item;
    });

    const newTotal = updatedItems.reduce((sum, item) => sum + item.total, 0);

    setFormData({
      ...formData,
      items: updatedItems,
      total: newTotal,
    });
  };

  const validateForm = () => {
    const newErrors = {
      clientId: '',
      description: '',
      items: '',
    };
    let isValid = true;

    if (!formData.clientId) {
      newErrors.clientId = 'Cliente é obrigatório';
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = 'Descrição é obrigatória';
      isValid = false;
    }

    if (formData.items.length === 0) {
      newErrors.items = 'Adicione pelo menos um item';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to budgets page after successful creation
      navigate('/budgets');
    } catch (err) {
      setError('Erro ao criar orçamento. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.document.includes(searchQuery)
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Novo Orçamento
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSave}>
          <Grid container spacing={3}>
            {/* Client Selection */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Cliente
              </Typography>
              <FormControl fullWidth error={!!errors.clientId}>
                <Box sx={{ position: 'relative' }}>
                  <TextField
                    fullWidth
                    label="Cliente"
                    value={selectedClient ? selectedClient.name : ''}
                    onClick={() => setShowClientSelector(true)}
                    onFocus={() => setShowClientSelector(true)}
                    error={!!errors.clientId}
                    helperText={errors.clientId}
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
                              setFormData({ ...formData, clientId: '', clientName: '' });
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
                                secondary={client.document}
                              />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </Paper>
                  )}
                </Box>
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
                error={!!errors.description}
                helperText={errors.description}
                multiline
                rows={3}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Items */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Itens
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddItem}
                >
                  Adicionar Item
                </Button>
              </Box>

              {errors.items && (
                <FormHelperText error sx={{ mb: 2 }}>
                  {errors.items}
                </FormHelperText>
              )}

              <List>
                {formData.items.map((item) => (
                  <ListItem
                    key={item.id}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                          <InputLabel>Tipo de Serviço</InputLabel>
                          <Select
                            value={item.serviceTypeId}
                            label="Tipo de Serviço"
                            onChange={(e) => handleItemChange(item.id, 'serviceTypeId', e.target.value)}
                          >
                            {mockServiceTypes.map((serviceType) => (
                              <MenuItem key={serviceType.id} value={serviceType.id}>
                                {serviceType.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Quantidade"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                          InputProps={{
                            inputProps: { min: 1 },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <TextField
                          fullWidth
                          label="Preço Unit."
                          value={item.unitPrice.toFixed(2)}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <TextField
                          fullWidth
                          label="Total"
                          value={item.total.toFixed(2)}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Button
                          color="error"
                          onClick={() => handleRemoveItem(item.id)}
                          startIcon={<DeleteIcon />}
                        >
                          Remover
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Total */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6">
                  Total:
                </Typography>
                <TextField
                  value={formData.total.toFixed(2)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    readOnly: true,
                  }}
                  sx={{ width: 200 }}
                />
              </Box>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/budgets')}
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
                  {loading ? 'Criando...' : 'Criar Orçamento'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
} 