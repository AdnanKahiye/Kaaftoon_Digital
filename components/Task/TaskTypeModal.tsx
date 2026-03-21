"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { TaskService } from "@/lib/tast"; // Import your service to fetch categories
import toast from "react-hot-toast";

export interface TaskTypeData {
  name: string;
  categoryId: string;
  defaultExpiryHours: number;
}

interface CategoryOption {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: TaskTypeData;
  onClose: () => void;
  onSubmit: (data: TaskTypeData) => Promise<void>;
}

const emptyForm: TaskTypeData = {
  name: "",
  categoryId: "",
  defaultExpiryHours: 0,
};

export default function TaskTypeModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<TaskTypeData>(emptyForm);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [fetchingCats, setFetchingCats] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // 1. Fetch Categories when modal opens
  useEffect(() => {
    if (open) {
      loadCategories();
      setForm(mode === "edit" && initialData ? { ...initialData } : emptyForm);
      setError("");
    }
  }, [mode, initialData, open]);

  async function loadCategories() {
    setFetchingCats(true);
    try {
      const res = await TaskService.getAllCategoryTasks();
      if (res.data.success) {
        // Adjust this path based on your JSON structure (res.data.data.data)
        setCategories(res.data.data.data || []);
      }
    } catch (err) {
      console.error("Failed to load categories", err);
    } finally {
      setFetchingCats(false);
    }
  }

  const updateField = (field: keyof TaskTypeData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const submit = async () => {
    if (!form.name.trim()) return setError("Name is required");
    if (!form.categoryId) return setError("Please select a category");

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
            {mode === "add" ? "New Task Type" : "Edit Task Type"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Name Field */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Task Type Name *</Label>
            <Input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g. Maintenance"
            />
          </div>

          {/* Category Dropdown (Passing the ID) */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Category *</Label>
            <select
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              value={form.categoryId}
              onChange={(e) => updateField("categoryId", e.target.value)}
              disabled={fetchingCats}
            >
              <option value="">{fetchingCats ? "Loading..." : "Select a category"}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Expiry Hours Field */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Default Expiry (Hours)</Label>
            <Input
              type="number"
              value={form.defaultExpiryHours}
              onChange={(e) => updateField("defaultExpiryHours", parseInt(e.target.value) || 0)}
            />
          </div>

          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
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