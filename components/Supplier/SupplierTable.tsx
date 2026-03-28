"use client";

import React, { useEffect, useState } from "react";
import SupplierFormModal, { SupplierFormData } from "./SupplierFormModal";
import Input from "../form/input/InputField";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { SupplierService } from "../../lib/suppliers";
import toast from "react-hot-toast";

interface SupplierDto {
  id: string;
  name: string;
  phone: string;
  address: string;
  organistaion: string; // Matches your C# "Organistaion" property
}

export default function SupplierTable() {
  const [suppliers, setSuppliers] = useState<SupplierDto[]>([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierDto | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadSuppliers();
  }, []);

  async function loadSuppliers() {
    setLoading(true);
    try {
      const res = await SupplierService.getAllSuppliers();
      const responseData = res.data;

      // Map the nested data array from your JSON response
      if (responseData && Array.isArray(responseData.data)) {
        setSuppliers(responseData.data);
      } else if (Array.isArray(responseData)) {
        setSuppliers(responseData);
      } else {
        setSuppliers([]);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to fetch suppliers");
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(data: SupplierFormData) {
    try {
      if (mode === "add") {
        await SupplierService.createSupplier(data);
        toast.success("Supplier created successfully");
      } else {
        if (!selectedSupplier?.id) return;
        await SupplierService.updateSupplier(selectedSupplier.id, data);
        toast.success("Supplier updated successfully");
      }

      setOpenModal(false);
      loadSuppliers(); // Refresh the list
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Operation failed");
    }
  }

  async function confirmDelete() {
    if (!selectedSupplier) return;

    try {
      setDeleting(true);
      await SupplierService.deleteSupplier(selectedSupplier.id);
      
      toast.success("Supplier deleted successfully");
      setOpenDelete(false);
      loadSuppliers(); // Refresh the list
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  const filteredSuppliers = Array.isArray(suppliers)
    ? suppliers.filter((s) =>
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.organistaion?.toLowerCase().includes(search.toLowerCase()) ||
        s.phone?.toLowerCase().includes(search.toLowerCase()) ||
        s.address?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b bg-white">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Suppliers</h2>
            <p className="text-sm text-gray-500">Manage supplier records</p>
          </div>

          <button
            onClick={() => {
              setMode("add");
              setSelectedSupplier(null);
              setOpenModal(true);
            }}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-sm"
          >
            + Add New
          </button>
        </div>

        {/* SEARCH */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="w-80">
            <Input
              placeholder="Search suppliers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full text-sm"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Organisation</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Address</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    Loading suppliers...
                  </td>
                </tr>
              )}

              {!loading && filteredSuppliers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                    No suppliers found
                  </td>
                </tr>
              )}

              {!loading &&
                filteredSuppliers.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition text-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {s.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        {s.organistaion}
                      </span>
                    </td>
                    <td className="px-6 py-4">{s.phone}</td>
                    <td className="px-6 py-4">{s.address}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => {
                            setMode("edit");
                            setSelectedSupplier(s);
                            setOpenModal(true);
                          }}
                          className="px-3 py-1 rounded-lg text-indigo-600 hover:bg-indigo-50 transition font-medium"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setSelectedSupplier(s);
                            setOpenDelete(true);
                          }}
                          className="px-3 py-1 rounded-lg text-red-600 hover:bg-red-50 transition font-medium"
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

        {/* FOOTER */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <p className="text-sm text-gray-500">
            Showing {filteredSuppliers.length} of {suppliers.length} entries
          </p>
        </div>
      </div>

      <SupplierFormModal
        open={openModal}
        mode={mode}
        initialData={selectedSupplier ?? undefined}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDeleteModal
        open={openDelete}
        loading={deleting}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}