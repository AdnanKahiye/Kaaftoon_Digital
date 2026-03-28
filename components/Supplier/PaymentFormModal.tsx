"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { SupplierService, CreatePaymentRequest } from "../../lib/suppliers";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentFormModal({ open, onClose, onSuccess }: Props) {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState<CreatePaymentRequest>({
    supplierId: "",
    amount: 0,
    note: "",
    purchaseId: ""
  });

  useEffect(() => {
    if (open) {
      loadSuppliers();
      setForm({ supplierId: "", amount: 0, note: "", purchaseId: "" });
    }
  }, [open]);

  // Load purchases when supplier changes to link payment
  useEffect(() => {
    if (form.supplierId) {
      loadSupplierPurchases(form.supplierId);
    }
  }, [form.supplierId]);

  async function loadSuppliers() {
    try {
      const res = await SupplierService.getAllSuppliers();
      setSuppliers(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to load suppliers");
    }
  }

  async function loadSupplierPurchases(id: string) {
    try {
      const res = await SupplierService.getPurchases({ searchTerm: id }); // Or a custom filter
      setPurchases(res.data?.data || []);
    } catch (err) {
      setPurchases([]);
    }
  }

  const submit = async () => {
    if (!form.supplierId || form.amount <= 0) {
      return toast.error("Please provide supplier and amount");
    }

    setLoading(true);
    try {
      await SupplierService.createPayment(form);
      toast.success("Payment successful");
      onSuccess();
    } catch (err) {
      toast.error("Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">Record Supplier Payment</h3>
          <button onClick={onClose} className="text-2xl text-gray-400 hover:text-gray-600">×</button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Supplier" required>
            <select
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
              value={form.supplierId}
              onChange={(e) => setForm({ ...form, supplierId: e.target.value, purchaseId: "" })}
            >
              <option value="">Select Supplier...</option>
              {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </Field>

          <Field label="Link to Purchase (Optional)">
            <select
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none disabled:opacity-50"
              disabled={!form.supplierId}
              value={form.purchaseId}
              onChange={(e) => setForm({ ...form, purchaseId: e.target.value })}
            >
              <option value="">General Payment (No Link)</option>
              {purchases.map((p) => (
                <option key={p.id} value={p.id}>
                  Ref: {p.id.slice(0, 8)} - Bal: ${p.balance}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Amount" required>
            <Input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
              placeholder="0.00"
            />
          </Field>

          <Field label="Note">
            <Input
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="e.g. Bank Transfer"
            />
          </Field>
        </div>

        <div className="p-6 border-t flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50">
          <button onClick={onClose} className="px-5 py-2.5 text-gray-600 dark:text-gray-400">Cancel</button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-8 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-emerald-400 transition font-medium"
          >
            {loading ? "Processing..." : "Confirm Payment"}
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