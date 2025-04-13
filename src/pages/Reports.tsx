import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Construction as ConstructionIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Mock data - replace with actual API calls
const mockServices = [
  { id: 1, client_id: 1, type: 'installation', status: 'completed', price: 350, scheduled_date: '2025-04-15T10:00:00' },
  { id: 2, client_id: 2, type: 'maintenance', status: 'pending', price: 150, scheduled_date: '2025-04-20T14:30:00' },
  { id: 3, client_id: 3, type: 'repair', status: 'in_progress', price: 250, scheduled_date: '2025-04-25T09:00:00' },
  { id: 4, client_id: 1, type: 'cleaning', status: 'completed', price: 100, scheduled_date: '2025-04-10T11:00:00' },
  { id: 5, client_id: 4, type: 'inspection', status: 'completed', price: 80, scheduled_date: '2025-04-05T15:00:00' },
];

// Helper functions
const getStatusLabel = (status: string) => {
  const statusMap: Record<string, string> = {
    'pending': 'Pendente',
    'in_progress': 'Em Andamento',
    'completed': 'Concluído',
    'cancelled': 'Cancelado',
  };
  return statusMap[status] || status;
};

const getTypeLabel = (type: string) => {
  const typeMap: Record<string, string> = {
    'installation': 'Instalação',
    'maintenance': 'Manutenção',
    'repair': 'Reparo',
    'cleaning': 'Limpeza',
    'inspection': 'Inspeção',
  };
  return typeMap[type] || type;
};

export function Reports() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startOfSelectedMonth = startOfMonth(selectedDate);
  const endOfSelectedMonth = endOfMonth(selectedDate);

  const handlePreviousMonth = () => {
    setSelectedDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(prev => addMonths(prev, 1));
  };

  const statistics = useMemo(() => {
    const monthlyServices = mockServices.filter(service =>
      isWithinInterval(parseISO(service.scheduled_date), {
        start: startOfSelectedMonth,
        end: endOfSelectedMonth,
      })
    );

    // Ensure we have valid numbers for calculations
    const totalServices = monthlyServices.length || 0;
    const totalRevenue = monthlyServices.reduce((sum, service) => sum + (Number(service.price) || 0), 0);
    const averageServiceValue = totalServices > 0 ? totalRevenue / totalServices : 0;

    const statusCounts = monthlyServices.reduce((acc, service) => {
      if (service.status) {
        acc[service.status] = (acc[service.status] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const typeCounts = monthlyServices.reduce((acc, service) => {
      if (service.type) {
        acc[service.type] = (acc[service.type] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      totalServices,
      totalRevenue,
      averageServiceValue,
      statusCounts,
      typeCounts,
    };
  }, [startOfSelectedMonth, endOfSelectedMonth]);

  const statCards = [
    {
      title: 'Total de Serviços',
      value: statistics.totalServices,
      icon: <ConstructionIcon fontSize="large" color="primary" />,
      color: 'primary.main',
    },
    {
      title: 'Receita Total',
      value: `R$ ${statistics.totalRevenue.toFixed(2)}`,
      icon: <MoneyIcon fontSize="large" color="primary" />,
      color: 'primary.main',
    },
    {
      title: 'Ticket Médio',
      value: `R$ ${statistics.averageServiceValue.toFixed(2)}`,
      icon: <TrendingUpIcon fontSize="large" color="primary" />,
      color: 'primary.main',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>

      {/* Month Selector */}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton onClick={handlePreviousMonth} color="primary">
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h6" sx={{ mx: 2, minWidth: 200, textAlign: 'center' }}>
          {format(selectedDate, "MMMM 'de' yyyy", { locale: ptBR }).charAt(0).toUpperCase() + 
           format(selectedDate, "MMMM 'de' yyyy", { locale: ptBR }).slice(1)}
        </Typography>
        <IconButton onClick={handleNextMonth} color="primary">
          <ChevronRightIcon />
        </IconButton>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' },
              }}
            >
              <CardContent sx={{ textAlign: 'center', width: '100%' }}>
                <Box sx={{ mb: 2 }}>{card.icon}</Box>
                <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                  {card.value}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Status and Type Tables */}
      <Grid container spacing={3}>
        {/* Status Table */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Status dos Serviços
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Quantidade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(statistics.statusCounts).length > 0 ? (
                    Object.entries(statistics.statusCounts).map(([status, count]) => (
                      <TableRow key={status}>
                        <TableCell>{getStatusLabel(status)}</TableCell>
                        <TableCell align="right">{count}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        Nenhum serviço com status registrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Type Table */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tipos de Serviço
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tipo</TableCell>
                    <TableCell align="right">Quantidade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(statistics.typeCounts).length > 0 ? (
                    Object.entries(statistics.typeCounts).map(([type, count]) => (
                      <TableRow key={type}>
                        <TableCell>{getTypeLabel(type)}</TableCell>
                        <TableCell align="right">{count}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        Nenhum tipo de serviço registrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Export Button */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<CalendarIcon />}
          onClick={() => {
            // Implement export functionality
            alert('Exportar relatório');
          }}
        >
          Exportar Relatório
        </Button>
      </Box>
    </Box>
  );
} 