"use client";

import React, { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { CustomerService } from "@/lib/customers";
import InFilterModal from "@/components/common/DateFromToDateModal";

// --- Interfaces ---
interface CustomerDto {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  type: string;
  createdAt: string;
}

interface ServiceItemDto {
  id: string;
  name: string;
  possiblePrice: number;
}

interface SelectedService extends ServiceItemDto {
  serviceItemId: string;
  quantity: number;
}

export default function CustomerSalesTable() {
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [services, setServices] = useState<ServiceItemDto[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDto | null>(null);
  const [selectedItems, setSelectedItems] = useState<SelectedService[]>([]);
  const [discount, setDiscount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [saleType, setSaleType] = useState<"Normal" | "Contract">("Normal");
  const [serviceSearch, setServiceSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<{ phoneNumber?: string; startDate?: string; endDate?: string }>({});

  useEffect(() => { loadCustomers(); }, [page, filters]);
  useEffect(() => { loadServices(); }, []);

  const filteredServices = useMemo(() => {
    return services.filter(s => s.name.toLowerCase().includes(serviceSearch.toLowerCase()));
  }, [services, serviceSearch]);

  async function loadCustomers() {
    try {
      const res = await CustomerService.getAllBySalesCustomer(page, pageSize, filters.phoneNumber, filters.startDate, filters.endDate);
      if (res.data.success) setCustomers(res.data.data?.data || []);
    } catch { toast.error("Failed to load customers"); }
  }

  async function loadServices() {
    try {
      const res = await CustomerService.getAllServicesItems();
      if (res.data.success) setServices(res.data.data?.data || []);
    } catch { toast.error("Failed to load services"); }
  }

  function addService(service: ServiceItemDto) {
    if (selectedItems.find((i) => i.serviceItemId === service.id)) return toast.error("Service already added");
    setSelectedItems((prev) => [...prev, { ...service, serviceItemId: service.id, quantity: 1 }]);
    toast.success(`${service.name} added`);
  }

  function updateQuantity(id: string, qty: number) {
    setSelectedItems(prev => prev.map(item => item.serviceItemId === id ? { ...item, quantity: Math.max(1, qty) } : item));
  }

  const subTotal = selectedItems.reduce((acc, item) => acc + (item.possiblePrice * item.quantity), 0);
  const calculatedTotal = subTotal - discount;
  const remainingBalance = calculatedTotal - paidAmount;

  // Sync paid amount when total changes for faster checkout
  useEffect(() => {
    setPaidAmount(calculatedTotal > 0 ? calculatedTotal : 0);
  }, [calculatedTotal]);

  async function handleCreateSale() {
    if (!selectedCustomer) return toast.error("Select a customer first");
    if (selectedItems.length === 0) return toast.error("Select at least one service");

    const payload = {
      customerId: selectedCustomer.id,
      discount,
      paidAmount,
      status: remainingBalance <= 0 ? "Paid" : "Partial",
      saleType,
      items: selectedItems.map((i) => ({
        serviceItemId: i.serviceItemId,
        price: i.possiblePrice,
        quantity: i.quantity,
        CompletedQuantity: saleType === "Normal" ? i.quantity : 0,
      })),
    };

    try {
      const res = await CustomerService.createSales(payload);
      if (res.data.success) {
        toast.success(`${saleType} sale processed!`);
        setSelectedItems([]);
        setDiscount(0);
        setSelectedCustomer(null);
      }
    } catch { toast.error("Failed to create sale"); }
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8 font-sans antialiased text-slate-900">
      
      {/* 1. TOP HEADER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">Sales Console</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Next-Gen POS Interface</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            {["Normal", "Contract"].map((type) => (
              <button
                key={type}
                onClick={() => setSaleType(type as any)}
                className={`px-6 py-2 rounded-lg text-[11px] font-black uppercase transition-all ${
                  saleType === type ? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/5" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {type} Sale
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <input 
            placeholder="Search phone..." 
            className="h-11 w-64 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none font-medium"
            onChange={(e) => setFilters({...filters, phoneNumber: e.target.value})}
          />
          <button onClick={() => setFilterOpen(true)} className="h-11 px-6 bg-indigo-600 text-white text-[11px] font-black uppercase rounded-xl hover:bg-indigo-700 transition-all">
            Filter Results
          </button>
        </div>
      </div>

      {/* 2. CUSTOMER LIST */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-8 overflow-hidden">
        <div className="bg-slate-50/50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 1: Select Client</h2>
          {selectedCustomer && (
            <span className="text-[10px] font-black text-indigo-500 uppercase">Currently Billing: {selectedCustomer.fullName}</span>
          )}
        </div>
        <table className="w-full text-sm">
          <thead className="bg-white text-[10px] font-black text-slate-400 uppercase border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Contact</th>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-left">Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {customers.map((c) => (
              <tr 
                key={c.id} 
                onClick={() => setSelectedCustomer(c)}
                className={`cursor-pointer transition-colors ${selectedCustomer?.id === c.id ? "bg-indigo-50/50" : "hover:bg-slate-50"}`}
              >
                <td className="px-6 py-4 font-bold text-slate-800">{c.fullName}</td>
                <td className="px-6 py-4 text-slate-500">{c.phoneNumber}</td>
                <td className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">{c.type}</td>
                <td className="px-6 py-4 text-slate-400 truncate max-w-xs">{c.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 3. CATALOG */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col h-[650px]">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Step 2: Service Catalog</h2>
            <input 
              type="text" 
              placeholder="Search services..." 
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 outline-none"
              value={serviceSearch}
              onChange={(e) => setServiceSearch(e.target.value)}
            />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {filteredServices.map((s) => (
              <div 
                key={s.id} 
                onClick={() => addService(s)}
                className="group p-4 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700">{s.name}</span>
                  <span className="text-[10px] font-bold text-slate-300 uppercase mt-0.5">Ref: {s.id.slice(0,6)}</span>
                </div>
                <span className="text-sm font-black text-indigo-600">${s.possiblePrice}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. REVIEW & FINALIZE (RHS) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col h-[650px]">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30 rounded-t-3xl">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 3: Review & Finalize</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
            {selectedItems.length > 0 ? (
              selectedItems.map((item) => (
                <div key={item.serviceItemId} className="p-5 bg-white border border-slate-100 rounded-2xl flex items-center shadow-sm">
                  <div className="flex-1">
                    <p className="text-sm font-black text-slate-800">{item.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">${item.possiblePrice} / UNIT</p>
                  </div>
                  
                  <div className="flex items-center gap-3 px-6 border-x border-slate-100 mx-6">
                    <span className="text-[10px] font-black text-slate-300 uppercase">Qty</span>
                    <input 
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.serviceItemId, parseInt(e.target.value) || 1)}
                      className="w-20 h-10 bg-slate-50 border border-slate-200 rounded-lg text-center font-black text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div className="text-right min-w-[100px]">
                    <p className="text-md font-black text-slate-900">${item.possiblePrice * item.quantity}</p>
                    <button 
                      onClick={() => setSelectedItems(prev => prev.filter(i => i.serviceItemId !== item.serviceItemId))}
                      className="text-[9px] font-black text-red-300 hover:text-red-500 uppercase tracking-tighter mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-300 italic">
                <p className="text-[11px] font-black uppercase tracking-widest opacity-40">Cart is empty</p>
              </div>
            )}
          </div>

          {/* CHECKOUT AREA */}
          <div className="p-8 bg-slate-900 rounded-b-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              
              {/* Left: Financial Summary */}
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase">
                  <span>Subtotal</span>
                  <span className="text-white">${subTotal}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase">
                  <span>Discount</span>
                  <input 
                    type="number" 
                    value={discount} 
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-24 h-8 bg-slate-800 border-none rounded-lg text-right text-indigo-400 font-black outline-none"
                  />
                </div>
                <div className="h-[1px] bg-slate-800"></div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Grand Total</span>
                  <span className="text-3xl font-black text-white">${calculatedTotal}</span>
                </div>
              </div>

              {/* Right: Payment Input */}
              <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700 flex flex-col justify-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                  Amount Paid Today
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                  <input 
                    type="number"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(Number(e.target.value))}
                    className="w-full h-12 pl-8 pr-4 bg-slate-900 border border-slate-700 rounded-xl text-xl font-black text-green-400 outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                  />
                </div>
                <div className="mt-3 flex justify-between items-center">
                   <span className="text-[9px] font-black text-slate-500 uppercase">Balance Due:</span>
                   <span className={`text-xs font-black ${remainingBalance > 0 ? 'text-orange-400' : 'text-slate-400'}`}>
                     ${remainingBalance > 0 ? remainingBalance : 0}
                   </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t border-slate-800 pt-6">
               <div className="flex-1">
                 <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Billing Account</p>
                 <p className="text-sm font-bold text-white truncate">{selectedCustomer?.fullName || "No Customer Selected"}</p>
               </div>
               <button
                onClick={handleCreateSale}
                disabled={!selectedCustomer || selectedItems.length === 0}
                className="px-10 py-4 bg-indigo-500 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-indigo-400 transition-all disabled:opacity-20 shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                Confirm Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <InFilterModal 
        open={filterOpen} 
        onClose={() => setFilterOpen(false)} 
        onApply={(f) => { 
          setFilters({ phoneNumber: f.phoneNumber, startDate: f.fromDate, endDate: f.toDate }); 
          setPage(1); 
          setFilterOpen(false); 
        }} 
      />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
}