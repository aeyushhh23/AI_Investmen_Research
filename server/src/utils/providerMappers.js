export const getUnixDateRange = (days = 30) => {
    const to = Math.floor(Date.now() / 1000);
    const from = to - (days * 24 * 60 * 60);

    return { from, to };
};

export const getIsoDateRange = (days = 30) => {
    const today = new Date();
    const from = new Date();
    from.setDate(today.getDate() - days);

    const format = (date) => date.toISOString().split("T")[0];

    return {
        from: format(from),
        to: format(today)
    };
};

export const toUnixSeconds = (value) => {
    if (!value) {
        return Math.floor(Date.now() / 1000);
    }

    const parsed = new Date(value).getTime();

    return Number.isFinite(parsed)
        ? Math.floor(parsed / 1000)
        : Math.floor(Date.now() / 1000);
};

export const mapDailyRowsToCandles = (rows) => {
    const sortedRows = [...rows].sort((a, b) => (
        toUnixSeconds(a.date || a.datetime) -
        toUnixSeconds(b.date || b.datetime)
    ));

    return {
        s: "ok",
        t: sortedRows.map((row) => toUnixSeconds(row.date || row.datetime)),
        o: sortedRows.map((row) => Number(row.open)),
        h: sortedRows.map((row) => Number(row.high)),
        l: sortedRows.map((row) => Number(row.low)),
        c: sortedRows.map((row) => Number(row.close)),
        v: sortedRows.map((row) => Number(row.volume || 0))
    };
};

export const mapNewsArticle = ({
    title,
    description,
    source,
    publishedAt,
    url,
    image
}) => ({
    headline: title,
    summary: description,
    source,
    datetime: toUnixSeconds(publishedAt),
    url,
    image
});
