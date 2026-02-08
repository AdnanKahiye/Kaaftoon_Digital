"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/common/ui/button/Button";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Centered) */}
        <div className="relative p-5 border-b dark:border-gray-800">
          <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white">
            {mode === "add" ? "Add User" : "Edit User"}
          </h3>
          <button
            onClick={onClose}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Full Name" required error={errors.name}>
            <Input value={form.name} onChange={(e) => update("name", e.target.value)} />
          </Field>

          <Field label="Email" required error={errors.email}>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </Field>

          <Field label="Phone">
            <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </Field>

          <Field label="Role" required error={errors.role}>
            <select
              className="w-full rounded-md border px-3 py-2 dark:bg-gray-800"
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
            >
              <option value="">Select role</option>
              <option>User</option>
              <option>Admin</option>
              <option>Manager</option>
            </select>
          </Field>

          <Field label="Gender">
            <select
              className="w-full rounded-md border px-3 py-2 dark:bg-gray-800"
              value={form.gender}
              onChange={(e) => update("gender", e.target.value)}
            >
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </Field>

          <Field label="Password">
            <Input
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
            />
          </Field>

          <Field label="Confirm Password">
            <Input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
            />
          </Field>
        </div>

        {/* Footer */}
        <div className="p-5 border-t dark:border-gray-800 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={loading}>
            {loading ? "Saving..." : mode === "add" ? "Create" : "Update"}
          </Button>
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
      <Label>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
