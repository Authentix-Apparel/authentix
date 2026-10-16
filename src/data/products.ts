import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // --- THREE-PIECE (1-10) ---
  {
    id: 'tp-01',
    name: 'Gul-E-Gulab Embroidered Organza Three-Piece',
    banglaName: 'গুল-ই-গোলাপ অর্গানজা এমব্রয়ডারি থ্রি-পিস',
    slug: 'gul-e-gulab-embroidered-organza-three-piece',
    category: 'Three-Piece',
    price: 4950,
    originalPrice: 5800,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 18,
    images: [
      '/src/assets/images/hero_fashion_model_1792172507098.jpg',
      '/src/assets/images/threepiece_collection_1792172508454.jpg',
    ],
    colors: [
      { name: 'Dusty Rose Pink', hex: '#E29598', imageUrl: '/src/assets/images/hero_fashion_model_1792172507098.jpg' },
      { name: 'Champagne Beige', hex: '#D8C3A5', imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80' },
      { name: 'Powder Lilac', hex: '#D4B2D8', imageUrl: 'https://images.unsplash.com/photo-1596783049444-884e96a78274?auto=format&fit=crop&w=900&q=80' }
    ],
    sizes: ['38', '40', '42', '44', '46'],
    fabric: 'Pure Organza Kameez with Shantoon Lining',
    workDetails: 'Intricate Resham, Zari, and Sequence floral embroidery along neckline and daaman',
    dupattaDetails: '2.5m Organza with heavy scalloped embroidered borders',
    bottomDetails: 'Raw Silk Straight Cut Trouser with lace hem',
    careInstructions: 'Dry Clean Recommended. Mild iron on reverse.',
    sku: 'AA-TP-001',
    description: 'An ethereal luxury festive three-piece ensemble in signature Authentix dusty rose. Crafted with meticulous hand-finished resham threadwork and delicate pearl touches.'
  },
  {
    id: 'tp-02',
    name: 'Zomorrod Emerald Royal Silk Three-Piece',
    banglaName: 'জমুর্রদ রয়েল এমারেল্ড সিল্ক থ্রি-পিস',
    slug: 'zomorrod-emerald-royal-silk-three-piece',
    category: 'Three-Piece',
    price: 5450,
    originalPrice: 6200,
    discountPercent: 12,
    rating: 5.0,
    reviewCount: 29,
    isFeatured: true,
    isNew: true,
    inStock: true,
    stockCount: 14,
    images: [
      '/src/assets/images/threepiece_collection_1792172508454.jpg',
      '/src/assets/images/hero_fashion_model_1792172507098.jpg'
    ],
    colors: [
      { name: 'Emerald & Magenta', hex: '#0B6623', imageUrl: '/src/assets/images/threepiece_collection_1792172508454.jpg' },
      { name: 'Royal Navy Blue', hex: '#1C2E4A', imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80' },
      { name: 'Deep Maroon', hex: '#5B1E31', imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80' }
    ],
    sizes: ['38', '40', '42', '44'],
    fabric: 'Pure Semi-Raw Silk',
    workDetails: 'Opulent gold tilla and zardozi threadwork with contrasting magenta borders',
    dupattaDetails: 'Banarasi Weave Silk Dupatta with kiran tassel trimming',
    bottomDetails: 'Straight trousers with embroidered cuff detail',
    careInstructions: 'Dry Clean only.',
    sku: 'AA-TP-002',
    description: 'Command regal elegance with the Zomorrod ensemble. Rich jewel-toned emerald silk married with royal magenta banarasi dupatta.'
  },
  {
    id: 'tp-03',
    name: 'Nur-E-Jahan Heavy Chikankari Lawn Three-Piece',
    banglaName: 'নুর-ই-জাহান চিকনকারি লন থ্রি-পিস',
    slug: 'nur-e-jahan-chikankari-lawn-three-piece',
    category: 'Three-Piece',
    price: 3650,
    originalPrice: 4200,
    discountPercent: 13,
    rating: 4.8,
    reviewCount: 44,
    isBestSeller: true,
    inStock: true,
    stockCount: 25,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Mint Mist', hex: '#BCE3D4' },
      { name: 'Peach Sorbet', hex: '#F9C6B3' },
      { name: 'Cloud White', hex: '#F3F4F6' }
    ],
    sizes: ['38', '40', '42', '44', '46'],
    fabric: 'Premium 80s Combed Lawn Cotton',
    workDetails: 'All-over Lucknowi inspired Chikankari embroidery with schiffli cutwork hem',
    dupattaDetails: 'Pure Chiffon printed dupatta with lace edges',
    bottomDetails: 'Lawn cigarette pants with pintucks',
    careInstructions: 'Gentle hand wash in cold water or mild machine wash.',
    sku: 'AA-TP-003',
    description: 'Designed for Bangladesh humid summer comfort without compromising an ounce of grace. Breathable lawn paired with airy chiffon.'
  },
  {
    id: 'tp-04',
    name: 'Bahar-E-Kashmir Pashmina Tone Velvet Three-Piece',
    banglaName: 'বাহার-ই-কাশ্মীর ভেলভেট থ্রি-পিস',
    slug: 'bahar-e-kashmir-velvet-three-piece',
    category: 'Three-Piece',
    price: 6850,
    originalPrice: 7900,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 19,
    isFeatured: true,
    inStock: true,
    stockCount: 8,
    images: [
      'https://images.unsplash.com/photo-1596783049444-884e96a78274?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Royal Plum', hex: '#4A154B' },
      { name: 'Midnight Black', hex: '#111827' }
    ],
    sizes: ['40', '42', '44'],
    fabric: 'Micro Velvet 9000',
    workDetails: 'Heavy Kashmiri tilla threadwork with floral jaal on neckline',
    dupattaDetails: 'Embossed Jacquard Shawl Dupatta with four-side borders',
    bottomDetails: 'Raw silk tailored trousers',
    careInstructions: 'Dry clean only. Store in garment bag.',
    sku: 'AA-TP-004',
    description: 'Luxury winter wedding wear. Premium micro velvet tailored to perfection with glistening tilla threadwork.'
  },
  {
    id: 'tp-05',
    name: 'Sultana Chanderi Silk Festive Three-Piece',
    banglaName: 'সুলতানা চান্দেরি সিল্ক ফেস্টিভ থ্রি-পিস',
    slug: 'sultana-chanderi-silk-festive-three-piece',
    category: 'Three-Piece',
    price: 4350,
    originalPrice: 4900,
    discountPercent: 11,
    rating: 4.7,
    reviewCount: 22,
    inStock: true,
    stockCount: 16,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Mustard Gold', hex: '#E1AD01' },
      { name: 'Coral Rose', hex: '#E56D67' }
    ],
    sizes: ['38', '40', '42', '44', '46'],
    fabric: 'Pure Handloom Chanderi',
    workDetails: 'Gotapatti embellishments with delicate pearl tassels',
    dupattaDetails: 'Organza dupatta with zari border',
    bottomDetails: 'Chanderi flared palazzo',
    careInstructions: 'Dry clean recommended.',
    sku: 'AA-TP-005',
    description: 'Festive brightness with timeless Chanderi weave and golden gotapatti motifs.'
  },
  {
    id: 'tp-06',
    name: 'Shahzadi Floral Georgette Anarkali Three-Piece',
    banglaName: 'শাহজাদী ফ্লোরাল জর্জেট আনারকলি থ্রি-পিস',
    slug: 'shahzadi-floral-georgette-anarkali-three-piece',
    category: 'Three-Piece',
    price: 5200,
    originalPrice: 5950,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 31,
    isBestSeller: true,
    inStock: true,
    stockCount: 12,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Blush Carnation', hex: '#F4A6B6' },
      { name: 'Sky Cerulean', hex: '#87CEEB' }
    ],
    sizes: ['38', '40', '42', '44'],
    fabric: 'Fox Georgette with Inner Crepe',
    workDetails: '5-meter wide kalidar flair with digital floral prints and sequin borders',
    dupattaDetails: 'Matching printed georgette dupatta with lace',
    bottomDetails: 'Solid butter silk churidar',
    careInstructions: 'Dry clean or gentle steam.',
    sku: 'AA-TP-006',
    description: 'A 24-kali flared Anarkali silhouette that flows gracefully with every step you take at festive galas.'
  },
  {
    id: 'tp-07',
    name: 'Roza Daily Cotton Printed Three-Piece',
    banglaName: 'রোজা ডেইলি কটন প্রিন্টেড থ্রি-পিস',
    slug: 'roza-daily-cotton-printed-three-piece',
    category: 'Three-Piece',
    price: 2450,
    originalPrice: 2800,
    discountPercent: 12,
    rating: 4.8,
    reviewCount: 57,
    inStock: true,
    stockCount: 40,
    images: [
      'https://images.unsplash.com/photo-1583391733975-088dd9fa7caa?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Indigo Blue', hex: '#264653' },
      { name: 'Terracotta', hex: '#E76F51' },
      { name: 'Olive Herb', hex: '#606C38' }
    ],
    sizes: ['36', '38', '40', '42', '44', '46'],
    fabric: '100% Tangail Combed Cotton',
    workDetails: 'Screen printed traditional motifs with wooden button placket',
    dupattaDetails: 'Pure Cotton Malmal Dupatta 2.5m',
    bottomDetails: 'Cotton straight pants',
    careInstructions: 'Normal machine wash in cold water.',
    sku: 'AA-TP-007',
    description: 'Everyday comfortable Bangladeshi cotton three-piece with smooth breathable malmal orna.'
  },
  {
    id: 'tp-08',
    name: 'Aafreen Mirror Work Party Three-Piece',
    banglaName: 'আফরিন মিরর ওয়ার্ক পার্টি থ্রি-পিস',
    slug: 'aafreen-mirror-work-party-three-piece',
    category: 'Three-Piece',
    price: 4750,
    originalPrice: 5400,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 26,
    isNew: true,
    inStock: true,
    stockCount: 15,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#E6D7B9' },
      { name: 'Lavender Blush', hex: '#E6E6FA' }
    ],
    sizes: ['38', '40', '42', '44'],
    fabric: 'Chiffon Georgette with santoon lining',
    workDetails: 'Real foil mirror embroidery with thread highlights',
    dupattaDetails: 'Cutwork scalloped organza dupatta',
    bottomDetails: 'Flared sharara pants with mirror trim',
    careInstructions: 'Dry clean only.',
    sku: 'AA-TP-008',
    description: 'Shimmer subtly under chandeliers. Features delicate foil mirror embellishment along neckline and sharara cuffs.'
  },
  {
    id: 'tp-09',
    name: 'Mahnoor Jamdani Pattern Woven Three-Piece',
    banglaName: 'মাহনুর জামদানি ওভেন থ্রি-পিস',
    slug: 'mahnoor-jamdani-pattern-woven-three-piece',
    category: 'Three-Piece',
    price: 3890,
    originalPrice: 4500,
    discountPercent: 14,
    rating: 4.9,
    reviewCount: 34,
    inStock: true,
    stockCount: 19,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Crimson Red', hex: '#9E2A2B' },
      { name: 'Ivory Cream', hex: '#FDF0D5' }
    ],
    sizes: ['38', '40', '42', '44', '46'],
    fabric: 'Bangladeshi Jamdani Jacquard Weave',
    workDetails: 'Traditional Jamdani motif woven into the fabric weave with golden zari',
    dupattaDetails: 'Matching full Jamdani jacquard orna',
    bottomDetails: 'Raw silk trousers',
    careInstructions: 'Dry clean or gentle hand wash.',
    sku: 'AA-TP-009',
    description: 'Celebrating traditional Bangladeshi heritage with contemporary tailoring and rich Jamdani weave patterns.'
  },
  {
    id: 'tp-10',
    name: 'Dilruba Silk Jacquard Formal Three-Piece',
    banglaName: 'দিলরুবা সিল্ক জ্যাকার্ড ফর্মাল থ্রি-পিস',
    slug: 'dilruba-silk-jacquard-formal-three-piece',
    category: 'Three-Piece',
    price: 4600,
    originalPrice: 5200,
    discountPercent: 11,
    rating: 4.8,
    reviewCount: 18,
    inStock: true,
    stockCount: 11,
    images: [
      'https://images.unsplash.com/photo-1596783049444-884e96a78274?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Teal Peacock', hex: '#005F73' },
      { name: 'Rosewood', hex: '#65000B' }
    ],
    sizes: ['38', '40', '42', '44'],
    fabric: 'Jacquard Viscose Silk',
    workDetails: 'Intricate floral jaal woven with self zari and beadwork neck',
    dupattaDetails: 'Organza silk dupatta with tassels',
    bottomDetails: 'Straight trousers with embroidered hem',
    careInstructions: 'Dry clean recommended.',
    sku: 'AA-TP-010',
    description: 'An executive and evening favorite in Dhaka circles. Subdued sheen with elegant tailored borders.'
  },

  // --- WESTERN DRESS (11-18) ---
  {
    id: 'wd-01',
    name: 'Sorrento Tiered Belted Dusty Rose Maxi Dress',
    banglaName: 'সোরেস্তো টিয়ার্ড বেল্টেড ডাস্টি রোজ ম্যাক্সি ড্রেস',
    slug: 'sorrento-tiered-belted-dusty-rose-maxi-dress',
    category: 'Western Dress',
    price: 3450,
    originalPrice: 3950,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 42,
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 20,
    images: [
      '/src/assets/images/western_collection_1792172508166.jpg',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Dusty Rose', hex: '#C2847A' },
      { name: 'Sage Green', hex: '#87A987' },
      { name: 'Classic Black', hex: '#1C1917' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Lightweight Georgette with Full Viscose Lining',
    workDetails: 'Tiered ruffle skirt, elasticated puff sleeves, detachable ring belt',
    careInstructions: 'Machine wash delicate cycle. Line dry.',
    sku: 'AA-WD-001',
    description: 'The iconic Authentix modest western dress. Fully lined with breathable fabric, high neck collar, and flattering adjustable belt.'
  },
  {
    id: 'wd-02',
    name: 'Aurelia Pleated Metallic Evening Midi Gown',
    banglaName: 'অরেলিয়া প্লিটেড ইভনিং মিডি গাউন',
    slug: 'aurelia-pleated-metallic-evening-midi-gown',
    category: 'Western Dress',
    price: 4200,
    originalPrice: 4900,
    discountPercent: 14,
    rating: 4.8,
    reviewCount: 23,
    isNew: true,
    inStock: true,
    stockCount: 14,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Champagne Shimmer', hex: '#D7C49E' },
      { name: 'Midnight Navy', hex: '#0B132B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Pleated Lurex Chiffon',
    workDetails: 'Sunray micro-accordion pleats with bishop sleeves and tie waistband',
    careInstructions: 'Dry clean or cold steam.',
    sku: 'AA-WD-002',
    description: 'Sculpted for gala dinners and university convocation celebrations. High neck silhouette with luminous shimmer.'
  },
  {
    id: 'wd-03',
    name: 'Verona Floral Chiffon Long Sleeve Wrap Dress',
    banglaName: 'ভেরোনা ফ্লোরাল শিফন লং স্লিভ র্যাপ ড্রেস',
    slug: 'verona-floral-chiffon-wrap-dress',
    category: 'Western Dress',
    price: 2950,
    originalPrice: 3400,
    discountPercent: 13,
    rating: 4.7,
    reviewCount: 36,
    inStock: true,
    stockCount: 22,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Blush Floral', hex: '#E8B4B8' },
      { name: 'Botanical Olive', hex: '#6B705C' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: 'Fine Korean Chiffon with opaque inner slip',
    workDetails: 'Modest mock wrap with internal modesty snap, ruffled cuffs',
    careInstructions: 'Machine wash cold.',
    sku: 'AA-WD-003',
    description: 'Chic floral romanticism tailored for modest wardrobe lovers. Never shows cleavage thanks to our custom modesty clasp.'
  },
  {
    id: 'wd-04',
    name: 'Milan Tailored Blazer Dress with Golden Buttons',
    banglaName: 'মিলান টেইলর্ড ব্লেজার ড্রেস',
    slug: 'milan-tailored-blazer-dress',
    category: 'Western Dress',
    price: 4850,
    originalPrice: 5500,
    discountPercent: 11,
    rating: 5.0,
    reviewCount: 17,
    inStock: true,
    stockCount: 9,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Powder Blush Pink', hex: '#F7CAD0' },
      { name: 'Off-White Ivory', hex: '#FAF9F6' },
      { name: 'Onyx Black', hex: '#18181B' }
    ],
    sizes: ['S', 'M', 'L'],
    fabric: 'Structured Suiting Poly-Viscose with Satin Lining',
    workDetails: 'Double breasted cut with embossed lion crest gold buttons',
    careInstructions: 'Dry clean only.',
    sku: 'AA-WD-004',
    description: 'The power woman outfit. Perfect for corporate summits, upscale dinners, and evening social engagements.'
  },
  {
    id: 'wd-05',
    name: 'Capri Linen Button-Down Summer Shirt Dress',
    banglaName: 'ক্যাপ্রি লিনেন বাটন-ডাউন শার্ট ড্রেস',
    slug: 'capri-linen-button-down-shirt-dress',
    category: 'Western Dress',
    price: 2750,
    originalPrice: 3200,
    discountPercent: 14,
    rating: 4.8,
    reviewCount: 28,
    inStock: true,
    stockCount: 30,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Natural Sand', hex: '#DDBEA9' },
      { name: 'Soft Sky Blue', hex: '#B8C0FF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '100% Breathable European Linen Blend',
    workDetails: 'Tortoiseshell buttons with roll-up sleeve tabs and belt',
    careInstructions: 'Cold hand wash, hang dry in shade.',
    sku: 'AA-WD-005',
    description: 'Effortlessly cool for weekend brunches in Gulshan and tropical vacations. Natural texture that stays fresh.'
  },
  {
    id: 'wd-06',
    name: 'Florence Smocked Bodice Floral Midi Dress',
    banglaName: 'ফ্লোরেন্স স্মোকড বডিস ফ্লোরাল মিডি ড্রেস',
    slug: 'florence-smocked-bodice-floral-midi-dress',
    category: 'Western Dress',
    price: 3100,
    originalPrice: 3600,
    discountPercent: 13,
    rating: 4.7,
    reviewCount: 33,
    inStock: true,
    stockCount: 17,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Dusty Peach', hex: '#F4ACB7' },
      { name: 'Forest Green', hex: '#2D6A4F' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Rayon Viscose Twill',
    workDetails: 'Comfortable elastic smocked chest, balloon sleeves, side pockets',
    careInstructions: 'Machine wash gentle with like colors.',
    sku: 'AA-WD-006',
    description: 'Featuring functional concealed side pockets and an ultra-stretchy smocked bodice that adapts comfortably.'
  },
  {
    id: 'wd-07',
    name: 'Parisian Trench Coat Dress with Belt',
    banglaName: 'প্যারিসিয়ান ট্রেঞ্চ কোট ড্রেস',
    slug: 'parisian-trench-coat-dress-with-belt',
    category: 'Western Dress',
    price: 4950,
    originalPrice: 5600,
    discountPercent: 11,
    rating: 4.9,
    reviewCount: 15,
    isNew: true,
    inStock: true,
    stockCount: 10,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Classic Khaki Camel', hex: '#C68B59' },
      { name: 'Blush Mauve', hex: '#C9ADA7' }
    ],
    sizes: ['M', 'L', 'XL'],
    fabric: 'Water-resistant Premium Cotton Gabardine',
    workDetails: 'Storm flap, double button storm collar, deep hip pockets',
    careInstructions: 'Dry clean only.',
    sku: 'AA-WD-007',
    description: 'Timeless outerwear dress. Wear buttoned as a standalone dress or open as an editorial duster coat.'
  },
  {
    id: 'wd-08',
    name: 'Monaco Satin Slip Dress with Long Cardigan Co-ord',
    banglaName: 'মোনাকো সাটিন স্লিপ ড্রেস ও কার্ডিগান সেট',
    slug: 'monaco-satin-slip-dress-with-cardigan',
    category: 'Western Dress',
    price: 3950,
    originalPrice: 4600,
    discountPercent: 14,
    rating: 4.8,
    reviewCount: 20,
    inStock: true,
    stockCount: 14,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Rose Gold Satin', hex: '#D4AF37' },
      { name: 'Midnight Emerald', hex: '#004643' }
    ],
    sizes: ['S', 'M', 'L'],
    fabric: 'Heavy Duchess Satin & Ribbed Knit',
    workDetails: '2-Piece set with ankle-length inner slip dress and knit outerwear',
    careInstructions: 'Hand wash with mild detergent.',
    sku: 'AA-WD-008',
    description: 'The complete monochrome evening duo. Modest layering made ultra chic.'
  },

  // --- HIJAB & ABAYA (19-25) ---
  {
    id: 'hj-01',
    name: 'Noor Premium Georgette Hijab with Rose Gold Magnets Set',
    banglaName: 'নুর প্রিমিয়াম জর্জেট হিজাব ও রোজ গোল্ড ম্যাগনেট সেট',
    slug: 'noor-premium-georgette-hijab-magnet-set',
    category: 'Hijab',
    price: 1250,
    originalPrice: 1550,
    discountPercent: 19,
    rating: 4.9,
    reviewCount: 88,
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 50,
    images: [
      '/src/assets/images/hijab_collection_1792172508870.jpg',
      'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Dusty Rose Mauve', hex: '#C4929D' },
      { name: 'Soft Nude Sand', hex: '#E5D0BA' },
      { name: 'Midnight Onyx', hex: '#1C1917' },
      { name: 'Sage Cloud', hex: '#B5C4B1' }
    ],
    sizes: ['Regular (75 x 185 cm)', 'Maxi (85 x 200 cm)'],
    fabric: 'Pure Bubble Heavy Georgette',
    workDetails: 'Finely laser-cut baby rolled hems with 1 pair of snag-free magnetic pins',
    careInstructions: 'Gentle hand wash. Quick dry. No pin tears.',
    sku: 'AA-HJ-001',
    description: 'Our #1 best-selling hijab across Bangladesh. Premium non-slip textured bubble georgette with zero transparency and matching magnetic pins.'
  },
  {
    id: 'hj-02',
    name: 'Madina Modal Silk Luxury Soft Hijab',
    banglaName: 'মদিনা মোডাল সিল্ক লাক্সারি হিজাব',
    slug: 'madina-modal-silk-luxury-soft-hijab',
    category: 'Hijab',
    price: 1450,
    originalPrice: 1750,
    discountPercent: 17,
    rating: 5.0,
    reviewCount: 41,
    isNew: true,
    inStock: true,
    stockCount: 35,
    images: [
      'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Rose Silk', hex: '#E8A598' },
      { name: 'Pearl Ivory', hex: '#FFF8F0' },
      { name: 'Caramel Latte', hex: '#C59B76' }
    ],
    sizes: ['70 x 190 cm'],
    fabric: 'Organic Bamboo Modal Silk',
    workDetails: 'Feather-soft drape with natural cooling breathability',
    careInstructions: 'Hand wash in cold water.',
    sku: 'AA-HJ-002',
    description: 'Cloud-like softness against your skin. Perfect for long office hours and hot Dhaka traffic commutes.'
  },
  {
    id: 'hj-03',
    name: 'Zahra Minimalist Pastel Tailored Abaya Coat',
    banglaName: 'জহরা মিনিমালিস্ট প্যাস্টেল টেইলর্ড আবায়া কোট',
    slug: 'zahra-minimalist-pastel-abaya-coat',
    category: 'Hijab',
    price: 4950,
    originalPrice: 5800,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 25,
    isFeatured: true,
    inStock: true,
    stockCount: 15,
    images: [
      '/src/assets/images/hijab_collection_1792172508870.jpg'
    ],
    colors: [
      { name: 'Soft Lilac Mauve', hex: '#C3B1E1' },
      { name: 'Slate Charcoal', hex: '#334155' }
    ],
    sizes: ['52 (5\'1"-5\'3")', '54 (5\'4"-5\'5")', '56 (5\'6"+)'],
    fabric: 'Nida Fabric imported from UAE',
    workDetails: 'Structured trench-lapel collar, deep pockets, belt, matching hijab included',
    careInstructions: 'Dry clean or cold wash on gentle cycle.',
    sku: 'AA-HJ-003',
    description: 'Modern modest wear reimagined. Tailored like a British trench coat with full modest length and wrinkle-resistant fabric.'
  },
  {
    id: 'hj-04',
    name: 'Layla Organza Party Wrap Hijab with Scalloped Pearls',
    banglaName: 'লায়লা অর্গানজা পার্টি হিজাব উইথ পার্লস',
    slug: 'layla-organza-party-wrap-hijab-with-pearls',
    category: 'Hijab',
    price: 1850,
    originalPrice: 2200,
    discountPercent: 16,
    rating: 4.8,
    reviewCount: 19,
    inStock: true,
    stockCount: 28,
    images: [
      'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Blush Pink Pearl', hex: '#FAD2E1' },
      { name: 'Silver Moon', hex: '#E5E5E5' },
      { name: 'Gold Champagne', hex: '#F5E6CC' }
    ],
    sizes: ['75 x 200 cm'],
    fabric: 'Shimmer Sheer Organza with Cotton Inner Band',
    workDetails: 'Scalloped cutwork edges studded with authentic mini freshwater pearls',
    careInstructions: 'Gentle spot clean only.',
    sku: 'AA-HJ-004',
    description: 'The quintessential wedding and Eid hijab. Adds royal sparkle over your saree or three-piece.'
  },
  {
    id: 'hj-05',
    name: 'Aisha Turkish Pleated Georgette Hijab',
    banglaName: 'আয়েশা তুর্কি প্লিটেড জর্জেট হিজাব',
    slug: 'aisha-turkish-pleated-georgette-hijab',
    category: 'Hijab',
    price: 1150,
    originalPrice: 1400,
    discountPercent: 18,
    rating: 4.7,
    reviewCount: 32,
    inStock: true,
    stockCount: 40,
    images: [
      'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Dusty Rose', hex: '#D89A9E' },
      { name: 'Teal Forest', hex: '#1B4965' },
      { name: 'Mocha Tan', hex: '#9C6644' }
    ],
    sizes: ['75 x 190 cm'],
    fabric: 'Micro Pleated Turkish Georgette',
    workDetails: 'Permanent heat-set micro pleats that never lose shape',
    careInstructions: 'Hand wash, no ironing required.',
    sku: 'AA-HJ-005',
    description: 'Zero ironing required! The heat-set pleats give voluminous crown height and effortless styling in under 30 seconds.'
  },
  {
    id: 'hj-06',
    name: 'Fatima Dubai Style Embroidered Kaftan Abaya',
    banglaName: 'ফাতিমা দুবাই স্টাইল এমব্রয়ডারি কাফতান আবায়া',
    slug: 'fatima-dubai-style-kaftan-abaya',
    category: 'Hijab',
    price: 5800,
    originalPrice: 6500,
    discountPercent: 11,
    rating: 4.9,
    reviewCount: 16,
    isBestSeller: true,
    inStock: true,
    stockCount: 10,
    images: [
      '/src/assets/images/hijab_collection_1792172508870.jpg'
    ],
    colors: [
      { name: 'Jet Black with Gold', hex: '#111111' },
      { name: 'Rose Taupe with Rose Gold', hex: '#A37081' }
    ],
    sizes: ['52', '54', '56'],
    fabric: 'Korean Crystal Crepe',
    workDetails: 'Handcrafted zardozi and katori sequins along front placket and bell sleeves',
    careInstructions: 'Dry clean only.',
    sku: 'AA-HJ-006',
    description: 'Imported Dubai cuts made with bespoke craftsmanship. Flattering butterfly silhouette with luxury gold embellishment.'
  },
  {
    id: 'hj-07',
    name: 'Authentix Signature 4-Piece Magnetic Hijab Pins',
    banglaName: 'অথেনটিক্স সিগনেচার ম্যাগনেটিক হিজাব পিন সেট',
    slug: 'authentix-signature-magnetic-hijab-pins-set',
    category: 'Hijab',
    price: 750,
    originalPrice: 950,
    discountPercent: 21,
    rating: 5.0,
    reviewCount: 94,
    inStock: true,
    stockCount: 100,
    images: [
      'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Rose Gold & Champagne', hex: '#B76E79' },
      { name: 'Silver & Matte Black', hex: '#71717A' }
    ],
    sizes: ['Standard 12mm Ultra-Strong Neodymium'],
    fabric: 'Nickel-free plated alloy with rare-earth magnets',
    workDetails: 'Zero fabric puncture, holds up to 6 layers of thick fabric safely',
    careInstructions: 'Wipe clean with soft cloth.',
    sku: 'AA-HJ-007',
    description: 'Never ruin your luxury georgette and silk hijabs with pin holes again! Ultra strong magnetic grip that holds all day long.'
  },

  // --- KURTI & TUNICS (26-30) ---
  {
    id: 'kt-01',
    name: 'Ananya Embroidered Cotton Kurti with Side Slits',
    banglaName: 'অনন্যা এমব্রয়ডারি কটন কুর্তি',
    slug: 'ananya-embroidered-cotton-kurti',
    category: 'Kurti & Tunics',
    price: 1950,
    originalPrice: 2400,
    discountPercent: 19,
    rating: 4.8,
    reviewCount: 47,
    isBestSeller: true,
    inStock: true,
    stockCount: 30,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Rose Blush', hex: '#FFAAA6' },
      { name: 'Indigo White', hex: '#1D3557' },
      { name: 'Sunny Mustard', hex: '#FFB703' }
    ],
    sizes: ['36', '38', '40', '42', '44'],
    fabric: 'Pure 100% Combed Slub Cotton',
    workDetails: 'Yoke embroidery with kantha stitching and wooden buttons',
    careInstructions: 'Normal wash with cold water.',
    sku: 'AA-KT-001',
    description: 'Your everyday go-to top. Pair with denim jeans or straight cigarette pants for a smart university or office look.'
  },
  {
    id: 'kt-02',
    name: 'Bishakha Hand-Block Printed Tunic',
    banglaName: 'বিশাখা হ্যান্ড-ব্লক প্রিন্টেড টিউনিকে',
    slug: 'bishakha-hand-block-printed-tunic',
    category: 'Kurti & Tunics',
    price: 1750,
    originalPrice: 2100,
    discountPercent: 17,
    rating: 4.7,
    reviewCount: 38,
    inStock: true,
    stockCount: 24,
    images: [
      'https://images.unsplash.com/photo-1583391733975-088dd9fa7caa?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Ruby Madder', hex: '#A4161A' },
      { name: 'Indigo Blue', hex: '#001D3D' }
    ],
    sizes: ['38', '40', '42', '44'],
    fabric: 'Natural Khadi Cotton',
    workDetails: 'Organic vegetable dye wooden block prints with mandarin collar',
    careInstructions: 'Wash separately in cold water for first wash.',
    sku: 'AA-KT-002',
    description: 'Artisanal hand block craftsmanship made by veteran weavers in Manikganj. Pure organic skin-friendly dye.'
  },
  {
    id: 'kt-03',
    name: 'Mehvish Chikankari Pastel Kurti with Mirror Work',
    banglaName: 'মেহভিশ চিকনকারি প্যাস্টেল কুর্তি',
    slug: 'mehvish-chikankari-pastel-kurti',
    category: 'Kurti & Tunics',
    price: 2350,
    originalPrice: 2750,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 31,
    isNew: true,
    inStock: true,
    stockCount: 18,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Baby Pink', hex: '#FFCCD5' },
      { name: 'Seafoam Green', hex: '#C1ECE4' }
    ],
    sizes: ['38', '40', '42', '44', '46'],
    fabric: 'Modal Cotton with Chanderi finish',
    workDetails: 'Georgette chikankari threadwork with acrylic mirror highlights',
    careInstructions: 'Hand wash cold.',
    sku: 'AA-KT-003',
    description: 'Delicate pastel tones with luminous mirrors that catch the daylight. Light, feminine, and stylish.'
  },
  {
    id: 'kt-04',
    name: 'Zoya A-Line High-Low Asymmetric Tunic',
    banglaName: 'জোয়া এ-লাইন হাই-লো টিউনিকে',
    slug: 'zoya-a-line-asymmetric-tunic',
    category: 'Kurti & Tunics',
    price: 2150,
    originalPrice: 2500,
    discountPercent: 14,
    rating: 4.6,
    reviewCount: 19,
    inStock: true,
    stockCount: 16,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Dusty Berry', hex: '#800F2F' },
      { name: 'Charcoal Slate', hex: '#2B2D42' }
    ],
    sizes: ['38', '40', '42', '44'],
    fabric: 'Rayon Twill',
    workDetails: 'Asymmetric hemline with side tie-cords and silver grommet details',
    careInstructions: 'Machine wash gentle.',
    sku: 'AA-KT-004',
    description: 'A contemporary silhouette with high-low hemline that gives a flattering tall and lean profile.'
  },
  {
    id: 'kt-05',
    name: 'Roshni Handloom Khadi Cotton Office Kurti',
    banglaName: 'রশ্নি হ্যান্ডলুম খাদি কটন কুর্তি',
    slug: 'roshni-handloom-khadi-cotton-kurti',
    category: 'Kurti & Tunics',
    price: 1850,
    originalPrice: 2200,
    discountPercent: 16,
    rating: 4.8,
    reviewCount: 27,
    inStock: true,
    stockCount: 22,
    images: [
      'https://images.unsplash.com/photo-1583391733975-088dd9fa7caa?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Beige Sand', hex: '#E6CCB2' },
      { name: 'Coral Rose', hex: '#E76F51' }
    ],
    sizes: ['36', '38', '40', '42', '44'],
    fabric: 'Comilla Handloom Khadi Cotton',
    workDetails: 'Minimalist pin-tuck front with shell buttons',
    careInstructions: 'Machine wash cold.',
    sku: 'AA-KT-005',
    description: 'Specially crafted for working professionals who demand breathability and dignified sophistication.'
  },

  // --- SAREE & FESTIVE (31-34) ---
  {
    id: 'sr-01',
    name: 'Dhakai Jamdani Heritage Handloom Saree',
    banglaName: 'ঐতিহ্যবাহী ঢাকাই জামদানি শাড়ি',
    slug: 'dhakai-jamdani-heritage-handloom-saree',
    category: 'Saree & Festive',
    price: 7850,
    originalPrice: 8900,
    discountPercent: 12,
    rating: 5.0,
    reviewCount: 37,
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 7,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Rose Pink & Zari', hex: '#E07A5F' },
      { name: 'White & Red Paar', hex: '#E63946' },
      { name: 'Midnight Black & Gold', hex: '#1D1E2C' }
    ],
    sizes: ['Standard 12 Haat Saree (with Running Blouse Piece)'],
    fabric: '84-Count Pure Cotton & Silk Warp',
    workDetails: 'Handwoven traditional Panna Hajar and Mayur motif with pure zari',
    careInstructions: 'Dry clean only. Roll fold in muslin cloth.',
    sku: 'AA-SR-001',
    description: 'Woven directly on handlooms in Demra, Dhaka by veteran master weavers. An heirloom treasure that passes down through generations.'
  },
  {
    id: 'sr-02',
    name: 'Rajshahi Katan Silk Festive Saree',
    banglaName: 'রাজশাহী কাতান সিল্ক ফেস্টিভ শাড়ি',
    slug: 'rajshahi-katan-silk-festive-saree',
    category: 'Saree & Festive',
    price: 6450,
    originalPrice: 7200,
    discountPercent: 10,
    rating: 4.9,
    reviewCount: 24,
    inStock: true,
    stockCount: 10,
    images: [
      'https://images.unsplash.com/photo-1596783049444-884e96a78274?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Crimson Burgundy', hex: '#581845' },
      { name: 'Emerald Forest', hex: '#1E5128' }
    ],
    sizes: ['Standard 12 Haat Saree + 0.8m Blouse Piece'],
    fabric: 'Pure Rajshahi Mulberry Silk Katan',
    workDetails: 'Heavy brocade pallu with zari buti work all over body',
    careInstructions: 'Dry clean only.',
    sku: 'AA-SR-002',
    description: 'Authentic Rajshahi silk known for its luxurious drape, lightweight touch, and royal golden sheen.'
  },
  {
    id: 'sr-03',
    name: 'Organza Floral Tissue Saree with Scalloped Border',
    banglaName: 'টিস্যু অর্গানজা ফ্লোরাল শাড়ি',
    slug: 'organza-floral-tissue-saree-scalloped',
    category: 'Saree & Festive',
    price: 4950,
    originalPrice: 5600,
    discountPercent: 12,
    rating: 4.8,
    reviewCount: 29,
    isNew: true,
    inStock: true,
    stockCount: 12,
    images: [
      '/src/assets/images/hero_fashion_model_1792172507098.jpg'
    ],
    colors: [
      { name: 'Blush Rose Water', hex: '#F7CAD0' },
      { name: 'Powder Lavender', hex: '#CDB4DB' }
    ],
    sizes: ['Standard 5.5m Saree + 1m Embroidered Blouse Piece'],
    fabric: 'Silk Organza Tissue',
    workDetails: 'Digital botanical artwork with hand-cut cutwork border and crystal drops',
    careInstructions: 'Dry clean only.',
    sku: 'AA-SR-003',
    description: 'Modern, airy, and breathtakingly photogenic. The translucent tissue organza reflects candlelight with delicate elegance.'
  },
  {
    id: 'sr-04',
    name: 'Banarasi Georgette Party Saree with Jaal Work',
    banglaName: 'বেনারসি জর্জেট পার্টি শাড়ি',
    slug: 'banarasi-georgette-party-saree',
    category: 'Saree & Festive',
    price: 5950,
    originalPrice: 6800,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 21,
    inStock: true,
    stockCount: 9,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Royal Rani Pink', hex: '#C2185B' },
      { name: 'Dark Teal Blue', hex: '#0F4C5C' }
    ],
    sizes: ['Standard Saree + Blouse piece'],
    fabric: 'Khaddi Georgette with Pure Zari',
    workDetails: 'All-over antique zari jaal weave with heavy pallu',
    careInstructions: 'Dry clean only.',
    sku: 'AA-SR-004',
    description: 'Combines the flowing comfort of georgette with the timeless grandeur of Banarasi antique zari weave.'
  }
];

