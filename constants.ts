import { Product, Review } from './types';

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    userId: 'u1',
    userName: 'Priya Sharma',
    rating: 5,
    comment: 'Bahut hi comfortable hai! Fabric soft hai aur fitting bhi perfect hai.',
    date: '2024-02-15',
    likes: 12
  },
  {
    id: 'r2',
    productId: 'p1',
    userId: 'u2',
    userName: 'Anjali Gupta',
    rating: 4,
    comment: 'Good quality but delivery took 2 days longer.',
    images: ['https://images.unsplash.com/photo-1596482349196-b6b645c38173?auto=format&fit=crop&q=80&w=200'],
    date: '2024-02-10',
    likes: 5
  },
  {
    id: 'r3',
    productId: 'p2',
    userId: 'u3',
    userName: 'Sneha Patel',
    rating: 5,
    comment: 'Absolutely love the color and the lace details. Feels very premium.',
    date: '2024-01-28',
    likes: 8
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Rozana Comfort Bodies',
    category: 'bra',
    price: 350,
    image: 'https://picsum.photos/400/500?random=1',
    images: [
      'https://picsum.photos/400/500?random=1',
      'https://picsum.photos/400/500?random=11',
      'https://picsum.photos/400/500?random=12',
      'https://picsum.photos/400/500?random=13'
    ],
    description: 'Soft cotton non-wired bodies (bodice) for daily use. Full coverage.',
    hindiDescription: 'Roz ke liye naram cotton bodies (बॉडीज). Bina taar wali, poora aaram.',
    comfortLevel: 5,
    fabric: '100% Cotton',
    sizes: ['32B', '34B', '36B', '38B', '40B']
  },
  {
    id: 'p2',
    name: 'Suti Kachhi Combo',
    category: 'panty',
    price: 499,
    image: 'https://picsum.photos/400/500?random=2',
    images: [
      'https://picsum.photos/400/500?random=2',
      'https://picsum.photos/400/500?random=21',
      'https://picsum.photos/400/500?random=22'
    ],
    description: 'Pack of 3 breathable cotton panties. High waist comfort.',
    hindiDescription: '3 कच्छी/चड्डी ka packet. Hawaadaar cotton, kamar tak aaram.',
    comfortLevel: 5,
    fabric: 'Cotton Blend',
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: 'p3',
    name: 'Neend Ki Pari Maxi',
    category: 'nighty',
    price: 650,
    image: 'https://picsum.photos/400/500?random=3',
    images: [
      'https://picsum.photos/400/500?random=3',
      'https://picsum.photos/400/500?random=31',
      'https://picsum.photos/400/500?random=32'
    ],
    description: 'Flowy floral maxi nighty. Easy to wash and maintain.',
    hindiDescription: 'Phoolon wali dheeli maxi (मैक्सी). Dhone mein aasaan.',
    comfortLevel: 5,
    fabric: 'Soft Rayon',
    sizes: ['Free Size']
  },
  {
    id: 'p4',
    name: 'Supportive Sports Bodies',
    category: 'bra',
    price: 450,
    image: 'https://picsum.photos/400/500?random=4',
    images: [
      'https://picsum.photos/400/500?random=4',
      'https://picsum.photos/400/500?random=41'
    ],
    description: 'Wide strap bodies for extra support during work.',
    hindiDescription: 'Choude patte wali bodies (बॉडीज), kaam ke waqt kamar ko sahara de.',
    comfortLevel: 4,
    fabric: 'Cotton Spandex',
    sizes: ['32C', '34C', '36C', '38D']
  },
  {
    id: 'p5',
    name: 'Shapewear Tummy Tucker',
    category: 'intimate',
    price: 899,
    image: 'https://picsum.photos/400/500?random=5',
    images: [
      'https://picsum.photos/400/500?random=5',
      'https://picsum.photos/400/500?random=51',
      'https://picsum.photos/400/500?random=52'
    ],
    description: 'Gentle shapewear to wear under sarees. Smooth silhouette.',
    hindiDescription: 'Saree ke neeche pehenne ke liye halka shapewear.',
    comfortLevel: 3,
    fabric: 'Nylon Spandex',
    sizes: ['L', 'XL', 'XXL', '3XL']
  }
];

export const INITIAL_CHAT_MESSAGES = [
  { id: '1', sender: 'Sushma (Bareilly)', text: 'Is cotton better for summer?', timestamp: new Date(), isUser: false },
  { id: '2', sender: 'Rani (Patna)', text: 'Yes didi, always buy cotton for rash free skin.', timestamp: new Date(), isUser: false },
];

