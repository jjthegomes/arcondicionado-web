import { ServiceType } from "./service";

export interface BudgetItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Budget {
  id: string;
  client_id: string;
  type: ServiceType;
  items: BudgetItem[];
  total_price: number;
  status: "pending" | "approved" | "rejected" | "cancelled";
  valid_until: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface BudgetCreateDTO {
  client_id: string;
  type: ServiceType;
  items: BudgetItem[];
  total_price: number;
  valid_until: string;
  notes?: string;
}

export interface BudgetUpdateDTO {
  client_id?: string;
  type?: ServiceType;
  items?: BudgetItem[];
  total_price?: number;
  status?: "pending" | "approved" | "rejected" | "cancelled";
  valid_until?: string;
  notes?: string;
} 