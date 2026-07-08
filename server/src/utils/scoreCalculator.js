export const calculateInvestmentScore = (financials) => {

    let score = 50;

    if (financials.percentChange > 5)
        score += 15;
    else if (financials.percentChange > 2)
        score += 10;
    else if (financials.percentChange > 0)
        score += 5;
    else
        score -= 5;

    if (financials.currentPrice > financials.previousClose)
        score += 10;

    if (financials.currentPrice >= financials.highPrice * 0.95)
        score += 10;

    if (score > 100)
        score = 100;

    if (score < 0)
        score = 0;

    return score;

};