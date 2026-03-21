"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import CategoryTaskModal, { CategoryTaskData } from "./CreateCategoryTaskModel";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { TaskService } from "@/lib/tast"; // Ensure this matches your service file
import toast from "react-hot-toast";

interface CategoryTaskDto {
  id: string;
  name: string;
  createdBy: string;
  createdAt: string;
}

export default function CategoryTaskTable() {
  const [tasks, setTasks] = useState<CategoryTaskDto[]>([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedTask, setSelectedTask] = useState<CategoryTaskDto | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

 async function loadTasks() {
  setLoading(true);
  try {
    const res = await TaskService.getAllCategoryTasks();

    if (res.data.success) {
      // res.data is the whole response body
      // res.data.data is the object containing 'data' and 'totalCount'
      // res.data.data.data is the actual array of tasks
      const result = res.data.data;
      
      if (result && Array.isArray(result.data)) {
        setTasks(result.data); // Change from result.items to result.data
      } else {
        setTasks([]);
      }
    } else {
      toast.error(res.data.message || "Failed to load tasks");
      setTasks([]);
    }
  } catch (err: any) {
    console.error("Fetch error:", err);
    toast.error(err?.response?.data?.message || "Something went wrong");
    setTasks([]);
  } finally {
    setLoading(false);
  }
}

  async function handleSubmit(data: CategoryTaskData) {
    try {
      let res;
      if (mode === "add") {
        res = await TaskService.createCategoryTask(data);
      } else {
        if (!selectedTask?.id) return;
        res = await TaskService.updateCategoryTask(selectedTask.id, data);
      }

      if (res.data.success) {
        toast.success(res.data.message || "Operation successful");
        setOpenModal(false);
        loadTasks();
      } else {
        toast.error(res.data.message || "Operation failed");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }

  async function confirmDelete() {
    if (!selectedTask) return;
    try {
      setDeleting(true);
      const res = await TaskService.deleteCategoryTask(selectedTask.id);
      if (res.data.success) {
        toast.success(res.data.message || "Deleted successfully");
        setOpenDelete(false);
        loadTasks();
      } else {
        toast.error(res.data.message || "Delete failed");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  }

  const filteredTasks = tasks.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Category Tasks</h2>
            <p className="text-sm text-gray-500">Manage your task categories</p>
          </div>
          <button
            onClick={() => {
              setMode("add");
              setSelectedTask(null);
              setOpenModal(true);
            }}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            + Add Category
          </button>
        </div>

        {/* SEARCH */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="w-80">
            <Input
              placeholder="Search by name..."
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
                <th className="px-6 py-4 text-left">Category Name</th>
                <th className="px-6 py-4 text-left">Created At</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr><td colSpan={3} className="px-6 py-10 text-center text-gray-500">Loading...</td></tr>
              ) : filteredTasks.length === 0 ? (
                <tr><td colSpan={3} className="px-6 py-10 text-center text-gray-400">No categories found</td></tr>
              ) : (
                filteredTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{t.name}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => {
                            setMode("edit");
                            setSelectedTask(t);
                            setOpenModal(true);
                          }}
                          className="text-indigo-600 hover:underline font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTask(t);
                            setOpenDelete(true);
                          }}
                          className="text-red-600 hover:underline font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CategoryTaskModal
        open={openModal}
        mode={mode}
        initialData={selectedTask ? { name: selectedTask.name } : undefined}
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