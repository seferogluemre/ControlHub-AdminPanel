import { faker } from "@faker-js/faker";
import { type ChatStatus, type Visitor } from "../../features/project-analytics/data/types";

// Turkish cities and locations
const turkishLocations = [
  { city: "İstanbul", country: "Turkey", code: "TR" },
  { city: "Ankara", country: "Turkey", code: "TR" },
  { city: "İzmir", country: "Turkey", code: "TR" },
  { city: "Bursa", country: "Turkey", code: "TR" },
  { city: "Antalya", country: "Turkey", code: "TR" },
  { city: "Adana", country: "Turkey", code: "TR" },
  { city: "Konya", country: "Turkey", code: "TR" },
  { city: "Gaziantep", country: "Turkey", code: "TR" },
  { city: "Mersin", country: "Turkey", code: "TR" },
  { city: "Diyarbakır", country: "Turkey", code: "TR" },
  { city: "Kayseri", country: "Turkey", code: "TR" },
  { city: "Eskişehir", country: "Turkey", code: "TR" },
];

// International locations
const internationalLocations = [
  { city: "London", country: "United Kingdom", code: "GB" },
  { city: "Berlin", country: "Germany", code: "DE" },
  { city: "Paris", country: "France", code: "FR" },
  { city: "Madrid", country: "Spain", code: "ES" },
  { city: "Rome", country: "Italy", code: "IT" },
  { city: "New York", country: "United States", code: "US" },
  { city: "Cairo", country: "Egypt", code: "EG" },
  { city: "Tokyo", country: "Japan", code: "JP" },
  { city: "Mumbai", country: "India", code: "IN" },
  { city: "Dubai", country: "United Arab Emirates", code: "AE" },
  { city: "Amsterdam", country: "Netherlands", code: "NL" },
  { city: "Stockholm", country: "Sweden", code: "SE" },
];

// Agent names (matching the agents page)
const agentNames = [
  "Hazal",
  "Tuğçe",
  "Mehmet",
  "Ayşe",
  "Ali",
  "Fatma",
  "Can",
  "Zeynep",
  "Asil",
  "Emrah",
  "Yarkı",
];

// Current pages (financial/stock market related)
const currentPages = [
  "BIST 100 Endeksi - Güncel Analiz",
  "ASELS Hisse Analizi - Teknik Göstergeler",
  "Hisse Senedi Portföy Analizi",
  "TCELL Güncel Fiyat Hareketleri",
  "Günlük Piyasa Özeti - BIST Endeksleri",
  "THYAO Finansal Tablolar ve Analiz",
  "Borsa İstanbul Canlı Veriler",
  "GARAN Hisse Senedi Değerlendirme",
  "Altın Fiyatları ve Değerli Madenler",
  "Forex Piyasası - TRY/USD Analizi",
  "BIST 30 Bankacılık Endeksi",
  "Yatırım Fonları Performans Analizi",
];

// Referred from sources (financial websites)
const referredSources = [
  "Google Finance",
  "Bloomberg Türkiye",
  "https://www.investing.com/indices/...",
  "https://www.bloomberg.com/markets/",
  "https://www.mynet.com/borsa/",
  "https://bigpara.hurriyet.com.tr/",
  "https://finans.mynet.com/",
  "https://tr.tradingview.com/",
  "Yahoo Finance",
  "Hürriyet Ekonomi",
  "Milliyet Ekonomi",
  "CNN Türk Ekonomi",
  "Haberler.com Borsa",
  "Direct",
];

// Turkish names for Turkish visitors
const turkishNames = {
  male: [
    "Ahmet",
    "Mehmet",
    "Mustafa",
    "Ali",
    "Hasan",
    "İbrahim",
    "Murat",
    "Emre",
    "Kemal",
    "Fatih",
    "Serkan",
    "Özkan",
    "Burak",
    "Erkan",
    "Cem",
    "Onur",
    "Barış",
    "Deniz",
    "Oğuz",
    "Kaan",
  ],
  female: [
    "Fatma",
    "Ayşe",
    "Emine",
    "Hatice",
    "Zeynep",
    "Elif",
    "Selin",
    "Merve",
    "Burcu",
    "Gizem",
    "Cansu",
    "Esra",
    "Deniz",
    "Özlem",
    "Pınar",
    "Sibel",
    "Tuğba",
    "Aysun",
    "Ebru",
    "Didem",
  ],
  surnames: [
    "Yılmaz",
    "Kaya",
    "Demir",
    "Şahin",
    "Çelik",
    "Yıldız",
    "Yıldırım",
    "Öztürk",
    "Aydın",
    "Özdemir",
    "Arslan",
    "Doğan",
    "Kılıç",
    "Aslan",
    "Çetin",
    "Kara",
    "Koç",
    "Kurt",
    "Özkan",
    "Şimşek",
  ],
};