// Helper to resolve color image
export const getColorImageForProduct = (product: Product, colorName?: string): string => {
  if (!colorName) return product.images[0];
  const foundColor = product.colors.find((c) => c.name.toLowerCase() === colorName.toLowerCase());
  if (foundColor && foundColor.imageUrl) {
    return foundColor.imageUrl;
  }
  
  // Color palette matching heuristics
  const nameLower = colorName.toLowerCase();
  if (nameLower.includes('rose') || nameLower.includes('pink') || nameLower.includes('peach') || nameLower.includes('carnation') || nameLower.includes('blush')) {
    return product.category === 'Western Dress' 
      ? '/src/assets/images/western_collection_1792172508166.jpg'
      : '/src/assets/images/hero_fashion_model_1792172507098.jpg';
  }
  if (nameLower.includes('green') || nameLower.includes('emerald') || nameLower.includes('olive') || nameLower.includes('sage') || nameLower.includes('mint') || nameLower.includes('seafoam')) {
    return '/src/assets/images/threepiece_collection_1792172508454.jpg';
  }
  if (nameLower.includes('lilac') || nameLower.includes('mauve') || nameLower.includes('purple') || nameLower.includes('plum') || nameLower.includes('lavender')) {
    return '/src/assets/images/hijab_collection_1792172508870.jpg';
  }
  if (nameLower.includes('black') || nameLower.includes('onyx') || nameLower.includes('charcoal') || nameLower.includes('slate') || nameLower.includes('dark')) {
    return 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80';
  }
  if (nameLower.includes('blue') || nameLower.includes('navy') || nameLower.includes('teal') || nameLower.includes('indigo') || nameLower.includes('sky')) {
    return 'https://images.unsplash.com/photo-1583391733975-088dd9fa7caa?auto=format&fit=crop&w=900&q=80';
  }
  if (nameLower.includes('gold') || nameLower.includes('champagne') || nameLower.includes('beige') || nameLower.includes('sand') || nameLower.includes('mustard') || nameLower.includes('yellow')) {
    return 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80';
  }
  if (nameLower.includes('red') || nameLower.includes('maroon') || nameLower.includes('crimson') || nameLower.includes('burgundy') || nameLower.includes('terracotta') || nameLower.includes('madder')) {
    return 'https://images.unsplash.com/photo-1596783049444-884e96a78274?auto=format&fit=crop&w=900&q=80';
  }
  if (nameLower.includes('white') || nameLower.includes('ivory') || nameLower.includes('cloud') || nameLower.includes('cream')) {
    return 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80';
  }

  // Fallback to secondary image or first image
  return product.images[1] || product.images[0];
};

