using System;
using System.Collections.Generic;

namespace HestiaLink.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int? BillId { get; set; }

    public DateTime? PaymentDate { get; set; }

    public string? PaymentMethod { get; set; }

    public decimal? Amount { get; set; }

    public string? ReferenceNumber { get; set; }

    public string? PaymentStatus { get; set; }

    public int? ProcessedBy { get; set; }

    public virtual Bill? Bill { get; set; }

    public virtual ICollection<Income> Incomes { get; set; } = new List<Income>();
}
