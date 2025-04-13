import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { Client } from "../types/client";

interface ClientCardProps {
  client: Client;
  onClick: () => void;
}

export function ClientCard({ client, onClick }: ClientCardProps) {
  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
        },
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "rgba(0, 143, 51, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <PersonIcon color="primary" />
          </Box>
          <Box flex={1}>
            <Typography variant="h6" color="primary">
              {client.name}
            </Typography>
            <Chip
              label={client.document_type.toUpperCase()}
              size="small"
              sx={{
                backgroundColor: "rgba(0, 143, 51, 0.1)",
                color: "primary.main",
                mt: 1,
              }}
            />
          </Box>
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <EmailIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {client.email}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <PhoneIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {client.phone}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <LocationIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {client.address.logradouro}, {client.number}
            {client.complement ? ` - ${client.complement}` : ""}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
} 