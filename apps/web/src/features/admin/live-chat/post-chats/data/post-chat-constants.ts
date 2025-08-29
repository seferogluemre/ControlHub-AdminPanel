import type { PostChatField } from "../types/post-chat";

export const DEFAULT_GREETING_MESSAGE =
  "Ai hizmetimizi değerlendirmeniz bizim için çok önemli. Lütfen deneyiminizi ve görüşlerinizi paylaşın.";

export const DEFAULT_FIELDS: PostChatField[] = [
  {
    id: "rating",
    name: "rating",
    displayName: "Hizmet Puanlaması",
    type: "rating",
    visible: true,
    required: false,
    scaleOptions: [
      { id: "1", scale: 1, text: "Çok Kötü", visible: true },
      { id: "2", scale: 2, text: "Kötü", visible: true },
      { id: "3", scale: 3, text: "Orta", visible: true },
      { id: "4", scale: 4, text: "İyi", visible: true },
      { id: "5", scale: 5, text: "Mükemmel", visible: true },
    ],
  },
  {
    id: "comment",
    name: "comment",
    displayName: "Ai Deneyimi Yorumu",
    type: "textarea",
    visible: true,
    required: false,
    placeholder: "Ai hizmetimiz hakkındaki görüşlerinizi paylaşın...",
    rows: 4,
  },
];

export const FIELD_TYPE_OPTIONS = [
  { value: "text", label: "Metin" },
  { value: "textarea", label: "Uzun Metin" },
  { value: "rating", label: "Puanlama" },
  { value: "email", label: "E-posta" },
  { value: "phone", label: "Telefon" },
  { value: "select", label: "Seçenek" },
  { value: "checkbox", label: "Onay Kutusu" },
];

export const DEFAULT_SUBMIT_BUTTON_TEXT = "Değerlendirmeyi Gönder";
export const DEFAULT_THANK_YOU_MESSAGE = "Ai deneyiminizi paylaştığınız için teşekkür ederiz!";
