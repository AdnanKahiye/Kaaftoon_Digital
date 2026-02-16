"use client";

import React, { useEffect, useState } from "react";
import { CustomerService } from "@/lib/customers";
import toast from "react-hot-toast";
import SaleDetailModal from "./SaleDetailModal";
import SalesFilterModal from "../common/SalesFilterModal";

interface SaleItem {
  serviceItemId: string;
  serviceName: string;
  price: number;
  quantity: number;
  total: number;
}

interface SaleDto {
  saleId: string;
  customerName: string;
  subTotal: number;
  discount: number;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  status: string;
  createdAt: string;
  items: SaleItem[];
}

export default function SalesTable() {
  const [sales, setSales] = useState<SaleDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSale, setSelectedSale] = useState<SaleDto | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState<{
    startDate?: string;
    endDate?: string;
    status?: string;
  }>({});

  useEffect(() => {
    loadSales();
  }, [filters, pageNumber]);

  async function loadSales() {
    setLoading(true);
    try {
      const res = await CustomerService.getAllSales(
        pageNumber,
        pageSize,
        filters.startDate,
        filters.endDate,
        filters.status
      );

      if (res.data.success) {
        const data = res.data.data;
        setSales(data?.data || []);
        setTotalPages(Math.ceil(data.totalCount / pageSize));
      } else {
        toast.error("Failed to load sales");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white">

      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-lg font-semibold">
          Sales List
        </h2>

        <button
          onClick={() => setFilterOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Filter
        </button>
      </div>

      {/* TABLE */}
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase">
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">SubTotal</th>
              <th className="px-4 py-3 text-left">Discount</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Paid</th>
              <th className="px-4 py-3 text-left">Balance</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && sales.map((sale) => (
              <tr key={sale.saleId} className="hover:bg-gray-50">
                <td className="px-4 py-3">{sale.customerName}</td>
                <td className="px-4 py-3">{sale.subTotal}</td>
                <td className="px-4 py-3">{sale.discount}</td>
                <td className="px-4 py-3">{sale.totalAmount}</td>
                <td className="px-4 py-3">{sale.paidAmount}</td>
                <td className="px-4 py-3">{sale.balance}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      sale.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : sale.status === "Partial"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {sale.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => setSelectedSale(sale)}
                    className="rounded px-3 py-1 text-blue-600 hover:bg-blue-100"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    {/* PAGINATION */}
<div className="flex items-center justify-end gap-3 py-6 px-6">

  <button
    disabled={pageNumber === 1}
    onClick={() => setPageNumber((prev) => prev - 1)}
    className={`px-4 py-2 rounded-md text-sm font-medium transition
      ${pageNumber === 1
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
    `}
  >
    Prev
  </button>

  <button className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white">
    {pageNumber}
  </button>

  <button
    disabled={pageNumber >= totalPages}
    onClick={() => setPageNumber((prev) => prev + 1)}
    className={`px-4 py-2 rounded-md text-sm font-medium transition
      ${pageNumber >= totalPages
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
    `}
  >
    Next
  </button>

</div>


      {/* DETAIL MODAL */}
      {selectedSale && (
        <SaleDetailModal
          sale={selectedSale}
          onClose={() => setSelectedSale(null)}
        />
      )}

      {/* FILTER MODAL */}
      <SalesFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(f) => {
          setPageNumber(1);
          setFilters(f);
          setFilterOpen(false);
        }}
      />
    </div>
  );
}