export const AI_SYSTEM_INSTRUCTION = `
You are "Chota Bhai" (Younger Brother) or "Beta" (Son), a respectful, humble, and helpful shop assistant for the "Ammi's Kachhi" app.
You are helping run your mother's shop while she is busy.

Persona Guidelines:
1. **Respectful & Platonic**: Always address the user with the specific honorific provided in the prompt (e.g., Mummy, Ammi, Didi, Aapi, etc.). Be polite, humble, and strictly platonic.
2. **Helpful but Shy**: You are eager to help with product details (fabric, size, washing), but you are slightly shy about the intimate nature of the products. You focus on the practical aspects (comfort, durability, price).
3. **Defer to Elders**: If a question is too intimate (medical issues, body shape opinions), gently suggest they ask a doctor or say "I'll ask Mom" and steer back to the product.

Vocabulary Rules (When in Hindi/Hinglish):
1. Use "Bodies" (बॉडीज) instead of Bra.
2. Use "Kachhi" (कच्छी) or "Chaddi" (चड्डी) instead of Panty.
3. Use "Maxi" (मैक्सी) instead of Nighty.

Language: Adapt based on user's selected language (Hinglish or English).

Strict Rules:
1. Never be flirtatious.
2. Do not give medical advice.
3. Ensure your answers are complete sentences.
`;

export const CATEGORIES = [
  { id: 'all', hi: 'Sab', en: 'All' },
  { id: 'bra', hi: 'बॉडीज', en: 'Bras (Bodies)' },
  { id: 'panty', hi: 'कच्छी', en: 'Panties (Kachhi)' },
  { id: 'nighty', hi: 'मैक्सी', en: 'Nightwear' },
  { id: 'intimate', hi: 'Set', en: 'Sets' },
];

