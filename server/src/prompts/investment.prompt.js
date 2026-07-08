export const buildInvestmentPrompt = (analysis) => `
You are a professional investment analyst.

Analyze this company.

Company:
${JSON.stringify(analysis.company)}

Financials:
${JSON.stringify(analysis.financials)}

News:
${JSON.stringify(analysis.news)}

Return ONLY valid JSON.

{
  "recommendation":"BUY | HOLD | SELL",
  "confidence":90,
  "summary":"",

  "strengths":[
    "",
    "",
    ""
  ],

  "weaknesses":[
    "",
    "",
    ""
  ],

  "opportunities":[
    "",
    "",
    ""
  ],

  "threats":[
    "",
    "",
    ""
  ]
}
`;