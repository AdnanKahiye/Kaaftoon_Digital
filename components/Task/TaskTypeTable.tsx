"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import TaskTypeModal, { TaskTypeData } from "./TaskTypeModal"; 
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { TaskService } from "@/lib/tast"; 
import toast from "react-hot-toast";

interface TaskTypeDto {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  defaultExpiryHours: number;
  createdAt: string;
}

export default function TaskTypeTable() {
  const [taskTypes, setTaskTypes] = useState<TaskTypeDto[]>([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedTask, setSelectedTask] = useState<TaskTypeDto | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadTaskTypes();
  }, []);

  async function loadTaskTypes() {
    setLoading(true);
    try {
      const res = await TaskService.getAllTaskTypes(); // Points to /package/get-onlypackages
      if (res.data.success) {
        // Accessing res.data.data.data based on your JSON snippet
        const fetchedData = res.data.data?.data || [];
        setTaskTypes(fetchedData);
      }
    } catch (err: any) {
      toast.error("Failed to load task types");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(data: TaskTypeData) {
    try {
      let res;
      if (mode === "add") {
        res = await TaskService.createTaskType(data);
      } else {
        if (!selectedTask?.id) return;
        res = await TaskService.updateTaskType(selectedTask.id, data);
      }

      if (res.data.success) {
        toast.success(res.data.message || "Success");
        setOpenModal(false);
        loadTaskTypes();
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error saving data");
    }
  }

  async function confirmDelete() {
    if (!selectedTask) return;
    setDeleting(true);
    try {
      const res = await TaskService.deleteTaskType(selectedTask.id);
      if (res.data.success) {
        toast.success("Deleted successfully");
        setOpenDelete(false);
        loadTaskTypes();
      }
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  const filtered = taskTypes.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.categoryName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Task Types</h1>
            <p className="text-gray-500 text-sm">Manage items, categories, and expiry settings</p>
          </div>
          <button
            onClick={() => { setMode("add"); setSelectedTask(null); setOpenModal(true); }}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            + New Task Type
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b bg-gray-50/50">
          <Input 
            placeholder="Search by name or category..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="max-w-sm"
          />
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 border-b font-semibold">Task Name</th>
                <th className="px-6 py-4 border-b font-semibold">Category</th>
                <th className="px-6 py-4 border-b font-semibold">Expiry</th>
                <th className="px-6 py-4 border-b font-semibold">Date Created</th>
                <th className="px-6 py-4 border-b text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="py-20 text-center text-gray-400">Loading data...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-20 text-center text-gray-400">No task types found.</td></tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {item.categoryName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.defaultExpiryHours} hours</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => { setMode("edit"); setSelectedTask(item); setOpenModal(true); }}
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => { setSelectedTask(item); setOpenDelete(true); }}
                          className="text-red-600 hover:text-red-900 text-sm font-semibold"
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

      <TaskTypeModal
        open={openModal}
        mode={mode}
        initialData={selectedTask ? {
          name: selectedTask.name,
          categoryId: selectedTask.categoryId,
          defaultExpiryHours: selectedTask.defaultExpiryHours
        } : undefined}
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