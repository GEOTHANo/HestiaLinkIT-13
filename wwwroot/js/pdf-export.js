// PDF Export functionality using jsPDF
window.exportStockAlertsToPDF = function (data) {
    // Dynamically load jsPDF if not already loaded
    if (typeof window.jsPDF === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = function () {
            generatePDF(data);
        };
        document.head.appendChild(script);
    } else {
        generatePDF(data);
    }

    function generatePDF(data) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Title
        doc.setFontSize(18);
        doc.setTextColor(15, 118, 110); // Teal color
        doc.text('Inventory Stock Alerts Report', 14, 20);

        // Date
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Generated: ' + new Date().toLocaleDateString(), 14, 28);

        // Summary Section
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        let yPos = 40;
        doc.text('Summary', 14, yPos);
        yPos += 8;

        doc.setFontSize(10);
        doc.text(`Out of Stock: ${data.outOfStockCount}`, 20, yPos);
        yPos += 6;
        doc.text(`Low Stock: ${data.lowStockCount}`, 20, yPos);
        yPos += 6;
        doc.text(`Near Reorder: ${data.nearReorderCount}`, 20, yPos);
        yPos += 6;
        doc.text(`Well Stocked: ${data.wellStockedCount}`, 20, yPos);
        yPos += 6;
        doc.setFontSize(11);
        doc.setTextColor(15, 118, 110);
        doc.text(`Total Estimated Reorder Cost: ₱${data.totalReorderCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, yPos);
        yPos += 12;

        // Table Header
        doc.setFontSize(11);
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(15, 118, 110);
        doc.rect(14, yPos - 5, 182, 8, 'F');
        doc.text('Low Stock Items - Reorder Recommended', 14, yPos);

        yPos += 10;

        // Table Headers
        doc.setFontSize(9);
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(15, 118, 110);
        doc.rect(14, yPos - 5, 182, 6, 'F');
        doc.text('Code', 16, yPos);
        doc.text('Item Name', 40, yPos);
        doc.text('Category', 100, yPos);
        doc.text('Current', 130, yPos);
        doc.text('Reorder', 150, yPos);
        doc.text('Suggested', 170, yPos);
        doc.text('Est. Cost', 190, yPos);

        yPos += 8;

        // Table Data
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(8);
        data.items.forEach((item, index) => {
            if (yPos > 280) {
                doc.addPage();
                yPos = 20;
            }

            const orderQty = Math.max((item.reorderPoint || 0) * 2 - (item.currentStock || 0), 0);
            const estCost = orderQty * item.unitCost;

            // Alternate row colors
            if (index % 2 === 0) {
                doc.setFillColor(240, 253, 250);
                doc.rect(14, yPos - 4, 182, 6, 'F');
            }

            doc.text(item.itemCode || '', 16, yPos);
            doc.text((item.itemName || '').substring(0, 25), 40, yPos);
            doc.text((item.category || '').substring(0, 15), 100, yPos);
            doc.text((item.currentStock || 0).toString(), 130, yPos);
            doc.text((item.reorderPoint || 0).toString(), 150, yPos);
            doc.text(orderQty.toString(), 170, yPos);
            doc.text('₱' + estCost.toFixed(2), 190, yPos);

            yPos += 6;
        });

        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text(`Page ${i} of ${pageCount}`, 14, doc.internal.pageSize.height - 10);
            doc.text('HestiaLink Hospitality ERP System', 180, doc.internal.pageSize.height - 10);
        }

        // Save the PDF
        doc.save('Inventory_Stock_Alerts_' + new Date().toISOString().split('T')[0] + '.pdf');
    }
};

