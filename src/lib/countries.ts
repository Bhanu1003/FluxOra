// Shared country data used by the homepage Country Insights section
// and the dedicated /country/$code detail pages.

export type Country = {
  code: string;
  name: string;
  flag: string;
  currency: string;
  markets: string;
  // Short snippets used on the homepage card
  financial: string;
  latest: string;
  history: string;
  // Long-form content used on the dedicated detail page (1-2 pages)
  details: {
    overview: string;
    economy: string[];
    markets: string[];
    history: string[];
    watch: string[];
  };
};

export const COUNTRIES: Country[] = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    currency: "USD — US Dollar",
    markets: "NYSE, NASDAQ, CME",
    financial:
      "The world's deepest capital markets. The Federal Reserve sets the global benchmark for interest rates, and US Treasuries are the planet's primary reserve asset.",
    latest:
      "Markets watch the Federal Reserve's policy path, inflation data (CPI, PCE) and labour reports. The US Dollar Index (DXY) and 10-year Treasury yield remain the most-watched cross-asset signals.",
    history:
      "From the 1944 Bretton Woods agreement through the 1971 Nixon Shock, the 2008 financial crisis and the 2020 pandemic stimulus — US monetary decisions have shaped global finance for nearly a century.",
    details: {
      overview:
        "The United States is the largest economy in the world by nominal GDP and the issuer of the global reserve currency. Its capital markets, monetary policy and corporate sector influence almost every other market on the planet.",
      economy: [
        "GDP is roughly USD 27 trillion, driven by services, technology, finance, healthcare and consumer spending.",
        "The Federal Reserve (the Fed) is the central bank. It sets the federal funds rate and runs open-market operations that ripple into global borrowing costs.",
        "The US Dollar is involved in roughly 88% of all global FX transactions and forms the largest share of central-bank reserves.",
        "Inflation is tracked through the Consumer Price Index (CPI) and the Fed's preferred Personal Consumption Expenditures (PCE) measure.",
      ],
      markets: [
        "Equities trade primarily on the NYSE and NASDAQ. Headline benchmarks include the S&P 500, Dow Jones Industrial Average and NASDAQ Composite.",
        "Fixed income is anchored by US Treasuries, with the 10-year yield treated as a global risk-free reference.",
        "Derivatives and commodities trade on the CME Group, the world's largest futures exchange.",
        "Crypto trading is regulated by the SEC and CFTC, with major spot and ETF activity centred on US venues.",
      ],
      history: [
        "1944 — Bretton Woods agreement anchored major currencies to the US Dollar, which was convertible to gold.",
        "1971 — President Nixon ended dollar–gold convertibility, ushering in the modern free-floating FX era.",
        "2000 — The dot-com bubble peaked and then crashed, reshaping technology investing.",
        "2008 — The Global Financial Crisis triggered quantitative easing and rewrote the central-banking playbook.",
        "2020 — COVID-19 prompted unprecedented fiscal and monetary stimulus, followed by a multi-year inflation cycle.",
      ],
      watch: [
        "Federal Reserve FOMC meetings and the dot plot.",
        "CPI, PCE and Non-Farm Payrolls releases.",
        "10-year Treasury yield and the DXY (Dollar Index).",
        "Earnings seasons for mega-cap technology companies.",
      ],
    },
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    currency: "INR — Indian Rupee",
    markets: "NSE, BSE",
    financial:
      "One of the fastest-growing major economies. The Reserve Bank of India (RBI) manages monetary policy, while SEBI regulates the equity and derivatives markets.",
    latest:
      "Watch RBI repo-rate decisions, monsoon impact on inflation, the Nifty 50 and Sensex indices, and FII / DII flow data. The rupee is closely tied to crude oil prices and global risk sentiment.",
    history:
      "The 1991 balance-of-payments crisis triggered landmark liberalisation reforms. Demonetisation in 2016, GST in 2017 and the rise of UPI have reshaped the formal economy.",
    details: {
      overview:
        "India is the world's most populous country and one of its fastest-growing major economies. It blends a large domestic consumption base with a rapidly digitising financial system and an expanding services-export sector.",
      economy: [
        "Nominal GDP is around USD 3.7 trillion and growing at 6–7% annually.",
        "The Reserve Bank of India (RBI) targets 4% CPI inflation within a 2–6% band.",
        "Key sectors: IT services, pharmaceuticals, financial services, manufacturing and agriculture.",
        "Unified Payments Interface (UPI) processes more than 10 billion transactions a month, making India a global leader in digital payments.",
      ],
      markets: [
        "Equity benchmarks: Nifty 50 (NSE) and Sensex (BSE).",
        "SEBI regulates the securities market; discount brokers like Zerodha, Upstox, Angel One and Groww have driven retail participation past 150 million demat accounts.",
        "Government bonds (G-Secs) and the 10-year yield are the domestic risk-free reference.",
        "Crypto is taxed (30% on gains, 1% TDS) and regulated under the PMLA framework.",
      ],
      history: [
        "1991 — Balance-of-payments crisis and the 'New Economic Policy' opened India to foreign investment.",
        "1992 — SEBI was given statutory powers after the Harshad Mehta scam.",
        "2016 — Demonetisation withdrew ₹500 and ₹1000 notes from circulation.",
        "2017 — Goods and Services Tax (GST) unified the indirect-tax regime.",
        "2020s — UPI, Account Aggregator and ONDC built the 'India Stack' digital public infrastructure.",
      ],
      watch: [
        "RBI Monetary Policy Committee (MPC) decisions every two months.",
        "CPI inflation and Index of Industrial Production (IIP).",
        "Monsoon performance and crude oil prices (India imports ~85% of its oil).",
        "FII and DII daily flow data.",
      ],
    },
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP — Pound Sterling",
    markets: "LSE",
    financial:
      "London remains one of the world's top financial centres. The Bank of England targets 2% inflation, and the FTSE 100 is weighted towards commodities, energy and financials.",
    latest:
      "Sterling reacts to Bank of England rate decisions, UK CPI prints and post-Brexit trade developments. Gilts and the FTSE indices are the headline barometers.",
    history:
      "Sterling was the world reserve currency before the US Dollar took over after WWII. The 1992 'Black Wednesday' ERM crisis, the 2016 Brexit referendum and the 2022 mini-budget gilt crisis are defining modern moments.",
    details: {
      overview:
        "The United Kingdom is one of the oldest continuously operating financial centres in the world. London competes with New York for the title of global capital markets hub, particularly in FX trading and insurance.",
      economy: [
        "Nominal GDP is around USD 3.3 trillion, dominated by services (~80%).",
        "The Bank of England (BoE) targets 2% CPI inflation and sets the Bank Rate.",
        "London is the largest centre for global FX trading by volume.",
        "Post-Brexit the UK has built its own financial-services rulebook separate from the EU.",
      ],
      markets: [
        "The London Stock Exchange (LSE) hosts the FTSE 100 (large caps) and FTSE 250 (mid caps).",
        "Gilts are UK government bonds; the 10-year gilt yield is the domestic risk-free benchmark.",
        "The Financial Conduct Authority (FCA) regulates conduct; the Prudential Regulation Authority (PRA) regulates banks and insurers.",
      ],
      history: [
        "1694 — Bank of England founded, becoming one of the world's oldest central banks.",
        "1944 — Bretton Woods accelerated the handover of reserve-currency status from sterling to the US dollar.",
        "1992 — 'Black Wednesday' forced the pound out of the European Exchange Rate Mechanism.",
        "2016 — Brexit referendum vote triggered a sharp sterling devaluation.",
        "2022 — The Truss government's 'mini-budget' caused a gilt crisis and Bank of England intervention.",
      ],
      watch: [
        "Bank of England Monetary Policy Committee meetings.",
        "UK CPI and wage-growth data.",
        "Gilt yields, especially the 10-year and 30-year.",
        "FTSE 100 (global earners) vs FTSE 250 (domestic).",
      ],
    },
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    currency: "JPY — Japanese Yen",
    markets: "TSE (Tokyo Stock Exchange)",
    financial:
      "A major advanced economy. The Bank of Japan has long pursued ultra-loose monetary policy. The yen is a classic safe-haven funding currency for global carry trades.",
    latest:
      "Markets focus on BoJ yield-curve-control adjustments, intervention risk on USD/JPY, and Nikkei 225 performance which recently revisited multi-decade highs.",
    history:
      "The 1985 Plaza Accord triggered yen appreciation that fed the late-80s asset bubble. Its 1990 burst led to the 'Lost Decades' of deflation that shaped modern Japanese monetary thinking.",
    details: {
      overview:
        "Japan is a high-income, export-oriented economy known for advanced manufacturing, robotics and a globally distinctive monetary-policy stance. Its decisions on interest rates ripple through global carry trades.",
      economy: [
        "Nominal GDP is around USD 4.2 trillion.",
        "The Bank of Japan (BoJ) was the pioneer of quantitative easing, negative interest rates and yield-curve control.",
        "Long-running deflationary pressure shaped a generation of monetary experiments.",
        "Japan is one of the largest holders of US Treasuries.",
      ],
      markets: [
        "Equity benchmarks: Nikkei 225 and TOPIX on the Tokyo Stock Exchange.",
        "Japanese Government Bonds (JGBs) are the world's most heavily managed government-bond market.",
        "The yen is one of the most-traded currencies and a classic funding leg of carry trades.",
      ],
      history: [
        "1985 — Plaza Accord weakened the US dollar and sharply appreciated the yen.",
        "1989–1990 — The asset bubble peaked and then burst, with the Nikkei losing more than 80% of its value over the following decades.",
        "1999 — BoJ introduced zero interest-rate policy.",
        "2013 — 'Abenomics' launched aggressive monetary and fiscal stimulus.",
        "2024 — BoJ ended negative interest rates, its first hike in 17 years.",
      ],
      watch: [
        "BoJ policy meetings and yield-curve-control adjustments.",
        "USD/JPY and Ministry of Finance intervention rhetoric.",
        "Nikkei 225 and corporate-governance reforms.",
        "Japanese CPI and wage negotiations (shunto).",
      ],
    },
  },
  {
    code: "EU",
    name: "Eurozone",
    flag: "🇪🇺",
    currency: "EUR — Euro",
    markets: "Euronext, Deutsche Börse",
    financial:
      "20 countries share the single currency. The European Central Bank (ECB) sets policy for the bloc. Germany and France anchor the economy; DAX and CAC 40 are headline indices.",
    latest:
      "Traders track ECB rate decisions, eurozone HICP inflation, German Bund yields and PMI data. EUR/USD remains the world's most-traded currency pair.",
    history:
      "The euro launched as an accounting currency in 1999 and as physical notes in 2002. The 2010-2012 sovereign debt crisis tested the union and produced Draghi's 'whatever it takes' moment.",
    details: {
      overview:
        "The Eurozone is a monetary union of 20 EU countries sharing the euro. It is the second-largest economic area in the world and the second-most-traded reserve currency after the US Dollar.",
      economy: [
        "Combined nominal GDP is around USD 15 trillion.",
        "The European Central Bank (ECB) sets monetary policy from Frankfurt with a 2% inflation target.",
        "Germany, France, Italy and Spain together account for roughly three-quarters of eurozone GDP.",
        "EUR/USD is the most-traded currency pair in the world.",
      ],
      markets: [
        "Equity exchanges include Euronext (Paris, Amsterdam, Brussels, Lisbon, Dublin, Milan, Oslo) and Deutsche Börse (Frankfurt).",
        "Headline indices: Euro Stoxx 50, DAX 40 (Germany), CAC 40 (France), IBEX 35 (Spain).",
        "German Bunds are the eurozone's risk-free benchmark.",
      ],
      history: [
        "1999 — Euro introduced as an accounting currency.",
        "2002 — Euro banknotes and coins entered circulation.",
        "2010–2012 — Sovereign debt crisis affected Greece, Ireland, Portugal, Spain and Cyprus.",
        "2012 — ECB President Mario Draghi pledged to do 'whatever it takes' to save the euro.",
        "2022 — ECB began its first rate-hike cycle in over a decade in response to inflation.",
      ],
      watch: [
        "ECB Governing Council meetings.",
        "HICP inflation and PMI data.",
        "German Bund yields and Italian BTP spreads.",
        "EUR/USD exchange rate.",
      ],
    },
  },
  {
    code: "CN",
    name: "China",
    flag: "🇨🇳",
    currency: "CNY — Chinese Yuan / Renminbi",
    markets: "SSE (Shanghai), SZSE (Shenzhen), HKEX (Hong Kong)",
    financial:
      "The world's second-largest economy. The People's Bank of China (PBoC) manages a tightly controlled exchange rate. Capital controls and the onshore (CNY) vs offshore (CNH) split make the market unique.",
    latest:
      "Watch PBoC reserve-ratio and loan-prime-rate moves, property-sector developments, export data, and the CSI 300 and Hang Seng indices. Yuan reference-rate fixings are a daily signal of policy intent.",
    history:
      "China's 1978 'Reform and Opening Up' began its transformation into a manufacturing superpower. WTO accession in 2001 supercharged exports, and the 2015 yuan devaluation rattled global markets.",
    details: {
      overview:
        "China is the world's second-largest economy and largest manufacturer. Its policy decisions affect commodity prices, supply chains and emerging-market sentiment globally.",
      economy: [
        "Nominal GDP is around USD 17 trillion.",
        "The People's Bank of China (PBoC) uses reserve-requirement ratios, loan-prime rates and currency fixings as primary tools.",
        "China runs strict capital controls; the onshore yuan (CNY) and offshore yuan (CNH) trade in separate pools.",
        "China is the world's largest exporter and a top consumer of industrial commodities.",
      ],
      markets: [
        "Mainland exchanges: Shanghai (SSE) and Shenzhen (SZSE). Hong Kong Stock Exchange (HKEX) is the gateway for foreign capital via Stock Connect.",
        "Headline indices: CSI 300, Shanghai Composite, Hang Seng (Hong Kong).",
        "Crypto trading is banned on the mainland; mining was prohibited in 2021.",
      ],
      history: [
        "1978 — Deng Xiaoping launched 'Reform and Opening Up'.",
        "2001 — China joined the World Trade Organization.",
        "2008 — Massive infrastructure stimulus during the global financial crisis.",
        "2015 — Surprise yuan devaluation caused global market turbulence.",
        "2020s — Property-sector deleveraging and the 'common prosperity' policy reshape the economic model.",
      ],
      watch: [
        "PBoC daily yuan fixings and Loan Prime Rate.",
        "Manufacturing and services PMIs.",
        "Property-sector sales and developer health.",
        "CSI 300 and Hang Seng index moves.",
      ],
    },
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    currency: "EUR — Euro",
    markets: "Deutsche Börse (Frankfurt)",
    financial:
      "Europe's largest economy and the manufacturing heart of the eurozone. The DAX 40 tracks blue-chip industrials, autos and chemicals. Bund yields are the eurozone's risk-free benchmark.",
    latest:
      "Industrial-production data, IFO business-climate prints and ZEW sentiment surveys move European markets. Energy costs and Chinese demand are persistent themes.",
    history:
      "Post-war reconstruction (the Wirtschaftswunder), 1990 reunification and adoption of the euro in 1999 are the pillars of modern German economic identity.",
    details: {
      overview:
        "Germany is Europe's largest economy and the industrial backbone of the eurozone. It is known for high-end manufacturing, automotive engineering and a deep mid-cap (Mittelstand) base.",
      economy: [
        "Nominal GDP is around USD 4.4 trillion.",
        "Manufacturing makes up roughly 20% of GDP — one of the highest shares in any advanced economy.",
        "Germany is the largest exporter in the eurozone and the third-largest globally.",
        "The Bundesbank, while part of the ECB, retains significant historical influence on monetary thinking.",
      ],
      markets: [
        "Equity benchmarks: DAX 40 (large caps), MDAX (mid caps), SDAX (small caps).",
        "German Bunds are the eurozone's risk-free benchmark; the 10-year Bund yield is closely watched.",
        "Frankfurt is the seat of the ECB and a major banking centre.",
      ],
      history: [
        "1948 — Currency reform introduced the Deutsche Mark and triggered the Wirtschaftswunder ('economic miracle').",
        "1990 — Reunification of East and West Germany.",
        "1999 — Germany adopted the euro; Deutsche Mark phased out by 2002.",
        "2010s — Surplus-driven export model dominated eurozone trade dynamics.",
        "2022 — Russian gas cut-off triggered a major energy-policy rethink.",
      ],
      watch: [
        "IFO business-climate and ZEW sentiment surveys.",
        "Industrial production and factory orders.",
        "DAX 40 and the 10-year Bund yield.",
        "Energy and automotive-sector news.",
      ],
    },
  },
  {
    code: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    currency: "BRL — Brazilian Real",
    markets: "B3 (São Paulo)",
    financial:
      "Latin America's largest economy. The central bank (BCB) runs an inflation-targeting regime, often with the world's highest real interest rates. Highly commodity-sensitive.",
    latest:
      "Selic rate decisions, IPCA inflation, fiscal-framework news and Bovespa index moves drive sentiment. USD/BRL is a popular EM carry-trade currency.",
    history:
      "The 1994 Plano Real ended hyperinflation by introducing a new currency, and the 2014-2016 recession plus the Lava Jato corruption probe reshaped politics and markets.",
    details: {
      overview:
        "Brazil is Latin America's largest economy, with a diversified base in agriculture, mining, energy and financial services. It has long been a benchmark for emerging-market FX and rates trading.",
      economy: [
        "Nominal GDP is around USD 2.1 trillion.",
        "The Banco Central do Brasil (BCB) targets inflation via the Selic policy rate.",
        "Major exports include soybeans, iron ore, crude oil and beef.",
        "The economy is highly sensitive to global commodity cycles and Chinese demand.",
      ],
      markets: [
        "B3 (Brasil, Bolsa, Balcão) in São Paulo is the main exchange.",
        "Headline equity index: Ibovespa.",
        "Brazil pioneered EM local-currency bond markets; high real yields attract carry traders.",
      ],
      history: [
        "1994 — Plano Real introduced a new currency and ended hyperinflation.",
        "1999 — BRL was floated after a balance-of-payments shock.",
        "2014–2016 — Deep recession and the Lava Jato anti-corruption probe.",
        "2017 — Major labour and pension reforms passed.",
        "2020s — Fiscal framework debates continue to drive bond and currency moves.",
      ],
      watch: [
        "Selic rate decisions from the BCB Copom committee.",
        "IPCA monthly inflation prints.",
        "Fiscal-framework and budget news.",
        "Iron ore, soy and oil prices.",
      ],
    },
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    currency: "AED — UAE Dirham (pegged to USD)",
    markets: "DFM (Dubai), ADX (Abu Dhabi)",
    financial:
      "A regional financial hub with the dirham pegged to the US Dollar since 1997. Dubai is a global trade and tourism gateway; Abu Dhabi anchors sovereign-wealth firepower.",
    latest:
      "Oil-price moves, OPEC+ decisions and real-estate cycles in Dubai dominate the narrative. The UAE has emerged as a major crypto and fintech hub through ADGM and VARA regulation.",
    history:
      "The 1971 federation and the oil boom of the 1970s built modern UAE. The 2009 Dubai World debt scare and the 2020 Abraham Accords are defining recent moments.",
    details: {
      overview:
        "The UAE is a federation of seven emirates and one of the wealthiest economies per capita. It has aggressively diversified beyond oil into trade, tourism, real estate, aviation, finance and crypto.",
      economy: [
        "Nominal GDP is around USD 500 billion.",
        "AED has been pegged to the USD at 3.6725 since 1997.",
        "Dubai focuses on trade, logistics, tourism and finance; Abu Dhabi controls most of the oil and sovereign-wealth assets.",
        "ADIA (Abu Dhabi Investment Authority) is one of the world's largest sovereign-wealth funds.",
      ],
      markets: [
        "Equity exchanges: DFM (Dubai) and ADX (Abu Dhabi).",
        "ADGM and DIFC are major financial free zones with English common-law frameworks.",
        "VARA (Virtual Assets Regulatory Authority) regulates crypto in Dubai; the UAE is a leading global crypto hub.",
      ],
      history: [
        "1971 — UAE federation formed under Sheikh Zayed.",
        "1973 — Oil boom transformed the economy.",
        "1997 — Dirham pegged to the US Dollar.",
        "2009 — Dubai World debt restructuring sent shockwaves through EM credit.",
        "2020 — Abraham Accords normalised UAE–Israel ties and opened new investment flows.",
      ],
      watch: [
        "Brent oil prices and OPEC+ decisions.",
        "Dubai real-estate transaction data.",
        "DFM and ADX equity benchmarks.",
        "Federal banking and crypto regulation updates.",
      ],
    },
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    currency: "SGD — Singapore Dollar",
    markets: "SGX",
    financial:
      "A premier Asian financial centre. The Monetary Authority of Singapore (MAS) manages policy via the exchange rate — not interest rates — through a managed nominal effective rate band.",
    latest:
      "MAS semi-annual policy statements, non-oil domestic export data and Straits Times Index moves are key. Singapore is increasingly a regional hub for wealth management and digital assets.",
    history:
      "Independence in 1965 launched a remarkable transformation from entrepôt port to global financial hub, underpinned by strong institutions and an open-trade model.",
    details: {
      overview:
        "Singapore is a small but globally important financial centre. Its monetary framework — managing the exchange rate rather than interest rates — is unique among major economies.",
      economy: [
        "Nominal GDP is around USD 500 billion with one of the highest GDP-per-capita figures in the world.",
        "The Monetary Authority of Singapore (MAS) targets a trade-weighted nominal effective exchange rate (S$NEER) within a policy band.",
        "Singapore is a top global hub for wealth management, commodities trading and shipping.",
        "English common law, low taxes and political stability anchor the financial-services sector.",
      ],
      markets: [
        "The Singapore Exchange (SGX) is the main equity and derivatives venue.",
        "Headline equity index: Straits Times Index (STI).",
        "Singapore has emerged as a regulated digital-asset hub under the MAS Payment Services Act.",
      ],
      history: [
        "1965 — Independence from Malaysia.",
        "1970s–1980s — Economic Development Board attracted multinationals and built the manufacturing base.",
        "1981 — MAS introduced exchange-rate-based monetary policy.",
        "2000s — Singapore became a leading global wealth-management centre.",
        "2020s — Tightened crypto rules after several offshore exchange failures.",
      ],
      watch: [
        "MAS semi-annual policy statements (April and October).",
        "Non-oil domestic exports (NODX).",
        "Straits Times Index (STI).",
        "Property cooling measures.",
      ],
    },
  },
  {
    code: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
    currency: "ZAR — South African Rand",
    markets: "JSE (Johannesburg)",
    financial:
      "Africa's most developed capital market. The South African Reserve Bank (SARB) targets 3-6% inflation. The rand is a highly liquid EM currency often used as a proxy for global risk sentiment.",
    latest:
      "Watch SARB repo decisions, electricity load-shedding updates, gold and platinum prices, and the JSE All Share Index. USD/ZAR is one of the most volatile EM pairs.",
    history:
      "The 1994 democratic transition opened the economy globally. Commodity super-cycles and credit-rating downgrades in the late 2010s have shaped recent decades.",
    details: {
      overview:
        "South Africa has Africa's most sophisticated financial system, with a deep equity market, a liquid currency and an inflation-targeting central bank widely respected among emerging-market peers.",
      economy: [
        "Nominal GDP is around USD 400 billion.",
        "The South African Reserve Bank (SARB) targets 3–6% CPI inflation.",
        "Mining (gold, platinum, palladium, coal) remains a major export earner.",
        "Persistent electricity shortages ('load shedding') have weighed on growth.",
      ],
      markets: [
        "The Johannesburg Stock Exchange (JSE) is the largest exchange in Africa.",
        "Headline indices: JSE All Share (ALSI) and JSE Top 40.",
        "The rand is one of the most-traded EM currencies and acts as a global risk-sentiment proxy.",
      ],
      history: [
        "1994 — End of apartheid and democratic transition.",
        "2010 — South Africa joined the BRICS group.",
        "2017–2020 — Series of credit-rating downgrades to sub-investment grade by major agencies.",
        "2020s — Energy-sector reforms and renewable-energy build-out gathered pace.",
      ],
      watch: [
        "SARB Monetary Policy Committee decisions.",
        "CPI inflation and electricity-availability data.",
        "Gold, platinum and palladium prices.",
        "USD/ZAR and the JSE Top 40.",
      ],
    },
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    currency: "AUD — Australian Dollar",
    markets: "ASX",
    financial:
      "A commodity-linked economy with deep ties to Chinese demand for iron ore, coal and LNG. The Reserve Bank of Australia (RBA) sets the cash-rate target. The AUD is a classic 'risk-on' currency.",
    latest:
      "RBA decisions, quarterly CPI, China industrial data and iron-ore prices all move the Aussie dollar and the ASX 200.",
    history:
      "Floating the dollar in 1983 and a 28-year recession-free run (until 2020) defined the modern Australian economy.",
    details: {
      overview:
        "Australia is a wealthy, resource-rich economy with deep trade ties to Asia. Its currency, the Australian Dollar, is a global proxy for commodity demand and risk sentiment.",
      economy: [
        "Nominal GDP is around USD 1.7 trillion.",
        "The Reserve Bank of Australia (RBA) targets 2–3% inflation over the cycle.",
        "Iron ore, coal and LNG are the largest export earners; China is the top trading partner.",
        "Australia ran 28 consecutive years of GDP growth (1991–2019), one of the longest expansions in modern history.",
      ],
      markets: [
        "The Australian Securities Exchange (ASX) hosts the ASX 200 benchmark.",
        "Banks and mining giants (BHP, Rio Tinto, Fortescue) dominate market capitalisation.",
        "Australian Government Bonds (ACGBs) are the domestic risk-free reference.",
      ],
      history: [
        "1983 — The Australian Dollar was floated.",
        "1993 — RBA adopted formal inflation targeting.",
        "2008 — Strong fiscal stimulus helped Australia avoid recession during the GFC.",
        "2020 — First technical recession in nearly 30 years due to COVID-19.",
      ],
      watch: [
        "RBA cash-rate decisions and minutes.",
        "Quarterly CPI and labour-force data.",
        "Iron-ore and LNG prices.",
        "Chinese industrial-production data.",
      ],
    },
  },
];

export function getCountry(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code.toLowerCase() === code.toLowerCase());
}
