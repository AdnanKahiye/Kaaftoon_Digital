"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { TaskService } from "@/lib/tast"; 
import toast from "react-hot-toast";

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

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: CreateTaskData;
  onClose: () => void;
  onSubmit: (data: CreateTaskData) => Promise<void>;
}

const emptyForm: CreateTaskData = {
  title: "",
  description: "",
  categoryId: "",
  typeId: "",
  assignedUserId: "",
  customerId: "",
  status: "Pending",
  priority: "Medium",
};

export default function CreateTaskModal({ open, mode, initialData, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<CreateTaskData>(emptyForm);
  const [categories, setCategories] = useState([]);
  const [taskTypes, setTaskTypes] = useState([]);
  const [customers, setCustomers] = useState<{ value: string; label: string }[]>([]);
  const [employees, setEmployees] = useState<{ value: string; label: string }[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadDropdownData();
      setForm(mode === "edit" && initialData ? { ...initialData } : emptyForm);
      setError("");
    }
  }, [mode, initialData, open]);

  const loadDropdownData = async () => {
    try {
      const [catRes, typeRes, custRes, empRes] = await Promise.all([
        TaskService.getAllCategoryTasks(),
        TaskService.getAllTaskTypes(),
        TaskService.GetAllCustomerServices(),
        TaskService.getAllUsers(), // Added this for Assignee/Employee
      ]);

      if (catRes.data.success) setCategories(catRes.data.data.data || []);
      if (typeRes.data.success) setTaskTypes(typeRes.data.data.data || []);
      
      // Map Customers
      if (custRes.data.success) {
        const formattedCustomers = (custRes.data.data || []).map((c: any) => ({
          value: c.id,
          label: c.serviceName, 
        }));
        setCustomers(formattedCustomers);
      }

      // Map Employees (Users) based on your JSON: { id, fullName }
      if (empRes.data.success) {
        const formattedEmployees = (empRes.data.data || []).map((u: any) => ({
          value: u.id,
          label: u.fullName,
        }));
        setEmployees(formattedEmployees);
      }
    } catch (err) {
      console.error("Error loading dropdowns", err);
    }
  };

  const updateField = (field: keyof CreateTaskData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const submit = async () => {
    if (!form.title.trim()) return setError("Title is required");
    if (!form.typeId) return setError("Task Type is required");
    if (!form.customerId) return setError("Customer is required");
    if (!form.assignedUserId) return setError("Assignee is required");

    setLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  // Find currently selected objects for the Select inputs
  const selectedCustomer = customers.find(c => c.value === form.customerId) || null;
  const selectedEmployee = employees.find(e => e.value === form.assignedUserId) || null;

  // Shared styles for the Select components
  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      borderRadius: '0.5rem',
      padding: '1px',
      borderColor: '#D1D5DB',
      boxShadow: 'none',
      '&:hover': { borderColor: '#6366F1' }
    })
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b dark:border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {mode === "add" ? "Create New Task" : "Edit Task"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[75vh] overflow-y-auto">
          
          {/* Title */}
          <div className="md:col-span-2 space-y-1.5">
            <Label className="text-sm font-semibold">Task Title *</Label>
            <Input
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Enter task title"
            />
          </div>

          {/* Customer (Select2) */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Customer *</Label>
            <Select
              options={customers}
              value={selectedCustomer}
              onChange={(opt) => updateField("customerId", opt?.value || "")}
              placeholder="Select Customer..."
              isSearchable
              styles={customSelectStyles}
            />
          </div>

          {/* Assignee / Employee (Select2) */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Assignee (Employee) *</Label>
            <Select
              options={employees}
              value={selectedEmployee}
              onChange={(opt) => updateField("assignedUserId", opt?.value || "")}
              placeholder="Select Employee..."
              isSearchable
              styles={customSelectStyles}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 space-y-1.5">
            <Label className="text-sm font-semibold">Description</Label>
            <textarea
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              rows={2}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Provide task details..."
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Category</Label>
            <select
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm outline-none"
              value={form.categoryId}
              onChange={(e) => updateField("categoryId", e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Task Type */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Task Type *</Label>
            <select
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm outline-none"
              value={form.typeId}
              onChange={(e) => updateField("typeId", e.target.value)}
            >
              <option value="">Select Type</option>
              {taskTypes.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>

          {/* Priority */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Priority</Label>
            <select
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm outline-none"
              value={form.priority}
              onChange={(e) => updateField("priority", e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Status</Label>
            <select
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm outline-none"
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {error && <p className="md:col-span-2 text-xs text-red-500 font-medium">{error}</p>}
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3 border-t dark:border-gray-800">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:underline">Cancel</button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Saving..." : mode === "add" ? "Create Task" : "Update Task"}
          </button>
        </div>
      </div>
    </div>
  );
}