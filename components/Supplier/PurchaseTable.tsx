"use client";

import React, { useEffect, useState } from "react";
import PurchaseFormModal from "./PurchaseFormModal";
import PurchaseDetailModal from "./PurchaseDetailModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal"; // Ensure path is correct
import { SupplierService } from "../../lib/suppliers";
import toast from "react-hot-toast";

export interface PurchaseDto {
  id: string;
  supplierId: string;
  supplierName: string;
  date: string;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  items: {
    itemName: string;
    quantity: number;
    price: number;
    total: number;
  }[];
}

export default function PurchaseTable() {
  const [purchases, setPurchases] = useState<PurchaseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Modal States
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  
  const [selectedPurchase, setSelectedPurchase] = useState<PurchaseDto | null>(null);

  useEffect(() => {
    loadPurchases();
  }, []);

  async function loadPurchases() {
    setLoading(true);
    try {
      const res = await SupplierService.getPurchases();
      const data = res.data?.data || [];
      setPurchases(data);
    } catch (err: any) {
      toast.error("Failed to load purchases");
    } finally {
      setLoading(false);
    }
  }

  async function confirmDelete() {
    if (!selectedPurchase) return;
    setDeleting(true);
    try {
      await SupplierService.deletePurchase(selectedPurchase.id);
      toast.success("Purchase deleted successfully");
      setOpenDelete(false);
      loadPurchases();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Purchases</h2>
            <p className="text-sm text-gray-500">Track inventory intake</p>
          </div>
          <button
            onClick={() => {
              setModalMode("add");
              setSelectedPurchase(null);
              setOpenModal(true);
            }}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-sm"
          >
            + New Purchase
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Supplier</th>
                <th className="px-6 py-4 text-right">Total</th>
                <th className="px-6 py-4 text-right">Balance</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr><td colSpan={5} className="py-10 text-center text-gray-400">Loading...</td></tr>
              ) : purchases.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{new Date(p.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{p.supplierName}</td>
                  <td className="px-6 py-4 text-right font-semibold">${p.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-red-600">${p.balance.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedPurchase(p);
                          setOpenDetail(true);
                        }}
                        className="text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded-md transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setModalMode("edit");
                          setSelectedPurchase(p);
                          setOpenModal(true);
                        }}
                        className="text-amber-600 hover:bg-amber-50 px-2 py-1 rounded-md transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPurchase(p);
                          setOpenDelete(true);
                        }}
                        className="text-red-600 hover:bg-red-50 px-2 py-1 rounded-md transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal (Add/Edit) */}
      <PurchaseFormModal 
        open={openModal}
        mode={modalMode}
        initialData={selectedPurchase ?? undefined}
        onClose={() => setOpenModal(false)} 
        onSuccess={() => { setOpenModal(false); loadPurchases(); }}
      />

      {/* Detail Modal */}
      {selectedPurchase && (
        <PurchaseDetailModal
          open={openDetail}
          purchase={selectedPurchase}
          onClose={() => setOpenDetail(false)}
        />
      )}

      {/* Delete Modal */}
      <ConfirmDeleteModal
        open={openDelete}
        loading={deleting}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}