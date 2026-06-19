// Top world currencies with country flag emoji + display name.
// Flags are encoded via regional indicator symbols from the country code.
export type Currency = {
  code: string;
  name: string;
  country: string;
  flag: string;
  symbol: string;
};

const f = (cc: string) =>
  String.fromCodePoint(...[...cc.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)));

export const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar",          country: "US", flag: f("US"), symbol: "$" },
  { code: "EUR", name: "Euro",               country: "EU", flag: "🇪🇺",   symbol: "€" },
  { code: "GBP", name: "British Pound",      country: "GB", flag: f("GB"), symbol: "£" },
  { code: "JPY", name: "Japanese Yen",       country: "JP", flag: f("JP"), symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan",       country: "CN", flag: f("CN"), symbol: "¥" },
  { code: "AUD", name: "Australian Dollar",  country: "AU", flag: f("AU"), symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar",    country: "CA", flag: f("CA"), symbol: "C$" },
  { code: "CHF", name: "Swiss Franc",        country: "CH", flag: f("CH"), symbol: "Fr" },
  { code: "INR", name: "Indian Rupee",       country: "IN", flag: f("IN"), symbol: "₹" },
  { code: "AED", name: "UAE Dirham",         country: "AE", flag: f("AE"), symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal",        country: "SA", flag: f("SA"), symbol: "﷼" },
  { code: "SGD", name: "Singapore Dollar",   country: "SG", flag: f("SG"), symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar",   country: "HK", flag: f("HK"), symbol: "HK$" },
  { code: "NZD", name: "New Zealand Dollar", country: "NZ", flag: f("NZ"), symbol: "NZ$" },
  { code: "KRW", name: "South Korean Won",   country: "KR", flag: f("KR"), symbol: "₩" },
  { code: "MXN", name: "Mexican Peso",       country: "MX", flag: f("MX"), symbol: "$" },
  { code: "BRL", name: "Brazilian Real",     country: "BR", flag: f("BR"), symbol: "R$" },
  { code: "ZAR", name: "South African Rand", country: "ZA", flag: f("ZA"), symbol: "R" },
  { code: "TRY", name: "Turkish Lira",       country: "TR", flag: f("TR"), symbol: "₺" },
  { code: "RUB", name: "Russian Ruble",      country: "RU", flag: f("RU"), symbol: "₽" },
  { code: "SEK", name: "Swedish Krona",      country: "SE", flag: f("SE"), symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone",    country: "NO", flag: f("NO"), symbol: "kr" },
  { code: "DKK", name: "Danish Krone",       country: "DK", flag: f("DK"), symbol: "kr" },
  { code: "PLN", name: "Polish Zloty",       country: "PL", flag: f("PL"), symbol: "zł" },
  { code: "THB", name: "Thai Baht",          country: "TH", flag: f("TH"), symbol: "฿" },
  { code: "IDR", name: "Indonesian Rupiah",  country: "ID", flag: f("ID"), symbol: "Rp" },
  { code: "MYR", name: "Malaysian Ringgit",  country: "MY", flag: f("MY"), symbol: "RM" },
  { code: "PHP", name: "Philippine Peso",    country: "PH", flag: f("PH"), symbol: "₱" },
  { code: "VND", name: "Vietnamese Dong",    country: "VN", flag: f("VN"), symbol: "₫" },
  { code: "EGP", name: "Egyptian Pound",     country: "EG", flag: f("EG"), symbol: "£" },
  { code: "NGN", name: "Nigerian Naira",     country: "NG", flag: f("NG"), symbol: "₦" },
  { code: "KES", name: "Kenyan Shilling",    country: "KE", flag: f("KE"), symbol: "KSh" },
  { code: "PKR", name: "Pakistani Rupee",    country: "PK", flag: f("PK"), symbol: "₨" },
  { code: "BDT", name: "Bangladeshi Taka",   country: "BD", flag: f("BD"), symbol: "৳" },
  { code: "ARS", name: "Argentine Peso",     country: "AR", flag: f("AR"), symbol: "$" },
  { code: "CLP", name: "Chilean Peso",       country: "CL", flag: f("CL"), symbol: "$" },
  { code: "COP", name: "Colombian Peso",     country: "CO", flag: f("CO"), symbol: "$" },
  { code: "ILS", name: "Israeli Shekel",     country: "IL", flag: f("IL"), symbol: "₪" },
  { code: "CZK", name: "Czech Koruna",       country: "CZ", flag: f("CZ"), symbol: "Kč" },
  { code: "HUF", name: "Hungarian Forint",   country: "HU", flag: f("HU"), symbol: "Ft" },
];

export const POPULAR_CODES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "INR"];

export const CRYPTOS = [
  { code: "BTC",  id: "bitcoin",       name: "Bitcoin",      symbol: "₿",   icon: "🟠" },
  { code: "ETH",  id: "ethereum",      name: "Ethereum",     symbol: "Ξ",   icon: "💎" },
  { code: "USDT", id: "tether",        name: "Tether",       symbol: "₮",   icon: "💵" },
  { code: "BNB",  id: "binancecoin",   name: "BNB",          symbol: "BNB", icon: "🟡" },
  { code: "SOL",  id: "solana",        name: "Solana",       symbol: "◎",   icon: "🟣" },
  { code: "XRP",  id: "ripple",        name: "XRP",          symbol: "✕",   icon: "⚪" },
  { code: "ADA",  id: "cardano",       name: "Cardano",      symbol: "₳",   icon: "🔵" },
  { code: "DOGE", id: "dogecoin",      name: "Dogecoin",     symbol: "Ð",   icon: "🐕" },
  { code: "TRX",  id: "tron",          name: "TRON",         symbol: "TRX", icon: "🔴" },
  { code: "MATIC",id: "matic-network", name: "Polygon",      symbol: "M",   icon: "🟪" },
];

export const findCurrency = (code: string) =>
  CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
