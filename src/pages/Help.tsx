import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
} from '@mui/material';
import {
  Add as AddIcon,
  FilterList as FilterIcon,
  PersonAdd as PersonAddIcon,
  Update as UpdateIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

export function Help() {
  const helpItems = [
    {
      title: "Como criar um novo serviço?",
      description:
        'Clique no botão "+" na tela de serviços e preencha as informações necessárias.',
      icon: <AddIcon color="primary" />,
    },
    {
      title: "Como filtrar serviços?",
      description:
        "Use os filtros no topo da tela de serviços para buscar por tipo, status ou cliente.",
      icon: <FilterIcon color="primary" />,
    },
    {
      title: "Como adicionar um novo cliente?",
      description:
        'Acesse a tela de clientes e clique no botão "+" para cadastrar um novo cliente.',
      icon: <PersonAddIcon color="primary" />,
    },
    {
      title: "Como atualizar o status de um serviço?",
      description:
        "Clique no serviço desejado e use o botão de status para atualizar.",
      icon: <UpdateIcon color="primary" />,
    },
    {
      title: "Preciso de mais ajuda",
      description:
        "Entre em contato com nosso suporte pelo email: suporte@arcondicionadojf.com.br",
      icon: <EmailIcon color="primary" />,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Ajuda
      </Typography>
      
      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Perguntas Frequentes
      </Typography>
      
      <Paper>
        <List>
          {helpItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  secondary={item.description}
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItem>
              {index < helpItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Não encontrou o que procurava?
        </Typography>
        <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
          Entre em contato com nosso suporte
        </Typography>
      </Box>
    </Box>
  );
} 