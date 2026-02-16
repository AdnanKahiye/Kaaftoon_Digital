"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import ServicesFormModal, { ServiceFormData } from "./ServicesFormModal";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { CustomerService } from "@/lib/customers";
import toast from "react-hot-toast";

interface ServiceDto {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export default function ServicesTable() {
  const [services, setServices] = useState<ServiceDto[]>([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedService, setSelectedService] =
    useState<ServiceDto | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /* =========================
     LOAD SERVICES
  ========================= */
  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    setLoading(true);
    try {
      const res = await CustomerService.getAllServices();

      console.log("API RESPONSE:", res.data);

      if (res.data.success) {
        const data = res.data.data;

        if (Array.isArray(data)) {
          setServices(data);
        } else if (Array.isArray(data?.data)) {
          setServices(data.data);
        } else {
          setServices([]);
        }
      } else {
        toast.error(res.data.message || "Failed to load services");
        setServices([]);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
      setServices([]);
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     ADD / UPDATE
  ========================= */
  async function handleSubmit(data: ServiceFormData) {
    try {
      let res;

      if (mode === "add") {
        res = await CustomerService.createService(data);
      } else {
        if (!selectedService?.id) return;
        res = await CustomerService.updateService(
          selectedService.id,
          data
        );
      }

      if (res.data.success) {
        toast.success(res.data.message || "Operation successful");
        setOpenModal(false);
        loadServices();
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
    if (!selectedService) return;

    try {
      setDeleting(true);
      const res = await CustomerService.deleteService(selectedService.id);

      if (res.data.success) {
        toast.success(res.data.message || "Service deleted successfully");
        setOpenDelete(false);
        loadServices();
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
  const filteredServices = Array.isArray(services)
    ? services.filter((s) =>
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.description?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Services
        </h2>

        <button
          onClick={() => {
            setMode("add");
            setSelectedService(null);
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
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                CreateAt
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

            {!loading && filteredServices.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                  No services found
                </td>
              </tr>
            )}

            {filteredServices.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3 text-sm font-medium">{s.name}</td>
                <td className="px-4 py-3 text-sm">{s.description}</td>
<td className="px-4 py-3 text-sm">
  {new Date(s.createdAt).toISOString().split("T")[0]}
</td>

                <td className="px-4 py-3 text-center text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setMode("edit");
                        setSelectedService(s);
                        setOpenModal(true);
                      }}
                      className="rounded px-2 py-1 text-blue-600 hover:bg-blue-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedService(s);
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
          Showing {filteredServices.length} of {services.length} entries
        </p>
      </div>

      <ServicesFormModal
        open={openModal}
        mode={mode}
        initialData={selectedService ?? undefined}
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
