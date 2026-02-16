"use client";

import React, { useEffect, useRef, useState } from "react";
import Input from "@/components/form/input/InputField";
import UserFormModal, { UserFormData } from "./UserFormModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { UsersService } from "@/lib/users";
import toast from "react-hot-toast";
import { 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Search, 
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Shield,
  Circle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Users
} from "lucide-react";

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
        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-all"
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div
          className={`absolute right-0 z-50 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900
          ${openUp ? "bottom-full mb-2" : "top-full mt-2"}`}
        >
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors"
          >
            <Edit2 size={14} />
            Edit User
          </button>
          <div className="h-px bg-gray-100 dark:bg-gray-800" />
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
          >
            <Trash2 size={14} />
            Delete User
          </button>
        </div>
      )}
    </div>
  );
}

/* =========================
   User Card (Mobile View)
========================= */
function UserCard({ user, onEdit, onDelete }: { 
  user: UserDto; 
  onEdit: () => void; 
  onDelete: () => void;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-semibold text-white shadow-md">
              {user.fullName.charAt(0)}
            </div>
            <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${user.isactive ? 'bg-green-500' : 'bg-red-500'} dark:border-gray-900`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{user.fullName}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">@{user.userName}</p>
          </div>
        </div>
        <ActionMenu
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Mail size={14} className="text-gray-400" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Phone size={14} className="text-gray-400" />
          <span>{user.phone || '-'}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <MapPin size={14} className="text-gray-400" />
          <span className="truncate">{user.address || '-'}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Shield size={14} className="text-gray-400" />
          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium
            ${user.role === 'Admin' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
              user.role === 'Manager' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 
              'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================
   User Table (Desktop View)
========================= */
export default function UserTable() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  
  /* =========================
     PAGINATION
  ========================= */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
        email: data.email,
        phone: data.phone,
        userName: data.email.split("@")[0],
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
     FILTER & PAGINATION
  ========================= */
  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.userName.toLowerCase().includes(search.toLowerCase());
    
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && u.isactive) || 
      (statusFilter === "inactive" && !u.isactive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter, statusFilter]);

  // Stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isactive).length;
  const adminUsers = users.filter(u => u.role === 'Admin').length;

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your team members and their account permissions here.
          </p>
        </div>
        <button
          onClick={() => {
            setMode("add");
            setSelectedUser(null);
            setOpenModal(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          <UserPlus size={18} />
          Add New User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
              <Circle className="h-5 w-5 fill-green-500 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeUsers}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Admins</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{adminUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by name, email or username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full pl-9 pr-4 text-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
            >
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-800/50">
                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">User</th>
                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Contact</th>
                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Address</th>
                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Role</th>
                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-5 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                        Loading users...
                      </div>
                    </td>
                  </tr>
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                      No users found
                    </td>
                  </tr>
                ) : (
                  currentItems.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">
                              {u.fullName.charAt(0)}
                            </div>
                            <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${u.isactive ? 'bg-green-500' : 'bg-red-500'} dark:border-gray-900`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{u.fullName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">@{u.userName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                            <Mail size={14} className="text-gray-400" />
                            <span>{u.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                            <Phone size={14} className="text-gray-400" />
                            <span>{u.phone || '-'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-gray-400" />
                          <span>{u.address || '-'}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium
                          ${u.role === 'Admin' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                            u.role === 'Manager' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1.5 text-sm">
                          <span className={`h-2 w-2 rounded-full ${u.isactive ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className={u.isactive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                            {u.isactive ? 'Active' : 'Inactive'}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <ActionMenu
                          openUp={currentItems.indexOf(u) > currentItems.length - 3}
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
          
          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium text-gray-900 dark:text-white">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium text-gray-900 dark:text-white">
                  {Math.min(indexOfLastItem, filteredUsers.length)}
                </span>{' '}
                of <span className="font-medium text-gray-900 dark:text-white">{filteredUsers.length}</span> users
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors
                      ${currentPage === i + 1 
                        ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700' 
                        : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
              Loading users...
            </div>
          </div>
        ) : currentItems.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">No users found</p>
          </div>
        ) : (
          currentItems.map((u) => (
            <UserCard
              key={u.id}
              user={u}
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
          ))
        )}
        
        {/* Mobile Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex items-center justify-between px-2 py-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
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