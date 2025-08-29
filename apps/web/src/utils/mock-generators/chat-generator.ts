import { faker } from "@faker-js/faker";
import { type ChatUser, type Convo } from "../../features/chats/data/chat-types";

// Common Turkish cities
const turkishCities = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Antalya",
  "Adana",
  "Konya",
  "Gaziantep",
  "Mersin",
  "Diyarbakır",
  "Kayseri",
  "Eskişehir",
  "Samsun",
];

// Financial/stock market related conversation topics
const conversationTopics = [
  {
    topic: "investment",
    userMessages: [
      "Hisse senedi yatırımı nasıl başlarım?",
      "BIST 100 endeksi hakkında bilgi alabilir miyim?",
      "Portföy diversifikasyonu nedir?",
      "Hangi sektörlere yatırım yapmalıyım?",
    ],
    botResponses: [
      "Hisse senedi yatırımına başlamak için önce risk profilinizi belirlememiz gerekiyor.",
      "BIST 100, Türkiye'nin en büyük 100 şirketinin performansını ölçer.",
      "Portföy diversifikasyonu, riski azaltmak için yatırımlarınızı farklı varlıklara dağıtmaktır.",
      "Teknoloji, bankacılık ve enerji sektörleri güncel popüler yatırım alanlarıdır.",
    ],
  },
  {
    topic: "trading",
    userMessages: [
      "Hisse alım satım işlemi nasıl yaparım?",
      "Emir vermek istiyorum ama nasıl yapacağımı bilmiyorum",
      "Hisselerimi satmak istiyorum",
      "İşlem emri ne kadar sürede gerçekleşir?",
    ],
    botResponses: [
      "Hisse alım satım için platformumuza giriş yapıp İşlemler sekmesini kullanabilirsiniz.",
      "Emir verme konusunda size rehberlik edebilirim. Hangi hisse için emir vermek istiyorsunuz?",
      "Hisse satma işlemi için piyasa emri veya limitli emir verebilirsiniz.",
      "İşlem emirleri genellikle piyasa açık olduğu sürece anında gerçekleşir.",
    ],
  },
  {
    topic: "analysis",
    userMessages: [
      "Teknik analiz nasıl yapılır?",
      "ASELS hissesi hakkında ne düşünüyorsunuz?",
      "Piyasa durumu nasıl?",
      "Hangi hisseler yükselişte?",
    ],
    botResponses: [
      "Teknik analiz için grafikler ve göstergeleri incelemeniz gerekiyor.",
      "ASELS son dönemde güçlü performans sergiliyor, detaylı analiz için raporumuza bakabilirsiniz.",
      "Piyasa genel olarak pozitif seyrediyor, BIST 100 yükselişte.",
      "Bankacılık ve teknoloji hisseleri son günlerde güçlü performans gösteriyor.",
    ],
  },
];

// Department names (financial focused)
const departments = [
  "1 - Yatırım Danışmanlığı",
  "2 - Piyasa Analizi",
  "3 - Teknik Destek",
  "4 - Portföy Yönetimi",
];

// Investment plans
const campaigns = [
  "Temel Yatırım Paketi",
  "VIP Yatırım Paketi",
  "Premium Analiz Paketi",
  "Standart Portföy Yönetimi",
  "Hoş Geldin Danışmanlığı",
  "Sadakat Programı",
];

// Turkish names for more authentic results
const turkishMaleNames = [
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
];
const turkishFemaleNames = [
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
];
const turkishLastNames = [
  "Yılmaz",
  "Kaya",
  "Demir",
  "Şahin",
  "Çelik",
  "Yıldız",
  "Yıldırım",
  "Öztürk",
  "Aydin",
  "Özdemir",
  "Arslan",
  "Doğan",
  "Kilic",
  "Aslan",
  "Çetin",
  "Kara",
  "Koç",
  "Kurt",
  "Özkan",
  "Şimşek",
];

// Generate realistic Turkish username
function generateUsername(fullName: string): string {
  const firstName = fullName.split(" ")[0].toLowerCase();
  const randomNum = faker.number.int({ min: 10, max: 999 });
  const suffixes = ["_k", "_tr", "_47", "_88", "47", "88", "_pro", "_vip"];
  const suffix = faker.helpers.arrayElement(suffixes);

  return `${firstName}${suffix.includes("_") ? suffix : randomNum}`;
}

