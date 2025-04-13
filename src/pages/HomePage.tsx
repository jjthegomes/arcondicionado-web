import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Badge,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  CalendarMonth as CalendarIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Notifications as NotificationsIcon,
  Build as BuildIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Service {
  id: string;
  type: string;
  description: string;
  price: number;
  status: string;
}

export function HomePage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const quickActions = [
    { label: 'Novo Serviço', icon: <AddIcon />, path: '/services/new' },
    { label: 'Agenda', icon: <CalendarIcon />, path: '/calendar' },
    { label: 'Clientes', icon: <PeopleIcon />, path: '/clients' },
    { label: 'Relatórios', icon: <BarChartIcon />, path: '/reports' },
  ];

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockServices: Service[] = [
      {
        id: '1',
        type: 'instalacao',
        description: 'Instalação de ar condicionado split 12000 BTUs - Residencial',
        price: 500,
        status: 'pending',
      },
      {
        id: '2',
        type: 'manutencao',
        description: 'Manutenção preventiva - Limpeza e higienização',
        price: 150,
        status: 'completed',
      },
      {
        id: '3',
        type: 'instalacao',
        description: 'Instalação de ar condicionado split 18000 BTUs - Comercial',
        price: 750,
        status: 'pending',
      },
      {
        id: '4',
        type: 'manutencao',
        description: 'Manutenção corretiva - Troca de capacitor',
        price: 280,
        status: 'completed',
      },
      {
        id: '5',
        type: 'instalacao',
        description: 'Instalação de ar condicionado janela - Residencial',
        price: 350,
        status: 'pending',
      }
    ];

    setServices(mockServices);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'completed':
        return 'Concluído';
      default:
        return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'instalacao':
        return 'Instalação';
      case 'manutencao':
        return 'Manutenção';
      default:
        return type;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Olá, Usuário
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Bem-vindo de volta!
            </Typography>
          </Box>
          <IconButton color="primary" onClick={() => navigate('/notifications')}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>
      </Paper>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.label}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' },
              }}
              onClick={() => navigate(action.path)}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ color: 'primary.main', mb: 1 }}>{action.icon}</Box>
                <Typography variant="subtitle1">{action.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Services */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Serviços Recentes</Typography>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate('/services')}
          >
            Ver todos
          </Button>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : services.length > 0 ? (
          <List>
            {services.map((service) => (
              <React.Fragment key={service.id}>
                <ListItem
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                    py: 2,
                  }}
                  onClick={() => navigate(`/services/${service.id}`)}
                >
                  <ListItemIcon>
                    <BuildIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {getTypeLabel(service.type)}
                      </Typography>
                    }
                    secondary={service.description}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 500 }}>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(service.price)}
                    </Typography>
                    <Chip
                      label={getStatusLabel(service.status)}
                      color={getStatusColor(service.status)}
                      size="small"
                    />
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 4 
          }}>
            <BuildIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Nenhum serviço encontrado
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate('/services/new')}
              sx={{ mt: 2 }}
            >
              Criar Novo Serviço
            </Button>
          </Box>
        )}
      </Paper>

      {/* Clients Card */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ textAlign: 'center' }}>
          <PeopleIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Clientes
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Gerencie seus clientes e acesse suas informações
          </Typography>
          <Button
            variant="contained"
            startIcon={<PeopleIcon />}
            onClick={() => navigate('/clients')}
          >
            Acessar Clientes
          </Button>
        </Box>
      </Paper>

      {/* New Service Button */}
      <Button
        variant="contained"
        size="large"
        startIcon={<AddIcon />}
        sx={{ width: '100%', py: 2 }}
        onClick={() => navigate('/services/new')}
      >
        Novo Serviço
      </Button>
    </Box>
  );
} 

export default HomePage;