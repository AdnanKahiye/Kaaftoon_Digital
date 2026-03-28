"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { SupplierService } from "../../lib/suppliers";
import toast from "react-hot-toast";

/* ---------- Interfaces ---------- */

export interface PurchaseItem {
  itemName: string;
  quantity: number;
  price: number;
}

export interface PurchaseFormData {
  supplierId: string;
  date: string;
  items: PurchaseItem[];
}

// 1. UPDATED THIS INTERFACE TO MATCH YOUR TABLE CALL
interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: any; // You can use PurchaseDto here
  onClose: () => void;
  onSuccess: () => void;
}

const emptyForm: PurchaseFormData = {
  supplierId: "",
  date: new Date().toISOString().split("T")[0],
  items: [{ itemName: "", quantity: 1, price: 0 }],
};

export default function PurchaseFormModal({ open, mode, initialData, onClose, onSuccess }: Props) {
  const [form, setForm] = useState<PurchaseFormData>(emptyForm);
  const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // 2. LOGIC TO HANDLE EDIT MODE POPULATION
  useEffect(() => {
    if (open) {
      loadSuppliers();
      if (mode === "edit" && initialData) {
        setForm({
          supplierId: initialData.supplierId,
          date: new Date(initialData.date).toISOString().split("T")[0],
          items: initialData.items.map((item: any) => ({
            itemName: item.itemName,
            quantity: item.quantity,
            price: item.price,
          })),
        });
      } else {
        setForm(emptyForm);
      }
    }
  }, [open, mode, initialData]);

  async function loadSuppliers() {
    try {
      const res = await SupplierService.getAllSuppliers();
      const data = res.data?.data || res.data || [];
      setSuppliers(data);
    } catch (err) {
      toast.error("Failed to load suppliers");
    }
  }

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { itemName: "", quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    if (form.items.length > 1) {
      const newItems = form.items.filter((_, i) => i !== index);
      setForm((prev) => ({ ...prev, items: newItems }));
    }
  };

  const updateItem = (index: number, field: keyof PurchaseItem, value: any) => {
    const newItems = [...form.items];
    (newItems[index] as any)[field] = value;
    setForm((prev) => ({ ...prev, items: newItems }));
  };

  const submit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...form,
        date: new Date(form.date).toISOString(),
      };

      if (mode === "add") {
        await SupplierService.createPurchase(payload);
        toast.success("Purchase recorded!");
      } else {
        await SupplierService.updatePurchase(initialData.id, payload);
        toast.success("Purchase updated!");
      }
      onSuccess();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative p-6 border-b dark:border-gray-800">
          <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
            {mode === "add" ? "Create New Purchase" : "Edit Purchase"}
          </h3>
          <button onClick={onClose} className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400 hover:text-gray-600">×</button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Select Supplier" required>
              <select
                className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
                value={form.supplierId}
                onChange={(e) => setForm({ ...form, supplierId: e.target.value })}
              >
                <option value="">Choose a supplier...</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </Field>

            <Field label="Purchase Date" required>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Field>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-700">Items List</h4>
              <button type="button" onClick={addItem} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded">+ Add Item</button>
            </div>

            {form.items.map((item, index) => (
              <div key={index} className="flex gap-3 items-start bg-gray-50 p-3 rounded-xl">
                <div className="flex-[3]">
                  <Input placeholder="Item Name" value={item.itemName} onChange={(e) => updateItem(index, "itemName", e.target.value)} />
                </div>
                <div className="w-24">
                  <Input type="number" value={item.quantity} onChange={(e) => updateItem(index, "quantity", Number(e.target.value))} />
                </div>
                <div className="w-32">
                  <Input type="number" value={item.price} onChange={(e) => updateItem(index, "price", Number(e.target.value))} />
                </div>
                <button onClick={() => removeItem(index)} className="p-2 text-red-500">✕</button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 bg-gray-100 rounded-lg">Cancel</button>
          <button onClick={submit} disabled={loading} className="px-8 py-2.5 bg-indigo-600 text-white rounded-lg disabled:bg-indigo-400">
            {loading ? "Saving..." : mode === "add" ? "Save Purchase" : "Update Purchase"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="w-full">
      <Label className="block text-sm font-medium mb-1.5">{label} {required && "*"}</Label>
      {children}
    </div>
  );
}