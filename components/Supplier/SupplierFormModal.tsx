"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

export interface SupplierFormData {
  name: string;
  phone: string;
  address: string;
  organistaion: string;
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: SupplierFormData;
  onClose: () => void;
  onSubmit: (data: SupplierFormData) => Promise<void>;
}

const emptyForm: SupplierFormData = {
  name: "",
  phone: "",
  address: "",
  organistaion: "",
};

export default function SupplierFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<SupplierFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof SupplierFormData, string>>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialData) {
        setForm({
          name: initialData.name ?? "",
          phone: initialData.phone ?? "",
          address: initialData.address ?? "",
          organistaion: initialData.organistaion ?? "",
        });
      } else {
        setForm(emptyForm);
      }
      setErrors({});
    }
  }, [mode, initialData, open]);

  const update = (key: keyof SupplierFormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const e: typeof errors = {};

    if (!form.name.trim()) e.name = "Supplier name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.organistaion.trim()) e.organistaion = "Organisation is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate() || loading) return;
    setLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b dark:border-gray-800">
          <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
            {mode === "add" ? "Add Supplier" : "Edit Supplier"}
          </h3>
          <button
            onClick={onClose}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Supplier Name" required error={errors.name}>
            <Input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Ahmed Muuse"
            />
          </Field>

          <Field label="Phone Number" required error={errors.phone}>
            <Input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="e.g. 88864780"
            />
          </Field>

          <Field label="Organisation" required error={errors.organistaion}>
            <Input
              value={form.organistaion}
              onChange={(e) => update("organistaion", e.target.value)}
              placeholder="e.g. Hirgal Business Solution"
            />
          </Field>

          <Field label="Address" required error={errors.address}>
            <Input
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="e.g. Hodan-KM4"
            />
          </Field>
        </div>

        {/* Footer */}
        <div className="p-6 border-t dark:border-gray-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {loading ? "Saving..." : mode === "add" ? "Create Supplier" : "Update Supplier"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Field Component ---------- */

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
    <div className="w-full">
      <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-red-600 mt-1.5">{error}</p>}
    </div>
  );
}