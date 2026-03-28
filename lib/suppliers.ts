import api from "./api";

/* ---------- Interfaces ---------- */

export interface CreateSupplierRequest {
  name: string;
  phone: string;
  address: string;
  organistaion: string; // Adjusted for your C# property "Organistaion"
}

export interface PurchaseItem {
  itemName: string;
  quantity: number;
  price: number;
}

export interface PurchaseFormData {
  supplierId: string;
  date: string;
  items: PurchaseItem[];
}

export interface CreatePaymentRequest {
  supplierId: string;
  amount: number;
  note: string;
  purchaseId?: string;
}

export interface PaginationRequest {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
}

/* ---------- Service ---------- */

export const SupplierService = {
  // =========================
  // SUPPLIER
  // =========================
  
  getAllSuppliers: (params?: PaginationRequest) => 
    api.get("/Supplier", { params }),

  getSupplierById: (id: string) => 
    api.get(`/Supplier/${id}`),

  createSupplier: (data: CreateSupplierRequest) => 
    api.post("/Supplier", data),

  updateSupplier: (id: string, data: CreateSupplierRequest) => 
    api.put(`/Supplier/${id}`, data),

  deleteSupplier: (id: string) => 
    api.delete(`/Supplier/${id}`),

  // =========================
  // PURCHASE (ALAAB)
  // =========================

  getPurchases: (params?: PaginationRequest) => 
    api.get("/Supplier/purchases", { params }),

  getPurchaseById: (id: string) => 
    api.get(`/Supplier/purchase/${id}`),

  createPurchase: (data: PurchaseFormData) => 
    api.post("/Supplier/purchase", data),

  updatePurchase: (id: string, data: PurchaseFormData) => 
    api.put(`/Supplier/purchase/${id}`, data),

  deletePurchase: (id: string) => 
    api.delete(`/Supplier/purchase/${id}`),

  // =========================
  // PAYMENT
  // =========================

  getPayments: (params?: PaginationRequest) => 
    api.get("/Supplier/payments", { params }),

  createPayment: (data: CreatePaymentRequest) => 
    api.post("/Supplier/payment", data),

  updatePayment: (id: string, data: CreatePaymentRequest) => 
    api.put(`/Supplier/payment/${id}`, data),

  deletePayment: (id: string) => 
    api.delete(`/Supplier/payment/${id}`),

  // =========================
  // REPORTS 🔥
  // =========================

  getSupplierBalance: (id: string) => 
    api.get(`/Supplier/${id}/balance`),

  getSupplierStatement: (id: string) => 
    api.get(`/Supplier/${id}/statement`),

  getSupplierSummary: (params?: PaginationRequest) => 
    api.get("/Supplier/summary", { params }),
};