// Automatically assign imageUrl to all product colors if missing
INITIAL_PRODUCTS.forEach((prod) => {
  prod.colors = prod.colors.map((c) => ({
    ...c,
    imageUrl: c.imageUrl || getColorImageForProduct(prod, c.name)
  }));
});


export const INITIAL_REVIEWS = [
  {
    id: 'rev-01',
    userName: 'Nusrat Jahan',
    location: 'Gulshan 2, Dhaka',
    rating: 5,
    date: '14 October 2026',
    title: 'Fabric quality exceeded my expectations!',
    comment: 'I ordered the Gul-E-Gulab Three-Piece for my cousin\'s Holud event. The embroidery is so fine and neat, not loose like typical online shops. Delivery was super fast within 24 hours inside Dhaka with Cash on Delivery.',
    productName: 'Gul-E-Gulab Embroidered Organza Three-Piece',
    verifiedPurchase: true
  },
  {
    id: 'rev-02',
    userName: 'Tasmia Rahman',
    location: 'Nasirabad, Chittagong',
    rating: 5,
    date: '11 October 2026',
    title: 'The Sorrento maxi dress fits like a dream',
    comment: 'Finding a modest western dress with full sleeves and high neck that actually looks modern is so difficult in BD. Authentix nailed it! The belt cinches nicely and the fabric feels like luxury silk.',
    productName: 'Sorrento Tiered Belted Dusty Rose Maxi Dress',
    verifiedPurchase: true
  },
  {
    id: 'rev-03',
    userName: 'Farzana Akter Ritu',
    location: 'Zindabazar, Sylhet',
    rating: 5,
    date: '08 October 2026',
    title: 'Best magnetic pins & bubble georgette hijab in BD',
    comment: 'The magnetic pins are life changing! No more ugly holes in my favorite chiffon scarves. Also, the bubble georgette stays in place without slipping.',
    productName: 'Noor Premium Georgette Hijab with Rose Gold Magnets Set',
    verifiedPurchase: true
  },
  {
    id: 'rev-04',
    userName: 'Sabrina Chowdhury',
    location: 'Dhanmondi 27, Dhaka',
    rating: 5,
    date: '03 October 2026',
    title: 'Authentic Jamdani weave and true color',
    comment: 'The Dhakai Jamdani is worth every single Taka. True traditional weave with soft cotton warp. The package arrived in a gorgeous luxury pink gift box with fragrant tissue wrap.',
    productName: 'Dhakai Jamdani Heritage Handloom Saree',
    verifiedPurchase: true
  }
];
