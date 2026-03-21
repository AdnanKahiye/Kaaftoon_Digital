"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

// Matches your C# CreateCategoryTask { Name }
export interface CategoryTaskData {
  name: string;
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: CategoryTaskData;
  onClose: () => void;
  onSubmit: (data: CategoryTaskData) => Promise<void>;
}

const emptyForm: CategoryTaskData = {
  name: "",
};

export default function CategoryTaskModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<CategoryTaskData>(emptyForm);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(mode === "edit" && initialData ? { ...initialData } : emptyForm);
      setError("");
    }
  }, [mode, initialData, open]);

  const submit = async () => {
    if (!form.name.trim()) {
      setError("Category name is required");
      return;
    }

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b dark:border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {mode === "add" ? "New Category" : "Edit Category"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Category Name *</Label>
            <Input
              value={form.name}
              onChange={(e) => {
                setForm({ name: e.target.value });
                if (error) setError("");
              }}
              placeholder="Enter category name..."
              
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Saving..." : mode === "add" ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}