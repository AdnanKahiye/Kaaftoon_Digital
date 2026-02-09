// lib/packages.ts
import api from "./api";

/* =========================
   Types (Optional but Recommended)
========================= */
export interface PackageRequest {
  name: string;
  description: string;
  price: number;
  features: string[];
}

export const packageService = {
  /* =========================
     GET ALL PACKAGES
     GET: /api/package/get-packages
  ========================= */
  getPackages() {
    return api.get("/package/get-packages");
  },

  /* =========================
     GET BY ID (optional if needed)
     GET: /api/package/{id}
  ========================= */
  getById(id: string) {
    return api.get(`/package/${id}`);
  },

  /* =========================
     CREATE PACKAGE
     POST: /api/package/create-packages
  ========================= */
  createPackage(data: PackageRequest) {
    return api.post("/package/create-packages", data);
  },

  /* =========================
     UPDATE PACKAGE
     PUT: /api/package/update-package/{id}
  ========================= */
  updatePackage(id: string, data: PackageRequest) {
    return api.put(`/package/update-package/${id}`, data);
  },

  /* =========================
     DELETE PACKAGE
     DELETE: /api/package/delete-package/{id}
  ========================= */
  deletePackage(id: string) {
    return api.delete(`/package/delete-package/${id}`);
  },
};
