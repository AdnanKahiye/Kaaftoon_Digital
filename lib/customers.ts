// lib/customer.ts
import api from "./api";

export const CustomerService = {
  // GET ALL (with pagination)
  getAllCustomer(pageNumber = 1, pageSize = 10) {
    return api.get("/Customer/get-customers", {
      params: { pageNumber, pageSize },
    });
  },


  // ===============================
  // GET CUSTOMERS WITH FILTER
  // ===============================
  getAllBySalesCustomer(
    pageNumber: number = 1,
    pageSize: number = 10,
    phoneNumber?: string,
    startDate?: string,
    endDate?: string
  ) {
    return api.get("/Customer/get-customer-sale", {
      params: {
        pageNumber,
        pageSize,
        ...(phoneNumber && { phoneNumber }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      },
    });
  },

  // GET BY ID
  getById(id: string) {
    return api.get(`/Customer/get-customers/${id}`);
  },



  // CREATE
  createCustomer(data: any) {
    return api.post("/Customer/create-customer", data);
  },


  // UPDATE
  updateCustomer(id: string, data: any) {
    return api.put(`/Customer/update-customer/${id}`, data);
  },

  // DELETE
  deleteCustomer(id: string) {
    return api.delete(`/Customer/delete-customer/${id}`);
  },

      // CREATE
  createSales(data: any) {
    return api.post("/Customer/create-sales", data);
  },


  // GET ALL (with pagination)
  getAllServices(pageNumber = 1, pageSize = 10) {
    return api.get("/Customer/get-services", {
      params: { pageNumber, pageSize },
    });
  },

   // CREATE
  createService(data: any) {
    return api.post("/Customer/create-service", data);
  },

    // UPDATE
  updateService(id: string, data: any) {
    return api.put(`/Customer/update-service/${id}`, data);
  },

    // DELETE
  deleteService(id: string) {
    return api.delete(`/Customer/delete-service/${id}`);
  },


    // GET ALL (with pagination)
  getAllServicesItems(pageNumber = 1, pageSize = 10) {
    return api.get("/Customer/get-serviceitems", {
      params: { pageNumber, pageSize },
    });
  },

   // CREATE
  createServiceItem(data: any) {
    return api.post("/Customer/create-serviceitem", data);
  },

    // UPDATE
  updateServiceItem(id: string, data: any) {
    return api.put(`/Customer/update-serviceitem/${id}`, data);
  },

    // DELETE
  deleteServiceItem(id: string) {
    return api.delete(`/Customer/delete-serviceitem/${id}`);
  },


getAllSales(
  pageNumber = 1,
  pageSize = 10,
  startDate?: string,
  endDate?: string,
  status?: string
) {
  const params: any = {
    pageNumber,
    pageSize,
  };

  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  if (status) params.status = status;

  return api.get("/Customer/get-sales", { params });
},

// ADD PAYMENT
addPayment(data: { saleId: string; amount: number }) {
  return api.post("/Customer/add-payment", data);
},



getAUnpaidSales(
  pageNumber = 1,
  pageSize = 10,
  startDate?: string,
  endDate?: string,
  status?: string
) {
  const params: any = {
    pageNumber,
    pageSize,
  };

  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  if (status) params.status = status;

  return api.get("/Customer/get-sales", { params });
},


};
