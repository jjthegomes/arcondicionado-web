import { Budget } from "../types/budget";

export const getBudgetStatusColor = (status: Budget["status"]): string => {
  switch (status) {
    case "pending":
      return "#FFA726";
    case "approved":
      return "#66BB6A";
    case "rejected":
      return "#EF5350";
    case "cancelled":
      return "#9E9E9E";
    default:
      return "#9E9E9E";
  }
};

export const getBudgetStatusLabel = (status: Budget["status"]): string => {
  switch (status) {
    case "pending":
      return "Pendente";
    case "approved":
      return "Aprovado";
    case "rejected":
      return "Rejeitado";
    case "cancelled":
      return "Cancelado";
    default:
      return "Desconhecido";
  }
}; 