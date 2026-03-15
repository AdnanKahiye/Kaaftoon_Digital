"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CustomerService } from "@/lib/customers"; 
import { 
  Loader2, Search, FileText, Wallet, Calendar, 
  PackageCheck, X, 
  History as HistoryIcon // 1. FIXED: Aliased to avoid naming conflict with browser 'History'
} from "lucide-react";
import Link from 'next/link';

// --- INTERFACES ---
interface ContractItemDto {
  serviceItemId: string;
  serviceName: string;
  quantity: number;
  completedQuantity: number;
  price: number;
  total: number;
}

interface ContractDto {
  saleId: string;
  customerName: string;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  status: string;
  createdAt: string;
  items: ContractItemDto[];
}

export default function ContractManagementTable() {
  const [contracts, setContracts] = useState<ContractDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // Modal State
  const [selectedItem, setSelectedItem] = useState<{ id: string; name: string } | null>(null);
  const [deliveryQty, setDeliveryQty] = useState<number>(1);
  const [remark, setRemark] = useState("waxaa la baxshey");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadContracts();
  }, []);

  async function loadContracts() {
    try {
      setLoading(true);
      const res = await CustomerService.getAllContracts(1, 10, search);
      if (res.data && res.data.success) {
        setContracts(res.data.data.data || []);
      }
    } catch (err) {
      toast.error("Failed to load contracts");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelivery() {
    if (!selectedItem) return;
    try {
      setIsSubmitting(true);
      const payload = {
        saleItemId: selectedItem.id,
        quantity: deliveryQty,
        remark: remark
      };
      const res = await CustomerService.addContractProgress(payload);
      if (res.data.success) {
        toast.success(`Delivered ${deliveryQty} units of ${selectedItem.name}`);
        setSelectedItem(null);
        setDeliveryQty(1);
        loadContracts();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Delivery failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  const filteredContracts = contracts.filter(c => 
    c.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] p-8 font-sans antialiased text-slate-900 relative">
      
      {/* DELIVERY MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-black uppercase text-xs tracking-widest text-slate-500">Log Service Delivery</h3>
              <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="mb-6 text-center">
                <p className="text-[10px] font-black uppercase text-indigo-600 mb-1">Service Item</p>
                <h2 className="text-xl font-black text-slate-800 uppercase">{selectedItem.name}</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Quantity to Deduct</label>
                  <input 
                    type="number"
                    value={deliveryQty}
                    onChange={(e) => setDeliveryQty(Number(e.target.value))}
                    className="w-full h-12 px-4 mt-1 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-indigo-500/10 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Remark</label>
                  <textarea 
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    className="w-full p-4 mt-1 bg-slate-50 border border-slate-200 rounded-xl font-medium text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none h-24 resize-none"
                  />
                </div>
              </div>

              <button 
                disabled={isSubmitting}
                onClick={handleDelivery}
                className="w-full mt-8 h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <PackageCheck className="w-5 h-5" />}
                Confirm Delivery
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" />
            Contract Manager
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Kafton Digital Solutions</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="Search customer..." 
              className="h-11 w-72 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={loadContracts} className="h-11 px-6 bg-slate-900 text-white text-[11px] font-black uppercase rounded-xl hover:bg-slate-800 transition-all shadow-sm">
            Refresh
          </button>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase border-b border-slate-200">
            <tr>
              <th className="px-6 py-5 text-left">Customer Details</th>
              <th className="px-6 py-5 text-left">Service Quota (Usage)</th>
              <th className="px-6 py-5 text-left">Financials</th>
              <th className="px-6 py-5 text-left">Status</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-20 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-500 mb-2" />
                  <p className="text-[10px] font-black uppercase text-slate-400">Syncing Data...</p>
                </td>
              </tr>
            ) : filteredContracts.map((contract) => (
              <tr key={contract.saleId} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-6 py-5">
                  <p className="font-bold text-slate-800 leading-tight">{contract.customerName}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase">Created: {new Date(contract.createdAt).toLocaleDateString()}</span>
                  </div>
                </td>

                <td className="px-6 py-5 min-w-[240px]">
                  {contract.items.map((item, idx) => {
                    const percentage = (item.completedQuantity / item.quantity) * 100;
                    return (
                      <div key={idx} className="mb-4 last:mb-0">
                        <div className="flex justify-between text-[10px] font-black uppercase mb-1.5">
                          <span className="text-slate-500">{item.serviceName}</span>
                          <span className={percentage >= 100 ? 'text-green-600' : 'text-indigo-600'}>
                            {item.completedQuantity} / {item.quantity}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-700 ${percentage >= 100 ? 'bg-green-500' : 'bg-indigo-600'}`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                          <button 
                            onClick={() => setSelectedItem({ id: item.serviceItemId, name: item.serviceName })}
                            className="p-1.5 bg-slate-50 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-md transition-all border border-slate-100"
                            title="Deliver Service"
                          >
                            <PackageCheck className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-sm font-black text-slate-800">${contract.totalAmount.toLocaleString()}</span>
                  </div>
                  <p className={`text-[10px] font-bold uppercase mt-1 ${contract.balance <= 0 ? 'text-green-500' : 'text-orange-500'}`}>
                    {contract.balance <= 0 ? 'Paid' : `$${contract.balance.toLocaleString()} Due`}
                  </p>
                </td>

                <td className="px-6 py-5 text-center">
                  <span className={`inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider
                    ${contract.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {contract.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-right">
                  {/* 2. FIXED: Added 'dashboard' prefix and ensured case-sensitivity matches your folder 'Contract' */}
                  <Link href={`/dashboard/Contract/history/${contract.saleId}`}>
                    <button className="bg-white border border-slate-200 hover:border-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 group">
                      <HistoryIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      History
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}