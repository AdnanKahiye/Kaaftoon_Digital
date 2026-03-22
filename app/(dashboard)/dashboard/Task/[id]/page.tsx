"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TaskService } from "@/lib/tast";
import { 
  ArrowLeft, Calendar, User, Briefcase, Clock, 
  ChevronRight, Fingerprint, Layers, ShieldCheck 
} from "lucide-react"; 
import toast from "react-hot-toast";

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchTaskDetails();
  }, [id]);

  const fetchTaskDetails = async () => {
    try {
      const res = await TaskService.getTaskById(id as string);
      if (res.data.success) {
        setTask(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load task details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center animate-pulse">Loading full task details...</div>;
  if (!task) return <div className="p-10 text-center">Task not found.</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-medium transition-all"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        <div className="text-xs text-gray-400 font-mono bg-white px-3 py-1 rounded-md border">
          Internal ID: {task.id}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                {task.categoryName}
              </span>
              <ChevronRight size={14} className="text-gray-300" />
              <span className="text-gray-500 text-sm font-medium">{task.typeName} Task</span>
            </div>
            
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              {task.title}
            </h1>

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                <Layers size={16} /> Description
              </h3>
              <div className="prose prose-indigo max-w-none text-gray-600 bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200">
                {task.description || "No detailed description provided for this task."}
              </div>
            </div>
          </div>

          {/* Customer & Relation Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                <Briefcase size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Client / Customer</p>
                <p className="text-lg font-bold text-gray-900">{task.customerName}</p>
                <p className="text-xs text-gray-500 font-mono">{task.customerId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Meta Data & Stats */}
        <div className="space-y-6">
          
          {/* Status & Priority Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase">Current Status</label>
                <div className={`mt-1 w-full text-center py-2 rounded-lg font-bold border ${
                  task.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {task.status}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase">Priority Level</label>
                <div className="mt-1 flex items-center gap-2 font-bold text-gray-800">
                  <ShieldCheck size={18} className="text-indigo-500" />
                  {task.priority}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
              <Calendar size={14} /> Schedule & Time
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Start:</span>
                <span className="text-sm font-semibold">{new Date(task.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between items-center text-red-600 bg-red-50 p-2 rounded-lg">
                <span className="text-sm font-medium">Deadline:</span>
                <span className="text-sm font-bold">{new Date(task.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="pt-2 border-t flex justify-between items-center">
                <span className="text-sm text-gray-500">Allocated:</span>
                <span className="flex items-center gap-1 font-bold text-indigo-600">
                  <Clock size={14} /> {task.hours} Hours
                </span>
              </div>
            </div>
          </div>

          {/* People Involved */}
          <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
            <h3 className="text-[10px] font-bold opacity-60 uppercase mb-4 tracking-tighter">Stakeholders</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-indigo-700 rounded-full flex items-center justify-center font-bold border border-indigo-500">
                  {task.assignedUserName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-[10px] opacity-60 uppercase font-bold leading-none">Assignee</p>
                  <p className="text-sm font-bold">{task.assignedUserName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center font-bold border border-white/20">
                  {task.assignerUserName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-[10px] opacity-60 uppercase font-bold leading-none">Assigned By</p>
                  <p className="text-sm font-bold">{task.assignerUserName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Metadata */}
          <div className="p-4 bg-gray-100 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Fingerprint size={14} />
              <span className="text-[10px] font-bold uppercase">System Info</span>
            </div>
            <p className="text-[9px] text-gray-500 font-mono break-all leading-tight">
              Type ID: {task.typeId}<br/>
              Category ID: {task.categoryId}<br/>
              User ID: {task.assignedUserId}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}