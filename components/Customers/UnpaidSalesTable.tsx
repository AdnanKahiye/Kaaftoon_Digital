"use client";

import React, { useEffect, useState } from "react";
import { CustomerService } from "@/lib/customers";
import toast from "react-hot-toast";
import SalesFilterModal from "../common/SalesFilterModal";
import PaymentModal from "./PaymentModal";

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

export default function SalesUnpaidTable() {
  const [sales, setSales] = useState<SaleDto[]>([]);
  const [loading, setLoading] = useState(false);

  const [paymentSale, setPaymentSale] = useState<SaleDto | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  useEffect(() => {
    loadSales();
  }, [filters, pageNumber]);

  async function loadSales() {
    setLoading(true);
    try {
      const res = await CustomerService.getAUnpaidSales(
        pageNumber,
        pageSize,
        filters.startDate,
        filters.endDate,
        "Unpaid" 
      );

      if (res.data.success) {
        const data = res.data.data;
        const allSales = data?.data || [];

        // Frontend fallback filter haddii backend filter la waayo
        const unpaidOnly = allSales.filter(
          (s: SaleDto) => s.balance > 0
        );

        setSales(unpaidOnly);
        setTotalPages(Math.ceil(data.totalCount / pageSize));
      } else {
        toast.error("Failed to load unpaid sales");
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
          Unpaid Sales
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
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && sales.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                  No unpaid sales found
                </td>
              </tr>
            )}

            {!loading &&
              sales.map((sale) => (
                <tr key={sale.saleId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">
                    {sale.customerName}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    {sale.totalAmount}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    {sale.paidAmount}
                  </td>

                  <td className="px-4 py-3 text-sm font-medium text-red-600">
                    {sale.balance}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex rounded-full px-2.5 py-1 text-xs font-medium bg-yellow-100 text-yellow-700">
                      {sale.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setPaymentSale(sale)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Pay
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

      {/* PAYMENT MODAL */}
      {paymentSale && (
        <PaymentModal
          sale={paymentSale}
          onClose={() => setPaymentSale(null)}
          onSuccess={loadSales}
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
