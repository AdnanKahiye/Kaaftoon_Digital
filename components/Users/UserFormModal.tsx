"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import toast from "react-hot-toast";

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  password: string;
  confirmPassword: string;
  userName: string; // User name extracted from email
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: UserFormData;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
}

const emptyForm: UserFormData = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  role: "",
  password: "",
  confirmPassword: "",
  userName: "", // UserName will be populated based on email
};

export default function UserFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<UserFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(
      mode === "edit" && initialData
        ? { ...initialData, password: "", confirmPassword: "" }
        : emptyForm
    );
    setErrors({});
  }, [mode, initialData, open]);

  useEffect(() => {
    // Automatically set the userName based on the email field
    if (form.email) {
      const userName = form.email.split("@")[0]; // Extract userName from email
      setForm((prev) => ({ ...prev, userName }));
    }
  }, [form.email]);

  const update = (k: keyof UserFormData, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.role) e.role = "Role is required";
    if (mode === "add") {
      if (!form.password) e.password = "Password is required";
      if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async () => {
    if (!validate() || loading) return;
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div
        className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Centered) */}
        <div className="relative p-6 border-b dark:border-gray-800">
          <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
            {mode === "add" ? "Add User" : "Edit User"}
          </h3>
          <button
            onClick={onClose}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Full Name" required error={errors.name}>
            <Input 
              value={form.name} 
              onChange={(e) => update("name", e.target.value)} 
              placeholder="Enter full name"
            />
          </Field>

          <Field label="Email" required error={errors.email}>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="Enter email address"
            />
          </Field>

          <Field label="Phone" error={errors.phone}>
            <Input 
              value={form.phone} 
              onChange={(e) => update("phone", e.target.value)} 
              placeholder="Enter phone number"
            />
          </Field>

          <Field label="Role" required error={errors.role}>
            <select
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
            >
              <option value="">Select role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </Field>

          <Field label="Gender">
            <select
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              value={form.gender}
              onChange={(e) => update("gender", e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </Field>

          <Field label="Password" required={mode === "add"} error={errors.password}>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder={mode === "add" ? "Enter password" : "Leave blank to keep current"}
            />
          </Field>

          <Field label="Confirm Password" required={mode === "add"} error={errors.confirmPassword}>
            <Input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              placeholder="Confirm password"
            />
          </Field>
          
          {/* Hidden field for userName - not shown to user */}
          <input type="hidden" value={form.userName} />
        </div>

        {/* Footer */}
        <div className="p-6 border-t dark:border-gray-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium shadow-lg shadow-blue-500/20"
          >
            {loading ? "Saving..." : mode === "add" ? "Create User" : "Update User"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small Helper ---------- */
function Field({
  label,
  children,
  error,
  required,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-red-600 mt-1.5">{error}</p>}
    </div>
  );
}