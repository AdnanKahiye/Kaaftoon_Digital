"use client";

import React from "react";
import { PurchaseDto } from "./PurchaseTable";

interface Props {
  open: boolean;
  purchase: PurchaseDto;
  onClose: () => void;
}

export default function PurchaseDetailModal({ open, purchase, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Purchase Details</h3>
            <p className="text-sm text-gray-500">ID: {purchase.id.slice(0, 8)}...</p>
          </div>
          <button onClick={onClose} className="text-2xl text-gray-400 hover:text-gray-600">×</button>
        </div>

        {/* Info Grid */}
        <div className="p-6 grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 border-b">
          <div>
            <p className="text-xs uppercase text-gray-400 font-bold">Supplier</p>
            <p className="font-semibold text-gray-800 dark:text-white">{purchase.supplierName}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-gray-400 font-bold">Date</p>
            <p className="font-semibold text-gray-800 dark:text-white">
              {new Date(purchase.date).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="p-6">
          <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Line Items</h4>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr className="text-left text-gray-500">
                  <th className="px-4 py-2">Item Name</th>
                  <th className="px-4 py-2 text-center">Qty</th>
                  <th className="px-4 py-2 text-right">Price</th>
                  <th className="px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {purchase.items.map((item, idx) => (
                  <tr key={idx} className="dark:text-gray-300">
                    <td className="px-4 py-3">{item.itemName}</td>
                    <td className="px-4 py-3 text-center">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">${item.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-medium">${item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="mt-6 space-y-2 border-t pt-4">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span className="font-semibold">${purchase.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Paid Amount</span>
              <span className="font-semibold">-${purchase.paidAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2 text-gray-900 dark:text-white">
              <span>Balance Due</span>
              <span className={purchase.balance > 0 ? "text-red-600" : "text-green-600"}>
                ${purchase.balance.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-800 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}