// Generate realistic IP addresses
function generateIP(): string {
  return `${faker.number.int({ min: 1, max: 255 })}.${faker.number.int({ min: 1, max: 255 })}.${faker.number.int({ min: 1, max: 255 })}.${faker.number.int({ min: 1, max: 255 })}`;
}

// Generate realistic email
function generateEmail(name: string, location: any): string | undefined {
  if (faker.datatype.boolean({ probability: 0.7 })) {
    // 70% chance to have email
    const cleanName = name
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/\s+/g, "");

    const domains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
    if (location.code === "TR") {
      domains.push("hotmail.com.tr", "gmail.com.tr", "yandex.com.tr");
    }

    const domain = faker.helpers.arrayElement(domains);
    const randomNum = faker.number.int({ min: 1, max: 999 });

    return `${cleanName}${faker.datatype.boolean() ? randomNum : ""}@${domain}`;
  }
  return undefined;
}

// Generate realistic Turkish or international name
function generateName(location: any): string {
  if (location.code === "TR") {
    // Turkish names
    const isMale = faker.datatype.boolean();
    const firstName = isMale
      ? faker.helpers.arrayElement(turkishNames.male)
      : faker.helpers.arrayElement(turkishNames.female);
    const lastName = faker.helpers.arrayElement(turkishNames.surnames);
    return `${firstName} ${lastName}`;
  } else {
    // International names
    return faker.person.fullName();
  }
}

// Generate chat status based on activity
function generateChatStatus(isOnline: boolean, chats: number): ChatStatus {
  if (chats === 0) return "no_chat";

  if (!isOnline) {
    return faker.helpers.arrayElement(["chat_ended", "chatting_with_bot"]);
  }

  // Online users
  const statuses: ChatStatus[] = ["chatting", "chatting_with_bot", "chat_ended"];
  const weights = [0.4, 0.3, 0.3]; // 40% chatting, 30% with bot, 30% ended

  return faker.helpers.weightedArrayElement(
    statuses.map((status, index) => ({ weight: weights[index], value: status })),
  );
}

// Generate single visitor
function generateVisitor(): Visitor {
  // 70% Turkish, 30% international
  const isTurkish = faker.datatype.boolean({ probability: 0.7 });
  const location = isTurkish
    ? faker.helpers.arrayElement(turkishLocations)
    : faker.helpers.arrayElement(internationalLocations);

  const name = generateName(location);
  const isOnline = faker.datatype.boolean({ probability: 0.6 }); // 60% online
  const visits = faker.number.int({ min: 1, max: 50 });
  const chats = faker.number.int({ min: 0, max: Math.min(visits, 15) });
  const chatStatus = generateChatStatus(isOnline, chats);
  const hasActiveChat =
    isOnline && (chatStatus === "chatting" || chatStatus === "chatting_with_bot");

  // Generate realistic last activity (more recent for online users)
  const lastActivity = isOnline
    ? faker.date.recent({ days: 1 }).toISOString()
    : faker.date.recent({ days: 7 }).toISOString();

  // Assign agent if has chats and is Turkish (Turkish agents)
  const agent = chats > 0 && isTurkish ? faker.helpers.arrayElement(agentNames) : undefined;

  return {
    id: faker.string.uuid(),
    name,
    email: generateEmail(name, location),
    isOnline,
    location: `${location.city}, ${location.country}`,
    country: location.country,
    countryCode: location.code,
    agent,
    currentPage: faker.helpers.arrayElement(currentPages),
    referredFrom: faker.helpers.arrayElement(referredSources),
    visits,
    chats,
    lastActivity,
    ip: generateIP(),
    chatId: chats > 0 ? `conv-${faker.string.uuid().slice(0, 8)}` : undefined,
    hasActiveChat,
    chatStatus,
  };
}

// Generate multiple visitors
export function generateVisitors(count: number = 50): Visitor[] {
  const visitors: Visitor[] = [];

  for (let i = 0; i < count; i++) {
    visitors.push(generateVisitor());
  }

  // Sort by online status, then by last activity
  visitors.sort((a, b) => {
    if (a.isOnline && !b.isOnline) return -1;
    if (!a.isOnline && b.isOnline) return 1;

    // Same online status, sort by last activity
    return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
  });

  return visitors;
}

// Export for easy use
export default generateVisitors;
