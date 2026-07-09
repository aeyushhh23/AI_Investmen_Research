import jsPDF from "jspdf";

const sanitizeFileName = (value) => (
    String(value || "Investment")
        .trim()
        .replace(/[<>:"/\\|?*]+/g, "")
        .replace(/\s+/g, "-")
);

const sanitizeText = (value) => (
    String(value ?? "--")
        .replace(/[^\x20-\x7E\n\r\t]/g, "")
        .replace(/\s+/g, " ")
        .trim() || "--"
);

const formatNumber = (value, digits = 2) => {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "--";
    }

    return number.toLocaleString("en-IN", {
        maximumFractionDigits: digits
    });
};

const formatCurrency = (value, currency = "USD") => {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "--";
    }

    return `${currency || "USD"} ${formatNumber(number)}`;
};

const addWrappedText = (pdf, text, x, y, options = {}) => {
    const {
        width = 170,
        lineHeight = 6,
        fontSize = 10,
        color = [51, 65, 85],
        fontStyle = "normal"
    } = options;

    pdf.setFont("helvetica", fontStyle);
    pdf.setFontSize(fontSize);
    pdf.setTextColor(...color);

    const lines = pdf.splitTextToSize(sanitizeText(text), width);
    pdf.text(lines, x, y);

    return y + (lines.length * lineHeight);
};

const addSectionTitle = (pdf, title, y) => {
    const nextY = y > 268 ? addPage(pdf) : y;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.setTextColor(15, 23, 42);
    pdf.text(title, 18, nextY);
    pdf.setDrawColor(219, 234, 254);
    pdf.line(18, nextY + 3, 192, nextY + 3);

    return nextY + 10;
};

const addPage = (pdf) => {
    pdf.addPage();
    pdf.setFillColor(248, 251, 255);
    pdf.rect(0, 0, 210, 297, "F");

    return 20;
};

const ensureSpace = (pdf, y, needed = 24) => (
    y + needed > 282 ? addPage(pdf) : y
);

const addKeyValue = (pdf, label, value, x, y, width = 82) => {
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(219, 234, 254);
    pdf.roundedRect(x, y, width, 20, 3, 3, "FD");

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(100, 116, 139);
    pdf.text(label, x + 4, y + 7);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(15, 23, 42);
    pdf.text(
        pdf.splitTextToSize(sanitizeText(value), width - 8),
        x + 4,
        y + 15
    );
};

const addList = (pdf, items, y) => {
    if (!items?.length) {
        return addWrappedText(pdf, "No information available.", 22, y);
    }

    let nextY = y;

    items.forEach((item) => {
        nextY = ensureSpace(pdf, nextY, 14);
        nextY = addWrappedText(pdf, `- ${item}`, 22, nextY, {
            width: 166,
            fontSize: 9.5,
            lineHeight: 5.5
        }) + 2;
    });

    return nextY;
};

const buildAnalysisPDF = (analysis, companyName) => {
    const pdf = new jsPDF("p", "mm", "a4");
    const company = analysis.company || {};
    const financials = analysis.financials || {};
    const scores = analysis.scores || {};
    const report = analysis.aiReport || {};
    const currency = financials.currency || company.currency || "USD";

    pdf.setFillColor(248, 251, 255);
    pdf.rect(0, 0, 210, 297, "F");

    pdf.setFillColor(37, 99, 235);
    pdf.rect(0, 0, 210, 34, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("AI Investment Report", 18, 15);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(new Date().toLocaleDateString("en-IN"), 18, 24);

    let y = 48;

    pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text(sanitizeText(company.companyName || companyName), 18, y);
    y += 7;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(71, 85, 105);
    pdf.text(
        sanitizeText(`${company.symbol || "--"} | ${company.exchange || "--"} | ${currency}`),
        18,
        y
    );

    y += 12;
    addKeyValue(pdf, "Current Price", formatCurrency(financials.currentPrice, currency), 18, y);
    addKeyValue(pdf, "Daily Change", `${formatNumber(financials.percentChange)}%`, 110, y);
    y += 25;
    addKeyValue(pdf, "Investment Score", `${formatNumber(scores.investmentScore, 0)}/100`, 18, y);
    addKeyValue(pdf, "Risk", scores.risk, 110, y);
    y += 30;

    y = addSectionTitle(pdf, "Company Snapshot", y);
    addKeyValue(pdf, "Industry", company.industry, 18, y);
    addKeyValue(pdf, "Country", company.country, 110, y);
    y += 25;
    addKeyValue(pdf, "Market Cap", formatNumber(company.marketCapitalization, 0), 18, y);
    addKeyValue(pdf, "IPO", company.ipo, 110, y);
    y += 30;

    y = addSectionTitle(pdf, "AI Investment Thesis", y);
    y = addWrappedText(pdf, report.summary, 18, y, { width: 174 }) + 5;

    y = addSectionTitle(pdf, "Valuation", y);
    y = addWrappedText(pdf, report.valuation, 18, y, { width: 174 }) + 5;

    y = addSectionTitle(pdf, "Potential Risks", y);
    y = addWrappedText(pdf, report.risks, 18, y, { width: 174 }) + 5;

    const swot = report.swot || {};
    const swotSections = [
        ["Strengths", swot.strengths],
        ["Weaknesses", swot.weaknesses],
        ["Opportunities", swot.opportunities],
        ["Threats", swot.threats]
    ];

    swotSections.forEach(([title, items]) => {
        y = addSectionTitle(pdf, title, y);
        y = addList(pdf, items, y) + 4;
    });

    if (analysis.news?.length) {
        y = addSectionTitle(pdf, "Latest Market News", y);

        analysis.news.slice(0, 6).forEach((article) => {
            y = ensureSpace(pdf, y, 18);
            y = addWrappedText(pdf, `- ${article.title}`, 22, y, {
                width: 166,
                fontSize: 9.5,
                fontStyle: "bold",
                color: [15, 23, 42]
            }) + 1;
            y = addWrappedText(pdf, article.source, 26, y, {
                width: 160,
                fontSize: 8,
                color: [100, 116, 139]
            }) + 3;
        });
    }

    return pdf;
};

export const downloadPDF = async ({
    analysis,
    companyName
}) => {
    if (!analysis) {
        throw new Error("Analysis data is not available for export.");
    }

    const pdf = buildAnalysisPDF(analysis, companyName);
    const name = companyName || analysis.company?.companyName;

    pdf.save(`${sanitizeFileName(name)}-Investment-Report.pdf`);
};