// Generate realistic conversation
function generateConversation(): Convo[] {
  const topic = faker.helpers.arrayElement(conversationTopics);
  const messageCount = faker.number.int({ min: 4, max: 12 }); // Daha fazla mesaj
  const messages: Convo[] = [];

  // Başlangıç tarihini kesinlikle geçmişe alalım
  const daysBack = faker.number.int({ min: 2, max: 4 });
  const now = new Date();
  const baseTime = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000); // X gün öncesi
  let currentTime = new Date(baseTime);

  // Welcome message (always first)
  messages.push({
    sender: "Yatırım Danışmanı",
    message:
      "📈 Borsa İstanbul'a hoş geldiniz!\n💼 BIST 100 endeksi %2.5 yükselişte! Yatırım fırsatlarını kaçırmayın.",
    timestamp: currentTime.toISOString(),
  });

  // Generate conversation based on topic - günlere yayalım
  for (let i = 1; i < messageCount; i++) {
    // Her 2-3 mesajda bir gün ilerletme şansı
    if (i > 1 && i % 3 === 0 && faker.datatype.boolean({ probability: 0.6 })) {
      // Bir sonraki güne geç (6-18 saat arası)
      const hoursToAdd = faker.number.int({ min: 6, max: 18 });
      currentTime = new Date(currentTime.getTime() + hoursToAdd * 60 * 60 * 1000);
    } else {
      // Aynı gün içinde normal mesaj aralığı (30 saniye - 2 saat)
      const minutesToAdd = faker.number.int({ min: 1, max: 120 });
      currentTime = new Date(currentTime.getTime() + minutesToAdd * 60 * 1000);
    }

    // Bugünden ileri geçmemesini sağla
    if (currentTime.getTime() > now.getTime()) {
      currentTime = new Date(now.getTime() - faker.number.int({ min: 30, max: 180 }) * 60 * 1000);
    }

    if (i % 2 === 1) {
      // User message
      const userMessage = faker.helpers.arrayElement(topic.userMessages);
      messages.push({
        sender: "User", // Will be replaced with actual name
        message: userMessage,
        timestamp: currentTime.toISOString(),
      });
    } else {
      // Bot response
      const botResponse = faker.helpers.arrayElement(topic.botResponses);
      messages.push({
        sender: "Yatırım Danışmanı",
        message: botResponse,
        timestamp: currentTime.toISOString(),
      });
    }
  }

  // Mesajları zamana göre sırala - eski mesajlar ilk, yeni mesajlar son
  return messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}

// Generate time ago string
function generateTimeAgo(): string {
  const timeOptions = [
    "1m ago",
    "2m ago",
    "5m ago",
    "10m ago",
    "15m ago",
    "30m ago",
    "1h ago",
    "2h ago",
    "3h ago",
    "4h ago",
    "5h ago",
    "1d ago",
    "2d ago",
  ];
  return faker.helpers.arrayElement(timeOptions);
}

// Generate single chat user
function generateChatUser(): ChatUser {
  const isMale = faker.datatype.boolean();
  const firstName = isMale
    ? faker.helpers.arrayElement(turkishMaleNames)
    : faker.helpers.arrayElement(turkishFemaleNames);
  const lastName = faker.helpers.arrayElement(turkishLastNames);
  const fullName = `${firstName} ${lastName}`;
  const username = generateUsername(fullName);

  const city = faker.helpers.arrayElement(turkishCities);
  const isOngoing = faker.datatype.boolean({ probability: 0.6 }); // 60% ongoing chats

  const messages = generateConversation();
  // Replace 'User' sender with actual name
  messages.forEach((msg) => {
    if (msg.sender === "User") {
      msg.sender = firstName;
    }
  });

  const browsers = ["Chrome", "Firefox", "Safari", "Edge"];
  const osOptions = ["Windows", "iOS", "Android", "macOS"];
  const devices = ["Desktop", "Mobile", "Tablet"];

  const browser = faker.helpers.arrayElement(browsers);
  const os = faker.helpers.arrayElement(osOptions);
  const device = faker.helpers.arrayElement(devices);

  return {
    id: faker.string.uuid(),
    profile: `https://randomuser.me/api/portraits/${isMale ? "men" : "women"}/${faker.number.int({ min: 1, max: 99 })}.jpg`,
    username,
    fullName,
    title: "Yatırımcı",
    messages,
    unreadCount: isOngoing ? faker.number.int({ min: 0, max: 15 }) : 0,
    lastMessageTime: generateTimeAgo(),
    department: faker.helpers.arrayElement(departments),
    isOngoing,
    pinned: faker.datatype.boolean({ probability: 0.2 }), // 20% pinned
    sessionInfo: {
      chatId: faker.string.uuid(),
      location: `${city}, ${city} Province, Türkiye(5.24.${faker.number.int({ min: 100, max: 200 })}.${faker.number.int({ min: 10, max: 99 })})`,
      campaign: faker.helpers.arrayElement(campaigns),
      campaignDisplay: "Turkish",
      referredFrom: faker.helpers.arrayElement([
        "https://www.investing.com/equities/turkey",
        "https://finans.mynet.com/borsa",
        "https://bigpara.hurriyet.com.tr/bist",
        "https://tr.tradingview.com/markets/stocks-turkey/",
      ]),
      currentlyBrowsing: "Borsa İstanbul - Hisse Senedi Analiz ve Yatırım Platformu",
      deviceInfo: `tr-TR, ${device === "Desktop" ? "1920x1080" : device === "Tablet" ? "1024x768" : "375x812"}, GMT +03:00`,
      allChats: faker.number.int({ min: 1, max: 50 }),
      visits: faker.number.int({ min: 1, max: 10 }),
    },
    userInfo: {
      country: "Turkey",
      browser,
      os,
      device,
    },
  };
}

export function generateChatUsers(count: number = 25): { conversations: ChatUser[] } {
  const conversations: ChatUser[] = [];

  for (let i = 0; i < count; i++) {
    conversations.push(generateChatUser());
  }

  conversations.sort((a, b) => {
    if (a.isOngoing && !b.isOngoing) return -1;
    if (!a.isOngoing && b.isOngoing) return 1;
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return { conversations };
}

export default generateChatUsers;