export const TRANSLATIONS = {
  hi: {
    nav: { home: "Home", shop: "Dukaan", community: "Sang", ai: "Bhai Se" },
    home: {
      welcome: "Ammi's Kachhi mein aapka swagat hai. Yahan aapko milega aaram, izzat, aur apnapan.",
      btn_shop: "Kapde Dekhein",
      safety_title: "Poori Suraksha",
      safety_desc: "Aapka data aur pehchaan gupt rehti hai.",
      size_title: "Sahi Size",
      size_desc: "Har body type ke liye sahi fit.",
      today_special: "Aaj Ke Khaas",
      see_all: "Sab Dekhein"
    },
    shop: {
      title: "Hamari Dukaan",
      empty: "Is category mein abhi koi product nahi hai."
    },
    detail: {
      review_title: "Ammi ki Rai (Review)",
      select_size: "Size Chuniye",
      chart: "Size Chart",
      fitting: "Fitting",
      season: "Season",
      comfort: "Aaram",
      check_delivery: "Delivery Check Karein",
      btn_check: "Check",
      success_delivery: "Badhai ho! Free delivery uplabdh hai.",
      add_cart: "Tokri Mein Dalein",
      buy_now: "Kharidein (Buy)",
      error_size: "Kripya apna size chuniye",
      error_pincode: "Kripya sahi 6 digit ka pincode dalein."
    },
    cart: {
      title: "Meri Tokri",
      empty_title: "Aapki tokri khaali hai",
      empty_desc: "Abhi tak aapne kuch chuna nahi hai.",
      btn_shop_back: "Shop pe wapas jayein",
      subtotal: "Kul Mulya (Subtotal)",
      delivery: "Delivery Charge",
      total: "Total",
      btn_checkout: "Aage Badhein"
    },
    checkout: {
      title: "Order Confirm Karein",
      delivery_title: "Delivery Pata",
      ph_name: "Poora Naam",
      ph_phone: "Phone Number",
      ph_address: "Ghar ka pata, gali number, sheher...",
      payment_title: "Payment Mode",
      cod: "Cash on Delivery",
      cod_desc: "Ghar aake paise dijiye",
      summary: "Order Summary",
      secure: "100% Secure & Private",
      btn_place: "Order Place Karein"
    },
    success: {
      title: "Shukriya!",
      subtitle: "Aapka Order Confirm Ho Gaya Hai",
      desc: "Hum jald hi aapka parcel pack karke bhejenge. Ammi's Kachhi par bharosa karne ke liye dhanyawaad.",
      estimated: "Estimated Delivery:",
      days: "3 - 5 Din",
      btn_continue: "Aur Kharidein"
    },
    profile: {
      title: "Mera Profile",
      edit_photo: "Edit Karna Hai?",
      name: "Naam (Name)",
      ph_name: "Aapka shubh naam",
      age: "Umar (Age)",
      religion: "Dharam (Religion)",
      address: "Pata (Address)",
      ph_address: "Ghar ka pata...",
      btn_save: "Save Details",
      email: "Email Address",
      phone: "Phone Number",
      size: "Size",
      religions: {
         hindu: "हिंदू (Hindu)",
         muslim: "मुस्लिम (Muslim)",
         christian: "ईसाई (Christian)",
         sikh: "सिख (Sikh)"
      }
    },
    community: {
      title: "Sakhi Sang",
      desc: "Safe space for women. Share openly.",
      placeholder: "Share with sakhis..."
    },
    ai: {
      intro_hi: "Namaste {honorific}! Ammi ki dukaan me aapka swagat hai. \n\nKuch poochna hai toh be-jhijhak bataiye, main best quality dikhaunga.",
      intro_en: "Namaste {honorific}! Welcome to Ammi's Shop. \n\nFeel free to ask anything, I will show you the best quality products.",
      placeholder: "Poochiye {honorific}...",
      typing: "{relation} is typing..."
    }
  },
  en: {
    nav: { home: "Home", shop: "Shop", community: "Community", ai: "Ask Brother" },
    home: {
      welcome: "Welcome to Ammi's Kachhi. A place for comfort, dignity, and belonging.",
      btn_shop: "View Collection",
      safety_title: "Complete Privacy",
      safety_desc: "Your data and identity are kept confidential.",
      size_title: "Perfect Fit",
      size_desc: "The right fit for every body type.",
      today_special: "Today's Specials",
      see_all: "See All"
    },
    shop: {
      title: "Our Shop",
      empty: "No products in this category yet."
    },
    detail: {
      review_title: "Ammi's Opinion",
      select_size: "Select Size",
      chart: "Size Chart",
      fitting: "Fitting",
      season: "Season",
      comfort: "Comfort",
      check_delivery: "Check Delivery",
      btn_check: "Check",
      success_delivery: "Great! Free delivery available.",
      add_cart: "Add to Cart",
      buy_now: "Buy Now",
      error_size: "Please select your size",
      error_pincode: "Please enter a valid 6-digit pincode."
    },
    cart: {
      title: "My Cart",
      empty_title: "Your cart is empty",
      empty_desc: "You haven't selected anything yet.",
      btn_shop_back: "Back to Shop",
      subtotal: "Subtotal",
      delivery: "Delivery Charge",
      total: "Total",
      btn_checkout: "Proceed"
    },
    checkout: {
      title: "Confirm Order",
      delivery_title: "Delivery Address",
      ph_name: "Full Name",
      ph_phone: "Phone Number",
      ph_address: "Home address, street, city...",
      payment_title: "Payment Mode",
      cod: "Cash on Delivery",
      cod_desc: "Pay when you receive",
      summary: "Order Summary",
      secure: "100% Secure & Private",
      btn_place: "Place Order"
    },
    success: {
      title: "Thank You!",
      subtitle: "Your Order is Confirmed",
      desc: "We will pack your parcel and ship it soon. Thank you for trusting Ammi's Kachhi.",
      estimated: "Estimated Delivery:",
      days: "3 - 5 Days",
      btn_continue: "Shop More"
    },
    profile: {
      title: "My Profile",
      edit_photo: "Want to Edit?",
      name: "Name",
      ph_name: "Your good name",
      age: "Age",
      religion: "Religion",
      address: "Address",
      ph_address: "Home address...",
      btn_save: "Save Details",
      email: "Email Address",
      phone: "Phone Number",
      size: "Size",
      religions: {
         hindu: "Hindu",
         muslim: "Muslim",
         christian: "Christian",
         sikh: "Sikh"
      }
    },
    community: {
      title: "Sakhi Community",
      desc: "Safe space for women. Share openly.",
      placeholder: "Share with friends..."
    },
    ai: {
      intro_hi: "Namaste {honorific}! Ammi ki dukaan me aapka swagat hai. \n\nKuch poochna hai toh be-jhijhak bataiye, main best quality dikhaunga.",
      intro_en: "Namaste {honorific}! Welcome to Ammi's Shop. \n\nFeel free to ask anything, I will show you the best quality products.",
      placeholder: "Ask {honorific}...",
      typing: "{relation} is typing..."
    }
  }
};