import { ServiceStatus, ServiceType } from "../types/service";

export const getStatusColor = (status: ServiceStatus): string => {
  switch (status) {
    case "pending":
      return "#FFA726";
    case "in_progress":
      return "#42A5F5";
    case "completed":
      return "#66BB6A";
    case "cancelled":
      return "#EF5350";
    default:
      return "#9E9E9E";
  }
};

export const getStatusLabel = (status: ServiceStatus): string => {
  switch (status) {
    case "pending":
      return "Pendente";
    case "in_progress":
      return "Em Andamento";
    case "completed":
      return "Concluído";
    case "cancelled":
      return "Cancelado";
    default:
      return "Desconhecido";
  }
};

export const getTypeLabel = (type: ServiceType): string => {
  switch (type) {
    case "installation":
      return "Instalação";
    case "maintenance":
      return "Manutenção";
    case "repair":
      return "Reparo";
    case "cleaning":
      return "Limpeza";
    case "inspection":
      return "Inspeção";
    default:
      return "Desconhecido";
  }
}; 