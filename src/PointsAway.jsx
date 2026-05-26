import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const API_URL = "https://api.anthropic.com/v1/messages";
const F = "Georgia, 'Times New Roman', serif";
const BG = "#0c1a0e";
const SURF = "#111f13";
const SURF2 = "#162019";
const G = "#7eb86a";
const GOLD = "#d4a843";
const TEXT = "#e8ead4";
const MUT = "rgba(232,234,212,0.45)";
const BORDER = "rgba(126,184,106,0.12)";

const CITY_GUIDES = {
  "Charleston, SC": { emoji:"🌸", tagline:"History, shrimp & grits, cobblestone charm", coverColor:"#1a0a1f", accent:"#c084e0", pointsProgram:"Chase Ultimate Rewards (Hyatt), Southwest Rapid Rewards", visited:"June 2023", kidRating:5, budgetRating:"$$", topTip:"Book Magnolia Plantation well in advance — it sells out weeks ahead and the kids will talk about the free-roaming peacocks for months.", spots:[{name:"Husk",type:"Southern",emoji:"🌽",budget:"$$$",kidFriendly:3,mustOrder:"Shrimp & grits, cast iron cornbread",review:"A splurge worth every penny. Everything on the menu is sourced from the South — it's a philosophy, not a gimmick. The cornbread alone is worth the reservation. Better for older kids or a special date night.",photo:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop"},{name:"Bowens Island Restaurant",type:"Seafood Shack",emoji:"🦪",budget:"$",kidFriendly:4,mustOrder:"Steamed oysters by the bucket",review:"Legendary dive bar meets seafood shack. You shuck your own oysters at picnic tables overlooking the marsh. Incredibly casual, zero pretension, absolutely delicious. The kids loved the novelty of shucking their own shellfish.",photo:"https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=250&fit=crop"},{name:"Magnolia Plantation",type:"Attraction",emoji:"🌿",budget:"$$",kidFriendly:5,mustOrder:"Nature boardwalk through the swamp",review:"The grounds are stunning — Spanish moss, ancient oaks, free-roaming peacocks everywhere. Educational, beautiful, and the kids ran wild in the best way. The swamp boardwalk was the surprise highlight of the whole trip.",photo:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop"},{name:"Brown's Court Bakery",type:"Bakery & Café",emoji:"🥐",budget:"$",kidFriendly:5,mustOrder:"Croissants, breakfast sandwich",review:"Our go-to every morning in Charleston. Flaky, buttery croissants that rival anything you'd find in Paris. Always a line but it moves fast. Grab one and eat it on a bench in the nearby park — perfect start to the day.",photo:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop"}]},
  "Paris, France": { emoji:"🗼", tagline:"Croissants, culture & magic for the whole family", coverColor:"#0d1a2e", accent:"#7eb5e8", pointsProgram:"Amex Membership Rewards (Air France), Chase UR (United)", visited:"Summer 2023", kidRating:5, budgetRating:"$$$", topTip:"Buy a Paris Museum Pass — it covers the Louvre, Musée d'Orsay, and Versailles and lets you skip the main ticket lines. Game-changer with kids.", spots:[{name:"Du Pain et des Idées",type:"Boulangerie",emoji:"🥐",budget:"$",kidFriendly:5,mustOrder:"Escargot pastry & chausson aux pommes",review:"Widely considered the best bakery in Paris — and after visiting six times across multiple trips, we agree. The escargot pastry is flaky, caramelized perfection. Arrive early; they sell out by 10am.",photo:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=250&fit=crop"},{name:"Musée d'Orsay",type:"Museum",emoji:"🎨",budget:"$$",kidFriendly:4,mustOrder:"Top floor — Impressionist galleries",review:"More kid-friendly than the Louvre by a mile. The Impressionist paintings are visually accessible in a way that abstract art isn't. Our kids actually stopped and stared.",photo:"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=250&fit=crop"},{name:"Breizh Café",type:"Crêperie",emoji:"🫓",budget:"$$",kidFriendly:5,mustOrder:"Buckwheat galette complète, salted caramel crêpe",review:"The best crêpes in Paris, full stop. The kids declared it their favorite meal of the trip. Reserve ahead.",photo:"https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&h=250&fit=crop"},{name:"Eiffel Tower at Dusk",type:"Landmark",emoji:"🗼",budget:"$$",kidFriendly:5,mustOrder:"Summit tickets — book 2 months ahead",review:"Yes, everyone goes. Yes, it's still completely magical, especially at dusk when the city turns golden. Book summit tickets months in advance online.",photo:"https://images.unsplash.com/photo-1499856871958-5b9357976b82?w=400&h=250&fit=crop"}]},
  "London, England": { emoji:"🎡", tagline:"History, pubs, parks & proper fish & chips", coverColor:"#0e0e1a", accent:"#e8a84a", pointsProgram:"Chase UR (British Airways/United), Amex MR (British Airways)", visited:"Spring Break 2024", kidRating:5, budgetRating:"$$$", topTip:"Get an Oyster card for the whole family on day one — the Tube is fast, easy, and the kids love it. Way cheaper than taxis and faster than Ubers.", spots:[{name:"Borough Market",type:"Food Market",emoji:"🥩",budget:"$$",kidFriendly:5,mustOrder:"Kappacasein cheese toastie, Brindisa chorizo roll",review:"London's greatest food market. The Kappacasein cheese toastie has a cult following for good reason — molten, crispy, life-changing. Kids can graze their way through on a budget.",photo:"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=250&fit=crop"},{name:"Natural History Museum",type:"Museum",emoji:"🦕",budget:"Free",kidFriendly:5,mustOrder:"Blue whale skeleton + dinosaur gallery",review:"Free, world-class, and genuinely one of the best museums on earth. The blue whale skeleton stops everyone in their tracks. The dinosaur gallery had our kids completely enthralled.",photo:"https://images.unsplash.com/photo-1526134782782-1b4ca05f7b59?w=400&h=250&fit=crop"},{name:"Padella",type:"Pasta",emoji:"🍝",budget:"$$",kidFriendly:5,mustOrder:"Pici cacio e pepe, pappardelle with 8-hour beef shin ragù",review:"No reservations, always a queue, completely worth the wait. The cacio e pepe is the best we've had outside Rome. Under £20 a head — unreal for London.",photo:"https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=400&h=250&fit=crop"},{name:"Tower of London",type:"Historic Site",emoji:"🏰",budget:"$$",kidFriendly:5,mustOrder:"Yeoman Warder (Beefeater) guided tour",review:"Nearly 1,000 years of history and the free Beefeater tours are genuinely entertaining for adults and kids alike. The Crown Jewels are jaw-dropping.",photo:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop"}]},
  "Boston, MA": { emoji:"🦞", tagline:"Lobster rolls, history & a very walkable city", coverColor:"#0e1a10", accent:"#e05c5c", pointsProgram:"JetBlue TrueBlue, Chase UR (United), Southwest", visited:"Fall 2023", kidRating:5, budgetRating:"$$", topTip:"Walk the Freedom Trail with kids — it's a free, self-guided 2.5-mile walk connecting 16 historic sites.", spots:[{name:"Neptune Oyster",type:"Seafood",emoji:"🦞",budget:"$$$",kidFriendly:3,mustOrder:"Hot buttered lobster roll",review:"The lobster roll debate in Boston is endless, but Neptune wins ours. The hot buttered version is one of the best bites in New England. Small, no reservations, worth the wait.",photo:"https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&h=250&fit=crop"},{name:"Mike's Pastry",type:"Italian Bakery",emoji:"🍮",budget:"$",kidFriendly:5,mustOrder:"Cannoli — get it filled fresh in front of you",review:"North End institution and a non-negotiable stop. Watch them fill your cannoli to order. The ricotta filling is light, slightly sweet, and tucked into a shatteringly crispy shell.",photo:"https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=250&fit=crop"},{name:"Freedom Trail",type:"Historic Walk",emoji:"🏛️",budget:"Free",kidFriendly:5,mustOrder:"Paul Revere House + Old North Church stops",review:"The most family-friendly way to do Boston history. Follow the red brick line, stop at whatever captures the kids' attention.",photo:"https://images.unsplash.com/photo-1501446529957-6226b8c44f87?w=400&h=250&fit=crop"},{name:"Giacomo's Ristorante",type:"Italian",emoji:"🍝",budget:"$$",kidFriendly:5,mustOrder:"Lobster fra diavolo, any pasta",review:"Tiny North End trattoria with cash-only policy and a line out the door every night. Huge portions, reasonable prices, incredible energy.",photo:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=250&fit=crop"}]},
};

const CARD_DB = {
  "Chase Sapphire Preferred": { issuer:"Chase", color:"#1a3a6b", accent:"#4a90d9", annualFee:95, program:"Chase Ultimate Rewards", history:[{m:"Feb '24",b:60000},{m:"Mar '24",b:60000},{m:"Apr '24",b:60000},{m:"May '24",b:75000},{m:"Jun '24",b:75000},{m:"Jul '24",b:60000},{m:"Aug '24",b:60000},{m:"Sep '24",b:60000},{m:"Oct '24",b:60000},{m:"Nov '24",b:80000},{m:"Dec '24",b:80000},{m:"Jan '25",b:60000},{m:"Feb '25",b:60000}] },
  "Chase Sapphire Reserve": { issuer:"Chase", color:"#1a1a2e", accent:"#c9a84c", annualFee:550, program:"Chase Ultimate Rewards", history:[{m:"Feb '24",b:60000},{m:"Mar '24",b:60000},{m:"Apr '24",b:60000},{m:"May '24",b:60000},{m:"Jun '24",b:75000},{m:"Jul '24",b:75000},{m:"Aug '24",b:60000},{m:"Sep '24",b:60000},{m:"Oct '24",b:60000},{m:"Nov '24",b:60000},{m:"Dec '24",b:60000},{m:"Jan '25",b:60000},{m:"Feb '25",b:60000}] },
  "Amex Platinum": { issuer:"Amex", color:"#2c3e50", accent:"#a8c5e8", annualFee:695, program:"Amex Membership Rewards", history:[{m:"Feb '24",b:80000},{m:"Mar '24",b:80000},{m:"Apr '24",b:80000},{m:"May '24",b:100000},{m:"Jun '24",b:125000},{m:"Jul '24",b:125000},{m:"Aug '24",b:80000},{m:"Sep '24",b:80000},{m:"Oct '24",b:80000},{m:"Nov '24",b:150000},{m:"Dec '24",b:150000},{m:"Jan '25",b:80000},{m:"Feb '25",b:80000}] },
  "Amex Gold": { issuer:"Amex", color:"#7a5c1e", accent:"#d4a843", annualFee:250, program:"Amex Membership Rewards", history:[{m:"Feb '24",b:60000},{m:"Mar '24",b:60000},{m:"Apr '24",b:60000},{m:"May '24",b:75000},{m:"Jun '24",b:75000},{m:"Jul '24",b:60000},{m:"Aug '24",b:90000},{m:"Sep '24",b:90000},{m:"Oct '24",b:60000},{m:"Nov '24",b:100000},{m:"Dec '24",b:100000},{m:"Jan '25",b:60000},{m:"Feb '25",b:60000}] },
  "Capital One Venture X": { issuer:"Capital One", color:"#5a1010", accent:"#e05c5c", annualFee:395, program:"Capital One Miles", history:[{m:"Feb '24",b:75000},{m:"Mar '24",b:75000},{m:"Apr '24",b:75000},{m:"May '24",b:75000},{m:"Jun '24",b:90000},{m:"Jul '24",b:90000},{m:"Aug '24",b:75000},{m:"Sep '24",b:75000},{m:"Oct '24",b:75000},{m:"Nov '24",b:75000},{m:"Dec '24",b:75000},{m:"Jan '25",b:75000},{m:"Feb '25",b:75000}] },
  "Citi Strata Premier": { issuer:"Citi", color:"#1a4a6b", accent:"#4fc3e8", annualFee:95, program:"Citi ThankYou Points", history:[{m:"Feb '24",b:60000},{m:"Mar '24",b:60000},{m:"Apr '24",b:75000},{m:"May '24",b:75000},{m:"Jun '24",b:60000},{m:"Jul '24",b:60000},{m:"Aug '24",b:60000},{m:"Sep '24",b:60000},{m:"Oct '24",b:70000},{m:"Nov '24",b:70000},{m:"Dec '24",b:60000},{m:"Jan '25",b:60000},{m:"Feb '25",b:60000}] },
  "Citi Strata Elite": { issuer:"Citi", color:"#0d2d4a", accent:"#38bdf8", annualFee:595, program:"Citi ThankYou Points", history:[{m:"Jul '24",b:80000},{m:"Aug '24",b:80000},{m:"Sep '24",b:80000},{m:"Oct '24",b:100000},{m:"Nov '24",b:100000},{m:"Dec '24",b:80000},{m:"Jan '25",b:100000},{m:"Feb '25",b:100000}] },
  "Citi AAdvantage Globe": { issuer:"Citi", color:"#2a0a3a", accent:"#b06ee0", annualFee:350, program:"AA AAdvantage", history:[{m:"Feb '24",b:65000},{m:"Mar '24",b:65000},{m:"Apr '24",b:65000},{m:"May '24",b:75000},{m:"Jun '24",b:75000},{m:"Jul '24",b:65000},{m:"Aug '24",b:65000},{m:"Sep '24",b:65000},{m:"Oct '24",b:75000},{m:"Nov '24",b:75000},{m:"Dec '24",b:65000},{m:"Jan '25",b:90000},{m:"Feb '25",b:90000}] },
  "United Explorer": { issuer:"Chase", color:"#003580", accent:"#5ba4e6", annualFee:95, program:"United MileagePlus", history:[{m:"Feb '24",b:60000},{m:"Mar '24",b:60000},{m:"Apr '24",b:60000},{m:"May '24",b:80000},{m:"Jun '24",b:80000},{m:"Jul '24",b:60000},{m:"Aug '24",b:60000},{m:"Sep '24",b:70000},{m:"Oct '24",b:70000},{m:"Nov '24",b:90000},{m:"Dec '24",b:90000},{m:"Jan '25",b:60000},{m:"Feb '25",b:60000}] },
  "Delta SkyMiles Gold Amex": { issuer:"Amex", color:"#8b0000", accent:"#e8a0a0", annualFee:150, program:"Delta SkyMiles", history:[{m:"Feb '24",b:40000},{m:"Mar '24",b:40000},{m:"Apr '24",b:40000},{m:"May '24",b:65000},{m:"Jun '24",b:65000},{m:"Jul '24",b:40000},{m:"Aug '24",b:40000},{m:"Sep '24",b:40000},{m:"Oct '24",b:40000},{m:"Nov '24",b:70000},{m:"Dec '24",b:70000},{m:"Jan '25",b:40000},{m:"Feb '25",b:40000}] },
};

const fmt = n => n >= 1000 ? (n/1000).toFixed(0)+"k" : n;

// ─── TRANSFER BONUS DATABASE ──────────────────────────────────────────────────
// Each entry = a transfer partnership that has historically had bonus offers
const TRANSFER_DB = [
  {
    id: "chase-hyatt",
    program: "Chase Ultimate Rewards",
    programShort: "Chase UR",
    programColor: "#1a3a6b",
    programAccent: "#4a90d9",
    partner: "World of Hyatt",
    partnerEmoji: "🏨",
    partnerType: "Hotel",
    baseRatio: "1:1",
    cards: ["Chase Sapphire Preferred","Chase Sapphire Reserve"],
    notes: "One of the best hotel transfer partnerships — Hyatt points are extremely valuable at 1.5–2¢ each.",
    history: [
      {m:"Feb '24",bonus:0,label:"No offer"},
      {m:"Mar '24",bonus:0,label:"No offer"},
      {m:"Apr '24",bonus:30,label:"30% bonus"},
      {m:"May '24",bonus:30,label:"30% bonus"},
      {m:"Jun '24",bonus:0,label:"No offer"},
      {m:"Jul '24",bonus:0,label:"No offer"},
      {m:"Aug '24",bonus:0,label:"No offer"},
      {m:"Sep '24",bonus:25,label:"25% bonus"},
      {m:"Oct '24",bonus:25,label:"25% bonus"},
      {m:"Nov '24",bonus:0,label:"No offer"},
      {m:"Dec '24",bonus:30,label:"30% bonus"},
      {m:"Jan '25",bonus:0,label:"No offer"},
      {m:"Feb '25",bonus:0,label:"No offer"},
    ],
  },
  {
    id: "chase-united",
    program: "Chase Ultimate Rewards",
    programShort: "Chase UR",
    programColor: "#1a3a6b",
    programAccent: "#4a90d9",
    partner: "United MileagePlus",
    partnerEmoji: "✈️",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Chase Sapphire Preferred","Chase Sapphire Reserve","United Explorer"],
    notes: "Rare but valuable. United miles transfer bonuses typically appear during United promotions or Q4.",
    history: [
      {m:"Feb '24",bonus:0},{m:"Mar '24",bonus:0},{m:"Apr '24",bonus:0},
      {m:"May '24",bonus:0},{m:"Jun '24",bonus:25,label:"25% bonus"},
      {m:"Jul '24",bonus:25,label:"25% bonus"},{m:"Aug '24",bonus:0},
      {m:"Sep '24",bonus:0},{m:"Oct '24",bonus:0},{m:"Nov '24",bonus:0},
      {m:"Dec '24",bonus:0},{m:"Jan '25",bonus:0},{m:"Feb '25",bonus:0},
    ],
  },
  {
    id: "amex-avianca",
    program: "Amex Membership Rewards",
    programShort: "Amex MR",
    programColor: "#2c3e50",
    programAccent: "#a8c5e8",
    partner: "Avianca LifeMiles",
    partnerEmoji: "🌎",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Amex Platinum","Amex Gold"],
    notes: "LifeMiles are a hidden gem for Star Alliance awards. Amex runs 40% bonuses here more frequently than any other partner.",
    history: [
      {m:"Feb '24",bonus:40,label:"40% bonus"},{m:"Mar '24",bonus:0},
      {m:"Apr '24",bonus:0},{m:"May '24",bonus:40,label:"40% bonus"},
      {m:"Jun '24",bonus:40,label:"40% bonus"},{m:"Jul '24",bonus:0},
      {m:"Aug '24",bonus:0},{m:"Sep '24",bonus:40,label:"40% bonus"},
      {m:"Oct '24",bonus:0},{m:"Nov '24",bonus:40,label:"40% bonus"},
      {m:"Dec '24",bonus:0},{m:"Jan '25",bonus:40,label:"40% bonus"},
      {m:"Feb '25",bonus:0},
    ],
  },
  {
    id: "amex-virgin",
    program: "Amex Membership Rewards",
    programShort: "Amex MR",
    programColor: "#2c3e50",
    programAccent: "#a8c5e8",
    partner: "Virgin Atlantic Flying Club",
    partnerEmoji: "🇬🇧",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Amex Platinum","Amex Gold"],
    notes: "Virgin miles are excellent for Delta and ANA awards at a fraction of the price. Bonuses appear 2–3x per year.",
    history: [
      {m:"Feb '24",bonus:0},{m:"Mar '24",bonus:30,label:"30% bonus"},
      {m:"Apr '24",bonus:30,label:"30% bonus"},{m:"May '24",bonus:0},
      {m:"Jun '24",bonus:0},{m:"Jul '24",bonus:0},
      {m:"Aug '24",bonus:30,label:"30% bonus"},{m:"Sep '24",bonus:0},
      {m:"Oct '24",bonus:0},{m:"Nov '24",bonus:30,label:"30% bonus"},
      {m:"Dec '24",bonus:0},{m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:30,label:"30% bonus"},
    ],
  },
  {
    id: "amex-airfrance",
    program: "Amex Membership Rewards",
    programShort: "Amex MR",
    programColor: "#2c3e50",
    programAccent: "#a8c5e8",
    partner: "Air France/KLM Flying Blue",
    partnerEmoji: "🇫🇷",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Amex Platinum","Amex Gold"],
    notes: "Flying Blue runs Promo Rewards monthly with 25–50% off select routes. Pair with an MR transfer bonus for maximum value.",
    history: [
      {m:"Feb '24",bonus:25,label:"25% bonus"},{m:"Mar '24",bonus:0},
      {m:"Apr '24",bonus:0},{m:"May '24",bonus:0},
      {m:"Jun '24",bonus:30,label:"30% bonus"},{m:"Jul '24",bonus:0},
      {m:"Aug '24",bonus:0},{m:"Sep '24",bonus:25,label:"25% bonus"},
      {m:"Oct '24",bonus:0},{m:"Nov '24",bonus:0},
      {m:"Dec '24",bonus:30,label:"30% bonus"},{m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
    ],
  },
  {
    id: "amex-hilton",
    program: "Amex Membership Rewards",
    programShort: "Amex MR",
    programColor: "#2c3e50",
    programAccent: "#a8c5e8",
    partner: "Hilton Honors",
    partnerEmoji: "🏨",
    partnerType: "Hotel",
    baseRatio: "1:2",
    cards: ["Amex Platinum","Amex Gold"],
    notes: "Base ratio is 1:2 (MR to Hilton) but bonus offers stack on top. Good for aspirational Hilton stays.",
    history: [
      {m:"Feb '24",bonus:0},{m:"Mar '24",bonus:0},
      {m:"Apr '24",bonus:0},{m:"May '24",bonus:25,label:"25% bonus"},
      {m:"Jun '24",bonus:0},{m:"Jul '24",bonus:0},
      {m:"Aug '24",bonus:0},{m:"Sep '24",bonus:0},
      {m:"Oct '24",bonus:0},{m:"Nov '24",bonus:25,label:"25% bonus"},
      {m:"Dec '24",bonus:0},{m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
    ],
  },
  {
    id: "citi-turkish",
    program: "Citi ThankYou Points",
    programShort: "Citi TY",
    programColor: "#1a4a6b",
    programAccent: "#4fc3e8",
    partner: "Turkish Airlines Miles&Smiles",
    partnerEmoji: "🌙",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Citi Strata Premier","Citi Strata Elite"],
    notes: "Turkish miles are incredibly valuable for Star Alliance business class, especially to Asia. Citi frequently runs 25–30% bonuses here.",
    history: [
      {m:"Feb '24",bonus:25,label:"25% bonus"},{m:"Mar '24",bonus:0},
      {m:"Apr '24",bonus:0},{m:"May '24",bonus:25,label:"25% bonus"},
      {m:"Jun '24",bonus:0},{m:"Jul '24",bonus:30,label:"30% bonus"},
      {m:"Aug '24",bonus:30,label:"30% bonus"},{m:"Sep '24",bonus:0},
      {m:"Oct '24",bonus:0},{m:"Nov '24",bonus:25,label:"25% bonus"},
      {m:"Dec '24",bonus:0},{m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:25,label:"25% bonus"},
    ],
  },
  {
    id: "citi-singapore",
    program: "Citi ThankYou Points",
    programShort: "Citi TY",
    programColor: "#1a4a6b",
    programAccent: "#4fc3e8",
    partner: "Singapore KrisFlyer",
    partnerEmoji: "🦁",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Citi Strata Premier","Citi Strata Elite"],
    notes: "KrisFlyer miles unlock some of the world's best first class awards. Citi offers occasional bonuses — grab them.",
    history: [
      {m:"Feb '24",bonus:0},{m:"Mar '24",bonus:0},
      {m:"Apr '24",bonus:25,label:"25% bonus"},{m:"May '24",bonus:0},
      {m:"Jun '24",bonus:0},{m:"Jul '24",bonus:0},
      {m:"Aug '24",bonus:0},{m:"Sep '24",bonus:0},
      {m:"Oct '24",bonus:25,label:"25% bonus"},{m:"Nov '24",bonus:0},
      {m:"Dec '24",bonus:30,label:"30% bonus"},{m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
    ],
  },
  {
    id: "cap1-turkish",
    program: "Capital One Miles",
    programShort: "Cap1",
    programColor: "#5a1010",
    programAccent: "#e05c5c",
    partner: "Turkish Airlines Miles&Smiles",
    partnerEmoji: "🌙",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Capital One Venture X"],
    notes: "Capital One rarely runs transfer bonuses, but Turkish is their best partner. Watch for Q2 and Q4 offers.",
    history: [
      {m:"Feb '24",bonus:0},{m:"Mar '24",bonus:0},
      {m:"Apr '24",bonus:0},{m:"May '24",bonus:0},
      {m:"Jun '24",bonus:25,label:"25% bonus"},{m:"Jul '24",bonus:0},
      {m:"Aug '24",bonus:0},{m:"Sep '24",bonus:0},
      {m:"Oct '24",bonus:0},{m:"Nov '24",bonus:0},
      {m:"Dec '24",bonus:0},{m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
    ],
  },
  {
    id: "cap1-avianca",
    program: "Capital One Miles",
    programShort: "Cap1",
    programColor: "#5a1010",
    programAccent: "#e05c5c",
    partner: "Avianca LifeMiles",
    partnerEmoji: "🌎",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Capital One Venture X"],
    notes: "Avianca LifeMiles transfer bonuses from Capital One are rarer than from Amex — but they happen and are extremely valuable.",
    history: [
      {m:"Feb '24",bonus:0},{m:"Mar '24",bonus:0},
      {m:"Apr '24",bonus:0},{m:"May '24",bonus:30,label:"30% bonus"},
      {m:"Jun '24",bonus:0},{m:"Jul '24",bonus:0},
      {m:"Aug '24",bonus:0},{m:"Sep '24",bonus:0},
      {m:"Oct '24",bonus:0},{m:"Nov '24",bonus:0},
      {m:"Dec '24",bonus:30,label:"30% bonus"},{m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
    ],
  },
];

// Which partnerships are CURRENTLY active (Feb '25)
const currentlyActive = TRANSFER_DB.filter(t => {
  const last = t.history[t.history.length - 1];
  return last && last.bonus > 0;
});

function KidRating({ n }) {
  return <span>{Array.from({length:5},(_,i)=> <span key={i} style={{opacity: i<n?1:0.2}}>👶</span>)}</span>;
}
function BudgetBadge({ b }) {
  const colors = {"$":"#6dbf8a","$$":"#d4a843","$$$":"#e05c5c","Free":"#6dbf8a"};
  return <span style={{padding:"2px 8px",borderRadius:10,background:`${colors[b]||G}22`,color:colors[b]||G,fontSize:11,fontWeight:700,border:`1px solid ${colors[b]||G}44`}}>{b}</span>;
}
function VerifiedBadge() {
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 9px",borderRadius:10,background:"rgba(126,184,106,0.15)",border:"1px solid rgba(126,184,106,0.4)",fontSize:10,color:G,fontWeight:700,letterSpacing:"0.08em"}}>✓ VERIFIED VISIT</span>;
}

// Styled dropdown
function StyledSelect({ value, onChange, children, placeholder }) {
  return (
    <div style={{ position:"relative" }}>
      <select value={value} onChange={e=>onChange(e.target.value)}
        style={{width:"100%",padding:"11px 36px 11px 13px",background:"rgba(255,255,255,0.04)",border:`1px solid rgba(126,184,106,0.18)`,borderRadius:8,color:value?TEXT:"rgba(232,234,212,0.28)",fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:F,appearance:"none",WebkitAppearance:"none",cursor:"pointer",transition:"border-color 0.2s"}}
        onFocus={e=>e.target.style.borderColor=G} onBlur={e=>e.target.style.borderColor="rgba(126,184,106,0.18)"}>
        {placeholder && <option value="" disabled hidden>{placeholder}</option>}
        {children}
      </select>
      <div style={{position:"absolute",right:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:G,fontSize:11}}>▾</div>
    </div>
  );
}

// Multi-select chips
function ChipSelect({ options, selected, onToggle }) {
  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
      {options.map(opt => {
        const on = selected.includes(opt.value);
        return (
          <button key={opt.value} onClick={()=>onToggle(opt.value)}
            style={{padding:"6px 13px",borderRadius:20,border:`1px solid ${on?G:"rgba(126,184,106,0.15)"}`,background:on?"rgba(126,184,106,0.18)":"rgba(255,255,255,0.03)",color:on?G:MUT,fontSize:12,fontWeight:on?700:400,cursor:"pointer",fontFamily:F,transition:"all 0.15s"}}>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function CityGuides({ onPlanTrip }) {
  const [selected, setSelected] = useState(null);
  const [activeSpot, setActiveSpot] = useState(0);

  if (selected) {
    const city = CITY_GUIDES[selected];
    const spot = city.spots[activeSpot];
    return (
      <div style={{flex:1,overflowY:"auto",background:BG}}>
        <div style={{background:`linear-gradient(160deg,${city.coverColor} 0%,${BG} 100%)`,padding:"32px 36px 28px",borderBottom:`1px solid ${BORDER}`}}>
          <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:MUT,cursor:"pointer",fontSize:13,fontFamily:F,marginBottom:16,padding:0}}>← All City Guides</button>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16}}>
            <div>
              <div style={{fontSize:42,marginBottom:6}}>{city.emoji}</div>
              <h1 style={{fontSize:32,margin:0,color:TEXT,fontWeight:400}}>{selected}</h1>
              <p style={{color:city.accent,fontSize:14,margin:"4px 0 12px",fontStyle:"italic"}}>{city.tagline}</p>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
                <VerifiedBadge /><span style={{fontSize:12,color:MUT}}>Visited {city.visited}</span>
                <BudgetBadge b={city.budgetRating} />
                <span style={{fontSize:12,color:MUT}}><KidRating n={city.kidRating} /> for families</span>
              </div>
            </div>
            <button onClick={()=>onPlanTrip(selected)} style={{padding:"10px 20px",background:G,border:"none",borderRadius:8,color:BG,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:F,whiteSpace:"nowrap"}}>✈️ Plan a Trip Here →</button>
          </div>
          <div style={{marginTop:18,padding:"12px 16px",background:"rgba(126,184,106,0.08)",border:`1px solid ${BORDER}`,borderRadius:8}}>
            <span style={{fontSize:11,color:G,fontWeight:700,letterSpacing:"0.1em"}}>💡 INSIDER TIP · </span>
            <span style={{fontSize:13,color:TEXT}}>{city.topTip}</span>
          </div>
        </div>
        <div style={{padding:"24px 36px"}}>
          <div style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:MUT,marginBottom:14}}>Our Verified Picks</div>
          <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
            {city.spots.map((s,i)=>(
              <button key={i} onClick={()=>setActiveSpot(i)} style={{padding:"8px 16px",borderRadius:20,border:"none",background:activeSpot===i?city.accent:"rgba(255,255,255,0.06)",color:activeSpot===i?"#0c1a0e":MUT,fontSize:12,fontWeight:activeSpot===i?700:400,cursor:"pointer",fontFamily:F,transition:"all 0.15s"}}>{s.emoji} {s.name}</button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,background:SURF,borderRadius:14,overflow:"hidden",border:`1px solid ${BORDER}`}}>
            <img src={spot.photo} alt={spot.name} style={{width:"100%",height:280,objectFit:"cover"}} onError={e=>e.target.style.display="none"} />
            <div style={{padding:"24px 24px 24px 0",display:"flex",flexDirection:"column",gap:12}}>
              <div>
                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:8}}><VerifiedBadge /><BudgetBadge b={spot.budget} /><span style={{fontSize:12,color:MUT}}>{spot.type}</span></div>
                <h2 style={{fontSize:22,margin:0,color:TEXT,fontWeight:400}}>{spot.name}</h2>
                <div style={{marginTop:6,fontSize:13,color:MUT}}><KidRating n={spot.kidFriendly} /> kid-friendly</div>
              </div>
              <div style={{padding:"10px 14px",background:"rgba(212,168,67,0.1)",borderRadius:8,border:"1px solid rgba(212,168,67,0.2)"}}>
                <div style={{fontSize:10,color:GOLD,fontWeight:700,letterSpacing:"0.1em",marginBottom:3}}>🍽️ MUST ORDER</div>
                <div style={{fontSize:14,color:TEXT}}>{spot.mustOrder}</div>
              </div>
              <p style={{fontSize:14,lineHeight:1.7,color:"rgba(232,234,212,0.8)",margin:0,fontStyle:"italic"}}>"{spot.review}"</p>
            </div>
          </div>
          <div style={{marginTop:20,padding:"14px 18px",background:SURF2,borderRadius:10,border:`1px solid ${BORDER}`,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontSize:18}}>⭐</span>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:700,color:G}}>Best points programs for {selected}</div>
              <div style={{fontSize:12,color:MUT,marginTop:2}}>{city.pointsProgram}</div>
            </div>
            <button onClick={()=>onPlanTrip(selected)} style={{padding:"7px 14px",background:"rgba(126,184,106,0.15)",border:`1px solid ${BORDER}`,borderRadius:6,color:G,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:F}}>Plan This Trip →</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{flex:1,overflowY:"auto",padding:"32px 36px"}}>
      <div style={{marginBottom:28}}>
        <h2 style={{fontSize:26,color:TEXT,margin:0,fontWeight:400}}>City Guides</h2>
        <p style={{color:MUT,fontSize:14,marginTop:6}}>Places we've actually been — restaurants, sights & honest family reviews.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
        {Object.entries(CITY_GUIDES).map(([name,city])=>(
          <div key={name} onClick={()=>{setSelected(name);setActiveSpot(0);}} style={{background:SURF,borderRadius:14,overflow:"hidden",border:`1px solid ${BORDER}`,cursor:"pointer",transition:"transform 0.15s, border-color 0.15s"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.borderColor="rgba(126,184,106,0.3)"}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor=BORDER}}>
            <div style={{background:`linear-gradient(135deg,${city.coverColor},${SURF})`,padding:"22px 20px 18px",borderBottom:`1px solid ${BORDER}`}}>
              <div style={{fontSize:36,marginBottom:8}}>{city.emoji}</div>
              <h3 style={{fontSize:18,margin:0,color:TEXT,fontWeight:400}}>{name}</h3>
              <p style={{fontSize:12,color:city.accent,margin:"4px 0 0",fontStyle:"italic"}}>{city.tagline}</p>
            </div>
            <div style={{padding:"14px 20px"}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10,flexWrap:"wrap"}}><VerifiedBadge /><BudgetBadge b={city.budgetRating} /></div>
              <div style={{fontSize:12,color:MUT,marginBottom:8}}><KidRating n={city.kidRating} /> family rating</div>
              <div style={{fontSize:12,color:MUT}}>{city.spots.length} verified spots · Visited {city.visited}</div>
              <div style={{marginTop:12,fontSize:12,color:G,fontWeight:600}}>View city guide →</div>
            </div>
          </div>
        ))}
        <div style={{background:SURF,borderRadius:14,border:`2px dashed rgba(126,184,106,0.2)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,textAlign:"center",minHeight:200}}>
          <div style={{fontSize:32,marginBottom:10}}>✍️</div>
          <div style={{fontSize:14,color:MUT,marginBottom:8}}>More cities coming soon</div>
          <div style={{fontSize:12,color:"rgba(126,184,106,0.5)"}}>Add your own guides as you travel</div>
        </div>
      </div>
    </div>
  );
}

const PLANNER_SYSTEM = `You are an expert family travel planner specializing in points & miles and food-focused travel. When given trip details, provide exactly these 4 sections with these exact headers:

## Destinations with Points
3 destinations reachable by points with specific programs and approximate point costs.

## Best Cards for This Trip  
2-3 credit cards with sign-on bonuses ideal for this trip. Mention current bonus amounts and annual fees.

## Day-by-Day Itinerary
A 3-5 day family itinerary with kid-friendly activities, morning/afternoon/evening structure.

## Food & Restaurants
4-6 must-try local restaurants or food experiences with what to order.

Be specific, practical, and enthusiastic. Use real points programs, real cards, and real restaurants.`;

function parseSections(text) {
  if (!text) return [];
  const emojiMap = {destination:"🌍",points:"⭐",card:"💳",itinerary:"📅",day:"📅",food:"🍽️",restaurant:"🍽️"};
  const lines = text.split("\n");
  const out=[]; let cur=null;
  for (const line of lines) {
    if (line.startsWith("## ")||line.startsWith("# ")) {
      if (cur) out.push(cur);
      const title = line.replace(/^#+\s*/,"").replace(/\*\*/g,"");
      const emoji = Object.entries(emojiMap).find(([k])=>title.toLowerCase().includes(k))?.[1]||"✨";
      cur={title,emoji,content:""};
    } else if (cur) {
      cur.content+=(cur.content?"\n":"")+line.replace(/\*\*/g,"").replace(/^###\s*/,"");
    }
  }
  if (cur) out.push(cur);
  return out.filter(s=>s.content.trim());
}

const TAB_COLORS = ["#1a3a5c","#2d5a2f","#5a2a1a","#3a1a5a"];

const ORIGIN_CITIES = ["Atlanta, GA","Austin, TX","Boston, MA","Charlotte, NC","Chicago, IL","Dallas, TX","Denver, CO","Detroit, MI","Houston, TX","Las Vegas, NV","Los Angeles, CA","Miami, FL","Minneapolis, MN","Nashville, TN","New York, NY","Orlando, FL","Philadelphia, PA","Phoenix, AZ","Portland, OR","San Diego, CA","San Francisco, CA","Seattle, WA","Washington, DC"];

const DESTINATION_OPTIONS = [
  {value:"",label:"Suggest based on my points"},
  {value:"Charleston, SC",label:"Charleston, SC 🌸"},
  {value:"Paris, France",label:"Paris, France 🗼"},
  {value:"London, England",label:"London, England 🎡"},
  {value:"Boston, MA",label:"Boston, MA 🦞"},
  {value:"New Orleans, LA",label:"New Orleans, LA 🎷"},
  {value:"Hawaii",label:"Hawaii 🌺"},
  {value:"Japan",label:"Japan 🗾"},
  {value:"Italy",label:"Italy 🍕"},
  {value:"Portugal",label:"Portugal 🧿"},
  {value:"Mexico",label:"Mexico 🌊"},
  {value:"Caribbean",label:"Caribbean 🏝️"},
  {value:"Costa Rica",label:"Costa Rica 🦜"},
  {value:"Iceland",label:"Iceland 🌋"},
  {value:"Thailand",label:"Thailand 🛕"},
];

const TRAVELER_OPTIONS = [
  {value:"Solo traveler",label:"🧍 Solo traveler"},
  {value:"2 adults",label:"👫 2 adults (no kids)"},
  {value:"2 adults, 1 young child",label:"👨‍👩‍👦 2 adults + 1 young child"},
  {value:"2 adults, 2 kids",label:"👨‍👩‍👧‍👦 2 adults + 2 kids"},
  {value:"2 adults, 3 kids",label:"👨‍👩‍👧‍👦 2 adults + 3 kids"},
  {value:"1 adult, 2 kids",label:"🧑‍👧‍👦 1 adult + 2 kids"},
  {value:"Extended family (6+)",label:"👪 Extended family (6+)"},
];

const WHEN_OPTIONS = [
  {value:"President's Week (February)",label:"🗓️ President's Week (Feb)"},
  {value:"Spring Break (March/April)",label:"🌸 Spring Break (Mar/Apr)"},
  {value:"Memorial Day weekend",label:"🇺🇸 Memorial Day Weekend"},
  {value:"Summer (June–August)",label:"☀️ Summer (Jun–Aug)"},
  {value:"Labor Day weekend",label:"🍂 Labor Day Weekend"},
  {value:"Fall (September–November)",label:"🍁 Fall (Sep–Nov)"},
  {value:"Thanksgiving week",label:"🦃 Thanksgiving Week"},
  {value:"Winter Break (December)",label:"❄️ Winter Break (Dec)"},
  {value:"Flexible — best time to go",label:"🎯 Flexible — best timing"},
];

const TRIP_LENGTH_OPTIONS = [
  {value:"Weekend (2–3 days)",label:"Weekend (2–3 days)"},
  {value:"Short trip (4–5 days)",label:"Short trip (4–5 days)"},
  {value:"1 week",label:"1 week"},
  {value:"10 days",label:"10 days"},
  {value:"2 weeks",label:"2 weeks"},
  {value:"3+ weeks",label:"3+ weeks"},
];

const BUDGET_OPTIONS = [
  {value:"Budget (under $2,000 total)",label:"💚 Budget — under $2,000"},
  {value:"Moderate ($2,000–$5,000 total)",label:"💛 Moderate — $2–5k"},
  {value:"Comfortable ($5,000–$10,000 total)",label:"🟠 Comfortable — $5–10k"},
  {value:"Luxury ($10,000+)",label:"💜 Luxury — $10k+"},
  {value:"Maximize points — minimize cash",label:"⭐ Maximize points / minimize cash"},
];

const POINTS_OPTIONS = [
  {value:"Chase Ultimate Rewards",label:"Chase UR"},
  {value:"Amex Membership Rewards",label:"Amex MR"},
  {value:"Capital One Miles",label:"Capital One Miles"},
  {value:"Citi ThankYou Points",label:"Citi ThankYou"},
  {value:"Delta SkyMiles",label:"Delta SkyMiles"},
  {value:"United MileagePlus",label:"United MileagePlus"},
  {value:"American AAdvantage",label:"AA AAdvantage"},
  {value:"Southwest Rapid Rewards",label:"Southwest RR"},
  {value:"JetBlue TrueBlue",label:"JetBlue TrueBlue"},
  {value:"World of Hyatt",label:"Hyatt"},
  {value:"Marriott Bonvoy",label:"Marriott Bonvoy"},
  {value:"Hilton Honors",label:"Hilton Honors"},
];

const INTEREST_OPTIONS = [
  {value:"great food & restaurants",label:"🍽️ Food"},
  {value:"beaches & water",label:"🏖️ Beaches"},
  {value:"history & culture",label:"🏛️ History"},
  {value:"theme parks",label:"🎢 Theme Parks"},
  {value:"museums & art",label:"🎨 Museums"},
  {value:"outdoor adventures",label:"🥾 Outdoors"},
  {value:"shopping",label:"🛍️ Shopping"},
  {value:"live music & nightlife",label:"🎭 Nightlife"},
  {value:"relaxation & spas",label:"🧘 Relaxation"},
  {value:"sports",label:"⚽ Sports"},
];

function Planner({ prefillCity, onViewGuides, onViewTracker }) {
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [matchedCity, setMatchedCity] = useState(null);
  const [form, setForm] = useState({
    origin:"", destination: prefillCity||"", travelers:"", when:"", tripLength:"", budget:"", points:[], interests:[],
  });

  const setField = (k,v) => setForm(f=>({...f,[k]:v}));
  const toggleChip = (k,v) => setForm(f=>({...f,[k]:f[k].includes(v)?f[k].filter(x=>x!==v):[...f[k],v]}));

  const isReady = form.origin && form.travelers && form.when && form.tripLength;

  const handleSubmit = async () => {
    if (!isReady) return;
    setLoading(true); setStep("loading");
    const match = Object.keys(CITY_GUIDES).find(c=>form.destination?.toLowerCase().includes(c.toLowerCase())||c.toLowerCase().includes(form.destination?.toLowerCase()));
    setMatchedCity(match||null);
    const cityContext = match?`\n\nNote: We have verified personal reviews for ${match}. Spots: ${CITY_GUIDES[match].spots.map(s=>`${s.name} (${s.type}, ${s.budget}, must-order: ${s.mustOrder})`).join("; ")}. Incorporate these and mark as verified family picks.`:"";
    const prompt = `Plan a family trip:\n- From: ${form.origin}\n- To: ${form.destination||"suggest based on points"}\n- Travelers: ${form.travelers}\n- When: ${form.when}\n- Trip length: ${form.tripLength}\n- Budget: ${form.budget||"flexible"}\n- Points: ${form.points.length?form.points.join(", "):"open to any"}\n- Interests: ${form.interests.length?form.interests.join(", "):"sightseeing, great food"}${cityContext}`;
    try {
      const res = await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:PLANNER_SYSTEM,messages:[{role:"user",content:prompt}]})});
      const data = await res.json();
      setResult(data.content?.map(b=>b.text||"").join("\n")||"No response.");
      setStep("result"); setActiveTab(0);
    } catch { setResult("Something went wrong. Please try again."); setStep("result"); }
    setLoading(false);
  };

  const sections = parseSections(result);
  const lbl = (icon,text) => <label style={{display:"block",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:G,marginBottom:7}}>{icon} {text}</label>;

  return (
    <div style={{flex:1,overflowY:"auto",padding:"32px 40px",maxWidth:800,margin:"0 auto",width:"100%"}}>
      {step==="form" && (
        <div>
          <div style={{textAlign:"center",marginBottom:36}}>
            <h1 style={{fontSize:"clamp(26px,5vw,42px)",fontWeight:400,lineHeight:1.15,marginBottom:10,color:TEXT}}>Turn Your Points Into<br/><span style={{color:G,fontStyle:"italic"}}>Family Adventures</span></h1>
            <p style={{color:MUT,fontSize:14,maxWidth:420,margin:"0 auto"}}>We'll build your trip plan — and pull in our verified restaurant picks if we've been there.</p>
          </div>
          {prefillCity && (
            <div style={{marginBottom:20,padding:"12px 16px",background:"rgba(126,184,106,0.1)",border:`1px solid ${BORDER}`,borderRadius:8,display:"flex",gap:10,alignItems:"center"}}>
              <span>📍</span><div style={{fontSize:13,color:TEXT}}>Planning a trip to <strong style={{color:G}}>{prefillCity}</strong> — we have verified picks for this city!</div>
            </div>
          )}
          <div style={{display:"grid",gap:18}}>
            {/* Row 1: Origin + Destination */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div>
                {lbl("📍","Flying from")}
                <StyledSelect value={form.origin} onChange={v=>setField("origin",v)} placeholder="Select departure city">
                  {ORIGIN_CITIES.map(c=><option key={c} value={c} style={{background:"#111f13",color:TEXT}}>{c}</option>)}
                </StyledSelect>
              </div>
              <div>
                {lbl("🗺️","Destination")}
                <StyledSelect value={form.destination} onChange={v=>setField("destination",v)} placeholder="Where to?">
                  {DESTINATION_OPTIONS.map(o=><option key={o.value} value={o.value} style={{background:"#111f13",color:TEXT}}>{o.label}</option>)}
                </StyledSelect>
              </div>
            </div>
            {/* Row 2: Travelers + Trip Length */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div>
                {lbl("👨‍👩‍👧‍👦","Who's traveling")}
                <StyledSelect value={form.travelers} onChange={v=>setField("travelers",v)} placeholder="Select group">
                  {TRAVELER_OPTIONS.map(o=><option key={o.value} value={o.value} style={{background:"#111f13",color:TEXT}}>{o.label}</option>)}
                </StyledSelect>
              </div>
              <div>
                {lbl("🗓️","Trip length")}
                <StyledSelect value={form.tripLength} onChange={v=>setField("tripLength",v)} placeholder="How long?">
                  {TRIP_LENGTH_OPTIONS.map(o=><option key={o.value} value={o.value} style={{background:"#111f13",color:TEXT}}>{o.label}</option>)}
                </StyledSelect>
              </div>
            </div>
            {/* Row 3: When + Budget */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div>
                {lbl("📅","When")}
                <StyledSelect value={form.when} onChange={v=>setField("when",v)} placeholder="Travel window">
                  {WHEN_OPTIONS.map(o=><option key={o.value} value={o.value} style={{background:"#111f13",color:TEXT}}>{o.label}</option>)}
                </StyledSelect>
              </div>
              <div>
                {lbl("💰","Budget")}
                <StyledSelect value={form.budget} onChange={v=>setField("budget",v)} placeholder="Budget range">
                  {BUDGET_OPTIONS.map(o=><option key={o.value} value={o.value} style={{background:"#111f13",color:TEXT}}>{o.label}</option>)}
                </StyledSelect>
              </div>
            </div>
            {/* Points chips */}
            <div style={{padding:"15px 17px",background:"rgba(255,255,255,0.025)",border:`1px solid ${BORDER}`,borderRadius:10}}>
              {lbl("⭐","Points & miles you have")}
              <ChipSelect options={POINTS_OPTIONS} selected={form.points} onToggle={v=>toggleChip("points",v)} />
              {form.points.length>0&&<div style={{marginTop:9,fontSize:11,color:G}}>✓ {form.points.join(" · ")}</div>}
            </div>
            {/* Interests chips */}
            <div style={{padding:"15px 17px",background:"rgba(255,255,255,0.025)",border:`1px solid ${BORDER}`,borderRadius:10}}>
              {lbl("🎯","Family interests")}
              <ChipSelect options={INTEREST_OPTIONS} selected={form.interests} onToggle={v=>toggleChip("interests",v)} />
            </div>
            <button onClick={handleSubmit} disabled={!isReady}
              style={{marginTop:4,padding:"15px 28px",background:isReady?`linear-gradient(135deg,${G},#5a9a3a)`:"rgba(255,255,255,0.06)",border:"none",borderRadius:8,color:isReady?BG:MUT,fontSize:14,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",cursor:isReady?"pointer":"not-allowed",fontFamily:F,transition:"all 0.2s"}}>
              Plan My Family Trip →
            </button>
            {!isReady&&<div style={{fontSize:11,color:MUT,textAlign:"center",marginTop:-10}}>Select departure city, group, travel window & trip length to continue</div>}
          </div>
        </div>
      )}
      {step==="loading" && (
        <div style={{textAlign:"center",padding:"80px 0"}}>
          <div style={{fontSize:48,marginBottom:20,animation:"spin 2s linear infinite",display:"inline-block"}}>🌍</div>
          <h2 style={{fontSize:22,color:G,marginBottom:10}}>Planning your adventure...</h2>
          <p style={{color:MUT}}>Finding destinations, cards & pulling in our verified restaurant picks</p>
        </div>
      )}
      {step==="result" && (
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
            <div>
              <h2 style={{fontSize:24,color:TEXT,margin:0,fontWeight:400}}>Your Family Travel Plan</h2>
              <p style={{color:MUT,fontSize:12,marginTop:4}}>From {form.origin} · {form.travelers} · {form.tripLength}</p>
            </div>
            <button onClick={()=>{setStep("form");setResult("");setMatchedCity(null);}} style={{padding:"8px 16px",background:"transparent",border:"1px solid rgba(232,234,212,0.15)",borderRadius:6,color:TEXT,cursor:"pointer",fontSize:13,fontFamily:F}}>← New Trip</button>
          </div>
          {matchedCity&&(
            <div style={{marginBottom:20,padding:"14px 18px",background:"rgba(126,184,106,0.1)",border:`1px solid ${BORDER}`,borderRadius:10,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{fontSize:22}}>{CITY_GUIDES[matchedCity].emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:G}}>✓ We've been to {matchedCity}!</div>
                <div style={{fontSize:12,color:MUT,marginTop:2}}>Our verified family picks are woven into this plan.</div>
              </div>
              <button onClick={onViewGuides} style={{padding:"7px 14px",background:G,border:"none",borderRadius:6,color:BG,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:F,whiteSpace:"nowrap"}}>View City Guide →</button>
            </div>
          )}
          {sections.length>1?(
            <div>
              <div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap"}}>
                {sections.map((s,i)=>(
                  <button key={i} onClick={()=>setActiveTab(i)} style={{padding:"7px 14px",borderRadius:18,border:"none",background:activeTab===i?TAB_COLORS[i%TAB_COLORS.length]:"rgba(255,255,255,0.07)",color:TEXT,cursor:"pointer",fontSize:12,fontWeight:activeTab===i?700:400,fontFamily:F}}>{s.emoji} {s.title}</button>
                ))}
              </div>
              <div style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${TAB_COLORS[activeTab%TAB_COLORS.length]}40`,borderRadius:12,padding:22,borderTop:`3px solid ${TAB_COLORS[activeTab%TAB_COLORS.length]}`}}>
                <h3 style={{color:G,marginTop:0,marginBottom:12,fontSize:16}}>{sections[activeTab].emoji} {sections[activeTab].title}</h3>
                <div style={{color:"rgba(232,234,212,0.85)",lineHeight:1.75,fontSize:14,whiteSpace:"pre-wrap"}}>{sections[activeTab].content}</div>
              </div>
            </div>
          ):(
            <div style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${BORDER}`,borderRadius:12,padding:22,color:"rgba(232,234,212,0.85)",lineHeight:1.75,fontSize:14,whiteSpace:"pre-wrap"}}>{result}</div>
          )}
          <div style={{display:"flex",gap:12,marginTop:18,flexWrap:"wrap"}}>
            <button onClick={onViewTracker} style={{flex:1,padding:"12px 16px",background:SURF,border:`1px solid ${BORDER}`,borderRadius:8,color:TEXT,cursor:"pointer",fontSize:13,fontFamily:F,fontWeight:600}}>📊 Check Card Bonus Timing →</button>
            <button style={{flex:1,padding:"12px 16px",background:G,border:"none",borderRadius:8,color:BG,cursor:"pointer",fontSize:13,fontFamily:F,fontWeight:700}}>💳 Apply for a Card →</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ChartTip({active,payload,label}) {
  if(!active||!payload?.length) return null;
  return <div style={{background:"#0a1a0c",border:`1px solid ${BORDER}`,borderRadius:8,padding:"8px 14px",fontSize:13,fontFamily:F}}><div style={{color:G,fontWeight:700,marginBottom:2}}>{label}</div><div style={{color:TEXT}}>{payload[0].value.toLocaleString()} pts</div></div>;
}

function Tracker() {
  const [selected,setSelected]=useState("Chase Sapphire Preferred");
  const [search,setSearch]=useState("");
  const [filter,setFilter]=useState("All");
  const [aiInsight,setAiInsight]=useState("");
  const [loadingAI,setLoadingAI]=useState(false);
  const card=CARD_DB[selected];
  const hist=card.history.map(h=>({month:h.m,bonus:h.b}));
  const active=hist.filter(h=>h.bonus>0);
  const cur=hist[hist.length-1];
  const max=Math.max(...active.map(h=>h.bonus));
  const min=Math.min(...active.map(h=>h.bonus));
  const avg=Math.round(active.reduce((a,b)=>a+b.bonus,0)/active.length);
  const isHigh=cur.bonus>=max;
  const isLow=cur.bonus>0&&cur.bonus<=min;
  const names=Object.keys(CARD_DB).filter(n=>n.toLowerCase().includes(search.toLowerCase())&&(filter==="All"||CARD_DB[n].issuer===filter));
  const getInsight=async()=>{
    setLoadingAI(true);setAiInsight("");
    try{const res=await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:"You are a credit card rewards expert. Be concise — 3 sentences max. No markdown.",messages:[{role:"user",content:`Analyze the ${selected} sign-on bonus timing. Current: ${cur.bonus.toLocaleString()} pts. 12-mo high: ${max.toLocaleString()}. Low: ${min.toLocaleString()}. Avg: ${avg.toLocaleString()}. Annual fee: $${card.annualFee}. Should I apply now?`}]})});const data=await res.json();setAiInsight(data.content?.map(b=>b.text||"").join("")||"Unable to load.");}catch{setAiInsight("Something went wrong.");}
    setLoadingAI(false);
  };
  return (
    <div style={{display:"flex",flex:1,minHeight:0,overflow:"hidden"}}>
      <div style={{width:250,background:"#0a160b",borderRight:`1px solid ${BORDER}`,display:"flex",flexDirection:"column",overflowY:"auto"}}>
        <div style={{padding:14}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search cards..." style={{width:"100%",padding:"8px 11px",background:"rgba(255,255,255,0.04)",border:`1px solid ${BORDER}`,borderRadius:7,color:TEXT,fontSize:12,outline:"none",boxSizing:"border-box",fontFamily:F}}/>
          <div style={{display:"flex",gap:4,marginTop:9,flexWrap:"wrap"}}>
            {["All","Chase","Citi","Amex","Capital One"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{padding:"3px 8px",borderRadius:9,border:"none",background:filter===f?G:"rgba(255,255,255,0.06)",color:filter===f?BG:MUT,fontSize:10,cursor:"pointer",fontFamily:F,fontWeight:filter===f?700:400}}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"0 6px 14px"}}>
          {names.map(name=>{
            const c=CARD_DB[name];const latest=c.history[c.history.length-1].b;const cmax=Math.max(...c.history.filter(h=>h.b>0).map(h=>h.b));const isPeak=latest>=cmax&&latest>0;const isSel=selected===name;
            return (
              <div key={name} onClick={()=>{setSelected(name);setAiInsight("");}} style={{padding:"10px 11px",borderRadius:7,marginBottom:3,cursor:"pointer",background:isSel?`${c.color}cc`:"transparent",border:isSel?`1px solid ${c.accent}44`:"1px solid transparent",transition:"all 0.15s"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{fontSize:12,fontWeight:isSel?700:400,color:isSel?"#f0f0e0":"rgba(232,234,212,0.65)",lineHeight:1.3}}>{name}</div>
                  {isPeak&&<span style={{fontSize:8,padding:"1px 5px",borderRadius:5,background:"rgba(126,184,106,0.2)",color:G,border:`1px solid rgba(126,184,106,0.4)`,fontWeight:700,marginLeft:3,whiteSpace:"nowrap"}}>PEAK</span>}
                </div>
                <div style={{fontSize:11,color:isSel?c.accent:MUT,marginTop:2}}>{latest>0?fmt(latest)+" pts":"New"} · ${c.annualFee}/yr</div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"22px 26px"}}>
        <div style={{background:`linear-gradient(135deg,${card.color},${card.color}bb)`,borderRadius:12,padding:"20px 24px",marginBottom:18,border:`1px solid ${card.accent}33`,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",right:-10,top:-10,width:80,height:80,borderRadius:"50%",background:`${card.accent}10`}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:14}}>
            <div>
              <div style={{fontSize:9,letterSpacing:"0.18em",textTransform:"uppercase",color:card.accent,marginBottom:4}}>{card.program}</div>
              <h2 style={{fontSize:20,margin:0,color:"#f0f0e0",fontWeight:400}}>{selected}</h2>
              <div style={{fontSize:11,color:"rgba(240,240,224,0.4)",marginTop:3}}>${card.annualFee}/year</div>
            </div>
            {cur.bonus>0&&<div style={{textAlign:"right"}}><div style={{fontSize:30,fontWeight:700,color:card.accent,lineHeight:1}}>{cur.bonus.toLocaleString()}</div><div style={{fontSize:10,color:"rgba(240,240,224,0.4)"}}>current offer (pts)</div></div>}
          </div>
          {cur.bonus>0&&<div style={{display:"flex",gap:18,marginTop:14,flexWrap:"wrap"}}>{[{l:"12-mo High",v:max.toLocaleString()},{l:"12-mo Avg",v:avg.toLocaleString()},{l:"12-mo Low",v:min.toLocaleString()}].map(({l,v})=>(<div key={l}><div style={{fontSize:9,color:"rgba(240,240,224,0.3)",letterSpacing:"0.1em",textTransform:"uppercase"}}>{l}</div><div style={{fontSize:14,fontWeight:600,color:"#f0f0e0",marginTop:1}}>{v}</div></div>))}</div>}
          <div style={{marginTop:12}}>{cur.bonus>0&&(isHigh?<span style={{padding:"4px 11px",borderRadius:14,background:"rgba(126,184,106,0.2)",color:G,border:`1px solid rgba(126,184,106,0.4)`,fontSize:11,fontWeight:700}}>🏆 At 12-Month High — Great Time to Apply!</span>:isLow?<span style={{padding:"4px 11px",borderRadius:14,background:"rgba(200,80,80,0.15)",color:"#e08080",border:"1px solid rgba(200,80,80,0.3)",fontSize:11,fontWeight:700}}>⏳ At 12-Month Low — Consider Waiting</span>:<span style={{padding:"4px 11px",borderRadius:14,background:"rgba(200,160,60,0.12)",color:"#d4b84a",border:"1px solid rgba(200,160,60,0.3)",fontSize:11,fontWeight:700}}>📊 Average Offer — Higher offers have been available</span>)}</div>
        </div>
        {active.length>0&&<div style={{background:SURF,borderRadius:11,border:`1px solid ${BORDER}`,padding:"18px 20px",marginBottom:16}}>
          <div style={{fontSize:10,letterSpacing:"0.14em",textTransform:"uppercase",color:MUT,marginBottom:14}}>12-Month History</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={active} margin={{top:4,right:8,left:0,bottom:4}}>
              <XAxis dataKey="month" tick={{fill:MUT,fontSize:9}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:MUT,fontSize:9}} axisLine={false} tickLine={false} tickFormatter={v=>fmt(v)} domain={[min*0.85,max*1.1]}/>
              <Tooltip content={<ChartTip/>}/>
              <ReferenceLine y={avg} stroke="rgba(232,234,212,0.1)" strokeDasharray="4 4"/>
              <Line type="monotone" dataKey="bonus" stroke={card.accent} strokeWidth={2.5} dot={{fill:card.accent,r:3,strokeWidth:0}} activeDot={{r:5}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>}
        <div style={{background:SURF,borderRadius:11,border:`1px solid rgba(126,184,106,0.15)`,padding:"18px 20px",marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
            <div style={{fontSize:10,letterSpacing:"0.14em",textTransform:"uppercase",color:MUT}}>🤖 AI Timing Analysis</div>
            <button onClick={getInsight} disabled={loadingAI} style={{padding:"6px 14px",background:"rgba(126,184,106,0.12)",border:`1px solid ${BORDER}`,borderRadius:5,color:G,fontSize:11,cursor:loadingAI?"not-allowed":"pointer",fontFamily:F,fontWeight:600}}>{loadingAI?"Analyzing...":"Should I Apply Now?"}</button>
          </div>
          {aiInsight?<div style={{fontSize:13,lineHeight:1.7,color:"rgba(232,234,212,0.85)"}}>{aiInsight}</div>:<div style={{fontSize:12,color:MUT,fontStyle:"italic"}}>Click "Should I Apply Now?" for an AI recommendation based on this card's historical bonus patterns.</div>}
        </div>
        <div style={{padding:"14px 18px",background:"rgba(126,184,106,0.07)",border:`1px solid ${BORDER}`,borderRadius:9,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <span style={{fontSize:18}}>💳</span>
          <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:G}}>Ready to earn those points?</div><div style={{fontSize:11,color:MUT,marginTop:1}}>Apply now to hit the sign-on bonus before your next trip.</div></div>
          <button style={{padding:"8px 16px",background:G,border:"none",borderRadius:5,color:BG,fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:F}}>Apply Now →</button>
        </div>
      </div>
    </div>
  );
}

// ─── TRANSFER BONUS TRACKER ───────────────────────────────────────────────────
const REFRESH_SYSTEM = `You are a points & miles expert with web search access. Find ALL currently active credit card transfer bonuses.

Search for current transfer bonus offers from Chase, Amex, Citi, and Capital One to airline and hotel partners. Check recent posts on frequentmiler.com, thepointsguy.com, and awardsummary.com.

Return ONLY a valid JSON array (no markdown, no preamble) in this exact structure:
[{"id":"chase-hyatt","bonus":30,"expiry":"Mar 31, 2025"}]

Valid IDs: chase-hyatt, chase-united, amex-avianca, amex-virgin, amex-airfrance, amex-hilton, citi-turkish, citi-singapore, cap1-turkish, cap1-avianca

Only include partnerships with a CONFIRMED active bonus right now. Set bonus to the integer percentage (e.g. 30 for 30% bonus). If none are active, return [].`;

function TransferTracker() {
  const [selected, setSelected] = useState(TRANSFER_DB[0].id);
  const [filterProgram, setFilterProgram] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [search, setSearch] = useState("");
  const [liveOverrides, setLiveOverrides] = useState(null); // null = not yet refreshed
  const [refreshState, setRefreshState] = useState("idle"); // idle | loading | done | error
  const [refreshMsg, setRefreshMsg] = useState("");
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const handleAIRefresh = async () => {
    setRefreshState("loading");
    setRefreshMsg("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: REFRESH_SYSTEM,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{ role: "user", content: "Search now for all currently active credit card transfer bonuses and return the JSON array." }],
        }),
      });
      const data = await res.json();
      const fullText = (data.content || []).map(b => b.type === "text" ? b.text : "").join("\n");
      const jsonMatch = fullText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("No JSON found");
      const updates = JSON.parse(jsonMatch[0]);

      // Build override map: default everyone to 0, then apply live results
      const overrides = {};
      TRANSFER_DB.forEach(t => { overrides[t.id] = { bonus: 0, expiry: null }; });
      updates.forEach(u => {
        if (u.id in overrides) overrides[u.id] = { bonus: u.bonus || 0, expiry: u.expiry || null };
      });

      setLiveOverrides(overrides);
      setLastRefreshed(new Date());
      const count = updates.length;
      setRefreshMsg(`AI found ${count} active bonus${count !== 1 ? "es" : ""} right now.`);
      setRefreshState("done");
    } catch (err) {
      setRefreshMsg("Could not parse live data. Showing historical data.");
      setRefreshState("error");
    }
  };

  // Merge static DB with live overrides when available
  const mergedDB = TRANSFER_DB.map(t => {
    if (!liveOverrides) return t;
    const ov = liveOverrides[t.id];
    if (!ov) return t;
    const histWithoutLast = t.history.slice(0, -1);
    return {
      ...t,
      liveExpiry: ov.expiry,
      history: [...histWithoutLast, { m: "Now", bonus: ov.bonus }],
    };
  });

  const programs = ["All", ...Array.from(new Set(mergedDB.map(t=>t.programShort)))];
  const types = ["All","Airline","Hotel"];

  const filtered = mergedDB.filter(t => {
    const matchProgram = filterProgram === "All" || t.programShort === filterProgram;
    const matchType = filterType === "All" || t.partnerType === filterType;
    const matchSearch = !search || t.partner.toLowerCase().includes(search.toLowerCase()) || t.program.toLowerCase().includes(search.toLowerCase());
    return matchProgram && matchType && matchSearch;
  });

  const current = mergedDB.find(t => t.id === selected) || mergedDB[0];
  const lastBonus = current.history[current.history.length - 1];
  const isActive = lastBonus?.bonus > 0;
  const activeMonths = current.history.filter(h=>h.bonus>0);
  const maxBonus = activeMonths.length ? Math.max(...activeMonths.map(h=>h.bonus)) : 0;
  const avgBonus = activeMonths.length ? Math.round(activeMonths.reduce((a,b)=>a+b.bonus,0)/activeMonths.length) : 0;
  const frequency = activeMonths.length;

  const chartData = current.history.map(h => ({month:h.m, bonus: h.bonus}));

  // Active deals summary
  const activeDeals = mergedDB.filter(t => {
    const last = t.history[t.history.length-1];
    return last && last.bonus > 0;
  });

  return (
    <div style={{display:"flex",flex:1,minHeight:0,overflow:"hidden"}}>
      {/* Sidebar */}
      <div style={{width:270,background:"#0a160b",borderRight:`1px solid ${BORDER}`,display:"flex",flexDirection:"column",overflowY:"auto",flexShrink:0}}>

        {/* AI Refresh button */}
        <div style={{padding:"12px 10px 8px"}}>
          <button
            onClick={handleAIRefresh}
            disabled={refreshState==="loading"}
            style={{
              width:"100%", padding:"10px 14px",
              background: refreshState==="loading" ? "rgba(126,184,106,0.08)" : "linear-gradient(135deg,rgba(126,184,106,0.2),rgba(90,154,58,0.15))",
              border:`1px solid ${refreshState==="done"?G:refreshState==="error"?"#e05c5c":"rgba(126,184,106,0.3)"}`,
              borderRadius:8, color: refreshState==="error"?"#e05c5c":G,
              fontSize:12, fontWeight:700, cursor:refreshState==="loading"?"not-allowed":"pointer",
              fontFamily:F, display:"flex", alignItems:"center", justifyContent:"center", gap:7,
              transition:"all 0.2s",
            }}
          >
            <span style={{fontSize:14}}>{refreshState==="loading" ? "⏳" : refreshState==="done" ? "✅" : refreshState==="error" ? "⚠️" : "🤖"}</span>
            {refreshState==="loading" ? "Searching the web..." : "AI Refresh Live Bonuses"}
          </button>
          {refreshMsg && (
            <div style={{fontSize:10,color:refreshState==="error"?"#e05c5c":G,marginTop:5,textAlign:"center",fontStyle:"italic"}}>{refreshMsg}</div>
          )}
          {lastRefreshed && (
            <div style={{fontSize:9,color:MUT,marginTop:2,textAlign:"center"}}>
              Last updated: {lastRefreshed.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}
            </div>
          )}
          {!liveOverrides && refreshState==="idle" && (
            <div style={{fontSize:9,color:MUT,marginTop:4,textAlign:"center",fontStyle:"italic"}}>Showing historical data · click to fetch live bonuses</div>
          )}
        </div>

        {/* Active now banner */}
        {activeDeals.length > 0 && (
          <div style={{margin:"0 8px 4px",padding:"10px 12px",background:"rgba(126,184,106,0.12)",border:`1px solid rgba(126,184,106,0.3)`,borderRadius:8}}>
            <div style={{fontSize:10,fontWeight:700,color:G,letterSpacing:"0.1em",marginBottom:4}}>
              🔥 {liveOverrides?"LIVE NOW":"HISTORICALLY ACTIVE"} — {activeDeals.length} OFFER{activeDeals.length>1?"S":""}
            </div>
            {activeDeals.map(d=>(
              <div key={d.id} onClick={()=>setSelected(d.id)} style={{fontSize:11,color:TEXT,cursor:"pointer",padding:"2px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span>{d.partnerEmoji} {d.partner}</span>
                <span style={{color:G,fontWeight:700}}>+{d.history[d.history.length-1].bonus}%</span>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div style={{padding:"10px 10px 6px"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search partner..."
            style={{width:"100%",padding:"7px 10px",background:"rgba(255,255,255,0.04)",border:`1px solid ${BORDER}`,borderRadius:7,color:TEXT,fontSize:12,outline:"none",boxSizing:"border-box",fontFamily:F}}/>
          <div style={{display:"flex",gap:4,marginTop:8,flexWrap:"wrap"}}>
            {programs.map(p=>(
              <button key={p} onClick={()=>setFilterProgram(p)} style={{padding:"3px 8px",borderRadius:8,border:"none",background:filterProgram===p?G:"rgba(255,255,255,0.06)",color:filterProgram===p?BG:MUT,fontSize:9,cursor:"pointer",fontFamily:F,fontWeight:filterProgram===p?700:400}}>{p}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:4,marginTop:5}}>
            {types.map(t=>(
              <button key={t} onClick={()=>setFilterType(t)} style={{padding:"3px 8px",borderRadius:8,border:"none",background:filterType===t?"rgba(212,168,67,0.8)":"rgba(255,255,255,0.06)",color:filterType===t?BG:MUT,fontSize:9,cursor:"pointer",fontFamily:F,fontWeight:filterType===t?700:400}}>{t}</button>
            ))}
          </div>
        </div>

        {/* List */}
        <div style={{flex:1,overflowY:"auto",padding:"0 6px 14px"}}>
          {filtered.map(t => {
            const last = t.history[t.history.length-1];
            const live = last?.bonus > 0;
            const isSel = selected === t.id;
            return (
              <div key={t.id} onClick={()=>setSelected(t.id)}
                style={{padding:"10px 11px",borderRadius:8,marginBottom:3,cursor:"pointer",
                  background: isSel ? `${t.programColor}cc` : "transparent",
                  border: isSel ? `1px solid ${t.programAccent}44` : "1px solid transparent",
                  transition:"all 0.15s"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:4}}>
                  <div style={{fontSize:12,fontWeight:isSel?700:400,color:isSel?"#f0f0e0":"rgba(232,234,212,0.65)",lineHeight:1.3}}>
                    {t.partnerEmoji} {t.partner}
                  </div>
                  {live && <span style={{fontSize:9,padding:"2px 6px",borderRadius:5,background:"rgba(126,184,106,0.25)",color:G,border:`1px solid rgba(126,184,106,0.5)`,fontWeight:700,whiteSpace:"nowrap",flexShrink:0}}>+{last.bonus}%</span>}
                </div>
                <div style={{fontSize:10,color:isSel?t.programAccent:MUT,marginTop:2}}>{t.programShort} · {t.partnerType}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div style={{flex:1,overflowY:"auto",padding:"22px 28px"}}>
        {/* Header card */}
        <div style={{background:`linear-gradient(135deg,${current.programColor},${current.programColor}99)`,borderRadius:14,padding:"22px 26px",marginBottom:18,border:`1px solid ${current.programAccent}33`,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",right:-20,top:-20,width:120,height:120,borderRadius:"50%",background:`${current.programAccent}08`}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:14}}>
            <div>
              <div style={{fontSize:9,letterSpacing:"0.18em",textTransform:"uppercase",color:current.programAccent,marginBottom:4}}>{current.programShort} → {current.partnerType}</div>
              <h2 style={{fontSize:22,margin:"0 0 4px",color:"#f0f0e0",fontWeight:400}}>
                {current.partnerEmoji} {current.partner}
              </h2>
              <div style={{fontSize:12,color:"rgba(240,240,224,0.45)",marginBottom:10}}>Base transfer ratio: <strong style={{color:"rgba(240,240,224,0.7)"}}>{current.baseRatio}</strong></div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {current.cards.map(c=>(
                  <span key={c} style={{fontSize:10,padding:"2px 8px",borderRadius:8,background:"rgba(255,255,255,0.08)",color:"rgba(240,240,224,0.6)",border:"1px solid rgba(255,255,255,0.1)"}}>{c}</span>
                ))}
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              {isActive ? (
                <div>
                  <div style={{fontSize:36,fontWeight:700,color:G,lineHeight:1}}>+{lastBonus.bonus}%</div>
                  <div style={{fontSize:10,color:"rgba(240,240,224,0.4)"}}>ACTIVE NOW</div>
                </div>
              ) : (
                <div>
                  <div style={{fontSize:20,color:"rgba(240,240,224,0.3)"}}>No offer</div>
                  <div style={{fontSize:10,color:"rgba(240,240,224,0.25)"}}>currently active</div>
                </div>
              )}
            </div>
          </div>

          {/* Status pill */}
          <div style={{marginTop:14,display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"}}>
            {isActive
              ? <span style={{padding:"4px 12px",borderRadius:14,background:"rgba(126,184,106,0.2)",color:G,border:`1px solid rgba(126,184,106,0.4)`,fontSize:11,fontWeight:700}}>
                  {liveOverrides ? "✅ CONFIRMED LIVE — act before it expires!" : "📊 Was active recently — AI Refresh to confirm"}
                </span>
              : maxBonus > 0
              ? <span style={{padding:"4px 12px",borderRadius:14,background:"rgba(200,160,60,0.12)",color:"#d4b84a",border:"1px solid rgba(200,160,60,0.3)",fontSize:11,fontWeight:700}}>
                  ⏳ {liveOverrides ? "No active offer right now" : "Not currently active (historical)"} · runs {frequency}× in last 12 mo
                </span>
              : <span style={{padding:"4px 12px",borderRadius:14,background:"rgba(150,150,150,0.1)",color:MUT,border:"1px solid rgba(150,150,150,0.2)",fontSize:11,fontWeight:700}}>📊 Rare bonus — monitor for future offers</span>
            }
            {current.liveExpiry && <span style={{padding:"4px 10px",borderRadius:14,background:"rgba(212,168,67,0.12)",color:GOLD,border:"1px solid rgba(212,168,67,0.25)",fontSize:10,fontWeight:600}}>⏰ Expires: {current.liveExpiry}</span>}
          </div>
        </div>

        {/* Stats row */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:18}}>
          {[
            {label:"Highest Bonus",value: maxBonus ? `+${maxBonus}%` : "—",color:G},
            {label:"Avg Bonus (active months)",value: avgBonus ? `+${avgBonus}%` : "—",color:GOLD},
            {label:"Offers in Last 12 Mo",value:`${frequency}×`,color:current.programAccent},
          ].map(({label,value,color})=>(
            <div key={label} style={{background:SURF,borderRadius:10,padding:"14px 16px",border:`1px solid ${BORDER}`}}>
              <div style={{fontSize:9,letterSpacing:"0.12em",textTransform:"uppercase",color:MUT,marginBottom:6}}>{label}</div>
              <div style={{fontSize:24,fontWeight:700,color,lineHeight:1}}>{value}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{background:SURF,borderRadius:12,border:`1px solid ${BORDER}`,padding:"18px 20px",marginBottom:18}}>
          <div style={{fontSize:10,letterSpacing:"0.14em",textTransform:"uppercase",color:MUT,marginBottom:6}}>12-Month Transfer Bonus History</div>
          <div style={{fontSize:11,color:MUT,marginBottom:14,fontStyle:"italic"}}>0% = no offer active that month · bars show bonus percentage above base ratio</div>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={chartData} margin={{top:4,right:8,left:0,bottom:4}}>
              <XAxis dataKey="month" tick={{fill:MUT,fontSize:9}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:MUT,fontSize:9}} axisLine={false} tickLine={false} tickFormatter={v=>v>0?`+${v}%`:"0"} domain={[0, (maxBonus||30)*1.3]}/>
              <Tooltip content={({active,payload,label})=>{
                if(!active||!payload?.length) return null;
                return (
                  <div style={{background:"#0a1a0c",border:`1px solid ${BORDER}`,borderRadius:8,padding:"8px 14px",fontSize:13,fontFamily:F}}>
                    <div style={{color:G,fontWeight:700,marginBottom:2}}>{label}</div>
                    <div style={{color:TEXT}}>{payload[0].value > 0 ? `+${payload[0].value}% transfer bonus` : "No offer"}</div>
                  </div>
                );
              }}/>
              <ReferenceLine y={0} stroke="rgba(232,234,212,0.06)"/>
              <Line type="stepAfter" dataKey="bonus" stroke={current.programAccent} strokeWidth={2.5}
                dot={(props)=>{
                  const {cx,cy,value} = props;
                  if(value===0) return <circle key={`dot-${cx}`} cx={cx} cy={cy} r={3} fill="rgba(232,234,212,0.1)" stroke="none"/>;
                  return <circle key={`dot-${cx}`} cx={cx} cy={cy} r={5} fill={G} stroke="#0a1a0c" strokeWidth={2}/>;
                }}
                activeDot={{r:6,fill:G}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Analyst note */}
        <div style={{background:"rgba(212,168,67,0.06)",border:`1px solid rgba(212,168,67,0.15)`,borderRadius:10,padding:"16px 20px",marginBottom:18}}>
          <div style={{fontSize:10,color:GOLD,fontWeight:700,letterSpacing:"0.12em",marginBottom:6}}>💡 TRANSFER STRATEGY NOTE</div>
          <div style={{fontSize:13,color:"rgba(232,234,212,0.8)",lineHeight:1.7}}>{current.notes}</div>
        </div>

        {/* All active offers strip */}
        {activeDeals.length > 0 && (
          <div style={{background:SURF2,borderRadius:10,border:`1px solid rgba(126,184,106,0.2)`,padding:"14px 18px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
              <div style={{fontSize:10,letterSpacing:"0.12em",color:G,fontWeight:700}}>
                🔥 {liveOverrides ? "CONFIRMED LIVE" : "HISTORICALLY ACTIVE"} TRANSFER BONUSES
              </div>
              {!liveOverrides && <span style={{fontSize:9,color:MUT,fontStyle:"italic"}}>Hit "AI Refresh" for live data</span>}
              {liveOverrides && lastRefreshed && <span style={{fontSize:9,color:MUT}}>as of {lastRefreshed.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {activeDeals.map(d=>(
                <div key={d.id} onClick={()=>setSelected(d.id)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:"rgba(126,184,106,0.07)",borderRadius:7,cursor:"pointer",border:`1px solid rgba(126,184,106,0.15)`,transition:"background 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(126,184,106,0.12)"}
                  onMouseLeave={e=>e.currentTarget.style.background="rgba(126,184,106,0.07)"}>
                  <div>
                    <div style={{fontSize:13,color:TEXT,fontWeight:600}}>{d.partnerEmoji} {d.partner}</div>
                    <div style={{fontSize:11,color:MUT,marginTop:1}}>{d.programShort} → {d.partner} · {d.partnerType}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:20,fontWeight:700,color:G}}>+{d.history[d.history.length-1].bonus}%</div>
                    <div style={{fontSize:9,color:MUT}}>on all transfers</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PointsAway() {
  const [tab,setTab]=useState("guides");
  const [plannerCity,setPlannerCity]=useState("");
  const goToPlannerWithCity=(city)=>{setPlannerCity(city);setTab("planner");};
  const navItems=[{id:"guides",label:"🗺️ City Guides"},{id:"planner",label:"✈️ Trip Planner"},{id:"tracker",label:"📊 Bonus Tracker"},{id:"transfers",label:"🔄 Transfer Bonuses"}];
  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:BG,fontFamily:F,color:TEXT,overflow:"hidden"}}>
      <div style={{background:`linear-gradient(90deg,${SURF},${SURF2})`,borderBottom:`1px solid ${BORDER}`,padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,height:56,gap:16}}>
        <div style={{display:"flex",alignItems:"center",gap:11}}>
          <div style={{width:34,height:34,borderRadius:8,background:`linear-gradient(135deg,${G},#4a8a2a)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>✈️</div>
          <div>
            <div style={{fontSize:16,fontWeight:700,letterSpacing:"0.07em",color:TEXT}}>POINTSAWAY</div>
            <div style={{fontSize:8,letterSpacing:"0.2em",color:G,textTransform:"uppercase"}}>Family Travel · Points · Verified Reviews</div>
          </div>
        </div>
        <div style={{display:"flex",gap:3,background:"rgba(255,255,255,0.04)",padding:"3px",borderRadius:9}}>
          {navItems.map(({id,label})=>(
            <button key={id} onClick={()=>{setTab(id);if(id==="planner")setPlannerCity("");}} style={{padding:"6px 14px",borderRadius:7,border:"none",background:tab===id?"rgba(126,184,106,0.18)":"transparent",color:tab===id?G:MUT,fontSize:12,fontWeight:tab===id?700:400,cursor:"pointer",fontFamily:F,transition:"all 0.15s",borderBottom:tab===id?`2px solid ${G}`:"2px solid transparent"}}>{label}</button>
          ))}
        </div>
        <div style={{fontSize:10,color:"rgba(232,234,212,0.25)"}}>Updated Feb 2025</div>
      </div>
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>
        {tab==="guides"&&<CityGuides onPlanTrip={goToPlannerWithCity}/>}
        {tab==="planner"&&<Planner prefillCity={plannerCity} onViewGuides={()=>setTab("guides")} onViewTracker={()=>setTab("tracker")}/>}
        {tab==="tracker"&&<Tracker/>}
        {tab==="transfers"&&<TransferTracker/>}
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}*{box-sizing:border-box}select option{background:#111f13;color:#e8ead4}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:3px}`}</style>
    </div>
  );
}
