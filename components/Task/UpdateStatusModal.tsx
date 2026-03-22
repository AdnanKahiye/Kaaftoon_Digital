"use client";

import React, { useState, useEffect } from "react";
import { TaskService } from "@/lib/tast";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  task: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UpdateStatusModal({ open, task, onClose, onSuccess }: Props) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) setStatus(task.status);
  }, [task]);

  if (!open) return null;

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await TaskService.updateTaskStatus(task.id, { status });
      if (res.data.success) {
        toast.success("Status updated successfully");
        onSuccess();
        onClose();
      }
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Update Status</h2>
        <p className="text-sm text-gray-500 mb-6">Updating: <span className="font-semibold text-gray-700">{task?.title}</span></p>

        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700">Current Progress</label>
          <div className="grid grid-cols-2 gap-3">
            {["Pending", "InProgress", "Completed", "Rejected"].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`py-3 px-4 rounded-xl border-2 text-xs font-black uppercase transition-all ${
                  status === s 
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700" 
                    : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading || status === task?.status}
            className="flex-1 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50 shadow-lg shadow-indigo-100 transition-all"
          >
            {loading ? "Updating..." : "Save Status"}
          </button>
        </div>
      </div>
    </div>
  );
}