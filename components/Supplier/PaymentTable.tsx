"use client";

import React, { useEffect, useState } from "react";
import PaymentFormModal from "./PaymentFormModal";
import { SupplierService } from "../../lib/suppliers";
import toast from "react-hot-toast";

export interface PaymentDto {
  id: string;
  supplierId: string;
  supplierName: string;
  purchaseId?: string;
  amount: number;
  note: string;
  createdAt: string;
}

export default function PaymentTable() {
  const [payments, setPayments] = useState<PaymentDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadPayments();
  }, []);

  async function loadPayments() {
    setLoading(true);
    try {
      const res = await SupplierService.getPayments();
      // Handling your standard { data: [], totalCount: x } response
      setPayments(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this payment?")) return;
    try {
      await SupplierService.deletePayment(id);
      toast.success("Payment deleted");
      loadPayments();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Payments</h2>
            <p className="text-sm text-gray-500">Supplier transaction history</p>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="px-5 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition shadow-sm"
          >
            + Record Payment
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Supplier</th>
                <th className="px-6 py-4 text-left">Note</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr><td colSpan={5} className="py-10 text-center">Loading...</td></tr>
              ) : payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium">{p.supplierName}</td>
                  <td className="px-6 py-4 text-gray-500">{p.note || "-"}</td>
                  <td className="px-6 py-4 text-right font-bold text-emerald-600">
                    ${p.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PaymentFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => {
          setOpenModal(false);
          loadPayments();
        }}
      />
    </div>
  );
}