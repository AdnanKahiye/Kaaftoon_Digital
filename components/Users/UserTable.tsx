"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/common/ui/button/Button";
import Input from "@/components/form/input/InputField";
import UserFormModal, { UserFormData } from "./UserFormModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { UsersService } from "@/lib/users";
import toast from "react-hot-toast";

/* =========================
   Types
========================= */
interface UserDto {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  userName: string;
  role: string;
  gender: string;
  address: string;
  isactive: boolean;
}

/* =========================
   Action Menu
========================= */
function ActionMenu({
  openUp,
  onEdit,
  onDelete,
}: {
  openUp?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        ⋮
      </button>

      {open && (
        <div
          className={`absolute right-0 z-50 w-36 rounded-lg border bg-white shadow-lg
          dark:border-gray-700 dark:bg-gray-900
          ${openUp ? "bottom-full mb-2" : "top-full mt-2"}`}
        >
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="flex w-full gap-2 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            ✏️ Edit
          </button>

          <button
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
   User Table
========================= */
export default function UserTable() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD USERS
  ========================= */
  async function loadUsers() {
    setLoading(true);
    try {
      const res = await UsersService.getAll();
      setUsers(res.data.data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  /* =========================
     ADD / UPDATE
  ========================= */
  async function handleSubmit(data: UserFormData) {
    try {
      const formData = {
        fullName: data.name,
        email: data.email, // Use email entered by the user
        phone: data.phone,
        userName: data.email.split("@")[0], // Automatically set userName to be part of email
        gender: data.gender,
        role: data.role,
        password: data.password,
      };

      if (mode === "add") {
        await UsersService.create(formData);
        toast.success("User created successfully");
      } else {
        if (!selectedUser?.id) {
          toast.error("User ID missing");
          return;
        }

        await UsersService.update({
          UserId: selectedUser.id,
          ...formData,
        });

        toast.success("User updated successfully");
      }

      setOpenModal(false);
      loadUsers();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Operation failed");
    }
  }

  /* =========================
     DELETE
  ========================= */
  async function confirmDelete() {
    if (!selectedUser) return;

    try {
      setDeleting(true);
      await UsersService.delete(selectedUser.id);
      toast.success("User deleted successfully");
      setOpenDelete(false);
      loadUsers();
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setDeleting(false);
    }
  }

  /* =========================
     FILTER
  ========================= */
  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full rounded-xl bg-white px-6 pb-6 dark:bg-gray-900">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
        Users
      </h2>

      {/* Top Bar */}
      <div className="mb-4 flex items-center justify-between">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        <Button
          size="sm"
          onClick={() => {
            setMode("add");
            setSelectedUser(null);
            setOpenModal(true);
          }}
        >
          + Add User
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr className="text-left text-sm text-gray-600 dark:text-gray-300">
              <th className="px-3 py-3">User</th>
              <th className="px-3">Email</th>
              <th className="px-3">Phone</th>
              <th className="px-3">Address</th>
              <th className="px-3">Role</th>
              <th className="px-3">Status</th>
              <th className="px-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-sm">
                  Loading users...
                </td>
              </tr>
            ) : (
              filteredUsers.map((u, i) => (
                <tr
                  key={u.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  {/* USER */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                        {u.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {u.fullName}
                        </p>
                        <p className="text-xs text-gray-500">{u.userName}</p>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="px-3 text-sm text-gray-700 dark:text-gray-300">
                    {u.email}
                  </td>

                  {/* PHONE */}
                  <td className="px-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                    {u.phone || "-"}
                  </td>

                  {/* ADDRESS */}
                  <td className="px-3 text-sm text-gray-600 dark:text-gray-400">
                    {u.address || "-"}
                  </td>

                  {/* ROLE */}
                  <td className="px-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          u.role === "Admin"
                            ? "bg-red-100 text-red-700"
                            : u.role === "Manager"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium
                        ${u.isactive ? "text-green-600" : "text-red-600"}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${u.isactive ? "bg-green-500" : "bg-red-500"}`}
                      />
                      {u.isactive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-3 text-right">
                    <ActionMenu
                      openUp={i === filteredUsers.length - 1}
                      onEdit={() => {
                        setMode("edit");
                        setSelectedUser(u);
                        setOpenModal(true);
                      }}
                      onDelete={() => {
                        setSelectedUser(u);
                        setOpenDelete(true);
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT MODAL */}
      <UserFormModal
        open={openModal}
        mode={mode}
        initialData={
          selectedUser
            ? {
                name: selectedUser.fullName,
                email: selectedUser.email,
                phone: selectedUser.phone,
                userName: selectedUser.userName,
                role: selectedUser.role,
                gender: selectedUser.gender,
                password: "",
                confirmPassword: "",
              }
            : undefined
        }
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
      />

      {/* DELETE CONFIRM MODAL */}
      <ConfirmDeleteModal
        open={openDelete}
        loading={deleting}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
