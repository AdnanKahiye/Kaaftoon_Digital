// lib/users.ts
import api from "./api";

export interface ContacRequestDto {
  fullName: string;
  email: string;
  message: string;
  to: string;
}

export const UtilityService = {

      createContactRequest(data: ContacRequestDto) {
    
    alert(JSON.stringify(data));
    return api.post("/Email/create-contact", data);
  },
 
};
