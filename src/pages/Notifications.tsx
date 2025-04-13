import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Badge,
  Fade,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Build as BuildIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Mail as MailIcon,
  MailOutline as MailOutlineIcon,
} from '@mui/icons-material';

type Notification = {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "service" | "client" | "system";
};

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Novo serviço agendado",
      message: "Cliente João Silva agendou uma manutenção para amanhã às 14h",
      timestamp: "2 min atrás",
      read: false,
      type: "service",
    },
    {
      id: "2",
      title: "Cliente atualizado",
      message: "Maria Santos atualizou suas informações de contato",
      timestamp: "1 hora atrás",
      read: true,
      type: "client",
    },
    {
      id: "3",
      title: "Manutenção concluída",
      message: "Serviço de instalação do cliente Pedro Oliveira foi finalizado",
      timestamp: "2 horas atrás",
      read: false,
      type: "service",
    },
    {
      id: "4",
      title: "Atualização do sistema",
      message: "Nova versão do aplicativo disponível",
      timestamp: "1 dia atrás",
      read: true,
      type: "system",
    },
  ]);

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "service":
        return <BuildIcon color="primary" />;
      case "client":
        return <PersonIcon color="primary" />;
      case "system":
        return <SettingsIcon color="primary" />;
      default:
        return <NotificationsIcon color="primary" />;
    }
  };

  const toggleReadStatus = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: !notification.read }
          : notification
      )
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Notificações
      </Typography>

      {notifications.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <NotificationsIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Nenhuma notificação
          </Typography>
        </Paper>
      ) : (
        <Paper>
          <List>
            {notifications.map((notification, index) => (
              <Fade in={true} timeout={300} style={{ transitionDelay: `${index * 100}ms` }} key={notification.id}>
                <div>
                  <ListItem
                    button
                    onClick={() => toggleReadStatus(notification.id)}
                    sx={{
                      bgcolor: notification.read ? 'inherit' : 'action.hover',
                      '&:hover': { bgcolor: 'action.selected' },
                    }}
                  >
                    <ListItemIcon>
                      {getNotificationIcon(notification.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={notification.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {notification.message}
                          </Typography>
                          <br />
                          <Typography component="span" variant="caption" color="text.secondary">
                            {notification.timestamp}
                          </Typography>
                        </>
                      }
                    />
                    <IconButton edge="end" aria-label="status">
                      {notification.read ? (
                        <MailIcon color="action" />
                      ) : (
                        <MailOutlineIcon color="primary" />
                      )}
                    </IconButton>
                  </ListItem>
                  {index < notifications.length - 1 && <Divider />}
                </div>
              </Fade>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
} 