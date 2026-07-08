export const calculateNewsSentiment = (news) => {

    let score = 50;

    const positiveWords = [
        "growth",
        "profit",
        "record",
        "surge",
        "strong",
        "gain",
        "expands",
        "beats"
    ];

    const negativeWords = [
        "loss",
        "lawsuit",
        "decline",
        "recall",
        "fall",
        "drop",
        "weak",
        "bankruptcy"
    ];

    news.forEach(article => {

        const title = article.title.toLowerCase();

        positiveWords.forEach(word => {
            if(title.includes(word))
                score += 5;
        });

        negativeWords.forEach(word => {
            if(title.includes(word))
                score -= 5;
        });

    });

    if(score > 100)
        score = 100;

    if(score < 0)
        score = 0;

    return score;

};