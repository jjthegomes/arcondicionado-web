export interface Service {
  id: string;
  client_id: string;
  type: ServiceType;
  status: ServiceStatus;
  description: string;
  price: number;
  scheduled_date: string;
  completed_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  client?: {
    name?: string;
    phone?: string;
  };
}

export type ServiceType =
  | "installation"
  | "maintenance"
  | "repair"
  | "cleaning"
  | "inspection";

export type ServiceStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface ServiceCreateDTO {
  client_id: number;
  type: ServiceType;
  description: string;
  price: number;
  scheduled_date: string;
  notes?: string;
}

export interface ServiceUpdateDTO {
  client_id?: number;
  description?: string;
  status?: ServiceStatus;
  notes?: string;
}

export interface ServiceStatusUpdateDTO {
  status: ServiceStatus;
  notes?: string;
}

export interface ServiceHistoryItem {
  id: number;
  service_id: number;
  status: ServiceStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ServiceFiltersParams extends PaginationParams {
  type?: ServiceType;
  status?: ServiceStatus;
  client_id?: number;
} 