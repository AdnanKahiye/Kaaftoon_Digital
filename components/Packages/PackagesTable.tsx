"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import PackageFormModal, {
  PackageFormData,
  PackageType,
} from "./PackagesFormModal";
import ConfirmDeleteModal from "../Users/ConfirmDeleteModal";
import { packageService } from "@/lib/packages";
import toast from "react-hot-toast";

/* =========================
   Types
========================= */
interface PackageDto {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  type: string;
  createdAt: string;
  createdBy: string | null;
}

/* =========================
   Helpers
========================= */
const normalizeType = (value: string): PackageType => {
  if (value === "Marketing" || value === "Software" || value === "Creative") {
    return value;
  }
  return "Marketing";
};

/* =========================
   Action Menu
========================= */
function ActionMenu({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-36 rounded-lg border bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
          <button
            type="button"
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="flex w-full gap-2 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            ✏️ Edit
          </button>

          <button
            type="button"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="flex w-full gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            🗑 Delete
          </button>
        </div>
      )}
    </div>
  );
}

/* =========================
   Package Table
========================= */
export default function PackageTable() {
  const [packages, setPackages] = useState<PackageDto[]>([]);
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedPackage, setSelectedPackage] =
    useState<PackageDto | null>(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD PACKAGES
  ========================= */
  useEffect(() => {
    loadPackages();
  }, []);

  async function loadPackages() {
    setLoading(true);
    try {
      const res = await packageService.getPackages();

      if (res.data.success) {
        setPackages(res.data.data);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Failed to load packages");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     ADD / UPDATE
  ========================= */
  async function handleSubmit(data: PackageFormData) {
    try {
      let res;

      if (mode === "add") {
        res = await packageService.createPackage(data);
      } else {
        if (!selectedPackage?.id) return;
        res = await packageService.updatePackage(selectedPackage.id, data);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setOpenModal(false);
        loadPackages();
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
    if (!selectedPackage) return;

    try {
      setDeleting(true);
      const res = await packageService.deletePackage(selectedPackage.id);

      if (res.data.success) {
        toast.success(res.data.message);
        setOpenDelete(false);
        loadPackages();
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
     FILTER
  ========================= */
  const filteredPackages = packages.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full rounded-xl bg-white px-6 pb-6 dark:bg-gray-900">
      <h2 className="mb-4 text-xl font-semibold">Packages</h2>

      {/* Top Actions */}
      <div className="mb-4 flex items-center justify-between">
        <Input
          placeholder="Search package..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          type="button"
          onClick={() => {
            setMode("add");
            setSelectedPackage(null);
            setOpenModal(true);
          }}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          + Add Package
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-left">Price</th>
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-left">Features</th>
              <th className="px-3 py-2 text-left">Created At</th>
              <th className="px-3 py-2 text-left">Created By</th>
              <th className="px-3 py-2 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && filteredPackages.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-gray-400">
                  No packages found
                </td>
              </tr>
            )}

            {filteredPackages.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-3 py-2 font-medium">{p.name}</td>
                <td className="px-3 py-2">{p.description}</td>
                <td className="px-3 py-2">${p.price}</td>
                <td className="px-3 py-2">
                  <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-700">
                    {p.type}
                  </span>
                </td>
                <td className="px-3 py-2">
                  {p.features.length ? p.features.join(", ") : "—"}
                </td>
                <td className="px-3 py-2">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-2">{p.createdBy ?? "System"}</td>
                <td className="px-3 py-2 text-right">
                  <ActionMenu
                    onEdit={() => {
                      setMode("edit");
                      setSelectedPackage(p);
                      setOpenModal(true);
                    }}
                    onDelete={() => {
                      setSelectedPackage(p);
                      setOpenDelete(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <PackageFormModal
        open={openModal}
        mode={mode}
        initialData={
          selectedPackage
            ? {
                name: selectedPackage.name,
                description: selectedPackage.description,
                price: selectedPackage.price,
                features: selectedPackage.features,
                type: normalizeType(selectedPackage.type),
              }
            : undefined
        }
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
