import { useState, useEffect } from "react";
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
  "Charleston, SC": {
    emoji:"🌸", tagline:"History, shrimp & grits, cobblestone charm",
    coverColor:"#1a0a1f", accent:"#c084e0",
    pointsProgram:"Chase Ultimate Rewards (Hyatt), Southwest Rapid Rewards",
    visited:"June 2023", kidRating:5, budgetRating:"$$",
    topTip:"Book Magnolia Plantation well in advance — it sells out weeks ahead and the kids will talk about the free-roaming peacocks for months.",
    spots: [
      { name:"Husk", topPick:true, category:"Splurge", type:"Southern", emoji:"🌽", budget:"$$$", kidFriendly:3,
        mustOrder:"Shrimp & grits, cast iron cornbread",
        review:"A splurge worth every penny. Everything on the menu is sourced from the South — it's a philosophy, not a gimmick. The cornbread alone is worth the reservation. Better for older kids or a special date night.",
        photo:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop" },
      { name:"Bowens Island Restaurant", topPick:true, category:"Cheap Eats", type:"Seafood Shack", emoji:"🦪", budget:"$", kidFriendly:4,
        mustOrder:"Steamed oysters by the bucket",
        review:"Legendary dive bar meets seafood shack. You shuck your own oysters at picnic tables overlooking the marsh. Incredibly casual, zero pretension, absolutely delicious. The kids loved the novelty of shucking their own shellfish.",
        photo:"https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=250&fit=crop" },
      { name:"Magnolia Plantation", topPick:true, category:"Free Activities", type:"Gardens & Nature", emoji:"🌿", budget:"$$", kidFriendly:5,
        mustOrder:"Swamp boardwalk — the highlight of the whole trip",
        review:"The grounds are stunning — Spanish moss, ancient oaks, free-roaming peacocks everywhere. Educational, beautiful, and the kids ran wild in the best way. The swamp boardwalk was the surprise highlight of the whole trip.",
        photo:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop" },
      { name:"Brown's Court Bakery", topPick:true, category:"Sweet Eats", type:"Bakery & Café", emoji:"🥐", budget:"$", kidFriendly:5,
        mustOrder:"Croissants, breakfast sandwich",
        review:"Our go-to every morning in Charleston. Flaky, buttery croissants that rival anything you'd find in Paris. Always a line but it moves fast. Grab one and eat it on a bench in the nearby park — perfect start to the day.",
        photo:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop" },
      // 📍 PLACEHOLDER — add a real Cheap Eats or Sweet Eats spot for Charleston
      // { name:"YOUR SPOT", category:"Cheap Eats", type:"", emoji:"", budget:"$", kidFriendly:5, mustOrder:"", review:"", photo:"" },
    ],
  },
  "Paris, France": {
    emoji:"🗼", tagline:"Croissants, culture & magic for the whole family",
    coverColor:"#0d1a2e", accent:"#7eb5e8",
    pointsProgram:"Amex Membership Rewards (Air France), Chase UR (United)",
    visited:"Summer 2023", kidRating:5, budgetRating:"$$$",
    topTip:"Buy a Paris Museum Pass — it covers the Louvre, Musée d'Orsay, and Versailles and lets you skip the main ticket lines. Game-changer with kids.",
    spots: [
      // ── Sweet Eats ──────────────────────────────────────────────────────────
      { name:"Mamiche", category:"Sweet Eats", topPick:true, type:"Bakery", emoji:"🍪", budget:"$", kidFriendly:5,
        mustOrder:"Le Chou Vanille, chocolate chip cookie",
        review:"Mamiche has mastered the art of sweets. The Le Chou Vanille — a light, perfectly sweet vanilla cream puff — is one of the best things we ate in Paris. Their chocolate chip cookie is equally fantastic. Both tend to sell out, so go early and grab both.",
        photo:"https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=250&fit=crop" },
      { name:"Manteigaria", category:"Sweet Eats", type:"Portuguese Pastry", emoji:"🥚", budget:"$", kidFriendly:5,
        mustOrder:"Pastéis de nata (Portuguese egg tarts)",
        review:"We stumbled onto the Paris outpost of Manteigaria having first tried their egg tarts in Lisbon — and they're identical. Perfectly flaky crust, sweet custardy filling, dusted with cinnamon. One of those happy accidents that becomes a non-negotiable stop every trip.",
        photo:"https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=250&fit=crop" },
      { name:"Bachir", category:"Sweet Eats", type:"Lebanese Ice Cream", emoji:"🍦", budget:"$", kidFriendly:5,
        mustOrder:"Orange blossom flavor rolled in crushed pistachios",
        review:"You may have seen this in viral videos and wondered if it's worth the hype — it absolutely is. Bachir's ice cream is thick like gelato, with unique flavors and a show-stopping crushed pistachio coating. Watching them roll it is half the experience. The line moves surprisingly fast.",
        photo:"https://images.unsplash.com/photo-1567206563114-c179706e76a6?w=400&h=250&fit=crop" },
      { name:"Pierre Hermé & Ladurée", category:"Sweet Eats", type:"Patisserie", emoji:"🎀", budget:"$$", kidFriendly:5,
        mustOrder:"Ladurée for classic flavors, Pierre Hermé for unexpected combinations — try both",
        review:"No trip to Paris is complete without a macaron, and there's no better place than iconic Ladurée on the Champs-Élysées for the classics. For something more adventurous, Pierre Hermé's unusual flavor combinations are equally worth it. We say do both and settle the debate yourself.",
        photo:"https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=250&fit=crop" },
      { name:"Comptoir Harajuku", category:"Sweet Eats", type:"Japanese Crêperie", emoji:"🍡", budget:"$", kidFriendly:5,
        mustOrder:"Matcha ice cream crêpe",
        review:"Inspired by Japan's Marion Crepes, this spot does matcha ice cream crêpes that are as refreshing as they are photogenic. We split one between four people which led to some spirited food fighting — probably just order one each.",
        photo:"https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&h=250&fit=crop" },
      { name:"Du Pain et des Idées", category:"Sweet Eats", type:"Boulangerie", emoji:"🥐", budget:"$", kidFriendly:5,
        mustOrder:"Pistachio chocolate escargot pastry",
        review:"A classic Paris stop. Their escargot pastries — a riff on pain au raisin — are flaky, caramelized, and deeply satisfying. The pistachio chocolate version is the move. Two things to know: they don't heat their pastries, and they're closed on weekends.",
        photo:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=250&fit=crop" },
      // ── Cheap Eats ──────────────────────────────────────────────────────────
      { name:"Ufrum", category:"Cheap Eats", topPick:true, type:"Kurdish Sandwiches", emoji:"🫓", budget:"$", kidFriendly:4,
        mustOrder:"Meat or lamb wrap — both are fantastic",
        review:"A new find from our 2024 trip that blew us away. Everything is made on-site: pitas baked in-house, fresh meats grilled over hot coals. The care that goes into each order is obvious. Be prepared to wait a little — it's worth every minute. A 10/10 discovery.",
        photo:"https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&h=250&fit=crop" },
      { name:"L'as du Falafel", category:"Cheap Eats", type:"Middle Eastern", emoji:"🧆", budget:"$", kidFriendly:5,
        mustOrder:"Falafel pita sandwich with fries",
        review:"Not French, but a non-negotiable Paris stop for us every single trip. The falafel pita sandwich is as good as it gets — crispy, fresh, generous. There's usually a line but it moves quickly. Arrive early if you want to avoid the lunch rush.",
        photo:"https://images.unsplash.com/photo-1593001874117-c99c800e3eb6?w=400&h=250&fit=crop" },
      { name:"Mamiche", category:"Cheap Eats", type:"Bakery — Savory", emoji:"🥪", budget:"$", kidFriendly:5,
        mustOrder:"Jambon Comté Chauffe, Club Sandwich",
        review:"Same legendary bakery as the Sweet Eats entry, but don't overlook the savory side. The Jambon Comté Chauffe — a heated ham and Comté cheese sandwich — is outstanding. Just a 15-minute walk from Gare du Nord, quick line, and worth every stop.",
        photo:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop" },
      { name:"Sando Club", category:"Cheap Eats", type:"Japanese Sandwiches", emoji:"🥩", budget:"$", kidFriendly:4,
        mustOrder:"Pork katsu sandwich",
        review:"Tucked away about 10 minutes from Bastille and easy to walk past — don't. Their pork katsu sandwich was a standout. The menu changes frequently so check what's current when you go. An unassuming spot that punches well above its weight.",
        photo:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop" },
      { name:"Canard Street", category:"Cheap Eats", type:"Fast Casual French", emoji:"🦆", budget:"$", kidFriendly:5,
        mustOrder:"Duck burger",
        review:"Think Shake Shack with a French twist — except it's duck. Fast-casual with a slightly upscale feel, and a genuinely fun way to try something distinctively French without a sit-down meal. Perfect when you're on the go and want something memorable.",
        photo:"https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&h=250&fit=crop" },
      { name:"Breizh Café", category:"Cheap Eats", type:"Crêperie", emoji:"🫓", budget:"$$", kidFriendly:5,
        mustOrder:"Savory buckwheat galette complète for lunch, salted caramel crêpe for dessert",
        review:"A trip to Paris isn't complete without crêpes, and Breizh Café delivers on both savory and sweet. It's technically a chain with locations in France and Japan, but it still feels authentically Parisian. Best move is a savory galette for lunch followed immediately by a dessert crêpe. The kids declared it their favorite meal of the trip.",
        photo:"https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&h=250&fit=crop" },
      { name:"Kodawari Ramen", category:"Cheap Eats", type:"Japanese Ramen", emoji:"🍜", budget:"$$", kidFriendly:4,
        mustOrder:"Fish broth ramen — the house specialty",
        review:"Ramen in Paris wasn't on our radar but Kodawari Ramen earned its place on this list. The fish broth is a rarity for ramen shops and it's deeply flavorful. The Japanese fish market theme adds to the whole experience. Bonus: the bathroom has a Japanese-style Toto bidet, which the kids found fascinating.",
        photo:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=250&fit=crop" },
      // ── Free Activities ─────────────────────────────────────────────────────
      { name:"Jardin du Luxembourg", topPick:true, category:"Free Activities", type:"Park", emoji:"⛵", budget:"Free", kidFriendly:5,
        mustOrder:"Rent a mini sailboat at the central basin — pure magic for kids",
        review:"After many visits to Paris we finally made it here with our two kids — and it did not disappoint. Vast gardens, a beautiful palace, a central basin, and the perfect vibe for a picnic among locals. The highlight for our kids was the mini sailboats: watching them chase their boats around the basin and set them afloat again was some of the best affordable entertainment of the whole trip.",
        photo:"https://images.unsplash.com/photo-1499856871958-5b9357976b82?w=400&h=250&fit=crop" },
      { name:"Sacré-Cœur & Wall of Love", category:"Free Activities", type:"Landmark + Neighborhood", emoji:"❤️", budget:"Free", kidFriendly:5,
        mustOrder:"Walk up to Sacré-Cœur for the panoramic view, then find the Wall of Love just nearby",
        review:"Sacré-Cœur sits atop Montmartre Hill with stunning panoramic views of Paris — especially beautiful on a sunny day, and the basilica interior is free to explore. A short walk away is the Wall of Love (Le Mur des Je t'aime), featuring 'I love you' in dozens of languages on a charming mural. The surrounding neighborhood is less crowded than other tourist spots, making it ideal for a peaceful stroll. One warning: avoid the street gambling scams in the area — they've been around for years.",
        photo:"https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=400&h=250&fit=crop" },
      { name:"Eiffel Tower from Av. de Camoens", category:"Free Activities", type:"Photo Spot", emoji:"🗼", budget:"Free", kidFriendly:5,
        mustOrder:"Come at golden hour — the tower framed by Haussmann buildings is the shot",
        review:"You don't need to pay to see the Eiffel Tower beautifully. Av. de Camoens gives you the tower perfectly framed by classic Parisian architecture — one of the best photo spots in the city and completely free. It was a hidden gem when we first discovered it in 2019; it's more popular now but still absolutely worth it.",
        photo:"https://images.unsplash.com/photo-1499856871958-5b9357976b82?w=400&h=250&fit=crop" },
      { name:"Louvre to Arc de Triomphe Walk", category:"Free Activities", type:"Self-Guided Walk", emoji:"🚶", budget:"Free", kidFriendly:4,
        mustOrder:"Start at the Louvre pyramid, cut through Jardin des Tuileries, pause at Pont Alexandre III for the Eiffel Tower view",
        review:"One of our favorite Paris walks, and it's entirely free. Start at the Louvre — the lobby is free to enter if you want a closer look at the glass pyramid. Then walk through the gorgeous Jardin des Tuileries, past Place de la Concorde and its obelisk, detour to Pont Alexandre III for a spectacular Eiffel Tower and Invalides view, then stroll the Champs-Élysées up to the Arc de Triomphe. Fair warning: the Champs-Élysées is lined with shops and restaurants that will tempt your wallet at every step.",
        photo:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=250&fit=crop" },
      { name:"Seine Walk: Hôtel de Ville to Musée d'Orsay", category:"Free Activities", type:"Self-Guided Walk", emoji:"🌊", budget:"Free", kidFriendly:5,
        mustOrder:"Cross to Notre-Dame from the outside, then follow the left bank all the way to the Orsay",
        review:"A quintessential Paris walk along the left bank of the Seine. Start at the Hôtel de Ville, cross to Notre-Dame — still beautiful from the outside despite ongoing restorations — and continue past the Pont de l'Archevêché, once famous for its love locks. Follow the river toward the Musée d'Orsay at whatever pace you like, stopping at cafés and picturesque spots along the way. One of the most effortlessly beautiful walks in Europe.",
        photo:"https://images.unsplash.com/photo-1499856871958-5b9357976b82?w=400&h=250&fit=crop" },
      { name:"Palais Royal", category:"Free Activities", type:"Gardens & Architecture", emoji:"🏛️", budget:"Free", kidFriendly:5,
        mustOrder:"Let the kids loose among the black-and-white striped columns — they'll run wild",
        review:"Just a five-minute walk from the Louvre and almost always overlooked. The Palais Royal is an open courtyard surrounded by beautiful architecture and filled with the famous black-and-white striped columns of varying heights. Kids love running around them; adults love the calm after the Louvre crowds. You may recognize it from Emily in Paris. A perfect place to rest your feet.",
        photo:"https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=250&fit=crop" },
      { name:"Musée d'Orsay", category:"Free Activities", type:"Museum", emoji:"🎨", budget:"$$", kidFriendly:4,
        mustOrder:"Top floor Impressionist galleries — then the café with the giant clock window",
        review:"More kid-friendly than the Louvre by a mile. The Impressionist paintings are visually accessible in a way that abstract art isn't. Our kids actually stopped and stared.",
        photo:"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=250&fit=crop" },
      // 📍 PLACEHOLDER — add your Splurge pick for Paris (fine dining / special occasion)
      // { name:"YOUR SPOT", category:"Splurge", type:"Fine Dining", emoji:"⭐", budget:"$$$$", kidFriendly:2, mustOrder:"", review:"", photo:"" },
    ],
  },
  "London, England": {
    emoji:"🎡", tagline:"History, pubs, parks & proper fish & chips",
    coverColor:"#0e0e1a", accent:"#e8a84a",
    pointsProgram:"Chase UR (British Airways/United), Amex MR (British Airways)",
    visited:"Spring Break 2024", kidRating:5, budgetRating:"$$$",
    topTip:"Get an Oyster card for the whole family on day one — the Tube is fast, easy, and the kids love it. Way cheaper than taxis and faster than Ubers.",
    spots: [
      // ── Free Activities ─────────────────────────────────────────────────────
      { name:"Sky Garden", topPick:true, category:"Free Activities", type:"Rooftop Garden", emoji:"🌿", budget:"Free", kidFriendly:5,
        mustOrder:"Book 2–4 weeks ahead for a morning slot — less crowded and better light for photos",
        review:"Think of Sky Garden as the new London Eye — better views, no expense, and surrounded by lush greenery. Located across the river from The Shard, the panoramic views of the city are stunning. Time slots fill up fast so book well in advance. Go early for the best experience with fewer crowds. Perfect for photos.",
        photo:"https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=400&h=250&fit=crop" },
      { name:"Natural History Museum", category:"Free Activities", type:"Museum", emoji:"🦕", budget:"Free", kidFriendly:5,
        mustOrder:"Fossil and dinosaur galleries — kids will want to spend hours here",
        review:"Free, world-class, and genuinely one of the best museums on earth for families. Kids and adults alike will love the fossil and dinosaur exhibits. The museum is massive so even a short visit is rewarding — and with free admission it's an easy add-on to any London day. The blue whale skeleton stops everyone in their tracks.",
        photo:"https://images.unsplash.com/photo-1526134782782-1b4ca05f7b59?w=400&h=250&fit=crop" },
      { name:"Tower of London & Tower Bridge", category:"Free Activities", type:"Historic Landmark", emoji:"🏰", budget:"$$", kidFriendly:5,
        mustOrder:"Walk the riverside for the best Tower Bridge photos — cross on foot for free",
        review:"If you're near Sky Garden, it's a short walk to two of London's most iconic landmarks. The Tower of London area along the river is the best spot for Tower Bridge photos. Cross the bridge on foot for free, soak in nearly 1,000 years of history, and if you go inside the Tower, the Crown Jewels and Beefeater tours are jaw-dropping. The exterior alone is worth the detour.",
        photo:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop" },
      { name:"Buckingham Palace & Big Ben", category:"Free Activities", type:"Self-Guided Walk", emoji:"👑", budget:"Free", kidFriendly:5,
        mustOrder:"Red phone booth photos on the way to Big Ben — a quintessentially British moment",
        review:"Only a 20-minute walk apart, making it easy to hit both in one outing. You can't enter Buckingham Palace but the grounds and gates are worth the stroll. On the way to Big Ben you'll spot classic red phone booths perfect for photos — though some are best admired from the outside. A quintessential London walk that costs nothing.",
        photo:"https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=400&h=250&fit=crop" },
      { name:"Butterfly Trail at Outernet", category:"Free Activities", type:"Immersive Experience", emoji:"🦋", budget:"Free", kidFriendly:5,
        mustOrder:"Stand in the middle and look up — the scale of the screens is what makes it",
        review:"A surprising find near the London Eye. The Butterfly Trail is an outdoor 3D immersive video experience with mesmerizing visuals on massive screens surrounding you on all sides. A completely unique place to take a break and be transported by incredible digital art. A hidden gem that most tourists walk right past — don't.",
        photo:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop" },
      // ── Cheap Eats ──────────────────────────────────────────────────────────
      { name:"The Black Pig", topPick:true, category:"Cheap Eats", type:"Sandwiches", emoji:"🥪", budget:"$$", kidFriendly:4,
        mustOrder:"The Best One — sweet, salty, spicy, savory, crunchy, and cheesy in every bite",
        review:"Borderline cheap but worth every penny — especially if you're sharing. 'The Best One' is genuinely one of the top five sandwiches I've ever had. Every bite hits you with sweet, salty, spicy, savory, crunchy, and cheesy all at once. An unforgettable experience. Arrive early to avoid the line and guarantee yourself a taste. 10/10.",
        photo:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop" },
      { name:"Bun House", category:"Cheap Eats", type:"Chinese Buns & Wontons", emoji:"🥟", budget:"$", kidFriendly:5,
        mustOrder:"Shrimp wontons — the real star, order more than you think you need",
        review:"An unassuming spot with some of the best budget bites in London. The buns are fluffy and well-balanced — we tried both beef and pork and neither disappointed. But the shrimp wontons are the real star: bursting with flavor, just the right amount of heat. We shared them and they disappeared so fast we immediately regretted not ordering more.",
        photo:"https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=250&fit=crop" },
      { name:"Friend Chicken — Chinatown", category:"Cheap Eats", type:"Fried Chicken", emoji:"🍗", budget:"$", kidFriendly:5,
        mustOrder:"Karaage chicken",
        review:"Don't judge this one by its exterior — tucked into Chinatown, it might not look like much from the outside but the fried chicken is juicy, well-seasoned, and satisfying. We went with the karaage, which was the right call. Perfect for a quick snack on a budget when you're exploring the area.",
        photo:"https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=250&fit=crop" },
      { name:"Gail's Bakery", category:"Cheap Eats", type:"Bakery & Breakfast", emoji:"☕", budget:"$", kidFriendly:5,
        mustOrder:"Coffee + whatever breakfast sandwich or pastry catches your eye",
        review:"With multiple locations around the city, Gail's is a reliable family-friendly breakfast spot. Quality coffee, solid pastries, oatmeal, and breakfast sandwiches — everything we tried was good. Not a destination in itself but a very dependable start to the day, especially if there's one near where you're staying.",
        photo:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop" },
      // ── Sweet Eats ──────────────────────────────────────────────────────────
      { name:"Bun House", category:"Sweet Eats", topPick:true, type:"Chinese Bakery", emoji:"🍮", budget:"$", kidFriendly:5,
        mustOrder:"Custard Bun + French Toast — but brace yourself for the custard ooze",
        review:"Yes, Bun House appears twice on this list — because it earns it. The savory wontons are one thing, but the sweet side is equally unmissable. The French Toast is incredibly satisfying and the Custard Bun is delightful — just be warned of the delayed ooze. We watched someone get caught completely off guard. Consider yourself informed. Messy, perfect, absolutely worth it.",
        photo:"https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=250&fit=crop" },
      { name:"Crème — The Crookie", category:"Sweet Eats", type:"Patisserie", emoji:"🥐", budget:"$", kidFriendly:5,
        mustOrder:"The Crookie — cookie-croissant hybrid, best fresh from the oven",
        review:"The Crookie trend of 2024 done right. Crème's cookie-croissant hybrid is thick, chewy, and rich — we were lucky enough to get a batch fresh from the oven. If you love soft and gooey cookies this is your thing. If you're a thin-and-crunchy person, fair warning. For us it was perfect.",
        photo:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop" },
      { name:"Humble Crumble", category:"Sweet Eats", type:"Custard Desserts", emoji:"🍮", budget:"$", kidFriendly:5,
        mustOrder:"Elderflower custard crumble — cold or torched hot on the spot",
        review:"Right at Borough Market, steps from The Black Pig. Humble Crumble serves custard-based desserts with an overwhelming array of toppings — in the best possible way. We tried the Elderflower cold and it was a hit. They also torch the hot version on the spot for an extra-special touch. We'd go back just to work through more flavor combinations.",
        photo:"https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=250&fit=crop" },
      // 📍 PLACEHOLDER — add your Splurge pick for London (special occasion restaurant)
      // { name:"YOUR SPOT", category:"Splurge", type:"Fine Dining", emoji:"⭐", budget:"$$$$", kidFriendly:2, mustOrder:"", review:"", photo:"" },
    ],
  },
  "Boston, MA": {
    emoji:"🦞", tagline:"Lobster rolls, history & a very walkable city",
    coverColor:"#0e1a10", accent:"#e05c5c",
    pointsProgram:"JetBlue TrueBlue, Chase UR (United), Southwest",
    visited:"Fall 2023", kidRating:5, budgetRating:"$$",
    topTip:"Walk the Freedom Trail with kids — it's a free, self-guided 2.5-mile walk connecting 16 historic sites.",
    spots: [
      { name:"Neptune Oyster", topPick:true, category:"Splurge", type:"Seafood", emoji:"🦞", budget:"$$$", kidFriendly:3,
        mustOrder:"Hot buttered lobster roll",
        review:"The lobster roll debate in Boston is endless, but Neptune wins ours. The hot buttered version is one of the best bites in New England. Small, no reservations, worth the wait.",
        photo:"https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&h=250&fit=crop" },
      { name:"Mike's Pastry", topPick:true, category:"Sweet Eats", type:"Italian Bakery", emoji:"🍮", budget:"$", kidFriendly:5,
        mustOrder:"Cannoli — get it filled fresh in front of you",
        review:"North End institution and a non-negotiable stop. Watch them fill your cannoli to order. The ricotta filling is light, slightly sweet, and tucked into a shatteringly crispy shell.",
        photo:"https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=250&fit=crop" },
      { name:"Freedom Trail", topPick:true, category:"Free Activities", type:"Historic Walk", emoji:"🏛️", budget:"Free", kidFriendly:5,
        mustOrder:"Paul Revere House + Old North Church stops",
        review:"The most family-friendly way to do Boston history. Follow the red brick line, stop at whatever captures the kids' attention.",
        photo:"https://images.unsplash.com/photo-1501446529957-6226b8c44f87?w=400&h=250&fit=crop" },
      { name:"Giacomo's Ristorante", topPick:true, category:"Cheap Eats", type:"Italian", emoji:"🍝", budget:"$$", kidFriendly:5,
        mustOrder:"Lobster fra diavolo, any pasta",
        review:"Tiny North End trattoria with cash-only policy and a line out the door every night. Huge portions, reasonable prices, incredible energy.",
        photo:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=250&fit=crop" },
      // 📍 PLACEHOLDER — add a second Sweet Eats or Cheap Eats spot for Boston
      // { name:"YOUR SPOT", category:"Cheap Eats", type:"", emoji:"", budget:"$", kidFriendly:5, mustOrder:"", review:"", photo:"" },
    ],
  },

  "Tokyo, Japan": {
    emoji:"🗼", tagline:"Neon nights, world-class food & endless discovery",
    coverColor:"#1a0a1a", accent:"#e87fa0",
    pointsProgram:"Amex MR (ANA), Chase UR (United → ANA), Capital One (ANA)",
    visited:"2024", kidRating:5, budgetRating:"$$",
    topTip:"Stay in Shinjuku for your first visit — central location, great hotels at every price point, and the easiest subway access in the city. Wandering the neon-lit streets at night is an experience in itself.",
    spots: [
      // ── Free Activities ─────────────────────────────────────────────────────
      { name:"Harajuku & Takeshita Street", category:"Free Activities", topPick:true, type:"Neighborhood", emoji:"🎀", budget:"Free", kidFriendly:5,
        mustOrder:"Crepe from one of the street stands — and browse at least one pet café",
        review:"Harajuku is vibrant, quirky, and unlike anywhere else in Tokyo. Walking down Takeshita Street is an experience in itself — unique stores, anime-inspired fashion, colorful treats everywhere you look. Don't miss the crepe stands or the cozy pet cafés that line the area. You can easily spend a few hours here. A fantastic introduction to Tokyo's kawaii culture.",
        photo:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop" },
      { name:"Senso-ji Shrine & Nakamise-Dori", category:"Free Activities", type:"Shrine & Market", emoji:"⛩️", budget:"Free", kidFriendly:5,
        mustOrder:"Browse the 'sweets market' stalls on Nakamise-Dori — then find the dog café in the side mall",
        review:"The iconic Sensō-ji Shrine in Asakusa is a must, but the real gem is Nakamise-Dori — the lively market street leading up to it. Nicknamed the 'sweets market,' it's packed with Japanese snacks, souvenirs, and unique shops on either side. We loved the dog café tucked into the extended mall — a huge hit with the kids. Visit mid-morning to beat the crowds.",
        photo:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=250&fit=crop" },
      { name:"Shibuya Crossing", category:"Free Activities", type:"Landmark", emoji:"🚦", budget:"Free", kidFriendly:5,
        mustOrder:"Cross at peak hour — then grab a window seat at a nearby café to watch from above",
        review:"The busiest pedestrian crossing in the world, and it lives up to every video you've seen. Thousands of people crossing at once creates an electrifying atmosphere that has to be experienced firsthand. While you're in the area, grab a bite at one of the nearby sushi spots. Shibuya's energy is unlike anywhere else in Tokyo.",
        photo:"https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=250&fit=crop" },
      { name:"Shinjuku — Omoide Yokocho & Golden Gai", category:"Free Activities", type:"Neighborhood", emoji:"🏮", budget:"Free", kidFriendly:3,
        mustOrder:"Walk Omoide Yokocho for yakitori smoke and atmosphere — then wander Golden Gai's six alleyways",
        review:"Shinjuku is worth a full evening on its own. Omoide Yokocho is a narrow alleyway of traditional yakitori and ramen spots — free to walk through and absolutely atmospheric. Golden Gai is even more remarkable: six interconnected alleyways with over 200 tiny bars and eateries. Even if you don't stop to eat or drink, walking through offers a window into Tokyo's historic nightlife scene. Best experienced after dark when the neon comes alive.",
        photo:"https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400&h=250&fit=crop" },
      { name:"Tsukiji Outer Market", category:"Free Activities", type:"Market", emoji:"🐟", budget:"Free", kidFriendly:4,
        mustOrder:"Arrive around 8am — the market is liveliest early and the best food stalls fill up fast",
        review:"Perfect for early risers or anyone dealing with jet lag. Most stalls open around 8am and the market is lively and buzzing from the start. Wander through food stalls offering fresh bites and drinks — it's free to explore and one of the most authentic market experiences in the city. See our food picks for the best spots to eat here.",
        photo:"https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=250&fit=crop" },
      // 📍 PLACEHOLDER — Sweet Eats, Cheap Eats, Splurge to be added
      // 📍 PLACEHOLDER — add your Splurge pick for Tokyo
      // { name:"YOUR SPOT", category:"Splurge", type:"Fine Dining", emoji:"⭐", budget:"$$$$", kidFriendly:2, mustOrder:"", review:"", photo:"" },
    ],
  },
};


const CARD_DB = {
  "Chase Sapphire Preferred": { issuer:"Chase", color:"#1a3a6b", accent:"#4a90d9", annualFee:95, program:"Chase Ultimate Rewards", history:[{m:"Jan '25",b:60000},{m:"Feb '25",b:60000},{m:"Mar '25",b:75000},{m:"Apr '25",b:60000},{m:"May '25",b:60000},{m:"Jun '25",b:75000},{m:"Jul '25",b:60000},{m:"Aug '25",b:60000},{m:"Sep '25",b:60000},{m:"Oct '25",b:80000},{m:"Nov '25",b:80000},{m:"Dec '25",b:60000},{m:"Jan '26",b:60000},{m:"Feb '26",b:60000},{m:"Mar '26",b:60000}] },
  "Chase Sapphire Reserve": { issuer:"Chase", color:"#1a1a2e", accent:"#c9a84c", annualFee:550, program:"Chase Ultimate Rewards", history:[{m:"Jan '25",b:60000},{m:"Feb '25",b:60000},{m:"Mar '25",b:60000},{m:"Apr '25",b:60000},{m:"May '25",b:75000},{m:"Jun '25",b:75000},{m:"Jul '25",b:60000},{m:"Aug '25",b:60000},{m:"Sep '25",b:60000},{m:"Oct '25",b:60000},{m:"Nov '25",b:60000},{m:"Dec '25",b:60000},{m:"Jan '26",b:60000},{m:"Feb '26",b:60000},{m:"Mar '26",b:60000}] },
  "Amex Platinum": { issuer:"Amex", color:"#2c3e50", accent:"#a8c5e8", annualFee:695, program:"Amex Membership Rewards", history:[{m:"Jan '25",b:80000},{m:"Feb '25",b:80000},{m:"Mar '25",b:100000},{m:"Apr '25",b:100000},{m:"May '25",b:125000},{m:"Jun '25",b:80000},{m:"Jul '25",b:80000},{m:"Aug '25",b:80000},{m:"Sep '25",b:80000},{m:"Oct '25",b:150000},{m:"Nov '25",b:150000},{m:"Dec '25",b:80000},{m:"Jan '26",b:80000},{m:"Feb '26",b:80000},{m:"Mar '26",b:80000}] },
  "Amex Gold": { issuer:"Amex", color:"#7a5c1e", accent:"#d4a843", annualFee:250, program:"Amex Membership Rewards", history:[{m:"Jan '25",b:60000},{m:"Feb '25",b:60000},{m:"Mar '25",b:75000},{m:"Apr '25",b:75000},{m:"May '25",b:60000},{m:"Jun '25",b:90000},{m:"Jul '25",b:90000},{m:"Aug '25",b:60000},{m:"Sep '25",b:100000},{m:"Oct '25",b:100000},{m:"Nov '25",b:60000},{m:"Dec '25",b:60000},{m:"Jan '26",b:60000},{m:"Feb '26",b:60000},{m:"Mar '26",b:60000}] },
  "Capital One Venture X": { issuer:"Capital One", color:"#5a1010", accent:"#e05c5c", annualFee:395, program:"Capital One Miles", history:[{m:"Jan '25",b:75000},{m:"Feb '25",b:75000},{m:"Mar '25",b:75000},{m:"Apr '25",b:75000},{m:"May '25",b:90000},{m:"Jun '25",b:90000},{m:"Jul '25",b:75000},{m:"Aug '25",b:75000},{m:"Sep '25",b:75000},{m:"Oct '25",b:75000},{m:"Nov '25",b:75000},{m:"Dec '25",b:75000},{m:"Jan '26",b:75000},{m:"Feb '26",b:75000},{m:"Mar '26",b:75000}] },
  "Citi Strata Premier": { issuer:"Citi", color:"#1a4a6b", accent:"#4fc3e8", annualFee:95, program:"Citi ThankYou Points", history:[{m:"Jan '25",b:60000},{m:"Feb '25",b:60000},{m:"Mar '25",b:75000},{m:"Apr '25",b:75000},{m:"May '25",b:60000},{m:"Jun '25",b:60000},{m:"Jul '25",b:60000},{m:"Aug '25",b:60000},{m:"Sep '25",b:70000},{m:"Oct '25",b:70000},{m:"Nov '25",b:60000},{m:"Dec '25",b:60000},{m:"Jan '26",b:60000},{m:"Feb '26",b:60000},{m:"Mar '26",b:60000}] },
  "Citi Strata Elite": { issuer:"Citi", color:"#0d2d4a", accent:"#38bdf8", annualFee:595, program:"Citi ThankYou Points", history:[{m:"Jan '25",b:100000},{m:"Feb '25",b:100000},{m:"Mar '25",b:100000},{m:"Apr '25",b:80000},{m:"May '25",b:80000},{m:"Jun '25",b:80000},{m:"Jul '25",b:100000},{m:"Aug '25",b:100000},{m:"Sep '25",b:80000},{m:"Oct '25",b:80000},{m:"Nov '25",b:80000},{m:"Dec '25",b:100000},{m:"Jan '26",b:100000},{m:"Feb '26",b:80000},{m:"Mar '26",b:80000}] },
  "Citi AAdvantage Globe": { issuer:"Citi", color:"#2a0a3a", accent:"#b06ee0", annualFee:350, program:"AA AAdvantage", history:[{m:"Jan '25",b:90000},{m:"Feb '25",b:90000},{m:"Mar '25",b:65000},{m:"Apr '25",b:65000},{m:"May '25",b:75000},{m:"Jun '25",b:75000},{m:"Jul '25",b:65000},{m:"Aug '25",b:65000},{m:"Sep '25",b:65000},{m:"Oct '25",b:75000},{m:"Nov '25",b:75000},{m:"Dec '25",b:90000},{m:"Jan '26",b:90000},{m:"Feb '26",b:65000},{m:"Mar '26",b:65000}] },
  "United Explorer": { issuer:"Chase", color:"#003580", accent:"#5ba4e6", annualFee:95, program:"United MileagePlus", history:[{m:"Jan '25",b:60000},{m:"Feb '25",b:60000},{m:"Mar '25",b:80000},{m:"Apr '25",b:80000},{m:"May '25",b:60000},{m:"Jun '25",b:60000},{m:"Jul '25",b:70000},{m:"Aug '25",b:70000},{m:"Sep '25",b:90000},{m:"Oct '25",b:90000},{m:"Nov '25",b:60000},{m:"Dec '25",b:60000},{m:"Jan '26",b:60000},{m:"Feb '26",b:60000},{m:"Mar '26",b:60000}] },
  "Delta SkyMiles Gold Amex": { issuer:"Amex", color:"#8b0000", accent:"#e8a0a0", annualFee:150, program:"Delta SkyMiles", history:[{m:"Jan '25",b:40000},{m:"Feb '25",b:40000},{m:"Mar '25",b:65000},{m:"Apr '25",b:65000},{m:"May '25",b:40000},{m:"Jun '25",b:40000},{m:"Jul '25",b:40000},{m:"Aug '25",b:40000},{m:"Sep '25",b:70000},{m:"Oct '25",b:70000},{m:"Nov '25",b:40000},{m:"Dec '25",b:40000},{m:"Jan '26",b:40000},{m:"Feb '26",b:40000},{m:"Mar '26",b:40000}] },
};


// ─── POINTS CATALOG ───────────────────────────────────────────────────────────
const POINTS_CATALOG = {
  creditCard: [
    { id:"chase-ur",   name:"Chase Ultimate Rewards",     emoji:"🔵", color:"#1a3a6b", accent:"#4a90d9" },
    { id:"amex-mr",    name:"Amex Membership Rewards",    emoji:"🟢", color:"#2c3e50", accent:"#a8c5e8" },
    { id:"citi-ty",    name:"Citi ThankYou Points",       emoji:"🔷", color:"#1a4a6b", accent:"#4fc3e8" },
    { id:"cap1-miles", name:"Capital One Miles",          emoji:"🔴", color:"#5a1010", accent:"#e05c5c" },
    { id:"bilt",       name:"Bilt Rewards",               emoji:"⬛", color:"#1a1a1a", accent:"#e8ead4" },
  ],
  airline: [
    { id:"delta",      name:"Delta SkyMiles",             emoji:"✈️", color:"#8b0000", accent:"#e8a0a0" },
    { id:"united",     name:"United MileagePlus",         emoji:"🔵", color:"#003580", accent:"#5ba4e6" },
    { id:"aa",         name:"American AAdvantage",        emoji:"🔴", color:"#3a0a0a", accent:"#e06060" },
    { id:"southwest",  name:"Southwest Rapid Rewards",    emoji:"🟡", color:"#3a2800", accent:"#f5c842" },
    { id:"jetblue",    name:"JetBlue TrueBlue",           emoji:"🩵", color:"#0a2a4a", accent:"#5bc8f5" },
    { id:"alaska",     name:"Alaska Mileage Plan",        emoji:"🟢", color:"#0a2a1a", accent:"#6dbf8a" },
    { id:"avianca",    name:"Avianca LifeMiles",          emoji:"🌎", color:"#1a2a3a", accent:"#7eb5e8" },
    { id:"virgin",     name:"Virgin Atlantic Flying Club",emoji:"🇬🇧", color:"#2a0a1a", accent:"#e87070" },
    { id:"airfrance",  name:"Air France/KLM Flying Blue", emoji:"🇫🇷", color:"#0a1a3a", accent:"#7eb5e8" },
    { id:"turkish",    name:"Turkish Airlines Miles&Smiles",emoji:"🌙",color:"#1a1a2a",accent:"#b0b0d0"},
    { id:"singapore",  name:"Singapore KrisFlyer",        emoji:"🦁", color:"#1a2a1a", accent:"#d4a843" },
    { id:"emirates",   name:"Emirates Skywards",          emoji:"🇦🇪", color:"#1a0a2a", accent:"#c084e0" },
  ],
  hotel: [
    { id:"hyatt",      name:"World of Hyatt",             emoji:"🏨", color:"#1a2a3a", accent:"#4a90d9" },
    { id:"marriott",   name:"Marriott Bonvoy",            emoji:"🏩", color:"#2a1a0a", accent:"#d4a843" },
    { id:"hilton",     name:"Hilton Honors",              emoji:"🏛️", color:"#0a1a2a", accent:"#4fc3e8" },
    { id:"ihg",        name:"IHG One Rewards",            emoji:"🌐", color:"#2a0a0a", accent:"#e05c5c" },
    { id:"wyndham",    name:"Wyndham Rewards",            emoji:"🛎️", color:"#0a2a0a", accent:"#6dbf8a" },
  ],
};

// Thresholds: when do you have "enough" for a meaningful redemption?
const REDEMPTION_THRESHOLDS = {
  "chase-ur":   { domestic: 15000, international: 60000, business: 100000, label:"Chase UR" },
  "amex-mr":    { domestic: 15000, international: 50000, business: 85000,  label:"Amex MR" },
  "citi-ty":    { domestic: 15000, international: 50000, business: 80000,  label:"Citi TY" },
  "cap1-miles": { domestic: 20000, international: 60000, business: 90000,  label:"Cap1 Miles" },
  "bilt":       { domestic: 15000, international: 50000, business: 80000,  label:"Bilt" },
  "delta":      { domestic: 12000, international: 50000, business: 120000, label:"Delta SkyMiles" },
  "united":     { domestic: 12000, international: 30000, business: 70000,  label:"United Miles" },
  "aa":         { domestic: 12500, international: 30000, business: 57500,  label:"AA Miles" },
  "southwest":  { domestic: 10000, international: 25000, business: null,   label:"SW Points" },
  "jetblue":    { domestic: 15000, international: 35000, business: null,   label:"TrueBlue" },
  "alaska":     { domestic: 12000, international: 25000, business: 50000,  label:"Alaska Miles" },
  "avianca":    { domestic: null,  international: 20000, business: 63000,  label:"LifeMiles" },
  "virgin":     { domestic: null,  international: 15000, business: 50000,  label:"VS Flying Club" },
  "airfrance":  { domestic: null,  international: 20000, business: 55000,  label:"Flying Blue" },
  "turkish":    { domestic: null,  international: 15000, business: 45000,  label:"Miles&Smiles" },
  "singapore":  { domestic: null,  international: 17500, business: 62500,  label:"KrisFlyer" },
  "emirates":   { domestic: null,  international: 25000, business: 58000,  label:"Skywards" },
  "hyatt":      { domestic: 8000,  international: 15000, business: 25000,  label:"Hyatt Points" },
  "marriott":   { domestic: 17500, international: 35000, business: 60000,  label:"Bonvoy" },
  "hilton":     { domestic: 30000, international: 50000, business: 95000,  label:"Hilton Honors" },
  "ihg":        { domestic: 20000, international: 40000, business: 70000,  label:"IHG Rewards" },
  "wyndham":    { domestic: 15000, international: 30000, business: null,   label:"Wyndham" },
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
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:30,label:"30% bonus"},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:25,label:"25% bonus"},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:30,label:"30% bonus"},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
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
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:25,label:"25% bonus"},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:25,label:"25% bonus"},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
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
      {m:"Jan '25",bonus:40,label:"40% bonus"},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:40,label:"40% bonus"},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:40,label:"40% bonus"},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:40,label:"40% bonus"},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:40,label:"40% bonus"},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:40,label:"40% bonus"},
      {m:"Mar '26",bonus:0},
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
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:30,label:"30% bonus"},
      {m:"Mar '25",bonus:30,label:"30% bonus"},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:30,label:"30% bonus"},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:30,label:"30% bonus"},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:30,label:"30% bonus"},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
    ],
  },
  {
    id: "amex-united",
    program: "Amex Membership Rewards",
    programShort: "Amex MR",
    programColor: "#2c3e50",
    programAccent: "#a8c5e8",
    partner: "United MileagePlus",
    partnerEmoji: "✈️",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Amex Platinum","Amex Gold"],
    notes: "Amex MR → United bonuses are rare but valuable. United miles are most useful for Star Alliance partners where United charges less than others.",
    history: [
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:25,label:"25% bonus"},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
    ],
  },
  {
    id: "citi-united",
    program: "Citi ThankYou Points",
    programShort: "Citi TY",
    programColor: "#1a4a6b",
    programAccent: "#4fc3e8",
    partner: "United MileagePlus",
    partnerEmoji: "✈️",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Citi Strata Premier","Citi Strata Elite"],
    notes: "Citi TY → United bonuses are very rare. United is primarily a Chase partner — Citi transfers work but bonuses appear infrequently.",
    history: [
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
    ],
  },
  {
    id: "cap1-united",
    program: "Capital One Miles",
    programShort: "Cap1",
    programColor: "#5a1010",
    programAccent: "#e05c5c",
    partner: "United MileagePlus",
    partnerEmoji: "✈️",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Capital One Venture X"],
    notes: "Capital One → United is available but bonuses are extremely rare. Chase is the preferred route for United transfers.",
    history: [
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
    ],
  },
  {
    id: "chase-virgin",
    program: "Chase Ultimate Rewards",
    programShort: "Chase UR",
    programColor: "#1a3a6b",
    programAccent: "#4a90d9",
    partner: "Virgin Atlantic Flying Club",
    partnerEmoji: "🇬🇧",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Chase Sapphire Preferred","Chase Sapphire Reserve"],
    notes: "Chase UR → Virgin is less common than Amex but valuable for Delta and ANA awards. Bonuses typically appear 1-2x per year.",
    history: [
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:30,label:"30% bonus"},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:40,label:"40% bonus"},
      {m:"Oct '25",bonus:40,label:"40% bonus"},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
    ],
  },
  {
    id: "citi-virgin",
    program: "Citi ThankYou Points",
    programShort: "Citi TY",
    programColor: "#1a4a6b",
    programAccent: "#4fc3e8",
    partner: "Virgin Atlantic Flying Club",
    partnerEmoji: "🇬🇧",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Citi Strata Premier","Citi Strata Elite"],
    notes: "Citi TY → Virgin bonuses are infrequent but have appeared at 25-30%. Worth monitoring if you hold Citi cards.",
    history: [
      {m:"Jan '25",bonus:25,label:"25% bonus"},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:25,label:"25% bonus"},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:25,label:"25% bonus"},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
    ],
  },
  {
    id: "cap1-virgin",
    program: "Capital One Miles",
    programShort: "Cap1",
    programColor: "#5a1010",
    programAccent: "#e05c5c",
    partner: "Virgin Atlantic Flying Club",
    partnerEmoji: "🇬🇧",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Capital One Venture X"],
    notes: "Capital One → Virgin bonuses are rare but have appeared. Capital One tends to run fewer transfer bonuses overall than Chase or Amex.",
    history: [
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:30,label:"30% bonus"},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
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
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:30,label:"30% bonus"},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:25,label:"25% bonus"},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:30,label:"30% bonus"},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
    ],
  },
  {
    id: "chase-airfrance",
    program: "Chase Ultimate Rewards",
    programShort: "Chase UR",
    programColor: "#1a3a6b",
    programAccent: "#4a90d9",
    partner: "Air France/KLM Flying Blue",
    partnerEmoji: "🇫🇷",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Chase Sapphire Preferred","Chase Sapphire Reserve"],
    notes: "Chase UR → Flying Blue is a solid option, especially when stacked with Flying Blue's monthly Promo Rewards for up to 50% off select routes.",
    history: [
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:25,label:"25% bonus"},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:25,label:"25% bonus"},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
    ],
  },
  {
    id: "citi-airfrance",
    program: "Citi ThankYou Points",
    programShort: "Citi TY",
    programColor: "#1a4a6b",
    programAccent: "#4fc3e8",
    partner: "Air France/KLM Flying Blue",
    partnerEmoji: "🇫🇷",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Citi Strata Premier","Citi Strata Elite"],
    notes: "Citi TY → Flying Blue bonuses are infrequent. Worth watching alongside Amex bonuses — they rarely run simultaneously.",
    history: [
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:25,label:"25% bonus"},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
    ],
  },
  {
    id: "cap1-airfrance",
    program: "Capital One Miles",
    programShort: "Cap1",
    programColor: "#5a1010",
    programAccent: "#e05c5c",
    partner: "Air France/KLM Flying Blue",
    partnerEmoji: "🇫🇷",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Capital One Venture X"],
    notes: "Capital One → Flying Blue bonuses are rare. Capital One runs fewer transfer bonuses overall, but Flying Blue is one of their most useful partners.",
    history: [
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:30,label:"30% bonus"},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
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
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:25,label:"25% bonus"},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:25,label:"25% bonus"},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:25,label:"25% bonus"},
    ],
  },
  {
    id: "cap1-hilton",
    program: "Capital One Miles",
    programShort: "Cap1",
    programColor: "#5a1010",
    programAccent: "#e05c5c",
    partner: "Hilton Honors",
    partnerEmoji: "🏨",
    partnerType: "Hotel",
    baseRatio: "1:2",
    cards: ["Capital One Venture X"],
    notes: "Capital One → Hilton at 1:2 is the same base ratio as Amex. Bonuses on top can make either program worthwhile — rarely offered simultaneously.",
    history: [
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:25,label:"25% bonus"},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
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
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:25,label:"25% bonus"},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:25,label:"25% bonus"},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:30,label:"30% bonus"},
      {m:"Aug '25",bonus:30,label:"30% bonus"},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:25,label:"25% bonus"},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:25,label:"25% bonus"},
      {m:"Mar '26",bonus:0},
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
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:25,label:"25% bonus"},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:25,label:"25% bonus"},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:30,label:"30% bonus"},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
    ],
  },
  {
    id: "chase-singapore",
    program: "Chase Ultimate Rewards",
    programShort: "Chase UR",
    programColor: "#1a3a6b",
    programAccent: "#4a90d9",
    partner: "Singapore KrisFlyer",
    partnerEmoji: "🦁",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Chase Sapphire Preferred","Chase Sapphire Reserve"],
    notes: "Chase UR → KrisFlyer is rare but valuable. Singapore first class is one of the best redemptions in the world — worth waiting for a bonus.",
    history: [
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:25,label:"25% bonus"},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
    ],
  },
  {
    id: "amex-singapore",
    program: "Amex Membership Rewards",
    programShort: "Amex MR",
    programColor: "#2c3e50",
    programAccent: "#a8c5e8",
    partner: "Singapore KrisFlyer",
    partnerEmoji: "🦁",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Amex Platinum","Amex Gold"],
    notes: "Amex MR → KrisFlyer is the most common bonus route. Amex runs 20-30% bonuses here more frequently than Chase or Citi.",
    history: [
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:20,label:"20% bonus"},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:25,label:"25% bonus"},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
    ],
  },
  {
    id: "cap1-singapore",
    program: "Capital One Miles",
    programShort: "Cap1",
    programColor: "#5a1010",
    programAccent: "#e05c5c",
    partner: "Singapore KrisFlyer",
    partnerEmoji: "🦁",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Capital One Venture X"],
    notes: "Capital One → KrisFlyer bonuses are very rare. Monitor but don't count on them — prioritize Amex or Chase transfers for Singapore awards.",
    history: [
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
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
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:25,label:"25% bonus"},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:25,label:"25% bonus"},
      {m:"Mar '26",bonus:0},
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
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:30,label:"30% bonus"},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:30,label:"30% bonus"},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
    ],
  },
  {
    id: "chase-avianca",
    program: "Chase Ultimate Rewards",
    programShort: "Chase UR",
    programColor: "#1a3a6b",
    programAccent: "#4a90d9",
    partner: "Avianca LifeMiles",
    partnerEmoji: "🌎",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Chase Sapphire Preferred","Chase Sapphire Reserve"],
    notes: "Chase UR → LifeMiles bonuses are less frequent than Amex but have appeared at 40%. LifeMiles unlocks cheap Star Alliance business class that Chase UR can't otherwise access.",
    history: [
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:40,label:"40% bonus"},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:0},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:40,label:"40% bonus"},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
    ],
  },
  {
    id: "citi-avianca",
    program: "Citi ThankYou Points",
    programShort: "Citi TY",
    programColor: "#1a4a6b",
    programAccent: "#4fc3e8",
    partner: "Avianca LifeMiles",
    partnerEmoji: "🌎",
    partnerType: "Airline",
    baseRatio: "1:1",
    cards: ["Citi Strata Premier","Citi Strata Elite"],
    notes: "Citi TY → LifeMiles bonuses are rare but valuable when they appear. Citi cardholders should watch for these alongside Amex offers.",
    history: [
      {m:"Jan '25",bonus:0},
      {m:"Feb '25",bonus:0},
      {m:"Mar '25",bonus:0},
      {m:"Apr '25",bonus:0},
      {m:"May '25",bonus:0},
      {m:"Jun '25",bonus:0},
      {m:"Jul '25",bonus:0},
      {m:"Aug '25",bonus:0},
      {m:"Sep '25",bonus:0},
      {m:"Oct '25",bonus:30,label:"30% bonus"},
      {m:"Nov '25",bonus:0},
      {m:"Dec '25",bonus:0},
      {m:"Jan '26",bonus:0},
      {m:"Feb '26",bonus:0},
      {m:"Mar '26",bonus:0},
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

function CityGuides({ onPlanTrip, isMobile }) {
  const [selected, setSelected] = useState(null);
  const [activeSpot, setActiveSpot] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const CATEGORIES = [
    { key:"All",           label:"Best Of",        emoji:"✦" },
    { key:"Sweet Eats",    label:"Sweet Eats",     emoji:"🍰" },
    { key:"Cheap Eats",    label:"Cheap Eats",     emoji:"🍜" },
    { key:"Splurge",       label:"Splurge",        emoji:"⭐" },
    { key:"Free Activities",label:"Free Activities",emoji:"🎟️" },
  ];

  const CAT_COLORS = {
    "Sweet Eats":     "#e87fa0",
    "Cheap Eats":     "#6dbf8a",
    "Splurge":        "#d4a843",
    "Free Activities":"#7eb5e8",
  };

  if (selected) {
    const city = CITY_GUIDES[selected];
    const filteredSpots = activeCategory === "All"
      ? city.spots.filter(s => s.topPick)
      : city.spots.filter(s => s.category === activeCategory);
    const safeIdx = Math.min(activeSpot, filteredSpots.length - 1);
    const spot = filteredSpots[safeIdx];

    // Category counts for this city
    const catCounts = {};
    city.spots.forEach(s => { catCounts[s.category] = (catCounts[s.category] || 0) + 1; });

    return (
      <div style={{flex:1,overflowY:"auto",background:BG}}>
        {/* Hero header */}
        <div style={{background:`linear-gradient(160deg,${city.coverColor} 0%,${BG} 100%)`,padding:"32px 36px 28px",borderBottom:`1px solid ${BORDER}`}}>
          <button onClick={()=>{setSelected(null);setActiveCategory("All");setActiveSpot(0);}}
            style={{background:"none",border:"none",color:MUT,cursor:"pointer",fontSize:13,fontFamily:F,marginBottom:16,padding:0}}>
            ← All City Guides
          </button>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16}}>
            <div>
              <div style={{fontSize:42,marginBottom:6}}>{city.emoji}</div>
              <h1 style={{fontSize:32,margin:0,color:TEXT,fontWeight:400}}>{selected}</h1>
              <p style={{color:city.accent,fontSize:14,margin:"4px 0 12px",fontStyle:"italic"}}>{city.tagline}</p>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
                <VerifiedBadge />
                <span style={{fontSize:12,color:MUT}}>Visited {city.visited}</span>
                <BudgetBadge b={city.budgetRating} />
                <span style={{fontSize:12,color:MUT}}><KidRating n={city.kidRating} /> for families</span>
              </div>
            </div>
            <button onClick={()=>onPlanTrip(selected)}
              style={{padding:"10px 20px",background:G,border:"none",borderRadius:8,color:BG,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:F,whiteSpace:"nowrap"}}>
              ✈️ Plan a Trip Here →
            </button>
          </div>
          <div style={{marginTop:18,padding:"12px 16px",background:"rgba(126,184,106,0.08)",border:`1px solid ${BORDER}`,borderRadius:8}}>
            <span style={{fontSize:11,color:G,fontWeight:700,letterSpacing:"0.1em"}}>💡 INSIDER TIP · </span>
            <span style={{fontSize:13,color:TEXT}}>{city.topTip}</span>
          </div>
        </div>

        <div style={{padding:"24px 36px"}}>
          {/* Category filter tabs */}
          <div style={{display:"flex",gap:7,marginBottom:22,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{fontSize:10,color:MUT,letterSpacing:"0.1em",textTransform:"uppercase",marginRight:4}}>Filter:</span>
            {CATEGORIES.filter(c => c.key === "All" || catCounts[c.key]).map(c => {
              const isActive = activeCategory === c.key;
              const color = CAT_COLORS[c.key] || G;
              return (
                <button key={c.key}
                  onClick={() => {
                    setActiveCategory(c.key);
                    const spots = c.key === "All" ? city.spots.filter(s => s.topPick) : city.spots.filter(s => s.category === c.key);
                    const topIdx = spots.findIndex(s => s.topPick);
                    setActiveSpot(topIdx >= 0 ? topIdx : 0);
                  }}
                  style={{
                    padding:"6px 14px", borderRadius:20, border:`1px solid ${isActive ? color : "rgba(255,255,255,0.1)"}`,
                    background: isActive ? `${color}22` : "rgba(255,255,255,0.03)",
                    color: isActive ? color : MUT,
                    fontSize:12, fontWeight: isActive ? 700 : 400,
                    cursor:"pointer", fontFamily:F, transition:"all 0.15s",
                    display:"flex", alignItems:"center", gap:5,
                  }}>
                  <span>{c.emoji}</span>
                  <span>{c.label}</span>
                  {c.key !== "All" && catCounts[c.key] && (
                    <span style={{fontSize:9,opacity:0.7}}>({catCounts[c.key]})</span>
                  )}
                </button>
              );
            })}
          </div>

          {filteredSpots.length === 0 ? (
            <div style={{padding:"40px",textAlign:"center",color:MUT,fontStyle:"italic"}}>
              No spots in this category yet.
            </div>
          ) : (
            <>
              {/* Spot selector pills */}
              <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
                {filteredSpots.map((s, i) => {
                  const catColor = CAT_COLORS[s.category] || city.accent;
                  return (
                    <button key={i} onClick={() => setActiveSpot(i)}
                      style={{
                        padding:"7px 15px", borderRadius:20, border:"none",
                        background: safeIdx === i ? catColor : "rgba(255,255,255,0.06)",
                        color: safeIdx === i ? "#0c1a0e" : MUT,
                        fontSize:12, fontWeight: safeIdx === i ? 700 : 400,
                        cursor:"pointer", fontFamily:F, transition:"all 0.15s",
                        display:"flex", alignItems:"center", gap:5,
                        outline: s.topPick && safeIdx !== i ? `1px solid ${catColor}55` : "none",
                      }}>
                      <span>{s.emoji}</span>
                      <span>{s.name}</span>
                      {s.topPick && <span style={{fontSize:9,background:"rgba(212,168,67,0.25)",color:GOLD,padding:"1px 5px",borderRadius:6,fontWeight:700,letterSpacing:"0.05em"}}>TOP</span>}
                    </button>
                  );
                })}
              </div>

              {/* Spot detail card */}
              {spot && (
                <div style={{background:SURF,borderRadius:14,overflow:"hidden",border:`1px solid ${BORDER}`}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0}}>
                    <img src={spot.photo} alt={spot.name}
                      style={{width:"100%",height:280,objectFit:"cover"}}
                      onError={e => e.target.style.display = "none"} />
                    <div style={{padding:"24px 24px 24px 24px",display:"flex",flexDirection:"column",gap:12}}>
                      <div>
                        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:8}}>
                          <VerifiedBadge />
                          <BudgetBadge b={spot.budget} />
                          {/* Category badge */}
                          <span style={{
                            fontSize:10, padding:"2px 8px", borderRadius:8, fontWeight:700,
                            background:`${CAT_COLORS[spot.category] || G}22`,
                            color: CAT_COLORS[spot.category] || G,
                            border:`1px solid ${CAT_COLORS[spot.category] || G}44`,
                          }}>
                            {spot.category}
                          </span>
                          <span style={{fontSize:12,color:MUT}}>{spot.type}</span>
                        </div>
                        <h2 style={{fontSize:22,margin:0,color:TEXT,fontWeight:400}}>{spot.name}</h2>
                        <div style={{marginTop:6,fontSize:13,color:MUT}}><KidRating n={spot.kidFriendly} /> kid-friendly</div>
                      </div>
                      <div style={{padding:"10px 14px",background:"rgba(212,168,67,0.1)",borderRadius:8,border:"1px solid rgba(212,168,67,0.2)"}}>
                        <div style={{fontSize:10,color:GOLD,fontWeight:700,letterSpacing:"0.1em",marginBottom:3}}>
                          {spot.category === "Free Activities" ? "🎯 DON'T MISS" : "🍽️ MUST ORDER"}
                        </div>
                        <div style={{fontSize:14,color:TEXT}}>{spot.mustOrder}</div>
                      </div>
                      <p style={{fontSize:14,lineHeight:1.7,color:"rgba(232,234,212,0.8)",margin:0,fontStyle:"italic"}}>
                        "{spot.review}"
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Points footer */}
          <div style={{marginTop:20,padding:"14px 18px",background:SURF2,borderRadius:10,border:`1px solid ${BORDER}`,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontSize:18}}>⭐</span>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:700,color:G}}>Best points programs for {selected}</div>
              <div style={{fontSize:12,color:MUT,marginTop:2}}>{city.pointsProgram}</div>
            </div>
            <button onClick={()=>onPlanTrip(selected)}
              style={{padding:"7px 14px",background:"rgba(126,184,106,0.15)",border:`1px solid ${BORDER}`,borderRadius:6,color:G,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:F}}>
              Plan This Trip →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── City grid ──────────────────────────────────────────────────────────────
  return (
    <div style={{flex:1,overflowY:"auto",padding:isMobile?"16px":"32px 36px"}}>
      <div style={{marginBottom:28}}>
        <h2 style={{fontSize:26,color:TEXT,margin:0,fontWeight:400}}>City Guides</h2>
        <p style={{color:MUT,fontSize:14,marginTop:6}}>Places we've actually been — restaurants, sights & honest family reviews.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
        {Object.entries(CITY_GUIDES).map(([name, city]) => {
          // Count spots per category for the card preview chips
          const catCounts = {};
          city.spots.forEach(s => { catCounts[s.category] = (catCounts[s.category] || 0) + 1; });
          return (
            <div key={name}
              onClick={() => { setSelected(name); setActiveSpot(0); setActiveCategory("All"); }}
              style={{background:SURF,borderRadius:14,overflow:"hidden",border:`1px solid ${BORDER}`,cursor:"pointer",transition:"transform 0.15s, border-color 0.15s"}}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "rgba(126,184,106,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = BORDER; }}>
              <div style={{background:`linear-gradient(135deg,${city.coverColor},${SURF})`,padding:"22px 20px 18px",borderBottom:`1px solid ${BORDER}`}}>
                <div style={{fontSize:36,marginBottom:8}}>{city.emoji}</div>
                <h3 style={{fontSize:18,margin:0,color:TEXT,fontWeight:400}}>{name}</h3>
                <p style={{fontSize:12,color:city.accent,margin:"4px 0 0",fontStyle:"italic"}}>{city.tagline}</p>
              </div>
              <div style={{padding:"14px 20px"}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10,flexWrap:"wrap"}}>
                  <VerifiedBadge /><BudgetBadge b={city.budgetRating} />
                </div>
                <div style={{fontSize:12,color:MUT,marginBottom:10}}><KidRating n={city.kidRating} /> family rating</div>
                {/* Category chips */}
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
                  {Object.entries(catCounts).map(([cat, count]) => (
                    <span key={cat} style={{
                      fontSize:9, padding:"2px 7px", borderRadius:8, fontWeight:600,
                      background:`${CAT_COLORS[cat] || G}18`,
                      color: CAT_COLORS[cat] || G,
                      border:`1px solid ${CAT_COLORS[cat] || G}33`,
                    }}>
                      {cat} ({count})
                    </span>
                  ))}
                </div>
                <div style={{fontSize:12,color:MUT}}>Visited {city.visited}</div>
                <div style={{marginTop:10,fontSize:12,color:G,fontWeight:600}}>View city guide →</div>
              </div>
            </div>
          );
        })}
        <div style={{background:SURF,borderRadius:14,border:`2px dashed rgba(126,184,106,0.2)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,textAlign:"center",minHeight:200}}>
          <div style={{fontSize:32,marginBottom:10}}>✍️</div>
          <div style={{fontSize:14,color:MUT,marginBottom:8}}>More cities coming soon</div>
          <div style={{fontSize:12,color:"rgba(126,184,106,0.5)"}}>Drop your cities in to add guides</div>
        </div>
      </div>
    </div>
  );
}

const PLANNER_SYSTEM = `You are an expert family travel planner specializing in points & miles and food-focused travel. When the destination is "suggest based on points", recommend 3 diverse destinations that make sense for the traveler's points programs and interests — do NOT default to Charleston or any single city. When given trip details, provide exactly these 4 sections with these exact headers:

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

function Planner({ prefillCity, onViewGuides, onViewTracker, userCards, myPrograms, pointsSummary }) {
  const hasCards = userCards && userCards.length > 0;
  const defaultPoints = pointsSummary || (hasCards && myPrograms && myPrograms.length > 0 ? myPrograms.join(", ") : "");
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [matchedCity, setMatchedCity] = useState(null);
  const [form, setForm] = useState({
    origin:"", destination: prefillCity||"", travelers:"", when:"", tripLength:"", budget:"", points: defaultPoints ? [defaultPoints] : [], interests:[],
  });

  const setField = (k,v) => setForm(f=>({...f,[k]:v}));
  const toggleChip = (k,v) => setForm(f=>({...f,[k]:f[k].includes(v)?f[k].filter(x=>x!==v):[...f[k],v]}));

  const isReady = form.origin && form.travelers && form.when && form.tripLength;

  const handleSubmit = async () => {
    if (!isReady) return;
    setLoading(true); setStep("loading");
    const match = form.destination ? Object.keys(CITY_GUIDES).find(c=>form.destination?.toLowerCase().includes(c.toLowerCase())||c.toLowerCase().includes(form.destination?.toLowerCase())) : null;
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
            <div style={{marginBottom:16,padding:"12px 16px",background:"rgba(126,184,106,0.1)",border:`1px solid ${BORDER}`,borderRadius:8,display:"flex",gap:10,alignItems:"center"}}>
              <span>📍</span><div style={{fontSize:13,color:TEXT}}>Planning a trip to <strong style={{color:G}}>{prefillCity}</strong> — we have verified picks for this city!</div>
            </div>
          )}
          {pointsSummary && (
            <div style={{marginBottom:16,padding:"12px 16px",background:"rgba(212,168,67,0.08)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:8,display:"flex",gap:10,alignItems:"center"}}>
              <span>⭐</span>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:GOLD,marginBottom:2}}>Using your saved points balances</div>
                <div style={{fontSize:12,color:MUT}}>{pointsSummary}</div>
              </div>
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
                <StyledSelect value={form.destination} onChange={v=>setField("destination",v)} placeholder="Suggest based on my points">
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

function Tracker({ userCards, isMobile }) {
  const [showDetail, setShowDetail] = useState(false);
  const hasCards = userCards && userCards.length > 0;
  // Default to first card you DON'T have; sign-on bonuses only matter for new cards
  const notOwnedCards = Object.keys(CARD_DB).filter(n => !hasCards || !userCards.includes(n));
  const defaultCard = notOwnedCards[0] || "Chase Sapphire Preferred";
  const [selected,setSelected]=useState(defaultCard);
  const [search,setSearch]=useState("");
  const [filter,setFilter]=useState(hasCards?"Not Mine":"All");
  const [aiInsight,setAiInsight]=useState("");
  const [loadingAI,setLoadingAI]=useState(false);
  const card=CARD_DB[selected]||CARD_DB["Chase Sapphire Preferred"];
  const hist=card.history.map(h=>({month:h.m,bonus:h.b}));
  const active=hist.filter(h=>h.bonus>0);
  const cur=hist[hist.length-1];
  const max=Math.max(...active.map(h=>h.bonus));
  const min=Math.min(...active.map(h=>h.bonus));
  const avg=Math.round(active.reduce((a,b)=>a+b.bonus,0)/active.length);
  const isHigh=cur.bonus>=max;
  const isLow=cur.bonus>0&&cur.bonus<=min;
  const names=Object.keys(CARD_DB).filter(n=>{
    const matchSearch=n.toLowerCase().includes(search.toLowerCase());
    const matchFilter=
      filter==="All"
      ||(filter==="Not Mine"&&hasCards&&!userCards.includes(n))
      ||(filter==="Mine"&&hasCards&&userCards.includes(n))
      ||CARD_DB[n].issuer===filter;
    return matchSearch&&matchFilter;
  });
  const getInsight=async()=>{
    setLoadingAI(true);setAiInsight("");
    try{const res=await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:"You are a credit card rewards expert. Be concise — 3 sentences max. No markdown.",messages:[{role:"user",content:`Analyze the ${selected} sign-on bonus timing. Current: ${cur.bonus.toLocaleString()} pts. 12-mo high: ${max.toLocaleString()}. Low: ${min.toLocaleString()}. Avg: ${avg.toLocaleString()}. Annual fee: $${card.annualFee}. Should I apply now?`}]})});const data=await res.json();setAiInsight(data.content?.map(b=>b.text||"").join("")||"Unable to load.");}catch{setAiInsight("Something went wrong.");}
    setLoadingAI(false);
  };
  return (
    <div style={{display:"flex",flex:1,minHeight:0,overflow:"hidden",position:"relative"}}>
      {(!isMobile || !showDetail) && <div style={{width:isMobile?"100%":250,background:"#0a160b",borderRight:isMobile?"none":`1px solid ${BORDER}`,display:isMobile&&showDetail?"none":"flex",flexDirection:"column",overflowY:"auto",flexShrink:0,flex:isMobile?"1":"0 0 250px"}}>
        <div style={{padding:14}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search cards..." style={{width:"100%",padding:"8px 11px",background:"rgba(255,255,255,0.04)",border:`1px solid ${BORDER}`,borderRadius:7,color:TEXT,fontSize:12,outline:"none",boxSizing:"border-box",fontFamily:F}}/>
          <div style={{display:"flex",gap:4,marginTop:9,flexWrap:"wrap"}}>
            {[...(hasCards?["Not Mine","Mine"]:[]),"All","Chase","Citi","Amex","Capital One"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{padding:"3px 8px",borderRadius:9,border:"none",background:filter===f?G:"rgba(255,255,255,0.06)",color:filter===f?BG:MUT,fontSize:10,cursor:"pointer",fontFamily:F,fontWeight:filter===f?700:400}}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"0 6px 14px"}}>
          {names.map(name=>{
            const c=CARD_DB[name];const latest=c.history[c.history.length-1].b;const cmax=Math.max(...c.history.filter(h=>h.b>0).map(h=>h.b));const isPeak=latest>=cmax&&latest>0;const isSel=selected===name;
            return (
              <div key={name} onClick={()=>{setSelected(name);setAiInsight("");if(isMobile)setShowDetail(true);}} style={{padding:"10px 11px",borderRadius:7,marginBottom:3,cursor:"pointer",background:isSel?`${c.color}cc`:"transparent",border:isSel?`1px solid ${c.accent}44`:"1px solid transparent",transition:"all 0.15s"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:4}}>
                  <div style={{fontSize:12,fontWeight:isSel?700:400,color:isSel?"#f0f0e0":"rgba(232,234,212,0.65)",lineHeight:1.3}}>{name}</div>
                  <div style={{display:"flex",gap:3,flexShrink:0}}>
                    {hasCards&&userCards.includes(name)&&<span style={{fontSize:8,padding:"1px 5px",borderRadius:5,background:"rgba(200,160,60,0.15)",color:GOLD,border:"1px solid rgba(200,160,60,0.3)",fontWeight:700,whiteSpace:"nowrap"}}>HAVE</span>}
                    {isPeak&&<span style={{fontSize:8,padding:"1px 5px",borderRadius:5,background:"rgba(126,184,106,0.2)",color:G,border:`1px solid rgba(126,184,106,0.4)`,fontWeight:700,whiteSpace:"nowrap"}}>PEAK</span>}
                  </div>
                </div>
                <div style={{fontSize:11,color:isSel?c.accent:MUT,marginTop:2}}>{latest>0?fmt(latest)+" pts":"New"} · ${c.annualFee}/yr</div>
              </div>
            );
          })}
        </div>
      </div>}
      {(!isMobile || showDetail) && <div style={{flex:1,overflowY:"auto",padding:isMobile?"14px 16px":"22px 26px",display:showDetail||!isMobile?"flex":"none",flexDirection:"column",background:isMobile?BG:"transparent",zIndex:isMobile?10:0}}>
        {isMobile && showDetail && <button onClick={()=>setShowDetail(false)} style={{background:"none",border:"none",color:"rgba(232,234,212,0.5)",cursor:"pointer",fontSize:13,fontFamily:"Georgia,serif",marginBottom:12,padding:0}}>← Back to list</button>}
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
      </div>}
    </div>
  );
}

// ─── TRANSFER BONUS TRACKER ───────────────────────────────────────────────────
const REFRESH_SYSTEM = `You are a points & miles expert with web search access. Find ALL currently active credit card transfer bonuses.

Search for current transfer bonus offers from Chase, Amex, Citi, and Capital One to airline and hotel partners. Check recent posts on frequentmiler.com, thepointsguy.com, and awardsummary.com.

Return ONLY a valid JSON array (no markdown, no preamble) in this exact structure:
[{"id":"chase-hyatt","bonus":30,"expiry":"Mar 31, 2025"}]

Valid IDs: chase-hyatt, chase-united, chase-virgin, chase-airfrance, chase-singapore, chase-avianca, amex-united, amex-avianca, amex-virgin, amex-airfrance, amex-hilton, amex-singapore, citi-united, citi-turkish, citi-virgin, citi-airfrance, citi-singapore, citi-avianca, cap1-united, cap1-hilton, cap1-turkish, cap1-avianca, cap1-virgin, cap1-airfrance, cap1-singapore

Only include partnerships with a CONFIRMED active bonus right now. Set bonus to the integer percentage (e.g. 30 for 30% bonus). If none are active, return [].`;

function TransferTracker({ userCards, isMobile }) {
  const [showDetail, setShowDetail] = useState(false);
  const hasCards = userCards && userCards.length > 0;
  const myProgramShorts = hasCards ? Array.from(new Set(userCards.map(n=>{
    const prog = CARD_DB[n]?.program||"";
    if(prog.includes("Chase")) return "Chase UR";
    if(prog.includes("Amex")) return "Amex MR";
    if(prog.includes("Capital One")) return "Cap1";
    if(prog.includes("Citi")) return "Citi TY";
    return null;
  }).filter(Boolean))) : [];

  const [filterType, setFilterType] = useState("All");
  const [search, setSearch] = useState("");
  const [liveOverrides, setLiveOverrides] = useState(null);
  const [refreshState, setRefreshState] = useState("idle");
  const [refreshMsg, setRefreshMsg] = useState("");
  const [lastRefreshed, setLastRefreshed] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);

  // Merge static DB with live overrides
  const mergedDB = TRANSFER_DB.map(t => {
    if (!liveOverrides) return t;
    const ov = liveOverrides[t.id];
    if (!ov) return t;
    return { ...t, liveExpiry: ov.expiry, history: [...t.history.slice(0,-1), { m:"Now", bonus: ov.bonus }] };
  });

  // Group by DESTINATION partner — this is the key restructure
  const partnerGroups = {};
  mergedDB.forEach(t => {
    if (!partnerGroups[t.partner]) {
      partnerGroups[t.partner] = {
        partner: t.partner,
        partnerEmoji: t.partnerEmoji,
        partnerType: t.partnerType,
        sources: [],
      };
    }
    partnerGroups[t.partner].sources.push(t);
  });
  const allPartners = Object.values(partnerGroups);

  const [selectedPartner, setSelectedPartner] = useState(allPartners[0]?.partner || "");

  const filtered = allPartners.filter(g => {
    const matchType = filterType === "All" || g.partnerType === filterType;
    const matchSearch = !search || g.partner.toLowerCase().includes(search.toLowerCase());
    const matchMyPrograms = !hasCards || myProgramShorts.length === 0 ||
      g.sources.some(s => myProgramShorts.includes(s.programShort));
    return matchType && matchSearch && matchMyPrograms;
  });

  const currentGroup = partnerGroups[selectedPartner] || allPartners[0];

  // Build unified month axis from all sources in this group
  const allMonths = currentGroup
    ? Array.from(new Set(currentGroup.sources.flatMap(s => s.history.map(h => h.m))))
    : [];

  // Build multi-line chart data: [{month, "Chase UR": 30, "Amex MR": 0, ...}]
  const multiChartData = allMonths.map(m => {
    const row = { month: m };
    if (currentGroup) {
      currentGroup.sources.forEach(s => {
        const h = s.history.find(x => x.m === m);
        row[s.programShort] = h ? h.bonus : 0;
      });
    }
    return row;
  });

  // Colors per source program
  const PROGRAM_COLORS = {
    "Chase UR": "#4a90d9",
    "Amex MR":  "#a8c5e8",
    "Citi TY":  "#4fc3e8",
    "Cap1":     "#e05c5c",
  };

  // Active deals summary (across all groups)
  const activeDeals = allPartners.filter(g =>
    g.sources.some(s => (s.history[s.history.length-1]?.bonus||0) > 0)
  );

  // Stats per source for selected partner
  const sourceStats = currentGroup ? currentGroup.sources.map(s => {
    const active = s.history.filter(h => h.bonus > 0);
    const last = s.history[s.history.length - 1];
    return {
      ...s,
      isActive: last?.bonus > 0,
      currentBonus: last?.bonus || 0,
      maxBonus: active.length ? Math.max(...active.map(h => h.bonus)) : 0,
      frequency: active.length,
    };
  }) : [];

  const overallActive = sourceStats.some(s => s.isActive);
  const overallMax = sourceStats.length ? Math.max(...sourceStats.map(s => s.maxBonus)) : 0;

  const handleAIRefresh = async () => {
    setRefreshState("loading"); setRefreshMsg("");
    try {
      const res = await fetch(API_URL, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system: REFRESH_SYSTEM,
          tools:[{type:"web_search_20250305",name:"web_search"}],
          messages:[{role:"user",content:"Search now for all currently active credit card transfer bonuses and return the JSON array."}],
        }),
      });
      const data = await res.json();
      const fullText = (data.content||[]).map(b=>b.type==="text"?b.text:"").join("\n");
      const jsonMatch = fullText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("No JSON");
      const updates = JSON.parse(jsonMatch[0]);
      const overrides = {};
      TRANSFER_DB.forEach(t => { overrides[t.id] = {bonus:0, expiry:null}; });
      updates.forEach(u => { if (u.id in overrides) overrides[u.id] = {bonus:u.bonus||0, expiry:u.expiry||null}; });
      setLiveOverrides(overrides);
      setLastRefreshed(new Date());
      setRefreshMsg(`AI found ${updates.length} active bonus${updates.length!==1?"es":""} right now.`);
      setRefreshState("done");
    } catch(e) {
      setRefreshMsg("Could not parse live data. Showing historical data.");
      setRefreshState("error");
    }
  };

  return (
    <div style={{display:"flex",flex:1,minHeight:0,overflow:"hidden"}}>

      {/* ── Sidebar: destination programs ── */}
      <div style={{width:isMobile?"100%":260,background:"#0a160b",borderRight:isMobile?"none":`1px solid ${BORDER}`,display:isMobile&&showDetail?"none":"flex",flexDirection:"column",flexShrink:0,overflowY:"auto",flex:isMobile?"1":"0 0 260px"}}>

        {/* AI Refresh */}
        <div style={{padding:"12px 10px 8px"}}>
          <button onClick={handleAIRefresh} disabled={refreshState==="loading"}
            style={{width:"100%",padding:"10px 14px",
              background:refreshState==="loading"?"rgba(126,184,106,0.08)":"linear-gradient(135deg,rgba(126,184,106,0.2),rgba(90,154,58,0.15))",
              border:`1px solid ${refreshState==="done"?G:refreshState==="error"?"#e05c5c":"rgba(126,184,106,0.3)"}`,
              borderRadius:8,color:refreshState==="error"?"#e05c5c":G,fontSize:12,fontWeight:700,
              cursor:refreshState==="loading"?"not-allowed":"pointer",fontFamily:F,
              display:"flex",alignItems:"center",justifyContent:"center",gap:7,transition:"all 0.2s"}}>
            <span style={{fontSize:14}}>{refreshState==="loading"?"⏳":refreshState==="done"?"✅":refreshState==="error"?"⚠️":"🤖"}</span>
            {refreshState==="loading"?"Searching the web...":"AI Refresh Live Bonuses"}
          </button>
          {refreshMsg && <div style={{fontSize:10,color:refreshState==="error"?"#e05c5c":G,marginTop:5,textAlign:"center",fontStyle:"italic"}}>{refreshMsg}</div>}
          {lastRefreshed && <div style={{fontSize:9,color:MUT,marginTop:2,textAlign:"center"}}>Updated: {lastRefreshed.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div>}
          {!liveOverrides && refreshState==="idle" && <div style={{fontSize:9,color:MUT,marginTop:4,textAlign:"center",fontStyle:"italic"}}>Historical data · click to fetch live</div>}
        </div>

        {/* Active now banner */}
        {activeDeals.length > 0 && (
          <div style={{margin:"0 8px 4px",padding:"10px 12px",background:"rgba(126,184,106,0.12)",border:`1px solid rgba(126,184,106,0.3)`,borderRadius:8}}>
            <div style={{fontSize:10,fontWeight:700,color:G,letterSpacing:"0.1em",marginBottom:4}}>
              🔥 {liveOverrides?"LIVE":"HISTORICAL"} — {activeDeals.length} ACTIVE
            </div>
            {activeDeals.map(d=>{
              const activeSrc = d.sources.filter(s=>(s.history[s.history.length-1]?.bonus||0)>0);
              return (
                <div key={d.partner} onClick={()=>{setSelectedPartner(d.partner);if(isMobile)setShowDetail(true);}}
                  style={{fontSize:11,color:TEXT,cursor:"pointer",padding:"3px 0",display:"flex",justifyContent:"space-between"}}>
                  <span>{d.partnerEmoji} {d.partner}</span>
                  <div style={{display:"flex",gap:3}}>
                    {activeSrc.map(s=>(
                      <span key={s.id} style={{fontSize:9,padding:"1px 4px",borderRadius:3,background:PROGRAM_COLORS[s.programShort]+"33",color:PROGRAM_COLORS[s.programShort],fontWeight:700}}>
                        {s.programShort} +{s.history[s.history.length-1].bonus}%
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Filters */}
        <div style={{padding:"8px 10px 6px"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search partner..."
            style={{width:"100%",padding:"7px 10px",background:"rgba(255,255,255,0.04)",border:`1px solid ${BORDER}`,borderRadius:7,color:TEXT,fontSize:12,outline:"none",boxSizing:"border-box",fontFamily:F}}/>
          <div style={{display:"flex",gap:4,marginTop:6}}>
            {["All","Airline","Hotel"].map(t=>(
              <button key={t} onClick={()=>setFilterType(t)}
                style={{padding:"3px 8px",borderRadius:8,border:"none",background:filterType===t?"rgba(212,168,67,0.8)":"rgba(255,255,255,0.06)",color:filterType===t?BG:MUT,fontSize:9,cursor:"pointer",fontFamily:F,fontWeight:filterType===t?700:400}}>{t}</button>
            ))}
          </div>
          {hasCards && myProgramShorts.length>0 && (
            <div style={{marginTop:6,fontSize:9,color:MUT,fontStyle:"italic",padding:"4px 6px",background:"rgba(126,184,106,0.04)",borderRadius:4,border:`1px solid ${BORDER}`}}>
              Filtered to your programs: {myProgramShorts.join(", ")}
            </div>
          )}
        </div>

        {/* Partner list */}
        <div style={{flex:1,overflowY:"auto",padding:"0 6px 14px"}}>
          {filtered.map(g => {
            const isSel = selectedPartner === g.partner;
            const activeSources = g.sources.filter(s=>(s.history[s.history.length-1]?.bonus||0)>0);
            const sourceCount = g.sources.length;
            return (
              <div key={g.partner} onClick={()=>{setSelectedPartner(g.partner);if(isMobile)setShowDetail(true);}}
                style={{padding:"10px 11px",borderRadius:8,marginBottom:3,cursor:"pointer",
                  background:isSel?"rgba(126,184,106,0.1)":"transparent",
                  border:isSel?`1px solid rgba(126,184,106,0.3)`:"1px solid transparent",
                  transition:"all 0.15s"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:4}}>
                  <div style={{fontSize:12,fontWeight:isSel?700:400,color:isSel?"#f0f0e0":"rgba(232,234,212,0.65)",lineHeight:1.3}}>
                    {g.partnerEmoji} {g.partner}
                  </div>
                  {activeSources.length > 0 && (
                    <span style={{fontSize:9,padding:"2px 5px",borderRadius:4,background:"rgba(126,184,106,0.2)",color:G,border:`1px solid rgba(126,184,106,0.4)`,fontWeight:700,whiteSpace:"nowrap",flexShrink:0}}>
                      {activeSources.length} LIVE
                    </span>
                  )}
                </div>
                <div style={{display:"flex",gap:4,marginTop:4,flexWrap:"wrap"}}>
                  {g.sources.map(s=>{
                    const isLive = (s.history[s.history.length-1]?.bonus||0)>0;
                    return (
                      <span key={s.id} style={{fontSize:9,padding:"1px 5px",borderRadius:3,
                        background:isLive?PROGRAM_COLORS[s.programShort]+"33":"rgba(255,255,255,0.05)",
                        color:isLive?PROGRAM_COLORS[s.programShort]:MUT,
                        border:`1px solid ${isLive?PROGRAM_COLORS[s.programShort]+"55":"rgba(255,255,255,0.08)"}`,
                        fontWeight:isLive?700:400}}>
                        {s.programShort}
                      </span>
                    );
                  })}
                  <span style={{fontSize:9,color:MUT}}>{g.partnerType} · {sourceCount} source{sourceCount>1?"s":""}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Detail panel ── */}
      {currentGroup && (
        <div style={{position:isMobile?"absolute":"relative",top:0,left:0,right:0,bottom:0,flex:1,overflowY:"auto",padding:isMobile?"16px":"22px 28px",display:showDetail||!isMobile?"flex":"none",flexDirection:"column",background:isMobile?BG:"transparent",zIndex:isMobile?10:0}}>
          {isMobile && showDetail && <button onClick={()=>setShowDetail(false)} style={{background:"none",border:"none",color:"rgba(232,234,212,0.5)",cursor:"pointer",fontSize:13,fontFamily:"Georgia,serif",marginBottom:12,padding:0}}>← Back to list</button>}

          {/* Header */}
          <div style={{background:"linear-gradient(135deg,#0d1f0f,#111f13)",borderRadius:14,padding:"22px 26px",marginBottom:18,border:`1px solid rgba(126,184,106,0.15)`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:14}}>
              <div>
                <div style={{fontSize:9,letterSpacing:"0.18em",textTransform:"uppercase",color:MUT,marginBottom:4}}>{currentGroup.partnerType} LOYALTY PROGRAM</div>
                <h2 style={{fontSize:24,margin:"0 0 6px",color:"#f0f0e0",fontWeight:400}}>{currentGroup.partnerEmoji} {currentGroup.partner}</h2>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}}>
                  {sourceStats.map(s=>(
                    <div key={s.id} style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:6,
                      background:s.isActive?PROGRAM_COLORS[s.programShort]+"22":"rgba(255,255,255,0.04)",
                      border:`1px solid ${s.isActive?PROGRAM_COLORS[s.programShort]+"55":"rgba(255,255,255,0.08)"}`}}>
                      <span style={{width:8,height:8,borderRadius:"50%",background:PROGRAM_COLORS[s.programShort],display:"inline-block",flexShrink:0}}/>
                      <span style={{fontSize:11,color:s.isActive?PROGRAM_COLORS[s.programShort]:"rgba(232,234,212,0.5)",fontWeight:s.isActive?700:400}}>
                        {s.programShort}
                      </span>
                      {s.isActive && <span style={{fontSize:11,fontWeight:700,color:G}}>+{s.currentBonus}%</span>}
                    </div>
                  ))}
                </div>
              </div>
              {overallActive && (
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:11,color:G,fontWeight:700,letterSpacing:"0.1em",marginBottom:4}}>🔥 ACTIVE NOW</div>
                  {sourceStats.filter(s=>s.isActive).map(s=>(
                    <div key={s.id} style={{fontSize:28,fontWeight:700,lineHeight:1.1,color:PROGRAM_COLORS[s.programShort]}}>
                      +{s.currentBonus}% <span style={{fontSize:12,color:MUT,fontWeight:400}}>{s.programShort}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{marginTop:14,display:"flex",flexWrap:"wrap",gap:8}}>
              {overallActive
                ? <span style={{padding:"4px 12px",borderRadius:14,background:"rgba(126,184,106,0.2)",color:G,border:`1px solid rgba(126,184,106,0.4)`,fontSize:11,fontWeight:700}}>
                    {liveOverrides?"✅ CONFIRMED LIVE":"📊 Was active recently — AI Refresh to confirm"}
                  </span>
                : overallMax > 0
                ? <span style={{padding:"4px 12px",borderRadius:14,background:"rgba(200,160,60,0.12)",color:"#d4b84a",border:"1px solid rgba(200,160,60,0.3)",fontSize:11,fontWeight:700}}>
                    ⏳ {liveOverrides?"No active offer right now":"Not currently active (historical)"}
                  </span>
                : <span style={{padding:"4px 12px",borderRadius:14,background:"rgba(150,150,150,0.1)",color:MUT,border:"1px solid rgba(150,150,150,0.2)",fontSize:11,fontWeight:700}}>📊 Rare bonus — monitor for future offers</span>
              }
            </div>
          </div>

          {/* Per-source stats row */}
          <div style={{display:"grid",gridTemplateColumns:`repeat(${Math.min(sourceStats.length,4)},1fr)`,gap:10,marginBottom:18}}>
            {sourceStats.map(s=>(
              <div key={s.id} style={{background:SURF,borderRadius:10,padding:"13px 15px",border:`1px solid ${s.isActive?PROGRAM_COLORS[s.programShort]+"44":BORDER}`}}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:8}}>
                  <span style={{width:8,height:8,borderRadius:"50%",background:PROGRAM_COLORS[s.programShort],display:"inline-block"}}/>
                  <span style={{fontSize:10,color:PROGRAM_COLORS[s.programShort],fontWeight:700,letterSpacing:"0.08em"}}>{s.programShort}</span>
                </div>
                <div style={{fontSize:9,color:MUT,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:3}}>Peak bonus</div>
                <div style={{fontSize:20,fontWeight:700,color:s.maxBonus?PROGRAM_COLORS[s.programShort]:MUT,lineHeight:1}}>{s.maxBonus?`+${s.maxBonus}%`:"—"}</div>
                <div style={{fontSize:9,color:MUT,marginTop:4}}>{s.frequency}× in 12 mo · {s.baseRatio} ratio</div>
                {s.notes && <div style={{fontSize:9,color:MUT,marginTop:5,lineHeight:1.4,borderTop:`1px solid ${BORDER}`,paddingTop:5,fontStyle:"italic"}}>{s.notes}</div>}
              </div>
            ))}
          </div>

          {/* Heatmap chart */}
          {(()=>{const getOpacity=(bonus)=>{if(bonus===0)return 1;if(bonus<=20)return 0.4;if(bonus<=25)return 0.6;if(bonus<=30)return 0.78;return 1;};return(
              <div style={{background:SURF,borderRadius:12,border:`1px solid ${BORDER}`,padding:"18px 20px",marginBottom:18}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,flexWrap:"wrap",gap:8}}>
                  <div>
                    <div style={{fontSize:10,letterSpacing:"0.14em",textTransform:"uppercase",color:MUT}}>Transfer Bonus History — Heatmap by Source Currency</div>
                    <div style={{fontSize:11,color:MUT,marginTop:3,fontStyle:"italic"}}>Darker cell = higher bonus. Empty = no offer that month.</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:9,color:MUT}}>Intensity:</span>
                    {[[0,"none"],[25,"+25%"],[30,"+30%"],[40,"+40%"]].map(([v,label])=>(
                      <div key={v} style={{display:"flex",alignItems:"center",gap:3}}>
                        <div style={{width:16,height:12,borderRadius:2,background:v===0?"rgba(255,255,255,0.04)":G,opacity:v===0?1:getOpacity(v)}}/>
                        <span style={{fontSize:9,color:MUT}}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{overflowX:"auto"}}>
                  <table style={{borderCollapse:"separate",borderSpacing:3,fontFamily:F,width:"100%"}}>
                    <thead>
                      <tr>
                        <th style={{width:76,fontSize:0}}/>
                        {allMonths.map(m=>(
                          <th key={m} style={{fontSize:8,color:MUT,fontWeight:400,textAlign:"center",paddingBottom:6,minWidth:36,whiteSpace:"nowrap"}}>
                            {m.replace(" '","'")}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sourceStats.map(s=>(
                        <tr key={s.id}>
                          <td style={{fontSize:10,color:PROGRAM_COLORS[s.programShort],fontWeight:700,textAlign:"right",paddingRight:10,paddingBottom:3,whiteSpace:"nowrap",verticalAlign:"middle"}}>
                            {s.programShort}
                          </td>
                          {allMonths.map((m,i)=>{
                            const h = s.history.find(x=>x.m===m);
                            const bonus = h ? h.bonus : 0;
                            const isHov = hoveredCell?.prog===s.programShort && hoveredCell?.month===m;
                            return (
                              <td key={m}
                                onMouseEnter={()=>setHoveredCell({prog:s.programShort,month:m,bonus})}
                                onMouseLeave={()=>setHoveredCell(null)}
                                style={{
                                  height:34,borderRadius:6,cursor:"default",
                                  background:bonus>0?PROGRAM_COLORS[s.programShort]:"rgba(255,255,255,0.04)",
                                  opacity:bonus>0?getOpacity(bonus):1,
                                  border:isHov?`2px solid ${TEXT}`:"2px solid transparent",
                                  transition:"opacity 0.1s, border 0.1s",
                                  textAlign:"center",verticalAlign:"middle",
                                }}>
                                {bonus>0&&(
                                  <span style={{fontSize:9,fontWeight:700,color:"#0a1a0c",display:"block",lineHeight:"34px"}}>
                                    +{bonus}%
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Hover tooltip row */}
                <div style={{marginTop:10,height:20,fontFamily:F}}>
                  {hoveredCell ? (
                    <div style={{fontSize:11,color:hoveredCell.bonus>0?PROGRAM_COLORS[hoveredCell.prog]:MUT}}>
                      {hoveredCell.prog} · {hoveredCell.month} →{" "}
                      {hoveredCell.bonus>0?<strong>+{hoveredCell.bonus}% bonus active</strong>:"No offer"}
                    </div>
                  ) : (
                    <div style={{fontSize:10,color:"rgba(232,234,212,0.2)",fontStyle:"italic"}}>Hover a cell for details</div>
                  )}
                </div>
              </div>
);})()}

          {/* All active offers strip */}
          {activeDeals.length > 0 && (
            <div style={{background:SURF2,borderRadius:10,border:`1px solid rgba(126,184,106,0.2)`,padding:"14px 18px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
                <div style={{fontSize:10,letterSpacing:"0.12em",color:G,fontWeight:700}}>
                  🔥 {liveOverrides?"CONFIRMED LIVE":"HISTORICALLY ACTIVE"} TRANSFER BONUSES
                </div>
                {liveOverrides && lastRefreshed && <span style={{fontSize:9,color:MUT}}>as of {lastRefreshed.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>}
                {!liveOverrides && <span style={{fontSize:9,color:MUT,fontStyle:"italic"}}>Hit "AI Refresh" for live data</span>}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {activeDeals.map(g=>{
                  const activeSrc = g.sources.filter(s=>(s.history[s.history.length-1]?.bonus||0)>0);
                  return (
                    <div key={g.partner} onClick={()=>{setSelectedPartner(g.partner);if(isMobile)setShowDetail(true);}}
                      style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",background:"rgba(126,184,106,0.07)",borderRadius:7,cursor:"pointer",border:`1px solid rgba(126,184,106,0.15)`,transition:"background 0.15s"}}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(126,184,106,0.12)"}
                      onMouseLeave={e=>e.currentTarget.style.background="rgba(126,184,106,0.07)"}>
                      <div style={{fontSize:13,color:TEXT,fontWeight:600}}>{g.partnerEmoji} {g.partner}</div>
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        {activeSrc.map(s=>(
                          <div key={s.id} style={{textAlign:"center"}}>
                            <div style={{fontSize:16,fontWeight:700,color:PROGRAM_COLORS[s.programShort]}}>+{s.history[s.history.length-1].bonus}%</div>
                            <div style={{fontSize:9,color:MUT}}>{s.programShort}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// ─── MY POINTS WALLET ─────────────────────────────────────────────────────────
function MyPoints({ balances, onUpdate, userCards, onGoPlanner }) {
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState("");
  const [activeSection, setActiveSection] = useState("creditCard");

  const allPrograms = [
    ...POINTS_CATALOG.creditCard,
    ...POINTS_CATALOG.airline,
    ...POINTS_CATALOG.hotel,
  ];

  const totalPrograms = allPrograms.filter(p => (balances[p.id] || 0) > 0).length;
  const totalPoints = Object.values(balances).reduce((a, b) => a + (b || 0), 0);

  // Alerts: programs where balance hits a redemption threshold
  const alerts = [];
  allPrograms.forEach(p => {
    const bal = balances[p.id] || 0;
    const thresh = REDEMPTION_THRESHOLDS[p.id];
    if (!thresh || bal === 0) return;
    if (thresh.business && bal >= thresh.business)
      alerts.push({ ...p, bal, tier: "business class", needed: thresh.business, icon: "🏆" });
    else if (thresh.international && bal >= thresh.international)
      alerts.push({ ...p, bal, tier: "int'l economy", needed: thresh.international, icon: "✈️" });
    else if (thresh.domestic && bal >= thresh.domestic)
      alerts.push({ ...p, bal, tier: "domestic flight", needed: thresh.domestic, icon: "🎯" });
  });

  const startEdit = (id, currentBal) => {
    setEditing(id);
    setDraft(currentBal > 0 ? String(currentBal) : "");
  };

  const saveEdit = (id) => {
    const val = parseInt((draft || "0").replace(/,/g, ""), 10);
    onUpdate({ ...balances, [id]: isNaN(val) ? 0 : val });
    setEditing(null);
    setDraft("");
  };

  const cancelEdit = () => {
    setEditing(null);
    setDraft("");
  };

  const getOpacity = (bonus) => {
    if (bonus === 0) return 1;
    if (bonus <= 20) return 0.4;
    if (bonus <= 25) return 0.6;
    if (bonus <= 30) return 0.78;
    return 1;
  };

  // Suggest programs based on user cards
  const suggestedIds = new Set();
  if (userCards) {
    userCards.forEach(name => {
      const prog = CARD_DB[name]?.program || "";
      if (prog.includes("Chase")) suggestedIds.add("chase-ur");
      if (prog.includes("Amex")) suggestedIds.add("amex-mr");
      if (prog.includes("Citi")) suggestedIds.add("citi-ty");
      if (prog.includes("Capital One")) suggestedIds.add("cap1-miles");
      if (prog.includes("Delta")) suggestedIds.add("delta");
      if (prog.includes("United")) suggestedIds.add("united");
      if (prog.includes("AAdvantage")) suggestedIds.add("aa");
    });
  }

  const sections = [
    { key: "creditCard", label: "💳 Credit Card Points", items: POINTS_CATALOG.creditCard },
    { key: "airline",    label: "✈️ Airline Miles",       items: POINTS_CATALOG.airline },
    { key: "hotel",      label: "🏨 Hotel Points",         items: POINTS_CATALOG.hotel },
  ];

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"28px 36px", maxWidth:900, margin:"0 auto", width:"100%" }}>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ fontSize:24, color:TEXT, margin:0, fontWeight:400 }}>My Points Wallet</h2>
          <p style={{ color:MUT, fontSize:13, margin:"5px 0 0" }}>
            {totalPrograms > 0
              ? `Tracking ${totalPoints.toLocaleString()} points across ${totalPrograms} program${totalPrograms > 1 ? "s" : ""}`
              : "Tap any program card to add your balance"}
          </p>
        </div>
        {totalPoints > 0 && (
          <button onClick={onGoPlanner}
            style={{ padding:"9px 18px", background:`linear-gradient(135deg,${G},#5a9a3a)`, border:"none", borderRadius:8, color:BG, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:F }}>
            ✈️ Plan a Trip With My Points →
          </button>
        )}
      </div>

      {/* Redemption Alerts */}
      {alerts.length > 0 && (
        <div style={{ marginBottom:24, padding:"16px 20px", background:"rgba(126,184,106,0.07)", border:`1px solid rgba(126,184,106,0.25)`, borderRadius:12 }}>
          <div style={{ fontSize:11, fontWeight:700, color:G, letterSpacing:"0.12em", marginBottom:12 }}>🔔 REDEMPTION ALERTS — YOU HAVE ENOUGH FOR:</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {alerts.map(a => (
              <div key={a.id + a.tier} onClick={onGoPlanner}
                style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", background:SURF, borderRadius:8, border:`1px solid ${a.accent}33`, cursor:"pointer" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = a.accent}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${a.accent}33`}>
                <span style={{ fontSize:16 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:TEXT }}>{a.name}</div>
                  <div style={{ fontSize:10, color:a.accent }}>{a.bal.toLocaleString()} pts · enough for {a.tier}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section tabs */}
      <div style={{ display:"flex", gap:6, marginBottom:20 }}>
        {sections.map(s => (
          <button key={s.key} onClick={() => setActiveSection(s.key)}
            style={{ padding:"7px 16px", borderRadius:18, border:"none",
              background: activeSection === s.key ? "rgba(126,184,106,0.18)" : "rgba(255,255,255,0.04)",
              color: activeSection === s.key ? G : MUT,
              fontSize:12, fontWeight: activeSection === s.key ? 700 : 400,
              cursor:"pointer", fontFamily:F,
              borderBottom: activeSection === s.key ? `2px solid ${G}` : "2px solid transparent" }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Program grid */}
      {sections.filter(s => s.key === activeSection).map(s => (
        <div key={s.key} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))", gap:10 }}>
          {s.items.map(p => {
            const bal = balances[p.id] || 0;
            const thresh = REDEMPTION_THRESHOLDS[p.id];
            const isEditing = editing === p.id;
            const isSuggested = suggestedIds.has(p.id) && bal === 0;

            let nextThresh = null, nextLabel = "", progress = 0;
            if (thresh) {
              if (thresh.domestic && bal < thresh.domestic) { nextThresh = thresh.domestic; nextLabel = "domestic"; }
              else if (thresh.international && bal < thresh.international) { nextThresh = thresh.international; nextLabel = "int'l economy"; }
              else if (thresh.business && bal < thresh.business) { nextThresh = thresh.business; nextLabel = "business class"; }
              if (nextThresh) {
                const prev = nextLabel === "domestic" ? 0
                  : nextLabel === "int'l economy" ? (thresh.domestic || 0)
                  : (thresh.international || thresh.domestic || 0);
                progress = Math.min(100, Math.round(((bal - prev) / (nextThresh - prev)) * 100));
              }
            }

            return (
              <div key={p.id}
                style={{ background: bal > 0 ? `linear-gradient(135deg,${p.color}cc,${p.color}88)` : SURF,
                  borderRadius:11, border:`1px solid ${bal > 0 ? p.accent + "44" : isSuggested ? "rgba(126,184,106,0.2)" : BORDER}`,
                  padding:"14px 16px", transition:"all 0.15s", position:"relative", overflow:"hidden" }}>

                {isSuggested && (
                  <div style={{ position:"absolute", top:8, right:8, fontSize:9, padding:"2px 6px", borderRadius:5,
                    background:"rgba(126,184,106,0.2)", color:G, border:`1px solid rgba(126,184,106,0.35)`, fontWeight:700 }}>
                    FROM YOUR CARDS
                  </div>
                )}

                <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:10 }}>
                  <span style={{ fontSize:18 }}>{p.emoji}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:700, color: bal > 0 ? "#f0f0e0" : MUT,
                      lineHeight:1.2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                      {p.name}
                    </div>
                  </div>
                </div>

                {isEditing ? (
                  <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                    <input
                      autoFocus
                      value={draft}
                      onChange={e => setDraft(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter") saveEdit(p.id);
                        if (e.key === "Escape") cancelEdit();
                      }}
                      placeholder="e.g. 85000"
                      style={{ flex:1, padding:"7px 10px", background:"rgba(0,0,0,0.3)",
                        border:`1px solid ${p.accent}`, borderRadius:6, color:TEXT,
                        fontSize:13, outline:"none", fontFamily:F }}
                    />
                    <button onClick={() => saveEdit(p.id)}
                      style={{ padding:"7px 11px", background:G, border:"none", borderRadius:6,
                        color:BG, fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:F }}>✓</button>
                    <button onClick={cancelEdit}
                      style={{ padding:"7px 9px", background:"rgba(255,255,255,0.07)", border:"none",
                        borderRadius:6, color:MUT, fontSize:12, cursor:"pointer", fontFamily:F }}>✕</button>
                  </div>
                ) : (
                  <div onClick={() => startEdit(p.id, bal)}
                    style={{ cursor:"pointer", display:"flex", alignItems:"baseline", gap:6, marginBottom:8 }}>
                    {bal > 0 ? (
                      <>
                        <span style={{ fontSize:22, fontWeight:700, color:p.accent, lineHeight:1 }}>
                          {bal.toLocaleString()}
                        </span>
                        <span style={{ fontSize:10, color:"rgba(240,240,224,0.4)" }}>pts · tap to edit</span>
                      </>
                    ) : (
                      <span style={{ fontSize:13, color:"rgba(232,234,212,0.25)", fontStyle:"italic" }}>+ Add balance</span>
                    )}
                  </div>
                )}

                {bal > 0 && nextThresh && (
                  <div style={{ marginTop:6 }}>
                    <div style={{ fontSize:9, color:MUT, marginBottom:4 }}>
                      {(nextThresh - bal).toLocaleString()} more for {nextLabel}
                    </div>
                    <div style={{ height:3, background:"rgba(255,255,255,0.08)", borderRadius:2 }}>
                      <div style={{ height:"100%", width:`${progress}%`, background:p.accent, borderRadius:2, transition:"width 0.3s" }} />
                    </div>
                  </div>
                )}
                {bal > 0 && !nextThresh && thresh && (
                  <div style={{ fontSize:10, color:G, fontWeight:700, marginTop:4 }}>🏆 Enough for business class</div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── ONBOARDING / MY CARDS ────────────────────────────────────────────────────
const ALL_CARD_NAMES = Object.keys(CARD_DB);

const ISSUER_COLORS = {
  Chase: "#4a90d9", Amex: "#a8c5e8", "Capital One": "#e05c5c", Citi: "#4fc3e8",
};

function CardPicker({ selected, onToggle }) {
  const byIssuer = {};
  ALL_CARD_NAMES.forEach(name => {
    const issuer = CARD_DB[name].issuer;
    if (!byIssuer[issuer]) byIssuer[issuer] = [];
    byIssuer[issuer].push(name);
  });

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      {Object.entries(byIssuer).map(([issuer, cards]) => (
        <div key={issuer}>
          <div style={{fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:ISSUER_COLORS[issuer]||G,fontWeight:700,marginBottom:10}}>{issuer}</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {cards.map(name => {
              const card = CARD_DB[name];
              const isOn = selected.includes(name);
              return (
                <div key={name} onClick={()=>onToggle(name)}
                  style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",borderRadius:10,
                    background: isOn ? `${card.color}dd` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isOn ? card.accent+"66" : "rgba(255,255,255,0.07)"}`,
                    cursor:"pointer",transition:"all 0.15s"}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:isOn?700:400,color:isOn?"#f0f0e0":MUT}}>{name}</div>
                    <div style={{fontSize:10,color:isOn?card.accent:"rgba(232,234,212,0.3)",marginTop:2}}>{card.program} · ${card.annualFee}/yr</div>
                  </div>
                  <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${isOn?G:"rgba(255,255,255,0.15)"}`,
                    background:isOn?G:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s"}}>
                    {isOn && <span style={{fontSize:10,color:BG,fontWeight:900}}>✓</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function Onboarding({ onComplete }) {
  const [picked, setPicked] = useState([]);
  const toggle = name => setPicked(p => p.includes(name) ? p.filter(x=>x!==name) : [...p, name]);

  return (
    <div style={{flex:1,overflowY:"auto",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"40px 20px",background:BG}}>
      <div style={{width:"100%",maxWidth:520}}>
        {/* Hero */}
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:44,marginBottom:12}}>✈️</div>
          <h1 style={{fontSize:28,fontWeight:400,color:TEXT,margin:"0 0 10px",lineHeight:1.2}}>
            Welcome to <span style={{color:G,fontStyle:"italic"}}>PointsAway</span>
          </h1>
          <p style={{color:MUT,fontSize:14,lineHeight:1.6,maxWidth:380,margin:"0 auto"}}>
            Tell us which cards you have and we'll personalize every part of the app — bonuses, transfer partners, and trip recommendations — just for you.
          </p>
        </div>

        {/* Feature preview */}
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
          {[
            {emoji:"⭐", label:"My Points", desc:"Track all your balances in one place"},
            {emoji:"✈️", label:"Trip Planner", desc:"AI plans your trip using your points"},
            {emoji:"🗺️", label:"City Guides", desc:"Verified family reviews with honest kid ratings"},
            {emoji:"📊", label:"Bonus Tracker", desc:"Never miss a transfer bonus again"},
          ].map(({emoji,label,desc})=>(
            <div key={label} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:"rgba(126,184,106,0.05)",borderRadius:9,border:`1px solid ${BORDER}`}}>
              <span style={{fontSize:18,width:24,textAlign:"center"}}>{emoji}</span>
              <div>
                <span style={{fontSize:13,fontWeight:700,color:G}}>{label}</span>
                <span style={{fontSize:12,color:MUT}}> — {desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Card picker */}
        <div style={{background:SURF,borderRadius:14,border:`1px solid ${BORDER}`,padding:"24px 24px 20px",marginBottom:20}}>
          <div style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:G,marginBottom:18,fontWeight:700}}>
            💳 Select your cards
          </div>
          <CardPicker selected={picked} onToggle={toggle} />
        </div>

        {picked.length > 0 && (
          <div style={{marginBottom:16,padding:"10px 14px",background:"rgba(126,184,106,0.08)",borderRadius:8,border:`1px solid ${BORDER}`,fontSize:12,color:G}}>
            ✓ {picked.length} card{picked.length>1?"s":""} selected · {Array.from(new Set(picked.map(n=>CARD_DB[n].program))).join(", ")}
          </div>
        )}

        <button onClick={()=>onComplete(picked)}
          style={{width:"100%",padding:"14px",background:picked.length>0?`linear-gradient(135deg,${G},#5a9a3a)`:"rgba(255,255,255,0.05)",
            border:"none",borderRadius:10,color:picked.length>0?BG:MUT,fontSize:14,fontWeight:700,
            cursor:picked.length>0?"pointer":"default",fontFamily:F,letterSpacing:"0.05em",transition:"all 0.2s"}}>
          {picked.length>0 ? `Personalize My Experience →` : "Select at least one card to continue"}
        </button>

        <button onClick={()=>onComplete([])} style={{width:"100%",padding:"10px",marginTop:8,background:"none",border:"none",color:MUT,fontSize:12,cursor:"pointer",fontFamily:F}}>
          Skip for now — show me everything
        </button>
      </div>
    </div>
  );
}

function MyCardsModal({ userCards, onUpdate, onClose }) {
  const [picked, setPicked] = useState([...userCards]);
  const toggle = name => setPicked(p => p.includes(name) ? p.filter(x=>x!==name) : [...p, name]);

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:SURF,borderRadius:16,border:`1px solid ${BORDER}`,width:"100%",maxWidth:480,maxHeight:"85vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{padding:"20px 24px 16px",borderBottom:`1px solid ${BORDER}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <div>
            <div style={{fontSize:16,fontWeight:700,color:TEXT}}>My Cards</div>
            <div style={{fontSize:11,color:MUT,marginTop:2}}>Update your wallet to re-personalize the app</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:MUT,fontSize:20,cursor:"pointer",lineHeight:1,padding:"0 4px"}}>×</button>
        </div>
        <div style={{overflowY:"auto",padding:"20px 24px"}}>
          <CardPicker selected={picked} onToggle={toggle} />
        </div>
        <div style={{padding:"16px 24px",borderTop:`1px solid ${BORDER}`,flexShrink:0,display:"flex",gap:10}}>
          <button onClick={onClose} style={{flex:1,padding:"10px",background:"transparent",border:`1px solid ${BORDER}`,borderRadius:8,color:MUT,cursor:"pointer",fontFamily:F,fontSize:13}}>Cancel</button>
          <button onClick={()=>{onUpdate(picked);onClose();}}
            style={{flex:2,padding:"10px",background:`linear-gradient(135deg,${G},#5a9a3a)`,border:"none",borderRadius:8,color:BG,cursor:"pointer",fontFamily:F,fontSize:13,fontWeight:700}}>
            Save My Cards
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PointsAway() {
  const [tab,setTab]=useState("points");
  const [plannerCity,setPlannerCity]=useState("");
  const [userCards,setUserCards]=useState(null); // null = not onboarded yet
  const [showMyCards,setShowMyCards]=useState(false);
  const [pointsBalances,setPointsBalances]=useState({}); // programId -> balance

  const goToPlannerWithCity=(city)=>{setPlannerCity(city);setTab("planner");};
  const goToPlanner=()=>setTab("planner");

  const myPrograms = userCards && userCards.length > 0
    ? Array.from(new Set(userCards.map(n=>CARD_DB[n]?.program).filter(Boolean)))
    : null;

  // Build a human-readable points summary for the trip planner
  const pointsSummary = Object.entries(pointsBalances)
    .filter(([,v])=>v>0)
    .map(([id,v])=>{
      const all=[...POINTS_CATALOG.creditCard,...POINTS_CATALOG.airline,...POINTS_CATALOG.hotel];
      const prog=all.find(p=>p.id===id);
      return prog ? `${v.toLocaleString()} ${prog.name}` : null;
    }).filter(Boolean).join(", ");

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navItems=[{id:"points",label:"⭐ My Points"},{id:"planner",label:"✈️ Trip Planner"},{id:"guides",label:"🗺️ City Guides"},{id:"tracker",label:"📊 Bonus Tracker"},{id:"transfers",label:"🔄 Transfer Bonuses"}];

  if (userCards === null) {
    return (
      <div style={{height:"100vh",display:"flex",flexDirection:"column",background:BG,fontFamily:F,color:TEXT,overflow:"hidden"}}>
        <Onboarding onComplete={(cards)=>setUserCards(cards)} />
        <style>{`*{box-sizing:border-box}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:3px}`}</style>
      </div>
    );
  }

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:BG,fontFamily:F,color:TEXT,overflow:"hidden"}}>
      {showMyCards && <MyCardsModal userCards={userCards} onUpdate={setUserCards} onClose={()=>setShowMyCards(false)} />}

      {/* Header */}
      <div style={{background:`linear-gradient(90deg,${SURF},${SURF2})`,borderBottom:`1px solid ${BORDER}`,padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,height:56,gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:11}}>
          <div style={{width:34,height:34,borderRadius:8,background:`linear-gradient(135deg,${G},#4a8a2a)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>✈️</div>
          <div>
            <div style={{fontSize:16,fontWeight:700,letterSpacing:"0.07em",color:TEXT}}>POINTSAWAY</div>
            <div style={{fontSize:8,letterSpacing:"0.2em",color:G,textTransform:"uppercase"}}>Plan family trips with your points</div>
          </div>
        </div>
        <div style={{display:"flex",gap:3,background:"rgba(255,255,255,0.04)",padding:"3px",borderRadius:9,overflowX:"auto",maxWidth:"calc(100vw - 280px)"}}>
          {!isMobile && navItems.map(({id,label})=>(
            <button key={id} onClick={()=>{setTab(id);if(id==="planner")setPlannerCity("");}}
              style={{padding:"6px 14px",borderRadius:7,border:"none",background:tab===id?"rgba(126,184,106,0.18)":"transparent",color:tab===id?G:MUT,fontSize:12,fontWeight:tab===id?700:400,cursor:"pointer",fontFamily:F,transition:"all 0.15s",borderBottom:tab===id?`2px solid ${G}`:"2px solid transparent"}}>
              {label}
            </button>
          ))}
        </div>
        {/* My Cards pill */}
        <button onClick={()=>setShowMyCards(true)}
          style={{display:"flex",alignItems:"center",gap:7,padding:"6px 12px",background:"rgba(126,184,106,0.1)",border:`1px solid ${BORDER}`,borderRadius:20,cursor:"pointer",fontFamily:F,transition:"all 0.15s",flexShrink:0}}
          onMouseEnter={e=>e.currentTarget.style.borderColor=G} onMouseLeave={e=>e.currentTarget.style.borderColor=BORDER}>
          <span style={{fontSize:12}}>💳</span>
          {userCards.length > 0 ? (
            <span style={{fontSize:11,color:G,fontWeight:700}}>{userCards.length} card{userCards.length>1?"s":""}</span>
          ) : (
            <span style={{fontSize:11,color:MUT}}>Add cards</span>
          )}
          <span style={{fontSize:9,color:MUT}}>▾</span>
        </button>
      </div>

      {/* Personalization banner — shown when cards are set */}
      {userCards.length > 0 && (
        <div style={{background:"rgba(126,184,106,0.06)",borderBottom:`1px solid ${BORDER}`,padding:"6px 24px",display:"flex",alignItems:"center",gap:10,flexShrink:0,flexWrap:"wrap"}}>
          <span style={{fontSize:10,color:G,fontWeight:700,letterSpacing:"0.1em"}}>✦ PERSONALIZED FOR YOU</span>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {userCards.map(name => (
              <span key={name} style={{fontSize:10,padding:"2px 8px",borderRadius:8,background:`${CARD_DB[name].color}99`,color:CARD_DB[name].accent,border:`1px solid ${CARD_DB[name].accent}33`}}>
                {name}
              </span>
            ))}
          </div>
          <button onClick={()=>setShowMyCards(true)} style={{marginLeft:"auto",fontSize:10,color:MUT,background:"none",border:"none",cursor:"pointer",fontFamily:F}}>Edit →</button>
        </div>
      )}

      <div style={{flex:1,display:"flex",overflow:"hidden"}}>
        {tab==="guides"&&<CityGuides onPlanTrip={goToPlannerWithCity}/>}
        {tab==="planner"&&<Planner prefillCity={plannerCity} onViewGuides={()=>setTab("guides")} onViewTracker={()=>setTab("tracker")} userCards={userCards} myPrograms={myPrograms} pointsSummary={pointsSummary}/>}
        {tab==="points"&&<MyPoints balances={pointsBalances} onUpdate={setPointsBalances} userCards={userCards} onGoPlanner={goToPlanner}/>}
        {tab==="tracker"&&<Tracker userCards={userCards}/>}
        {tab==="transfers"&&<TransferTracker userCards={userCards}/>}
      </div>
      {isMobile && (
        <div style={{display:"flex",borderTop:`1px solid ${BORDER}`,background:SURF,flexShrink:0,zIndex:100}}>
          {navItems.map(({id,label})=>{
            const emoji = label.split(" ")[0];
            const name = label.split(" ").slice(1).join(" ");
            const active = tab === id;
            return (
              <button key={id} onClick={()=>{setTab(id);if(id==="planner")setPlannerCity("");}}
                style={{flex:1,padding:"8px 4px",border:"none",background:"transparent",color:active?G:MUT,fontSize:10,fontWeight:active?700:400,cursor:"pointer",fontFamily:F,display:"flex",flexDirection:"column",alignItems:"center",gap:3,borderTop:active?`2px solid ${G}`:"2px solid transparent"}}>
                <span style={{fontSize:18}}>{emoji}</span>
                <span style={{fontSize:9,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:60}}>{name}</span>
              </button>
            );
          })}
        </div>
      )}
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}*{box-sizing:border-box}select option{background:#111f13;color:#e8ead4}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:3px}`}</style>
    </div>
  );
}