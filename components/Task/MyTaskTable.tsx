"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { TaskService } from "@/lib/tast"; 
import toast from "react-hot-toast";
import Input from "@/components/form/input/InputField";
import UpdateStatusModal from "./UpdateStatusModal"; // New Modal

export default function MyTaskTable() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  
  // Modal States
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const loadMyTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await TaskService.getMyTasks();
      if (res.data.success) {
        setTasks(res.data.data || []);
      }
    } catch (err: any) {
      toast.error("Failed to load your tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && user) {
      loadMyTasks();
    }
  }, [user, authLoading, loadMyTasks]);

  const filtered = tasks.filter((t) =>
    t.title?.toLowerCase().includes(search.toLowerCase()) ||
    t.customerName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Assignments</h1>
            <p className="text-sm text-gray-500 font-medium">Progress tracking for {user?.email}</p>
          </div>
          <Input 
            placeholder="Search tasks..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="w-64"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[11px] uppercase font-bold text-gray-400 tracking-wider">
              <tr>
                <th className="px-6 py-4">Task Detail</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Hours</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="py-20 text-center text-gray-400">Loading...</td></tr>
              ) : filtered.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{task.title}</div>
                    <div className="text-[10px] text-gray-400">{task.categoryName}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{task.customerName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase border ${
                      task.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-100' :
                      task.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                      'bg-indigo-50 text-indigo-700 border-indigo-100'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-mono font-bold text-gray-600">
                    {task.hours}h
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => { setSelectedTask(task); setOpenStatusModal(true); }}
                        className="px-3 py-1.5 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-md text-xs font-bold transition-all border border-amber-200"
                      >
                        Update Status
                      </button>
                      <button 
                        onClick={() => router.push(`/dashboard/Task/${task.id}`)}
                        className="px-3 py-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md text-xs font-bold transition-all border border-indigo-200"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* The Status Update Modal */}
      <UpdateStatusModal
        open={openStatusModal}
        task={selectedTask}
        onClose={() => setOpenStatusModal(false)}
        onSuccess={loadMyTasks}
      />
    </div>
  );
}