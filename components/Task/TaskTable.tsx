"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import CreateTaskModal, { CreateTaskData } from "./CreateTaskModal"; 
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { TaskService } from "@/lib/tast"; 
import toast from "react-hot-toast";

interface TaskDto {
   id?: string;
// Made optional in case API doesn't return it
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  typeId: string;
  typeName: string;
  customerName: string;
  assignedUserId: string;
  assignedUserName: string;
  customerId: string;
  hours: number;
  startDate: string;
  endDate: string;
  status: string;
  priority: string;
}

export default function TaskTable() {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedTask, setSelectedTask] = useState<TaskDto | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    setLoading(true);
    try {
      const res = await TaskService.getAllTasks(); 
      if (res.data.success) {
        setTasks(res.data.data?.data || []);
      }
    } catch (err: any) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

 async function handleSaveTask(formData: CreateTaskData) {
  setProcessing(true);
  try {
    if (mode === "add") {
      const res = await TaskService.createTask(formData);
      if (res.data.success) {
        toast.success("Created successfully");
        setOpenModal(false);
        loadTasks();
      }
    } else {
      // 1. Try to find the ID from several possible property names
      const idToUpdate = selectedTask?.id || (selectedTask as any)?.taskId;

      if (!idToUpdate) {
        console.error("Task data received from API:", selectedTask); // Check this in F12 console
        toast.error("Cannot update: Task ID is missing from data");
        return;
      }

      const res = await TaskService.updateTask(idToUpdate, formData);
      if (res.data.success) {
        toast.success("Updated successfully");
        setOpenModal(false);
        loadTasks();
      }
    }
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Error saving task");
  } finally {
    setProcessing(false);
  }
}

  async function handleDeleteConfirm() {
    const idToDelete = selectedTask?.id || (selectedTask as any)?.typeId;
    if (!idToDelete) return;
    
    setProcessing(true);
    try {
      const res = await TaskService.deleteTask(idToDelete);
      if (res.data.success) {
        toast.success("Task deleted successfully");
        setOpenDelete(false);
        loadTasks();
      }
    } catch (err: any) {
      toast.error("Failed to delete task");
    } finally {
      setProcessing(false);
    }
  }

  const getPriorityColor = (priority: string) => {
    const p = priority?.toLowerCase();
    if (p === 'high') return 'bg-red-100 text-red-700';
    if (p === 'medium') return 'bg-yellow-100 text-yellow-700';
    return 'bg-blue-100 text-blue-700';
  };

  const filtered = tasks.filter((t) =>
    t.title?.toLowerCase().includes(search.toLowerCase()) ||
    t.assignedUserName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
            <p className="text-gray-500 text-sm">Create and track project tasks</p>
          </div>
          <button
            onClick={() => { setMode("add"); setSelectedTask(null); setOpenModal(true); }}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            + New Task
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b bg-gray-50/50">
          <Input 
            placeholder="Search tasks..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="max-w-md"
          />
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 border-b font-semibold">Task</th>
                <th className="px-6 py-4 border-b font-semibold">Assignee</th>
                <th className="px-6 py-4 border-b font-semibold">Timeline</th>
                <th className="px-6 py-4 border-b font-semibold">Priority</th>
                <th className="px-6 py-4 border-b text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="py-20 text-center text-gray-400">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-20 text-center text-gray-400">No tasks found</td></tr>
              ) : (
                filtered.map((task, index) => (
                  // Using index + task.title as a unique key since id might be missing
                  <tr key={task.id || `${task.title}-${index}`} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{task.title}</div>
                      <div className="text-xs text-gray-500">{task.categoryName}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{task.assignedUserName}</td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority || 'Normal'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => { setMode("edit"); setSelectedTask(task); setOpenModal(true); }}
                          className="text-indigo-600 hover:text-indigo-900 font-medium text-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => { setSelectedTask(task); setOpenDelete(true); }}
                          className="text-red-600 hover:text-red-900 font-medium text-sm"
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

      {/* Modal - Create/Edit */}
      <CreateTaskModal
        open={openModal}
        mode={mode}
        initialData={selectedTask ? {
            title: selectedTask.title,
            description: selectedTask.description,
            categoryId: selectedTask.categoryId,
            typeId: selectedTask.typeId,
            assignedUserId: selectedTask.assignedUserId,
            customerId: selectedTask.customerId,
            status: selectedTask.status,
            priority: selectedTask.priority
        } : undefined}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSaveTask}
      />

      {/* Modal - Confirm Delete */}
      <ConfirmDeleteModal
        open={openDelete}
        loading={processing}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}