export const demoDestinations = [
  {
    name: 'Manali',
    state: 'Himachal Pradesh',
    country: 'India',
    rating: 4.8,
    reviewsCount: 1420,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579619564365-0355fadc5209?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596761611016-68a0d0ed3ffc?auto=format&fit=crop&w=800&q=80'
    ],
    budgetCategory: 'Budget',
    travelType: 'Adventure',
    estimatedBudget: 18500,
    bestTime: 'October to June',
    duration: '4 - 6 Days',
    shortDesc: 'A snow-capped Himalayan paradise renowned for thrilling winter sports, pine valleys, and cozy riverside cafes.',
    fullDesc: 'Nestled on the banks of the Beas River, Manali is India’s ultimate mountain retreat. Offering a dramatic backdrop of towering snow peaks and verdant cedar forests, it attracts honeymooners, backpackers, and extreme sports adventurers alike. Experience paragliding over the Solang Valley or crossing the engineering marvel of the Atal Tunnel into Lahaul.',
    attractions: [
      { name: 'Solang Valley', desc: 'Adventure hub for skiing, zorbing, quad-biking and paragliding.' },
      { name: 'Rohtang Pass', desc: 'High-altitude snow gateway offering panoramic Himalayan vistas at 3,978m.' },
      { name: 'Old Manali', desc: 'Charming vintage village packed with wood-stone cafes and live acoustic music.' },
      { name: 'Hadimba Temple', desc: 'Centuries-old pagoda temple carved from cedar wood amidst a sacred deodar grove.' }
    ],
    activities: ['Paragliding', 'River Rafting in Beas', 'Trekking to Jogini Falls', 'Cafe Hopping in Old Manali', 'Hot Springs at Vashisht'],
    transport: {
      flight: 'Kullu-Manali Airport (Bhuntar) is 50 km away; regular cab services available.',
      train: 'Broad gauge railway up to Chandigarh (310 km) or Pathankot (285 km).',
      road: 'Overnight Volvo and luxury buses operate daily from New Delhi (540 km) and Chandigarh.'
    },
    accommodation: {
      budget: '₹800 - ₹1,500 / night (Backpacker Hostels & Riverside Homestays)',
      standard: '₹2,500 - ₹5,000 / night (Boutique Mountain Cottages & 3-Star Hotels)',
      premium: '₹8,000 - ₹18,000 / night (Luxury Riverside Wellness Resorts)'
    },
    dailyExpenses: {
      hotel: 2500,
      food: 900,
      transport: 600,
      activities: 1200
    },
    travelTips: [
      'Obtain Rohtang Pass permits online at least 3 days in advance.',
      'Carry warm layered woolens even during summer months as evenings turn chilly.',
      'Rent snow suits and boots directly in Solang to avoid inflated road-side stalls.'
    ],
    weather: {
      temp: '14°C',
      condition: 'Clear Skies & Crisp Breeze',
      humidity: '48%',
      season: 'Cool Spring / Autumn'
    }
  },
  {
    name: 'Goa',
    state: 'Goa',
    country: 'India',
    rating: 4.7,
    reviewsCount: 2310,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80'
    ],
    budgetCategory: 'Moderate',
    travelType: 'Beach',
    estimatedBudget: 22000,
    bestTime: 'November to February',
    duration: '4 - 7 Days',
    shortDesc: 'Golden sun-kissed beaches, Portuguese colonial architecture, vibrant shacks, and electrifying nightlife.',
    fullDesc: 'Goa is India’s pocket-sized paradise of sun, sand, and spice. North Goa pulses with beach clubs, flea markets, and water sports, while South Goa is a haven of quiet palm-fringed sands, heritage churches, and tranquil backwaters. Savor fresh seafood curry while enjoying Arabian sea sunsets.',
    attractions: [
      { name: 'Palolem Beach', desc: 'Crescent-shaped serene beach with peaceful dolphin-spotting boat trips.' },
      { name: 'Basilica of Bom Jesus', desc: 'UNESCO heritage site preserving the remains of St. Francis Xavier.' },
      { name: 'Fort Aguada', desc: '17th-century Portuguese lighthouse and fortress commanding sea views.' },
      { name: 'Dudhsagar Waterfalls', desc: 'Spectacular four-tiered waterfall cascading through dense Western Ghats.' }
    ],
    activities: ['Scuba Diving at Grande Island', 'Sunset Cruise on Mandovi River', 'Scooter Rental Roadtrips', 'Beach Shack Dining'],
    transport: {
      flight: 'Dabolim Airport (GOI) and Manohar International Airport (MOPA) connect all major cities.',
      train: 'Madgaon (MAO) and Thivim (THVM) receive premier trains like Vande Bharat & Rajdhani.',
      road: 'Excellent national highway connections with Mumbai (590 km) and Bengaluru (560 km).'
    },
    accommodation: {
      budget: '₹1,000 - ₹2,000 / night (Beach Huts & Hostels)',
      standard: '₹3,500 - ₹7,000 / night (Boutique Portuguese Villas & Resorts)',
      premium: '₹12,000 - ₹30,000 / night (5-Star Luxury Beachfront Properties)'
    },
    dailyExpenses: {
      hotel: 3200,
      food: 1200,
      transport: 700,
      activities: 1500
    },
    travelTips: [
      'Renting a self-driven scooter (₹300 - ₹500/day) is the best way to explore.',
      'Respect quiet zones and turtle nesting sanctuaries along Morjim and Galgibaga.',
      'Try local Goan poi bread with prawn balchão at Fontainhas heritage quarter.'
    ],
    weather: {
      temp: '28°C',
      condition: 'Sunny & Pleasant Breeze',
      humidity: '65%',
      season: 'Tropical Coastal'
    }
  },
  {
    name: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    rating: 4.9,
    reviewsCount: 1980,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603288940356-9b044c50cbf1?auto=format&fit=crop&w=800&q=80'
    ],
    budgetCategory: 'Budget',
    travelType: 'Heritage',
    estimatedBudget: 16000,
    bestTime: 'October to March',
    duration: '3 - 4 Days',
    shortDesc: 'The Pink City of royalty, towering sandstone forts, opulent royal palaces, and vibrant bazaar culture.',
    fullDesc: 'Jaipur, the capital of Rajasthan, is part of the celebrated Golden Triangle. Built in 1727 by Maharaja Sawai Jai Singh II, the city is an architectural marvel of geometric symmetry, terracotta walls, and grand courtyards. Experience elephant rides at Amer Fort, view the honeycomb facade of Hawa Mahal, and browse dazzling gemstone bazaars.',
    attractions: [
      { name: 'Amer Fort', desc: 'Sprawling hilltop fort complex with Mirror Palace (Sheesh Mahal).' },
      { name: 'Hawa Mahal', desc: 'Iconic five-story palace of winds with 953 ornate latticework jharokhas.' },
      { name: 'City Palace', desc: 'Resplendent blend of Rajasthani and Mughal court architecture.' },
      { name: 'Jantar Mantar', desc: 'UNESCO-listed collection of 19 architectural astronomical instruments.' }
    ],
    activities: ['Hot Air Balloon Ride over Forts', 'Jewelry and Textile Shopping in Johari Bazaar', 'Traditional Thali Dining at Chokhi Dhani'],
    transport: {
      flight: 'Jaipur International Airport (JAI) connects domestic and Gulf hubs.',
      train: 'Jaipur Junction (JP) is an express hub 4 hours from Delhi.',
      road: 'Direct Delhi-Jaipur Expressway cuts driving time to under 3.5 hours.'
    },
    accommodation: {
      budget: '₹900 - ₹1,800 / night (Heritage Havelis & Hostels)',
      standard: '₹3,000 - ₹6,000 / night (Colonial Mansions & 4-Star Hotels)',
      premium: '₹14,000 - ₹45,000 / night (Living Royal Palaces like Rambagh)'
    },
    dailyExpenses: {
      hotel: 2400,
      food: 850,
      transport: 500,
      activities: 950
    },
    travelTips: [
      'Buy the composite tourism entry ticket to save over 50% across 8 monument sites.',
      'Visit Nahargarh Fort around sunset for an unmatched illuminated skyline view of Jaipur.',
      'Always bargain gently in the old city bazaars for handicrafts and block-print quilts.'
    ],
    weather: {
      temp: '22°C',
      condition: 'Dry & Sunny',
      humidity: '35%',
      season: 'Pleasant Winter'
    }
  },
  {
    name: 'Kashmir',
    state: 'Jammu & Kashmir',
    country: 'India',
    rating: 4.9,
    reviewsCount: 1650,
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
    ],
    budgetCategory: 'Moderate',
    travelType: 'Nature',
    estimatedBudget: 28000,
    bestTime: 'March to October (Snow: Dec - Feb)',
    duration: '5 - 7 Days',
    shortDesc: 'Heaven on Earth: dreamy Dal Lake houseboats, Gulmarg ski slopes, and the saffron meadows of Pahalgam.',
    fullDesc: 'Kashmir captivates with tranquil waters mirroring snow-capped Pir Panjal peaks, aromatic Mughal gardens blooming with tulips, and traditional wooden Shikaras gliding over floating lotus beds. Gulmarg boasts one of the world’s highest gondolas, while Pahalgam enchants with roaring glacial rivers.',
    attractions: [
      { name: 'Dal Lake & Houseboats', desc: 'Mirror-glass lake dotted with hand-carved cedar wooden houseboats.' },
      { name: 'Gulmarg Gondola', desc: 'Breathtaking cable car ascending to 4,200m for alpine skiing.' },
      { name: 'Betaab Valley', desc: 'Picturesque valley framed by deodar forests and crystal streams in Pahalgam.' },
      { name: 'Mughal Gardens', desc: 'Terraced fountains and Persian floral beds at Nishat and Shalimar Bagh.' }
    ],
    activities: ['Shikara Boat Ride at Sunset', 'Skiing in Gulmarg', 'Saffron & Walnut Shopping in Pampore', 'Sipping Warm Kashmiri Kahwa'],
    transport: {
      flight: 'Sheikh ul-Alam International Airport in Srinagar connects Delhi, Mumbai, Bengaluru.',
      train: 'Udhampur/Jammu Tawi railway line, with scenic Vande Bharat links.',
      road: 'National Highway 44 through the historic Chenani-Nashri Tunnel.'
    },
    accommodation: {
      budget: '₹1,500 - ₹2,500 / night (Dal Lake Homestays)',
      standard: '₹4,000 - ₹8,000 / night (Deluxe Heritage Houseboats & Pine Resorts)',
      premium: '₹15,000 - ₹35,000 / night (Luxury Alpine Lodges in Gulmarg)'
    },
    dailyExpenses: {
      hotel: 3800,
      food: 1100,
      transport: 1200,
      activities: 1800
    },
    travelTips: [
      'Book Gulmarg Gondola Phase 2 tickets well in advance as daily slots are strictly capped.',
      'Postpaid mobile connections (or local J&K SIMs) are required; prepaid SIMs do not roam.',
      'Indulge in an authentic 12-course Wazwan feast served on a traditional copper traem.'
    ],
    weather: {
      temp: '10°C',
      condition: 'Brisk & Alpine Fresh',
      humidity: '55%',
      season: 'Spring Blossom'
    }
  },
  {
    name: 'Delhi',
    state: 'Delhi NCR',
    country: 'India',
    rating: 4.6,
    reviewsCount: 3100,
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=800&q=80'
    ],
    budgetCategory: 'Budget',
    travelType: 'City',
    estimatedBudget: 14000,
    bestTime: 'October to March',
    duration: '2 - 4 Days',
    shortDesc: 'The storied national capital blending centuries-old Mughal fortresses with leafy British avenues and culinary delights.',
    fullDesc: 'Delhi is an intoxicating tapestry of history and modernity. From Old Delhi’s labyrinthine spice alleys around Chandni Chowk to the monumental grandeur of India Gate, Humayun’s Tomb, and Rashtrapati Bhavan, it offers an unmatched sensory explosion of street food, art galleries, and vibrant markets.',
    attractions: [
      { name: 'Red Fort & Chandni Chowk', desc: 'Massive red sandstone bastion and Asia’s busiest street food bazaar.' },
      { name: 'Qutub Minar', desc: 'Towering 73-meter minaret of victory dating back to the 12th century.' },
      { name: 'Humayun’s Tomb', desc: 'Precursor to the Taj Mahal, set inside pristine Persian charbagh gardens.' },
      { name: 'Akshardham Temple', desc: 'Astonishing Hindu temple complex showcasing traditional Indian stonecraft.' }
    ],
    activities: ['Old Delhi Culinary Street Food Walk', 'Metro Hopping to Hauz Khas Village', 'Shopping at Dilli Haat Handicrafts'],
    transport: {
      flight: 'Indira Gandhi International Airport (DEL) is India’s largest international gateway.',
      train: 'New Delhi (NDLS), Old Delhi (DLI), and Nizamuddin (NZM) serve nationwide networks.',
      road: 'World-class Delhi Metro connects every neighborhood safely and cleanly.'
    },
    accommodation: {
      budget: '₹800 - ₹1,600 / night (Paharganj / South Delhi Hostels)',
      standard: '₹2,500 - ₹5,000 / night (Connaught Place & Aerocity 4-Star)',
      premium: '₹10,000 - ₹30,000 / night (Historic Luxury Lutyens Properties)'
    },
    dailyExpenses: {
      hotel: 2200,
      food: 800,
      transport: 400,
      activities: 600
    },
    travelTips: [
      'Purchase a Delhi Metro tourist card for unlimited daily travel across the city.',
      'Dress modestly when visiting active religious shrines like Jama Masjid or Bangla Sahib.',
      'Early mornings are best for photography at India Gate and Lodhi Art District.'
    ],
    weather: {
      temp: '24°C',
      condition: 'Mild & Sunny',
      humidity: '40%',
      season: 'Pleasant Autumn'
    }
  },
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    rating: 4.7,
    reviewsCount: 2890,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800&q=80'
    ],
    budgetCategory: 'Moderate',
    travelType: 'City',
    estimatedBudget: 24000,
    bestTime: 'October to February',
    duration: '3 - 5 Days',
    shortDesc: 'The maximum city of dreams, Bollywood cinema, Victorian Gothic monuments, and Marine Drive breezes.',
    fullDesc: 'Mumbai moves at a relentless, exhilarating pace. From the iconic Gateway of India facing the Arabian Sea to the heritage cafes of Kala Ghoda, breezy evenings on the Queen’s Necklace at Marine Drive, and the electric energy of Bandra’s boutique streets, the city never fails to enchant.',
    attractions: [
      { name: 'Gateway of India', desc: 'Colonial arch monument overlooking Mumbai Harbor and Taj Mahal Palace.' },
      { name: 'Marine Drive', desc: 'Famous 3.6 km C-shaped coastal boulevard known as Queen’s Necklace.' },
      { name: 'Elephanta Caves', desc: 'Rock-cut cave temples dedicated to Lord Shiva on an island off Mumbai coast.' },
      { name: 'Chhatrapati Shivaji Maharaj Terminus', desc: 'Opulent Victorian Gothic UNESCO rail station.' }
    ],
    activities: ['Sunset Walk along Marine Drive', 'Heritage Art Walk in Fort & Kala Ghoda', 'Tasting Vada Pav & Bun Maska in Irani Cafes'],
    transport: {
      flight: 'Chhatrapati Shivaji Maharaj International Airport (BOM) offers global flight connections.',
      train: 'CSMT and Mumbai Central connect all Indian rail divisions.',
      road: 'Mumbai-Pune Expressway and coastal sea link ensure fast transit.'
    },
    accommodation: {
      budget: '₹1,200 - ₹2,500 / night (Bandra & Colaba Hostels)',
      standard: '₹4,000 - ₹8,500 / night (Boutique Business Hotels in Juhu & South Bombay)',
      premium: '₹16,000 - ₹45,000 / night (Heritage Waterfront 5-Star Suites)'
    },
    dailyExpenses: {
      hotel: 3800,
      food: 1300,
      transport: 700,
      activities: 900
    },
    travelTips: [
      'Catch the sunset from Marine Drive with local cutting chai.',
      'Board local trains outside peak hours (8-11 AM and 6-9 PM) for a smoother ride.',
      'Explore the art galleries of Kala Ghoda during the annual February art festival.'
    ],
    weather: {
      temp: '27°C',
      condition: 'Breezy & Warm',
      humidity: '68%',
      season: 'Coastal Winter'
    }
  },
  {
    name: 'Rishikesh',
    state: 'Uttarakhand',
    country: 'India',
    rating: 4.8,
    reviewsCount: 1540,
    image: 'https://images.unsplash.com/photo-1588096344356-9a2886f443b7?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588096344356-9a2886f443b7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
    ],
    budgetCategory: 'Budget',
    travelType: 'Adventure',
    estimatedBudget: 13500,
    bestTime: 'September to May',
    duration: '3 - 5 Days',
    shortDesc: 'Yoga capital of the world, exhilarating Ganga river rapids, serene ashrams, and spiritual evening Aarti.',
    fullDesc: 'Situated in the Himalayan foothills where the emerald Ganga emerges onto the plains, Rishikesh is an extraordinary blend of adrenaline and inner peace. Tackle Grade IV white-water rapids, bungee jump at Mohan Chatti, meditate in historic ashrams, and immerse in the divine sound of evening bells at Triveni Ghat.',
    attractions: [
      { name: 'Lakshman & Ram Jhula', desc: 'Iconic suspension iron bridges swaying over the crystal waters of the Ganges.' },
      { name: 'Triveni Ghat Aarti', desc: 'Evening ritual of burning camphor, chants, and floating earthen oil lamps.' },
      { name: 'The Beatles Ashram', desc: 'Graffiti-covered meditation domes where The Beatles composed the White Album in 1968.' },
      { name: 'Neer Garh Waterfall', desc: 'Trek up pristine cascading mountain pools surrounded by butterflies.' }
    ],
    activities: ['White Water River Rafting (16km/26km)', 'India’s Highest Bungee Jump (83m)', 'Morning Yoga & Sound Healing Sessions'],
    transport: {
      flight: 'Dehradun’s Jolly Grant Airport (DED) is just 20 km away.',
      train: 'Yog Nagari Rishikesh (YNRK) connects major Indian express lines.',
      road: 'NH 58 connects directly with Haridwar (25 km) and Delhi (240 km).'
    },
    accommodation: {
      budget: '₹600 - ₹1,400 / night (Riverside Ashram Dorms & Backpacker Camps)',
      standard: '₹2,200 - ₹4,500 / night (Yoga Retreats & Hillside Resorts)',
      premium: '₹12,000 - ₹35,000 / night (Holistic Ayurvedic Luxury Sanctuaries like Ananda)'
    },
    dailyExpenses: {
      hotel: 1800,
      food: 650,
      transport: 400,
      activities: 1500
    },
    travelTips: [
      'Rishikesh is a strictly vegetarian and alcohol-free holy town; embrace the organic sattvic cuisine.',
      'Book rafting with licensed operators equipped with certified helmets and wet suits.',
      'Visit The Beatles Ashram in the late afternoon for stunning golden hour lighting.'
    ],
    weather: {
      temp: '19°C',
      condition: 'Clear & Mountain Fresh',
      humidity: '50%',
      season: 'Pleasant Autumn'
    }
  },
  {
    name: 'Udaipur',
    state: 'Rajasthan',
    country: 'India',
    rating: 4.9,
    reviewsCount: 1750,
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80'
    ],
    budgetCategory: 'Moderate',
    travelType: 'Romantic',
    estimatedBudget: 21000,
    bestTime: 'October to March',
    duration: '3 - 5 Days',
    shortDesc: 'The romantic City of Lakes, shimmering marble palaces floating on water, and serene Aravalli sunsets.',
    fullDesc: 'Known as the Venice of the East, Udaipur is crowned by the gleaming waters of Lake Pichola. Towering marble palaces, intricately carved stone balconies, and whitewashed lakeside havelis reflect in the tranquil waters. Unwind on a royal boat cruise, savor candlelit rooftop dinners, and marvel at the Mewar dynasty collections.',
    attractions: [
      { name: 'City Palace Complex', desc: 'Granite and marble royal complex with European stained glass and mirrored halls.' },
      { name: 'Lake Pichola & Jag Mandir', desc: 'Serene artificial lake boasting the Lake Palace and summer garden palace.' },
      { name: 'Saheliyon-ki-Bari', desc: 'Ornamental gardens with marble elephant fountains crafted for royal maidens.' },
      { name: 'Bagore Ki Haveli', desc: '18th-century mansion hosting nightly Dharohar Rajasthani folk dances.' }
    ],
    activities: ['Sunset Boat Cruise on Lake Pichola', 'Rooftop Candlelight Dinner with Lake Views', 'Vintage Car Museum Tour'],
    transport: {
      flight: 'Maharana Pratap Airport (UDR) is 22 km from the city center.',
      train: 'Udaipur City Railway Station (UDZ) connects Delhi, Mumbai, Jaipur.',
      road: 'Smooth four-lane highways connect with Ahmedabad (250 km) and Jaipur (390 km).'
    },
    accommodation: {
      budget: '₹1,000 - ₹2,000 / night (Lakeview Guest Houses & Hostels)',
      standard: '₹3,500 - ₹7,500 / night (Lakeside Heritage Havelis)',
      premium: '₹18,000 - ₹60,000 / night (Iconic Taj Lake Palace & Leela Palace)'
    },
    dailyExpenses: {
      hotel: 3000,
      food: 1100,
      transport: 500,
      activities: 900
    },
    travelTips: [
      'Secure a front-row ticket at Bagore Ki Haveli for the 7:00 PM folk dance show.',
      'Choose a lakeside rooftop dining venue at Ambrai Ghat for the most magical night view.',
      'Take the ropeway (cable car) to Karni Mata Temple for sweeping lake panoramas.'
    ],
    weather: {
      temp: '21°C',
      condition: 'Warm Sun & Cool Evenings',
      humidity: '42%',
      season: 'Winter Paradise'
    }
  },
  {
    name: 'Paris',
    state: 'Île-de-France',
    country: 'France',
    rating: 4.9,
    reviewsCount: 4500,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520939817895-060bdef4dc1b?auto=format&fit=crop&w=800&q=80'
    ],
    budgetCategory: 'Luxury',
    travelType: 'Romantic',
    estimatedBudget: 115000,
    bestTime: 'April to October',
    duration: '5 - 7 Days',
    shortDesc: 'The City of Light, world-renowned haute cuisine, iconic Eiffel Tower sparkle, and timeless art at the Louvre.',
    fullDesc: 'Paris is the world capital of art, fashion, and romance. Stroll down the grand Champs-Élysées, climb the cobblestone streets of Montmartre to the Sacré-Cœur, explore priceless masterpieces like the Mona Lisa and Venus de Milo in the Louvre, and cruise down the Seine River under illuminated stone bridges.',
    attractions: [
      { name: 'Eiffel Tower', desc: 'World icon offering panoramic summit views and sparkling hourly night lights.' },
      { name: 'The Louvre Museum', desc: 'World’s greatest art sanctuary inside a former Renaissance royal palace.' },
      { name: 'Cathédrale Notre-Dame', desc: 'Masterpiece of French Gothic architecture on the Île de la Cité.' },
      { name: 'Arc de Triomphe', desc: 'Triumphal monument honoring military victories with rooftop vista.' }
    ],
    activities: ['Seine River Champagne Cruise', 'Macaron Tasting in Saint-Germain', 'Day Trip to the Palace of Versailles'],
    transport: {
      flight: 'Charles de Gaulle (CDG) and Orly (ORY) connect every corner of the world.',
      train: 'Eurostar and TGV connect London, Brussels, Amsterdam in hours.',
      road: 'The Paris Métro system is one of the densest and most efficient globally.'
    },
    accommodation: {
      budget: '₹4,500 - ₹8,000 / night (Boutique Hostels & Arrondissement Studios)',
      standard: '₹12,000 - ₹25,000 / night (Charming 3/4-Star Hotels in Le Marais)',
      premium: '₹40,000 - ₹120,000 / night (Historic Palace Hotels like The Ritz Paris)'
    },
    dailyExpenses: {
      hotel: 14000,
      food: 4500,
      transport: 1500,
      activities: 3500
    },
    travelTips: [
      'Book Eiffel Tower summit and Louvre tickets online months ahead to skip 3-hour queues.',
      'Use the Paris Metro Navigo Easy pass instead of buying individual paper tickets.',
      'Always greet shopkeepers and waiters with a polite "Bonjour Madame/Monsieur".'
    ],
    weather: {
      temp: '17°C',
      condition: 'Mild & Partly Cloudy',
      humidity: '62%',
      season: 'Spring Sunshine'
    }
  },
  {
    name: 'Dubai',
    state: 'Dubai Emirate',
    country: 'United Arab Emirates',
    rating: 4.8,
    reviewsCount: 3800,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80'
    ],
    budgetCategory: 'Luxury',
    travelType: 'City',
    estimatedBudget: 85000,
    bestTime: 'November to March',
    duration: '4 - 6 Days',
    shortDesc: 'A futuristic desert metropolis boasting the world’s tallest skyscraper, man-made palm islands, and golden dune safaris.',
    fullDesc: 'Dubai is where impossible architectural dreams become reality. Gaze from the 148th floor of the Burj Khalifa, witness the choreography of the Dubai Fountain, indulge in luxury shopping at the Dubai Mall, blast through golden sand dunes in a 4x4, and marvel at the sail-shaped Burj Al Arab.',
    attractions: [
      { name: 'Burj Khalifa', desc: 'World’s tallest building standing at an astonishing 828 meters.' },
      { name: 'The Dubai Mall & Fountain', desc: 'World’s largest retail hub featuring an Olympic ice rink and giant aquarium.' },
      { name: 'Palm Jumeirah & Atlantis', desc: 'Iconic palm tree-shaped archipelago with Aquaventure waterpark.' },
      { name: 'Museum of the Future', desc: 'Architectural wonder featuring an elliptical ring adorned with Arabic calligraphy.' }
    ],
    activities: ['Desert Safari with BBQ Dinner & Dune Bashing', 'Skydive over Palm Jumeirah', 'Yacht Cruise around Dubai Marina'],
    transport: {
      flight: 'Dubai International Airport (DXB) is the busiest international airport on Earth.',
      train: 'Fully automated driverless Dubai Metro runs through all tourist zones.',
      road: 'Affordable Careem and government RTA taxis available 24/7.'
    },
    accommodation: {
      budget: '₹3,500 - ₹6,500 / night (Deira & Al Barsha Modern Hotels)',
      standard: '₹9,000 - ₹18,000 / night (Downtown & Marina 4-Star Suites)',
      premium: '₹30,000 - ₹110,000 / night (Ultra-luxury Resorts on Palm Jumeirah)'
    },
    dailyExpenses: {
      hotel: 11000,
      food: 3500,
      transport: 1200,
      activities: 3800
    },
    travelTips: [
      'Dress with respectful coverage when visiting public malls and religious heritage sites.',
      'Book Burj Khalifa sunset time slots (5 PM - 6:30 PM) for the most breathtaking views.',
      'Use the Dubai Metro Red Line directly from DXB Terminal 1 and 3 into Downtown.'
    ],
    weather: {
      temp: '26°C',
      condition: 'Clear Sky & Warm Sunshine',
      humidity: '52%',
      season: 'Pleasant Winter'
    }
  },
  {
    name: 'Bali',
    state: 'Bali Province',
    country: 'Indonesia',
    rating: 4.8,
    reviewsCount: 3400,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80'
    ],
    budgetCategory: 'Moderate',
    travelType: 'Nature',
    estimatedBudget: 48000,
    bestTime: 'April to October',
    duration: '6 - 8 Days',
    shortDesc: 'Island of the Gods: emerald rice terraces, cliffside sea temples, world-class surf breaks, and serene yoga retreats.',
    fullDesc: 'Bali is Indonesia’s crown jewel, uniting spiritual Hindu temple traditions with tropical paradise. Wander through Ubud’s Monkey Forest and Tegallalang rice terraces, catch legendary surf in Uluwatu, witness the cliffside Kecak dance at sunset, and dive with manta rays around Nusa Penida.',
    attractions: [
      { name: 'Uluwatu Temple', desc: 'Dramatic sea temple perched atop a 70-meter limestone cliff over roaring surf.' },
      { name: 'Tegallalang Rice Terraces', desc: 'Cascading emerald green paddy fields carved using traditional Subak irrigation.' },
      { name: 'Tanah Lot Temple', desc: 'Sacred offshore rock formation temple surrounded by crashing ocean waves.' },
      { name: 'Sacred Monkey Forest Sanctuary', desc: 'Ancient banyan forest in Ubud inhabited by hundreds of grey macaques.' }
    ],
    activities: ['Sunrise Trek to Mount Batur Volcano', 'Surfing at Canggu or Padang Padang', 'Traditional Balinese Spa & Flower Bath'],
    transport: {
      flight: 'Ngurah Rai International Airport (DPS) in Denpasar connects direct flights across Asia & Australia.',
      road: 'Hired private drivers (₹2,500/day) or Grab/Gojek ride hailing are best for exploring.'
    },
    accommodation: {
      budget: '₹1,200 - ₹2,500 / night (Chic Bamboo Eco-Huts & Hostels)',
      standard: '₹4,000 - ₹8,500 / night (Private Pool Jungle Villas in Ubud)',
      premium: '₹18,000 - ₹55,000 / night (5-Star Oceanfront Clifftop Resorts)'
    },
    dailyExpenses: {
      hotel: 4200,
      food: 1100,
      transport: 900,
      activities: 1400
    },
    travelTips: [
      'Wear a temple sash and sarong (provided at ticket gates) before entering holy grounds.',
      'Drink bottled water and avoid tap water to prevent "Bali Belly".',
      'Hire a local private driver for full-day sightseeing excursions across the island.'
    ],
    weather: {
      temp: '28°C',
      condition: 'Tropical Warmth & Ocean Breeze',
      humidity: '72%',
      season: 'Dry Season'
    }
  },
  {
    name: 'Switzerland',
    state: 'Bernese Oberland',
    country: 'Switzerland',
    rating: 4.9,
    reviewsCount: 2950,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    budgetCategory: 'Luxury',
    travelType: 'Nature',
    estimatedBudget: 140000,
    bestTime: 'May to September (Skiing: Dec - March)',
    duration: '6 - 9 Days',
    shortDesc: 'Fairytale Alpine vistas, cogwheel mountain trains, mirror-smooth turquoise lakes, and Swiss chocolate bliss.',
    fullDesc: 'Switzerland represents alpine perfection. From the Top of Europe at Jungfraujoch to the iconic Matterhorn pyramid in Zermatt, glacial lakes of Lucerne and Interlaken, and scenic panoramic rail journeys on the Glacier Express, it is an unforgettable adventure into nature’s finest theatre.',
    attractions: [
      { name: 'Jungfraujoch (Top of Europe)', desc: 'Highest railway station in Europe at 3,454m nestled inside the Aletsch Glacier.' },
      { name: 'Zermatt & The Matterhorn', desc: 'Car-free alpine village with dramatic views of the most photographed peak on Earth.' },
      { name: 'Lake Lucerne & Chapel Bridge', desc: '14th-century wooden covered footbridge over swan-filled turquoise waters.' },
      { name: 'Lauterbrunnen Valley', desc: 'Valley of 72 roaring waterfalls framed by sheer limestone cliffs.' }
    ],
    activities: ['Panoramic Ride on the Glacier Express', 'Cable Car to Mount Titlis Rotating Gondola', 'Swiss Fondue and Artisan Chocolate Tasting'],
    transport: {
      flight: 'Zurich (ZRH) and Geneva (GVA) offer direct worldwide flights.',
      road: 'The Swiss Travel System is the gold standard of punctual scenic trains, boats, and mountain lifts.'
    },
    accommodation: {
      budget: '₹6,000 - ₹10,000 / night (Alpine Hostels & Chalet Dorms)',
      standard: '₹16,000 - ₹32,000 / night (Cozy Timber Mountain Hotels)',
      premium: '₹55,000 - ₹160,000 / night (Grand Luxury Palace Hotels like Badrutt’s)'
    },
    dailyExpenses: {
      hotel: 18000,
      food: 5500,
      transport: 3500,
      activities: 4500
    },
    travelTips: [
      'The Swiss Travel Pass offers unlimited train, bus, and boat rides plus free entry to 500+ museums.',
      'Tap water from public fountains in Swiss towns is cold, pristine, and 100% drinkable.',
      'Dress in windproof layers when ascending high mountain peaks even in peak July.'
    ],
    weather: {
      temp: '16°C',
      condition: 'Crisp Alpine Sun',
      humidity: '45%',
      season: 'Alpine Summer'
    }
  }
];
