import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Alert,
  Button,
  Chip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Build as BuildIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { format, isSameDay, parseISO, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';

// Mock data - replace with actual API calls
const mockServices = [
  { id: 1, client_id: 1, client_name: 'João Silva', type: 'installation', status: 'completed', price: 350, scheduled_date: '2025-04-15T10:00:00' },
  { id: 2, client_id: 2, client_name: 'Maria Santos', type: 'maintenance', status: 'pending', price: 150, scheduled_date: '2025-04-20T14:30:00' },
  { id: 3, client_id: 3, client_name: 'Pedro Oliveira', type: 'repair', status: 'in_progress', price: 250, scheduled_date: '2025-04-25T09:00:00' },
  { id: 4, client_id: 1, client_name: 'João Silva', type: 'cleaning', status: 'completed', price: 100, scheduled_date: '2025-04-10T11:00:00' },
  { id: 5, client_id: 4, client_name: 'Ana Costa', type: 'inspection', status: 'completed', price: 80, scheduled_date: '2025-04-05T15:00:00' },
];

// Helper function
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

const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    'pending': 'warning',
    'in_progress': 'info',
    'completed': 'success',
    'cancelled': 'error',
  };
  return colorMap[status] || 'default';
};

const getStatusLabel = (status: string) => {
  const statusMap: Record<string, string> = {
    'pending': 'Pendente',
    'in_progress': 'Em Andamento',
    'completed': 'Concluído',
    'cancelled': 'Cancelado',
  };
  return statusMap[status] || status;
};

export function Calendar() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const servicesForSelectedDate = useMemo(() => {
    return mockServices.filter((service) =>
      isSameDay(parseISO(service.scheduled_date), selectedDate)
    );
  }, [selectedDate]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleServiceClick = (serviceId: number) => {
    navigate(`/services/${serviceId}`);
  };

  const handleNewService = () => {
    navigate('/services/new');
  };

  // Function to determine if a date has services
  const hasServices = (date: Date) => {
    return mockServices.some((service) =>
      isSameDay(parseISO(service.scheduled_date), date)
    );
  };

  // Custom day component
  const CustomPickersDay = (props: PickersDayProps<Date>) => {
    const hasServicesOnDay = hasServices(props.day);
    return (
      <PickersDay
        {...props}
        className={hasServicesOnDay ? 'has-services' : ''}
        sx={{
          position: 'relative',
          '&::after': hasServicesOnDay ? {
            content: '""',
            position: 'absolute',
            bottom: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: 'primary.main',
          } : {},
        }}
      />
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        {/* Calendar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Calendário
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <StaticDatePicker
                value={selectedDate}
                onChange={handleDateChange}
                slots={{
                  day: CustomPickersDay,
                }}
                slotProps={{
                  toolbar: {
                    hidden: true
                  },
                  calendarHeader: {
                    sx: {
                      paddingLeft: 2,
                      paddingRight: 2,
                      '& .MuiPickersCalendarHeader-label': {
                        fontSize: '1.1rem',
                        fontWeight: 500,
                      },
                    }
                  }
                }}
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  border: 'none',
                  '& .MuiPickersLayout-root': {
                    width: '100%',
                    bgcolor: 'transparent',
                  },
                  '& .MuiPickersCalendarHeader-root': {
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                  '& .MuiDayCalendar-header, & .MuiDayCalendar-weekContainer': {
                    justifyContent: 'space-around',
                    margin: '8px 0',
                  },
                  '& .MuiPickersDay-root': {
                    width: '30px',
                    height: '30px',
                    fontSize: '0.95rem',
                    margin: '4px',
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '&:focus': {
                        backgroundColor: 'primary.main',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    '&.has-services': {
                      fontWeight: 500,
                    },
                  },
                  '& .MuiDayCalendar-weekDayLabel': {
                    width: '30px',
                    height: '30px',
                    margin: '4px',
                    fontSize: '0.85rem',
                    color: 'text.secondary',
                  },
                  '& .MuiPickersArrowSwitcher-root': {
                    '& .MuiIconButton-root': {
                      color: 'text.primary',
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Paper>
        </Grid>

        {/* Services for selected date */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Serviços para {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                onClick={handleNewService}
              >
                Novo Serviço
              </Button>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : servicesForSelectedDate.length > 0 ? (
              <List>
                {servicesForSelectedDate.map((service) => (
                  <ListItem 
                    key={service.id}
                    button
                    onClick={() => handleServiceClick(service.id)}
                    sx={{ 
                      mb: 1, 
                      borderRadius: 1,
                      '&:hover': { backgroundColor: 'action.hover' }
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="subtitle1">
                            {format(parseISO(service.scheduled_date), "HH:mm")}
                          </Typography>
                          <Chip 
                            label={getStatusLabel(service.status)} 
                            color={getStatusColor(service.status) as any}
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2">
                              {service.client_name}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <BuildIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2">
                              {getTypeLabel(service.type)}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Typography variant="body2" color="primary">
                        R$ {service.price.toFixed(2)}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                p: 4,
                textAlign: 'center'
              }}>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Nenhum serviço agendado para este dia
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  startIcon={<AddIcon />}
                  onClick={handleNewService}
                  sx={{ mt: 2 }}
                >
                  Agendar Serviço
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 