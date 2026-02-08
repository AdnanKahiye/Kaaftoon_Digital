// lib/users.ts
import api from "./api";

export const UsersService = {
  getAll() {
    return api.get("/User/all");
  },

  getById(id: string) {
    return api.get(`/User/${id}`);
  },

  create(data: any) {
    console.log("Creating user with data:", data);
    return api.post("/User/create", data);
  },


   createRole(data: any) {
    return api.post("/UserRoles/create-role", data);
  },


 RoleAll() {
    return api.get("/UserRoles/all-roles");
  },

  

    // ✅ ADD THIS: Update Role
  updateRole(data: {
    roleId: string;
    name: string;
    description?: string;
  }) {
    return api.put("/UserRoles/update-role", data);
  },


  update(data: any) {
    return api.put("/User/edit", data);
  },

  delete(id: string) {
    return api.delete(`/User/delete/${id}`);
  },
};
