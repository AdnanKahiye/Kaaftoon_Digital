"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { CustomerService } from "@/lib/customers";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ContractHistoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const hasGenerated = useRef(false);

  const orangeRGB = [243, 146, 32]; // #F39220
  const creamRGB = [255, 236, 205];  // #FFECCD

  useEffect(() => {
    async function fetchAndDownload() {
      try {
        const res = await CustomerService.getContractById(id as string);
        if (res.data && res.data.success && !hasGenerated.current) {
          hasGenerated.current = true;
          await generatePDF(res.data.data);
          toast.success("Downloading report...");
          setTimeout(() => router.back(), 1200);
        } else if (!res.data?.success) {
          toast.error("Contract not found");
          router.back();
        }
      } catch (err) {
        toast.error("Error generating PDF");
        router.back();
      } finally {
        setLoading(false);
      }
    }
    fetchAndDownload();
  }, [id, router]);

  const loadImage = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = Math.min(1, 800 / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => reject("Could not load logo");
    });
  };

  const generatePDF = async (data: any) => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true, 
    });
    
    try {
      // 1. HEADER
      try {
        const logoBase64 = await loadImage("/Images/Kaafton-07.png"); 
        doc.addImage(logoBase64, "PNG", 14, 10, 35, 15, undefined, 'FAST'); 
      } catch (e) {
        console.warn("Logo missing");
      }

      doc.setFontSize(22);
      doc.setTextColor(orangeRGB[0], orangeRGB[1], orangeRGB[2]);
      doc.setFont("helvetica", "bold");
      doc.text("KAFTON TECHNOLOGY SOLUTIONS", 52, 18);
      
      doc.setFontSize(8.5);
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "normal");
      doc.text("Mogadishu, Somalia | info@kafton.digital | www.kaftontec.com | +252 61 234 5678", 52, 24);
      
      doc.setDrawColor(orangeRGB[0], orangeRGB[1], orangeRGB[2]);
      doc.setLineWidth(0.5);
      doc.line(14, 32, 196, 32);

      // 2. SUMMARY
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);
      doc.setFont("helvetica", "bold");
      doc.text("SERVICE DELIVERY REPORT", 14, 42);
      
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Customer: ${data.customerName}`, 14, 50);
      doc.text(`Contract ID: ${data.saleId}`, 14, 55);
      doc.text(`Total : $${data.totalAmount.toLocaleString()}`, 140, 50);
      
      const balanceColor = data.balance > 0 ? [220, 38, 38] : [22, 163, 74];
      doc.setTextColor(balanceColor[0], balanceColor[1], balanceColor[2]);
      doc.setFont("helvetica", "bold");
      doc.text(`Balance Due: $${data.balance.toLocaleString()}`, 140, 55);

      // 3. SERVICE ITEMS (With Total Delivery Calculation)
      let currentY = 70;

      data.items.forEach((item: any) => {
        const totalContractQty = item.remaining + item.completedQuantity;

        doc.setFillColor(creamRGB[0], creamRGB[1], creamRGB[2]);
        doc.rect(14, currentY - 5, 182, 10, 'F');
        
        doc.setFontSize(9);
        doc.setTextColor(orangeRGB[0], orangeRGB[1], orangeRGB[2]);
        doc.setFont("helvetica", "bold");
        doc.text(`${item.serviceName.toUpperCase()}`, 18, currentY + 1.5);

        // DELIVERED - REMAINING - TOTAL ALIGNMENT
        doc.setFontSize(7.5);
        doc.setTextColor(80, 80, 80);
        doc.setFont("helvetica", "bold");
        doc.text(`Delivered: ${item.completedQuantity}`, 95, currentY + 1.5);
        doc.text(`Remaining: ${item.remaining}`, 130, currentY + 1.5);
        doc.setTextColor(40, 40, 40);
        doc.text(`Total Qty: ${totalContractQty}`, 165, currentY + 1.5);
        
        autoTable(doc, {
          startY: currentY + 8,
          head: [['Date', 'Time', 'Quantity', 'Status']],
          body: item.history.map((log: any) => [
            new Date(log.date).toLocaleDateString(),
            new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            `+${log.quantityCompleted}`,
            'Completed'
          ]),
          headStyles: { fillColor: [243, 146, 32] }, 
          styles: { fontSize: 8, cellPadding: 2 },
          margin: { left: 14, right: 14 },
          theme: 'striped'
        });
        
        currentY = (doc as any).lastAutoTable.finalY + 18;

        if (currentY > 270) {
          doc.addPage();
          currentY = 20;
        }
      });

      // 4. FOOTER
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(160, 160, 160);
        doc.text(`Generated on ${new Date().toLocaleString()} | Page ${i} of ${pageCount}`, 14, 288);
      }

      doc.save(`Kafton_History_${data.customerName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) { 
      throw error; 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC]">
      <div className="p-10 bg-white rounded-[2.5rem] shadow-2xl flex flex-col items-center border border-orange-50">
        <Loader2 className="w-12 h-12 animate-spin text-[#F39220] mb-6" />
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">Generating Report</h2>
        <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">Please wait, download starting...</p>
      </div>
    </div>
  );
}