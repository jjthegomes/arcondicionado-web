import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SettingsIcon from '@mui/icons-material/Settings';

interface ServiceCardProps {
  type: 'Manutenção' | 'Reparo' | 'Inspeção' | 'Limpeza' | 'Instalação';
  description: string;
  price: number;
  status: 'Pendente' | 'Em Andamento' | 'Concluído' | 'Rejeitado';
  date: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  type,
  description,
  price,
  status,
  date,
}) => {
  const getStatusColor = (status: string) => {
    const colors = {
      'Pendente': 'warning',
      'Em Andamento': 'info',
      'Concluído': 'success',
      'Rejeitado': 'error',
    } as const;
    return colors[status as keyof typeof colors];
  };

  const getServiceIcon = (type: string) => {
    const icons = {
      'Manutenção': <BuildIcon />,
      'Limpeza': <CleaningServicesIcon />,
      'Reparo': <EngineeringIcon />,
      'Inspeção': <SettingsIcon />,
      'Instalação': <BuildIcon />,
    };
    return icons[type as keyof typeof icons];
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                backgroundColor: 'primary.light',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main',
              }}
            >
              {getServiceIcon(type)}
            </Box>
            <Box>
              <Typography variant="h6" component="div" sx={{ color: 'primary.main' }}>
                {type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={status}
            color={getStatusColor(status)}
            size="small"
            sx={{ ml: 2 }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, alignItems: 'center' }}>
          <Typography variant="h6" component="div" color="primary">
            R$ {price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ServiceCard; 