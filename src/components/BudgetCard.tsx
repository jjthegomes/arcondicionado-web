import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface BudgetCardProps {
  id: string;
  clientName: string;
  serviceType: string;
  status: "pending" | "approved" | "rejected";
  value: number;
  createdAt: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({
  id,
  clientName,
  serviceType,
  status,
  value,
  createdAt,
  onEdit,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "warning";
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Typography variant="h6" component="div">
            {clientName}
          </Typography>
          <IconButton
            aria-label="more"
            aria-controls={open ? "budget-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="budget-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                onEdit?.();
              }}
            >
              Editar
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                onDelete?.();
              }}
            >
              Excluir
            </MenuItem>
          </Menu>
        </Box>

        <Typography color="text.secondary" gutterBottom>
          {serviceType}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" color="primary">
            {formatCurrency(value)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Chip
            label={status.toUpperCase()}
            color={getStatusColor(status) as any}
            size="small"
          />
          <Typography variant="caption" color="text.secondary">
            {formatDate(createdAt)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}; 