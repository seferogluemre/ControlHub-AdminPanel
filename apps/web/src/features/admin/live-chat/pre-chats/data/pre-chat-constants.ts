import type { PreChatField, TaskBotOption } from "../types/pre-chat";

export const DEFAULT_GREETING_MESSAGE = `ANINDA CEVAP Ai'ya Hoş Geldiniz! 🚀

💰 **Profesyonel Yatırım Danışmanlığı**
📊 Gerçek zamanlı piyasa analizleri ve tahminler
📈 BIST, Forex ve Kripto para yatırımları
🎯 Kişiye özel portföy önerileri

⚡ **Hızlı Destek**
• 7/24 anlık cevap garantisi
• AI destekli yatırım tavsiyeleri  
• Risk analizi ve yönetimi
• Uzman ekibimizle canlı görüşme

**Hemen başlayalım!** Size nasıl yardımcı olabiliriz?`;

export const DEFAULT_TEAM_NAME = "ANINDA CEVAP AI DESTEK";

export const DEFAULT_FIELDS: PreChatField[] = [
  {
    id: "department",
    name: "Hangi konuda yardım istiyorsunuz?",
    visible: true,
    required: true,
    type: "select",
  },
  {
    id: "name",
    name: "Adınız Soyadınız",
    visible: true,
    required: true,
    type: "text",
  },
  {
    id: "email",
    name: "E-posta Adresiniz",
    visible: true,
    required: false,
    type: "email",
  },
  {
    id: "phone",
    name: "Telefon Numaranız",
    visible: true,
    required: false,
    type: "tel",
  },
  {
    id: "investment_experience",
    name: "Yatırım Deneyiminiz",
    visible: false,
    required: false,
    type: "select",
  },
  {
    id: "investment_amount",
    name: "Yatırım Yapacağınız Miktar",
    visible: false,
    required: false,
    type: "select",
  },
];

export const TASK_BOT_OPTIONS: TaskBotOption[] = [
  { value: "aninda-cevap-bot", label: "Anında Cevap AI Bot" },
  { value: "investment-advisor-bot", label: "Yatırım Danışmanı Bot" },
  { value: "market-analysis-bot", label: "Piyasa Analizi Bot" },
  { value: "portfolio-manager-bot", label: "Portföy Yönetimi Bot" },
];

export const FIELD_TYPE_OPTIONS = [
  { value: "text", label: "Metin Alanı" },
  { value: "email", label: "E-posta Adresi" },
  { value: "tel", label: "Telefon Numarası" },
  { value: "number", label: "Sayısal Değer" },
  { value: "select", label: "Açılır Liste" },
  { value: "textarea", label: "Çok Satırlı Metin" },
];
