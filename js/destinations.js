/**
 * TRAVEL BUDDY - Destinations Catalog & Explorer Module
 * Contains 12 curated global & domestic destinations, search & filtering, details renderer
 */

const TravelBuddyDestinations = {
  // Comprehensive Destinations Catalog
  catalog: [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
      id: '4',
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
      id: '5',
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
        metro: 'World-class Delhi Metro connects every neighborhood safely and cleanly.'
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
      id: '6',
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
      id: '7',
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
      id: '8',
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
      id: '9',
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
        metro: 'The Paris Métro system is one of the densest and most efficient globally.'
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
      id: '10',
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
        metro: 'Fully automated driverless Dubai Metro runs through all tourist zones.',
        taxi: 'Affordable Careem and government RTA taxis available 24/7.'
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
      id: '11',
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
      id: '12',
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
        train: 'The Swiss Travel System is the gold standard of punctual scenic trains, boats, and mountain lifts.'
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
  ],

  // Get all destinations
  getAll() {
    return this.catalog;
  },

  // Get destination by ID
  getById(id) {
    return this.catalog.find(d => d.id === String(id)) || null;
  },

  // Get saved favourites IDs
  getFavourites() {
    return JSON.parse(localStorage.getItem(TravelBuddy.STORAGE_KEYS.FAVOURITES) || '[]');
  },

  // Toggle favorite status
  toggleFavourite(id, btnElement = null) {
    let favs = this.getFavourites();
    const strId = String(id);
    const dest = this.getById(strId);
    const destName = dest ? dest.name : 'Destination';

    if (favs.includes(strId)) {
      favs = favs.filter(favId => favId !== strId);
      localStorage.setItem(TravelBuddy.STORAGE_KEYS.FAVOURITES, JSON.stringify(favs));
      TravelBuddy.showToast(`Removed ${destName} from favourites`, 'info');
      if (btnElement) {
        btnElement.classList.remove('active');
        btnElement.innerHTML = '<i class="far fa-heart"></i>';
      }
    } else {
      favs.push(strId);
      localStorage.setItem(TravelBuddy.STORAGE_KEYS.FAVOURITES, JSON.stringify(favs));
      TravelBuddy.showToast(`Saved ${destName} to favourites ❤️`, 'success');
      if (btnElement) {
        btnElement.classList.add('active');
        btnElement.innerHTML = '<i class="fas fa-heart"></i>';
      }
    }

    // Also sync with backend API (fire-and-forget)
    try {
      const token = localStorage.getItem('tb_jwt_token');
      if (token && dest) {
        // Try to find the MongoDB destination ID by name
        fetch('http://localhost:5000/api/destinations?search=' + encodeURIComponent(dest.name), {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => res.json()).then(data => {
          const destinations = data.destinations || [];
          const matchedDest = destinations.find(d => d.name.toLowerCase() === dest.name.toLowerCase());
          if (matchedDest && matchedDest._id) {
            fetch('http://localhost:5000/api/favourites/toggle', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ destinationId: matchedDest._id })
            }).catch(() => {});
          }
        }).catch(() => {});
      }
    } catch (e) {
      // Silently ignore API sync errors — localStorage is the primary source
    }

    // Refresh if on favourites page
    if (window.location.pathname.includes('favourites.html')) {
      TravelBuddyDestinations.renderFavouritesPage();
    }
  },

  // Check if destination is favourited
  isFavourite(id) {
    const favs = this.getFavourites();
    return favs.includes(String(id));
  },

  // Filter & Search Catalog
  filter(query = '', country = 'all', budget = 'all', travelType = 'all', rating = 'all', sortBy = 'popular') {
    let list = [...this.catalog];

    // Search query
    if (query && query.trim() !== '') {
      const q = query.toLowerCase().trim();
      list = list.filter(d => 
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        (d.state && d.state.toLowerCase().includes(q)) ||
        d.shortDesc.toLowerCase().includes(q)
      );
    }

    // Country filter
    if (country && country !== 'all') {
      list = list.filter(d => d.country.toLowerCase() === country.toLowerCase());
    }

    // Budget filter
    if (budget && budget !== 'all') {
      list = list.filter(d => d.budgetCategory.toLowerCase() === budget.toLowerCase());
    }

    // Travel Type
    if (travelType && travelType !== 'all') {
      list = list.filter(d => d.travelType.toLowerCase() === travelType.toLowerCase());
    }

    // Minimum rating
    if (rating && rating !== 'all') {
      const minRate = parseFloat(rating);
      list = list.filter(d => d.rating >= minRate);
    }

    // Sort by
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.estimatedBudget - b.estimatedBudget);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.estimatedBudget - a.estimatedBudget);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: Popularity (reviewsCount)
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  },

  // Render a list of destination cards into container
  renderCards(destinations, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!destinations || destinations.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-surface); border-radius: var(--radius-xl); border: 1px dashed var(--border-strong);">
          <i class="fas fa-map-location-dot" style="font-size: 3rem; color: var(--text-subtle); margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">No destinations found</h3>
          <p style="color: var(--text-muted); max-width: 400px; margin: 0 auto 1.5rem;">We couldn't find any places matching your criteria. Try adjusting your search query or filters.</p>
          <button class="btn btn-primary btn-sm" onclick="TravelBuddyDestinations.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    const favs = this.getFavourites();

    container.innerHTML = destinations.map(dest => {
      const isFav = favs.includes(String(dest.id));
      return `
        <div class="destination-card">
          <div class="card-img-container">
            <img src="${dest.image}" alt="${dest.name}" loading="lazy">
            <span class="card-badge-country">
              <i class="fas fa-location-dot"></i> ${dest.country}
            </span>
            <button class="fav-btn ${isFav ? 'active' : ''}" 
                    title="${isFav ? 'Remove from favourites' : 'Add to favourites'}"
                    onclick="TravelBuddyDestinations.toggleFavourite('${dest.id}', this)">
              <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
            </button>
          </div>
          <div class="card-body">
            <div class="card-meta">
              <span class="rating-pill">
                <i class="fas fa-star"></i> ${dest.rating.toFixed(1)} 
                <span style="color: var(--text-muted); font-weight: normal; font-size: 0.8rem;">(${dest.reviewsCount})</span>
              </span>
              <span class="badge badge-${dest.budgetCategory === 'Budget' ? 'success' : dest.budgetCategory === 'Moderate' ? 'blue' : 'coral'}">
                ${dest.budgetCategory}
              </span>
            </div>
            <h3 class="card-title">${dest.name}</h3>
            <p class="card-desc">${dest.shortDesc}</p>
            <div class="card-details-row">
              <div>
                <i class="far fa-calendar-alt"></i> ${dest.bestTime.split('(')[0]}
              </div>
              <div class="price-tag">
                ${TravelBuddy.formatCurrency(dest.estimatedBudget)}
              </div>
            </div>
            <div class="card-actions">
              <a href="destination-details.html?id=${dest.id}" class="btn btn-outline btn-sm">
                View Details
              </a>
              <a href="plan-trip.html?destination=${encodeURIComponent(dest.name)}" class="btn btn-primary btn-sm">
                Plan Trip
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  // Reset filters helper
  resetFilters() {
    const searchInput = document.getElementById('search-destination');
    const countrySelect = document.getElementById('filter-country');
    const budgetSelect = document.getElementById('filter-budget');
    const typeSelect = document.getElementById('filter-type');
    const sortSelect = document.getElementById('filter-sort');

    if (searchInput) searchInput.value = '';
    if (countrySelect) countrySelect.value = 'all';
    if (budgetSelect) budgetSelect.value = 'all';
    if (typeSelect) typeSelect.value = 'all';
    if (sortSelect) sortSelect.value = 'popular';

    this.renderCards(this.getAll(), 'destinations-grid-container');
  },

  // Render Details Page
  renderDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const destId = urlParams.get('id') || '1';
    const dest = this.getById(destId);

    if (!dest) {
      document.getElementById('details-container').innerHTML = `
        <div class="container" style="padding: 5rem 0; text-align: center;">
          <h2>Destination Not Found</h2>
          <p style="margin: 1rem 0 2rem;">The destination you are looking for does not exist in our catalog.</p>
          <a href="destinations.html" class="btn btn-primary">Browse Destinations</a>
        </div>
      `;
      return;
    }

    // Set page title
    document.title = `${dest.name}, ${dest.country} - Travel Buddy`;

    const isFav = this.isFavourite(dest.id);

    const detailsHtml = `
      <!-- Hero Banner -->
      <div style="position: relative; height: 480px; overflow: hidden; background: #000;">
        <img src="${dest.image}" alt="${dest.name}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85;">
        <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.3) 60%, rgba(15,23,42,0.6) 100%);"></div>
        <div class="container" style="position: absolute; bottom: 3rem; left: 0; right: 0; color: #ffffff;">
          <div style="display: flex; gap: 0.6rem; align-items: center; margin-bottom: 0.8rem; flex-wrap: wrap;">
            <span class="badge badge-blue"><i class="fas fa-location-dot"></i> ${dest.country}</span>
            <span class="badge badge-${dest.budgetCategory === 'Budget' ? 'success' : dest.budgetCategory === 'Moderate' ? 'purple' : 'coral'}">${dest.budgetCategory} Tier</span>
            <span class="badge badge-coral"><i class="fas fa-compass"></i> ${dest.travelType}</span>
          </div>
          <h1 style="font-size: 3.2rem; color: #ffffff; margin-bottom: 0.5rem;">${dest.name}</h1>
          <p style="color: #e2e8f0; font-size: 1.15rem; max-width: 650px;">${dest.shortDesc}</p>
          <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1.5rem; flex-wrap: wrap;">
            <a href="plan-trip.html?destination=${encodeURIComponent(dest.name)}" class="btn btn-accent btn-lg">
              <i class="fas fa-paper-plane"></i> Plan Trip to ${dest.name}
            </a>
            <button class="btn btn-outline btn-lg" id="detail-fav-btn" 
                    style="background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.4); color: #fff;"
                    onclick="TravelBuddyDestinations.toggleFavourite('${dest.id}', this)">
              <i class="${isFav ? 'fas' : 'far'} fa-heart" style="${isFav ? 'color: #ef4444;' : ''}"></i> 
              ${isFav ? 'Saved in Favourites' : 'Add to Favourites'}
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="container" style="padding: 4rem 1.5rem;">
        <div style="display: grid; grid-template-columns: 1.4fr 0.8fr; gap: 3rem;">
          
          <!-- Left Column -->
          <div style="display: flex; flex-direction: column; gap: 3rem;">
            
            <!-- About Section -->
            <div class="planner-card">
              <h2 style="font-size: 1.75rem; margin-bottom: 1rem;">About ${dest.name}</h2>
              <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-main);">${dest.fullDesc}</p>
              
              <!-- Quick Spec Row -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-light);">
                <div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Best Time</div>
                  <div style="font-weight: 700; font-size: 1rem;">${dest.bestTime}</div>
                </div>
                <div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Ideal Duration</div>
                  <div style="font-weight: 700; font-size: 1rem;">${dest.duration}</div>
                </div>
                <div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Rating</div>
                  <div style="font-weight: 700; font-size: 1rem; color: var(--accent-amber);"><i class="fas fa-star"></i> ${dest.rating} / 5.0</div>
                </div>
                <div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Est. Budget</div>
                  <div style="font-weight: 700; font-size: 1rem; color: var(--primary-blue);">${TravelBuddy.formatCurrency(dest.estimatedBudget)}</div>
                </div>
              </div>
            </div>

            <!-- Attractions Section -->
            <div class="planner-card">
              <h2 style="font-size: 1.75rem; margin-bottom: 1.5rem;"><i class="fas fa-landmark text-gradient"></i> Top Attractions</h2>
              <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                ${dest.attractions.map((att, i) => `
                  <div style="display: flex; gap: 1.25rem; align-items: flex-start; padding: 1rem; background: var(--bg-subtle); border-radius: var(--radius-lg);">
                    <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--primary-blue); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">
                      ${i + 1}
                    </div>
                    <div>
                      <h4 style="font-size: 1.15rem; margin-bottom: 0.25rem;">${att.name}</h4>
                      <p style="font-size: 0.92rem; color: var(--text-muted);">${att.desc}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Recommended Activities -->
            <div class="planner-card">
              <h2 style="font-size: 1.75rem; margin-bottom: 1.25rem;"><i class="fas fa-person-hiking text-coral-gradient"></i> Recommended Activities</h2>
              <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
                ${dest.activities.map(act => `
                  <div style="padding: 0.6rem 1.1rem; border-radius: var(--radius-full); background: var(--sky-blue-light); color: var(--primary-blue); font-weight: 600; font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-check-circle"></i> ${act}
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Transportation & Getting There -->
            <div class="planner-card">
              <h2 style="font-size: 1.75rem; margin-bottom: 1.5rem;"><i class="fas fa-route text-gradient"></i> How to Reach</h2>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; gap: 1rem; align-items: flex-start;">
                  <div class="action-icon"><i class="fas fa-plane"></i></div>
                  <div>
                    <h4 style="font-size: 1rem; margin-bottom: 0.2rem;">By Air</h4>
                    <p style="font-size: 0.9rem;">${dest.transport.flight}</p>
                  </div>
                </div>
                ${dest.transport.train ? `
                  <div style="display: flex; gap: 1rem; align-items: flex-start;">
                    <div class="action-icon"><i class="fas fa-train"></i></div>
                    <div>
                      <h4 style="font-size: 1rem; margin-bottom: 0.2rem;">By Train</h4>
                      <p style="font-size: 0.9rem;">${dest.transport.train}</p>
                    </div>
                  </div>
                ` : ''}
                <div style="display: flex; gap: 1rem; align-items: flex-start;">
                  <div class="action-icon"><i class="fas fa-car"></i></div>
                  <div>
                    <h4 style="font-size: 1rem; margin-bottom: 0.2rem;">By Road</h4>
                    <p style="font-size: 0.9rem;">${dest.transport.road}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Travel Tips -->
            <div class="planner-card" style="border-left: 4px solid var(--accent-coral);">
              <h3 style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.6rem;">
                <i class="fas fa-lightbulb" style="color: var(--accent-coral);"></i> Essential Travel Tips
              </h3>
              <ul style="display: flex; flex-direction: column; gap: 0.6rem; padding-left: 1.25rem; list-style: disc;">
                ${dest.travelTips.map(tip => `<li style="font-size: 0.95rem; color: var(--text-main);">${tip}</li>`).join('')}
              </ul>
            </div>

          </div>

          <!-- Right Column (Sidebar Widgets) -->
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            
            <!-- Weather Demo Card -->
            <div class="budget-calculator-card" style="position: static;">
              <h3 style="font-size: 1.25rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between;">
                <span>Live Weather Demo</span>
                <span class="badge badge-blue">Real-time Feed</span>
              </h3>
              <div style="display: flex; align-items: center; gap: 1.5rem; margin: 1.5rem 0;">
                <div style="font-size: 3.5rem; font-weight: 800; font-family: 'Outfit'; color: var(--primary-blue);">${dest.weather.temp}</div>
                <div>
                  <div style="font-weight: 700; font-size: 1.1rem;">${dest.weather.condition}</div>
                  <div style="font-size: 0.85rem; color: var(--text-muted);"><i class="fas fa-droplet"></i> Humidity: ${dest.weather.humidity}</div>
                  <div style="font-size: 0.85rem; color: var(--text-muted);"><i class="fas fa-leaf"></i> ${dest.weather.season}</div>
                </div>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">Condition monitored via Travel Buddy micro-climate simulator.</p>
            </div>

            <!-- Daily Expenses Estimation -->
            <div class="planner-card">
              <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Est. Daily Expenses</h3>
              <div class="budget-breakdown-list">
                <div class="budget-item">
                  <span><i class="fas fa-bed text-gradient"></i> Hotel / Lodging</span>
                  <span style="font-weight: 700;">${TravelBuddy.formatCurrency(dest.dailyExpenses.hotel)}</span>
                </div>
                <div class="budget-item">
                  <span><i class="fas fa-utensils text-gradient"></i> Food & Dining</span>
                  <span style="font-weight: 700;">${TravelBuddy.formatCurrency(dest.dailyExpenses.food)}</span>
                </div>
                <div class="budget-item">
                  <span><i class="fas fa-taxi text-gradient"></i> Local Transit</span>
                  <span style="font-weight: 700;">${TravelBuddy.formatCurrency(dest.dailyExpenses.transport)}</span>
                </div>
                <div class="budget-item">
                  <span><i class="fas fa-ticket text-gradient"></i> Activities / Entry</span>
                  <span style="font-weight: 700;">${TravelBuddy.formatCurrency(dest.dailyExpenses.activities)}</span>
                </div>
              </div>
              <div class="budget-total-box">
                <div>
                  <div style="font-size: 0.85rem; color: var(--text-muted);">Est. Daily Total</div>
                  <div style="font-size: 1.4rem; font-weight: 800; color: var(--primary-blue);">
                    ${TravelBuddy.formatCurrency(dest.dailyExpenses.hotel + dest.dailyExpenses.food + dest.dailyExpenses.transport + dest.dailyExpenses.activities)}
                  </div>
                </div>
                <a href="plan-trip.html?destination=${encodeURIComponent(dest.name)}" class="btn btn-primary btn-sm">Customize</a>
              </div>
            </div>

            <!-- Accommodation Tiers -->
            <div class="planner-card">
              <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Accommodation Rates</h3>
              <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                <div style="padding: 0.75rem; border-radius: var(--radius-md); background: var(--bg-subtle);">
                  <div style="font-weight: 700; font-size: 0.9rem; color: var(--success);"><i class="fas fa-tag"></i> Budget Tier</div>
                  <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">${dest.accommodation.budget}</div>
                </div>
                <div style="padding: 0.75rem; border-radius: var(--radius-md); background: var(--bg-subtle);">
                  <div style="font-weight: 700; font-size: 0.9rem; color: var(--primary-blue);"><i class="fas fa-hotel"></i> Standard Tier</div>
                  <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">${dest.accommodation.standard}</div>
                </div>
                <div style="padding: 0.75rem; border-radius: var(--radius-md); background: var(--bg-subtle);">
                  <div style="font-weight: 700; font-size: 0.9rem; color: var(--accent-coral);"><i class="fas fa-crown"></i> Premium Luxury</div>
                  <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">${dest.accommodation.premium}</div>
                </div>
              </div>
            </div>

            <!-- Call to Action Card -->
            <div style="background: linear-gradient(135deg, var(--primary-navy), #1e293b); color: #fff; padding: 2rem; border-radius: var(--radius-xl); text-align: center;">
              <h3 style="color: #fff; margin-bottom: 0.75rem;">Ready to Visit ${dest.name}?</h3>
              <p style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 1.5rem;">Create a personalized day-by-day itinerary and manage your bookings effortlessly.</p>
              <a href="plan-trip.html?destination=${encodeURIComponent(dest.name)}" class="btn btn-accent btn-block">
                Start Planning Now
              </a>
            </div>

          </div>

        </div>
      </div>
    `;

    document.getElementById('details-container').innerHTML = detailsHtml;
  },

  // Render Favourites Page
  renderFavouritesPage() {
    const container = document.getElementById('favourites-grid-container');
    const emptyState = document.getElementById('favourites-empty-state');
    if (!container) return;

    const favIds = this.getFavourites();
    const favDestinations = this.catalog.filter(d => favIds.includes(String(d.id)));

    const countEl = document.getElementById('fav-count-badge');
    if (countEl) countEl.innerText = `${favDestinations.length} Places`;

    if (favDestinations.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      this.renderCards(favDestinations, 'favourites-grid-container');
    }
  }
};
