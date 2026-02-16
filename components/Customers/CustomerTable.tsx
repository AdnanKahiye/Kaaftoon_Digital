"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import CustomerFormModal, { CustomerFormData } from "./CustomerFormModal";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { CustomerService } from "@/lib/customers";
import toast from "react-hot-toast";

interface CustomerDto {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  type: string;
  gender: string;
}

export default function CustomerTable() {
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerDto | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /* =========================
     LOAD CUSTOMERS
  ========================= */
  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    setLoading(true);
    try {
      const res = await CustomerService.getAllCustomer();

      console.log("API RESPONSE:", res.data);

      if (res.data.success) {
        const data = res.data.data;

        if (Array.isArray(data)) {
          setCustomers(data);
        } else if (Array.isArray(data?.data)) {
          setCustomers(data.data);
        } else {
          setCustomers([]);
        }
      } else {
        toast.error(res.data.message || "Failed to load customers");
        setCustomers([]);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     ADD / UPDATE
  ========================= */
  async function handleSubmit(data: CustomerFormData) {
    try {
      let res;

      if (mode === "add") {
        res = await CustomerService.createCustomer(data);
      } else {
        if (!selectedCustomer?.id) return;
        res = await CustomerService.updateCustomer(
          selectedCustomer.id,
          data
        );
      }

      if (res.data.success) {
        toast.success(res.data.message || "Operation successful");
        setOpenModal(false);
        loadCustomers();
      } else {
        toast.error(res.data.message || "Operation failed");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }

  /* =========================
     DELETE
  ========================= */
  async function confirmDelete() {
    if (!selectedCustomer) return;

    try {
      setDeleting(true);
      const res = await CustomerService.deleteCustomer(selectedCustomer.id);

      if (res.data.success) {
        toast.success(res.data.message || "Customer deleted successfully");
        setOpenDelete(false);
        loadCustomers();
      } else {
        toast.error(res.data.message || "Delete failed");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  }

  /* =========================
     SAFE FILTER
  ========================= */
  const filteredCustomers = Array.isArray(customers)
    ? customers.filter((c) =>
        c.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase()) ||
        c.phoneNumber?.toLowerCase().includes(search.toLowerCase()) ||
        c.type?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Customers
        </h2>

        <button
          onClick={() => {
            setMode("add");
            setSelectedCustomer(null);
            setOpenModal(true);
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Add New
        </button>
      </div>

      {/* Search */}
      <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
        <div className="w-72">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Address
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && filteredCustomers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                  No customers found
                </td>
              </tr>
            )}

            {filteredCustomers.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3 text-sm font-medium">{c.fullName}</td>
                <td className="px-4 py-3 text-sm">{c.email}</td>
                <td className="px-4 py-3 text-sm">{c.phoneNumber}</td>
                <td className="px-4 py-3 text-sm">
                  <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {c.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{c.address}</td>

                <td className="px-4 py-3 text-center text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setMode("edit");
                        setSelectedCustomer(c);
                        setOpenModal(true);
                      }}
                      className="rounded px-2 py-1 text-blue-600 hover:bg-blue-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedCustomer(c);
                        setOpenDelete(true);
                      }}
                      className="rounded px-2 py-1 text-red-600 hover:bg-red-100"
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

      {/* Footer */}
      <div className="border-t border-gray-200 px-6 py-3 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Showing {filteredCustomers.length} of {customers.length} entries
        </p>
      </div>

      <CustomerFormModal
        open={openModal}
        mode={mode}
        initialData={selectedCustomer ?? undefined}
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
