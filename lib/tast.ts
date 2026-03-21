import api from "./api";

// Matches your C# CreateCategoryTask class
export interface CreateCategoryTaskRequest {
  id?: string;
  name: string;
}


export interface TaskTypeData {
  name: string;
  categoryId: string;
  defaultExpiryHours: number;
}

export interface CreateTaskData {
  id?: string;
  title: string;
  description: string;
  categoryId: string;
  typeId: string;
  assignedUserId: string;
  customerId: string;
  status: string;
  priority: string;
}


export const TaskService = {
  // Get all categories
  // Based on your previous JSON response, verify if the path is 
  // "/package/get-onlypackages" or "/category-task/get-all"
  getAllCategoryTasks() {
    return api.get("/Task/get-category-task");
  },

  // POST: create-category-task
  createCategoryTask(data: CreateCategoryTaskRequest) {
    return api.post("/Task/create-category-task", data);
  },

  // PUT: update-category-task/{id}
  updateCategoryTask(id: string, data: CreateCategoryTaskRequest) {
    return api.put(`/Task/update-category-task/${id}`, data);
  },

  // DELETE: delete-category-task/{id}
  deleteCategoryTask(id: string) {
    return api.delete(`/Task/delete-category-task/${id}`);
  },


    getAllTaskTypes() {
    return api.get("/Task/get-task-type");
  },


     getAllUsers() {
    return api.get("/User/Get-employee");
  },


    getAllTasks() {
    return api.get("/Task/get-task-item");
  },

      GetAllCustomerServices() {
    return api.get("/Customer/get-customer-service");
  },



    // POST: create-category-task
  createTaskType(data: TaskTypeData) {
    return api.post("/Task/create-task-type", data);
  },


      // POST: create-category-task
  createTask(data: CreateTaskData) {
    return api.post("/Task/create-task-item", data);
  },



    // PUT: update-category-task/{id}
  updateTaskType(id: string, data: TaskTypeData) {
    return api.put(`/Task/update-type-task/${id}`, data);
  },

// lib/tast.ts
// lib/tast.ts
updateTask(id: string, data: CreateTaskData) {
  // Use the exact name from your C# [HttpPut] attribute
  return api.put(`/Task/update-type-item/${id}`, data); 
},

    deleteTaskType(id: string) {
    return api.delete(`/Task/delete-task-type/${id}`);
  },


     deleteTask(id: string) {
    return api.delete(`/Task/delete-task-item/${id}`);
  },

};