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
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Badge as BadgeIcon,
  LocationOn as LocationIcon,
  Home as HomeIcon,
  Business as BusinessIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

export function CreateClient() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    documentType: 'cpf',
    document: '',
    cep: '',
    address: {
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: '',
    },
    number: '',
    complement: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    document: '',
    cep: '',
    address: {
      logradouro: '',
      bairro: '',
      localidade: '',
      uf: '',
    },
    number: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
      
      // Clear error when user starts typing
      if (errors.address[addressField as keyof typeof errors.address]) {
        setErrors({
          ...errors,
          address: {
            ...errors.address,
            [addressField]: '',
          },
        });
      }
    } else {
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

  const handleDocumentTypeChange = (event: React.MouseEvent<HTMLElement>, newDocumentType: string) => {
    if (newDocumentType !== null) {
      setFormData({
        ...formData,
        documentType: newDocumentType,
        document: '', // Clear document when changing type
      });
    }
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const cleanCep = value.replace(/\D/g, '');
    let formattedCep = cleanCep;

    if (cleanCep.length <= 8) {
      formattedCep = cleanCep.replace(/(\d{5})(\d{3})/, '$1-$2');
      setFormData({
        ...formData,
        cep: formattedCep,
        address: {
          ...formData.address,
          cep: formattedCep,
        },
      });

      if (cleanCep.length === 8) {
        setLoadingCep(true);
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
          const data = await response.json();

          if (data.erro) {
            setErrors({
              ...errors,
              cep: 'CEP não encontrado',
            });
            return;
          }

          setFormData({
            ...formData,
            cep: formattedCep,
            address: {
              cep: formattedCep,
              logradouro: data.logradouro,
              complemento: data.complemento,
              bairro: data.bairro,
              localidade: data.localidade,
              uf: data.uf,
            },
          });
        } catch (error) {
          setErrors({
            ...errors,
            cep: 'Não foi possível buscar o CEP',
          });
        } finally {
          setLoadingCep(false);
        }
      }
    }
  };

  const validateDocument = (doc: string, type: 'cpf' | 'cnpj') => {
    if (type === 'cpf') {
      // Remove non-numeric characters
      const cleanDoc = doc.replace(/\D/g, '');
      if (cleanDoc.length !== 11) return false;

      // Basic CPF validation
      let sum = 0;
      let remainder;

      if (cleanDoc === '00000000000') return false;

      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleanDoc.substring(i - 1, i)) * (11 - i);
      }

      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cleanDoc.substring(9, 10))) return false;

      sum = 0;
      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleanDoc.substring(i - 1, i)) * (12 - i);
      }

      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cleanDoc.substring(10, 11))) return false;

      return true;
    } else {
      // Remove non-numeric characters
      const cleanDoc = doc.replace(/\D/g, '');
      if (cleanDoc.length !== 14) return false;

      // Basic CNPJ validation
      let sum = 0;
      let remainder;

      if (cleanDoc === '00000000000000') return false;

      // First digit
      let weight = 5;
      for (let i = 0; i < 12; i++) {
        sum += parseInt(cleanDoc.substring(i, i + 1)) * weight;
        weight = weight === 2 ? 9 : weight - 1;
      }

      remainder = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (remainder !== parseInt(cleanDoc.substring(12, 13))) return false;

      // Second digit
      sum = 0;
      weight = 6;
      for (let i = 0; i < 13; i++) {
        sum += parseInt(cleanDoc.substring(i, i + 1)) * weight;
        weight = weight === 2 ? 9 : weight - 1;
      }

      remainder = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (remainder !== parseInt(cleanDoc.substring(13, 14))) return false;

      return true;
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const cleanText = value.replace(/\D/g, '');
    let formattedText = cleanText;

    if (formData.documentType === 'cpf') {
      if (cleanText.length <= 11) {
        formattedText = cleanText.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
    } else {
      if (cleanText.length <= 14) {
        formattedText = cleanText.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      }
    }

    setFormData({
      ...formData,
      document: formattedText,
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      document: '',
      cep: '',
      address: {
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
      },
      number: '',
    };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = 'Telefone é obrigatório';
      isValid = false;
    }

    if (!formData.document) {
      newErrors.document = `${formData.documentType.toUpperCase()} é obrigatório`;
      isValid = false;
    } else if (!validateDocument(formData.document, formData.documentType as 'cpf' | 'cnpj')) {
      newErrors.document = `${formData.documentType.toUpperCase()} inválido`;
      isValid = false;
    }

    if (!formData.cep) {
      newErrors.cep = 'CEP é obrigatório';
      isValid = false;
    }

    if (!formData.address.logradouro) {
      newErrors.address.logradouro = 'Logradouro é obrigatório';
      isValid = false;
    }

    if (!formData.address.bairro) {
      newErrors.address.bairro = 'Bairro é obrigatório';
      isValid = false;
    }

    if (!formData.address.localidade) {
      newErrors.address.localidade = 'Cidade é obrigatória';
      isValid = false;
    }

    if (!formData.address.uf) {
      newErrors.address.uf = 'Estado é obrigatório';
      isValid = false;
    }

    if (!formData.number) {
      newErrors.number = 'Número é obrigatório';
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
      
      // Navigate to clients page after successful creation
      navigate('/clients');
    } catch (err) {
      setError('Erro ao criar cliente. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Novo Cliente
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSave}>
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Informações Pessoais
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome completo"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Telefone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Tipo de Documento
                </Typography>
                <ToggleButtonGroup
                  value={formData.documentType}
                  exclusive
                  onChange={handleDocumentTypeChange}
                  aria-label="document type"
                >
                  <ToggleButton value="cpf" aria-label="cpf">
                    <BadgeIcon sx={{ mr: 1 }} />
                    CPF
                  </ToggleButton>
                  <ToggleButton value="cnpj" aria-label="cnpj">
                    <BusinessIcon sx={{ mr: 1 }} />
                    CNPJ
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <TextField
                fullWidth
                label={formData.documentType.toUpperCase()}
                name="document"
                value={formData.document}
                onChange={handleDocumentChange}
                error={!!errors.document}
                helperText={errors.document}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Address Information */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Endereço
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CEP"
                name="cep"
                value={formData.cep}
                onChange={handleCepChange}
                error={!!errors.cep}
                helperText={errors.cep}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: loadingCep ? (
                    <InputAdornment position="end">
                      <CircularProgress size={20} />
                    </InputAdornment>
                  ) : null,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Logradouro"
                name="address.logradouro"
                value={formData.address.logradouro}
                onChange={handleInputChange}
                error={!!errors.address.logradouro}
                helperText={errors.address.logradouro}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                error={!!errors.number}
                helperText={errors.number}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Complemento"
                name="complement"
                value={formData.complement}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bairro"
                name="address.bairro"
                value={formData.address.bairro}
                onChange={handleInputChange}
                error={!!errors.address.bairro}
                helperText={errors.address.bairro}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cidade"
                name="address.localidade"
                value={formData.address.localidade}
                onChange={handleInputChange}
                error={!!errors.address.localidade}
                helperText={errors.address.localidade}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Estado"
                name="address.uf"
                value={formData.address.uf}
                onChange={handleInputChange}
                error={!!errors.address.uf}
                helperText={errors.address.uf}
                inputProps={{ maxLength: 2 }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/clients')}
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
                  {loading ? 'Criando...' : 'Criar Cliente'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
} 