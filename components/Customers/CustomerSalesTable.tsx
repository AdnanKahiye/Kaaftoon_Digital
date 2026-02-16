"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import toast from "react-hot-toast";
import { CustomerService } from "@/lib/customers";
import InFilterModal from "@/components/common/DateFromToDateModal";

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

export default function CustomerSalesTable() {
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [services, setServices] = useState<ServiceItemDto[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDto | null>(null);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [discount, setDiscount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<{
    phoneNumber?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  useEffect(() => {
    loadCustomers();
  }, [page, filters]);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadCustomers() {
    try {
    const res = await CustomerService.getAllBySalesCustomer(
  page,
  pageSize,
  filters.phoneNumber,
  filters.startDate,
  filters.endDate
);


      if (res.data.success) {
        setCustomers(res.data.data?.data || []);
      }
    } catch {
      toast.error("Failed to load customers");
    }
  }

  async function loadServices() {
    try {
      const res = await CustomerService.getAllServicesItems();
      if (res.data.success) {
        setServices(res.data.data?.data || []);
      }
    } catch {
      toast.error("Failed to load services");
    }
  }

  function addService(service: ServiceItemDto) {
    const exists = selectedItems.find(i => i.serviceItemId === service.id);
    if (exists) return;

    setSelectedItems(prev => [
      ...prev,
      {
        serviceItemId: service.id,
        name: service.name,
        price: service.possiblePrice
      }
    ]);
  }

  const subTotal = selectedItems.reduce(
    (acc, item) => acc + item.price,
    0
  );

  const calculatedTotal = subTotal - discount;

  // AUTO UPDATE paidAmount marka discount ama services isbadalaan
  useEffect(() => {
    setPaidAmount(calculatedTotal > 0 ? calculatedTotal : 0);
  }, [discount, subTotal]);

  async function handleCreateSale() {
    if (!selectedCustomer) {
      toast.error("Select a customer first");
      return;
    }

    if (selectedItems.length === 0) {
      toast.error("Select at least one service");
      return;
    }

    const payload = {
      customerId: selectedCustomer.id,
      discount,
      paidAmount,
      status: "Pending",
      items: selectedItems.map(i => ({
        serviceItemId: i.serviceItemId,
        price: i.price,
        quantity: 1
      })),
    };

    try {
      const res = await CustomerService.createSales(payload);
      if (res.data.success) {
        toast.success("Sale created successfully");
        setSelectedItems([]);
        setDiscount(0);
        setPaidAmount(0);
      }
    } catch {
      toast.error("Failed to create sale");
    }
  }

  return (
    <div className="w-full rounded-lg bg-white">

      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-lg font-semibold">Customer Sales</h2>

    <button
  onClick={() => setFilterOpen(true)}
  className="flex items-center gap-2 px-4 py-2 
             bg-blue-600 text-white rounded-md 
             hover:bg-blue-700 transition duration-200 
             shadow-sm hover:shadow-md"
>
  🔍 Filter
</button>

      </div>

      {/* FILTER MODAL */}
      <InFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(f) => {
          setFilters({
            phoneNumber: f.phoneNumber,
            startDate: f.fromDate,
            endDate: f.toDate
          });
          setPage(1);
          setFilterOpen(false);
        }}
      />

      {/* CUSTOMER TABLE */}
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-xs uppercase">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Address</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Created At</th>

            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                onClick={() => setSelectedCustomer(c)}
                className={`cursor-pointer hover:bg-gray-50 
                  ${selectedCustomer?.id === c.id ? "bg-yellow-200" : ""}
                `}
              >
                <td className="px-4 py-3 text-sm font-medium">{c.fullName}</td>
                <td className="px-4 py-3 text-sm font-medium">{c.email}</td>
                <td className="px-4 py-3 text-sm font-medium">{c.phoneNumber}</td>
                <td className="px-4 py-3 text-sm font-medium">{c.type}</td>
                <td className="px-4 py-3 text-sm font-medium">{c.address}</td>
                <td className="px-4 py-3 text-sm">
  {new Date(c.createdAt).toISOString().split("T")[0]}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end gap-2 px-6 py-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
        >
          Prev
        </button>

        <span className="px-3 py-1 bg-blue-600 text-white rounded">
          {page}
        </span>

        <button
          onClick={() => setPage(prev => prev + 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
        >
          Next
        </button>
      </div>

      {/* SALES SECTION */}
      <div className="grid grid-cols-2 gap-6 px-6 py-2">

        {/* LEFT */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Select Service</h3>

          <Input placeholder="Search service" className="h-10 w-full mb-3" />

          <div className="max-h-72 overflow-y-auto bg-gray-100 rounded">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => addService(service)}
                className="px-4 py-3 hover:bg-gray-200 cursor-pointer px-4  text-sm font-medium"
              >
                {service.name} - {service.possiblePrice}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <h3 className="text-lg font-semibold">Service Details</h3>

          <div className="bg-green-700 text-white grid grid-cols-3 px-4 py-2 text-sm font-medium">
            <div>Name</div>
            <div>Price</div>
            <div>Total</div>
          </div>

          <div className="divide-y">
            {selectedItems.map((item) => (
              <div
                key={item.serviceItemId}
                className="grid grid-cols-3 px-4 text-sm"
              >
                <div>{item.name}</div>
                <div>{item.price}</div>
                <div>{item.price}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gray-100 p-4 rounded space-y-3">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>{subTotal}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Discount</span>
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-32"
              />
            </div>

            <div className="flex justify-between items-center">
              <span>Paid Amount</span>
              <Input
                type="number"
                value={paidAmount}
                onChange={(e) => setPaidAmount(Number(e.target.value))}
                className="w-32"
              />
            </div>

            <button
              onClick={handleCreateSale}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Sale
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
