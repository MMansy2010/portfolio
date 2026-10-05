// Simulated local database for Werent Real Estate Portal
// Persisted in localStorage

const SEED_USERS = [
  {
    id: "user_agent_1",
    email: "agent@werent.com.au",
    password: "agent123",
    name: "Alex Mercer",
    role: "agent",
    agency: "Mercer Partners",
    phone: "+61 3 9555 0192",
    avatar: "AM"
  },
  {
    id: "user_admin_1",
    email: "admin@werent.com.au",
    password: "admin123",
    name: "Sarah Jenkins",
    role: "admin",
    phone: "+61 2 8888 0100",
    avatar: "SJ"
  }
];

const SEED_LISTINGS = [
  // ================= RESIDENTIAL =================
  {
    id: "res_1",
    category: "residential",
    propertyType: "House",
    title: "Charming Victorian Terrace",
    address: "23 Example Street, Suburb VIC 3000",
    suburb: "Suburb",
    city: "Melbourne",
    postcode: "3000",
    state: "VIC",
    price: 650, // Per week
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 2,
    description: "This beautifully renovated Victorian terrace combines classic period features with modern open-plan living. Situated in a quiet, leafy street close to public transport, cafes, and parks.",
    features: ["Pets allowed", "Furnished", "Air conditioning", "Heating", "Outdoor deck"],
    agentId: "user_agent_1",
    agentName: "Alex Mercer",
    agentPhone: "+61 3 9555 0192",
    views: 245,
    status: "approved", // approved, pending
    featured: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=exampleres1",
    floorPlanUrl: "svg_floorplan_1" // custom floorplan flag
  },
  {
    id: "res_2",
    category: "residential",
    propertyType: "Apartment / Unit",
    title: "Modern CBD Apartment with Skyline Views",
    address: "12 Sample Road, Suburb VIC 3000",
    suburb: "Suburb",
    city: "Melbourne",
    postcode: "3000",
    state: "VIC",
    price: 520, // Per week
    bedrooms: 2,
    bathrooms: 1,
    carSpaces: 1,
    description: "Stunning 2-bedroom apartment located in the heart of Melbourne CBD. Features European laundry, stainless steel kitchen appliances, floor-to-ceiling windows, and access to the building's rooftop pool.",
    features: ["Unfurnished", "Gym", "Pool", "Balcony", "Dishwasher"],
    agentId: "user_agent_1",
    agentName: "Alex Mercer",
    agentPhone: "+61 3 9555 0192",
    views: 189,
    status: "approved",
    featured: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=exampleres2",
    floorPlanUrl: "svg_floorplan_2"
  },
  {
    id: "res_3",
    category: "residential",
    propertyType: "Unit",
    title: "Light-filled Studio Unit",
    address: "8 Example Lane, Suburb VIC 3000",
    suburb: "Suburb",
    city: "Melbourne",
    postcode: "3000",
    state: "VIC",
    price: 420, // Per week
    bedrooms: 1,
    bathrooms: 1,
    carSpaces: 1,
    description: "Compact and low maintenance living in a highly desirable pocket. Perfect for students or working professionals. Includes a private courtyard and a designated car space.",
    features: ["Furnished", "Courtyard", "Built-in robes"],
    agentId: "user_agent_1",
    agentName: "Alex Mercer",
    agentPhone: "+61 3 9555 0192",
    views: 112,
    status: "approved",
    featured: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=exampleres3",
    floorPlanUrl: "svg_floorplan_3"
  },

  // ================= COMMERCIAL =================
  {
    id: "com_1",
    category: "commercial",
    propertyType: "Office",
    title: "Premium Corporate Office Space",
    address: "Level 2, 123 Business Ave, Melbourne VIC 3000",
    suburb: "Melbourne",
    city: "Melbourne",
    postcode: "3000",
    state: "VIC",
    price: 36000, // Per annum
    area: 120, // m2
    floor: "Level 2",
    description: "Fully-fitted corporate office with reception area, private boardrooms, open workstations, and a private kitchenette. Highly secure building with 24/7 access.",
    features: ["Office", "Parking", "Lift", "Air conditioning", "Fibre Internet"],
    agentId: "user_agent_1",
    agentName: "Alex Mercer",
    agentPhone: "+61 3 9555 0192",
    views: 310,
    status: "approved",
    featured: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=examplecom1",
    floorPlanUrl: "svg_floorplan_4"
  },
  {
    id: "com_2",
    category: "commercial",
    propertyType: "Medical",
    title: "Equipped Consulting & Medical Suite",
    address: "Suite 4, 45 Example St, Melbourne VIC 3000",
    suburb: "Melbourne",
    city: "Melbourne",
    postcode: "3000",
    state: "VIC",
    price: 28500, // Per annum
    area: 85, // m2
    floor: "Ground Floor",
    description: "Ideal medical or dental consulting rooms. Features waiting area, reception desk, 3 consulting suites with sinks, disabled-access toilets, and nearby street parking.",
    features: ["Medical", "Air conditioning", "Disabled access", "Waiting area"],
    agentId: "user_agent_1",
    agentName: "Alex Mercer",
    agentPhone: "+61 3 9555 0192",
    views: 145,
    status: "approved",
    featured: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=examplecom2",
    floorPlanUrl: "svg_floorplan_5"
  },
  {
    id: "com_3",
    category: "commercial",
    propertyType: "Showroom",
    title: "Double-Frontage Retail Showroom",
    address: "Ground Floor, 88 Commercial Rd, Melbourne VIC 3004",
    suburb: "Melbourne",
    city: "Melbourne",
    postcode: "3004",
    state: "VIC",
    price: 42000, // Per annum
    area: 150, // m2
    floor: "Ground Floor",
    description: "High exposure retail showroom with dual street frontage, high ceilings, large display windows, loading dock at the rear, and dedicated parking spaces.",
    features: ["Showroom", "Parking", "Rear loading", "Air conditioning"],
    agentId: "user_agent_1",
    agentName: "Alex Mercer",
    agentPhone: "+61 3 9555 0192",
    views: 98,
    status: "approved",
    featured: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800",
      "https://images.unsplash.com/photo-1472851294608-062f824d296e?q=80&w=800"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=examplecom3",
    floorPlanUrl: "svg_floorplan_6"
  },

  // ================= INDUSTRIAL =================
  {
    id: "ind_1",
    category: "industrial",
    propertyType: "Warehouse",
    title: "High-Clearance Logistics Warehouse",
    address: "15 Industrial Drive, Truganina VIC 3029",
    suburb: "Truganina",
    city: "Melbourne",
    postcode: "3029",
    state: "VIC",
    price: 120000, // Per annum
    buildingArea: 1250, // m2
    landArea: 2500, // m2
    clearHeight: "9m",
    description: "Modern clear-span warehouse with dual container height roller doors, concrete hardstand yard, and two levels of premium office space. Unbeatable freeway access.",
    features: ["Warehouse", "Truck access", "Container access", "Gated security"],
    agentId: "user_agent_1",
    agentName: "Alex Mercer",
    agentPhone: "+61 3 9555 0192",
    views: 412,
    status: "approved",
    featured: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=exampleind1",
    floorPlanUrl: "svg_floorplan_7"
  },
  {
    id: "ind_2",
    category: "industrial",
    propertyType: "Distribution",
    title: "Medium Industrial Facility with Yard",
    address: "2 Logistics Court, Laverton North VIC 3026",
    suburb: "Laverton North",
    city: "Melbourne",
    postcode: "3026",
    state: "VIC",
    price: 95000, // Per annum
    buildingArea: 800, // m2
    landArea: 1500, // m2
    clearHeight: "8m",
    description: "Excellent standalone warehouse facility featuring a large secure side yard, container loading capability, 3-phase power, and offices with full staff amenities.",
    features: ["Distribution", "Clear height 8m", "Container access", "3-phase power"],
    agentId: "user_agent_1",
    agentName: "Alex Mercer",
    agentPhone: "+61 3 9555 0192",
    views: 120,
    status: "approved",
    featured: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=800",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=800"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=exampleind2",
    floorPlanUrl: "svg_floorplan_8"
  },
  {
    id: "ind_3",
    category: "industrial",
    propertyType: "Manufacturing",
    title: "Fully Dynamic Manufacturing Workshop",
    address: "7 Example Road, Thomastown VIC 3074",
    suburb: "Thomastown",
    city: "Melbourne",
    postcode: "3074",
    state: "VIC",
    price: 75000, // Per annum
    buildingArea: 600, // m2
    landArea: 1000, // m2
    clearHeight: "7m",
    description: "Versatile industrial manufacturing facility with integrated dust-extraction ducts, high-amp power outlets, wash bay, crane rail support, and front loading ramp.",
    features: ["Storage", "Yard", "High amp power", "Drive-through access"],
    agentId: "user_agent_1",
    agentName: "Alex Mercer",
    agentPhone: "+61 3 9555 0192",
    views: 89,
    status: "approved",
    featured: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=exampleind3",
    floorPlanUrl: "svg_floorplan_9"
  },

  // ================= RETAIL =================
  {
    id: "ret_1",
    category: "retail",
    propertyType: "Shop / Retail Space",
    title: "High Foot Traffic Retail Storefront",
    address: "Shop 12, Westfield Example, Doncaster VIC 3108",
    suburb: "Doncaster",
    city: "Melbourne",
    postcode: "3108",
    state: "VIC",
    price: 85000, // Per annum
    area: 120, // m2
    description: "Prime retail opportunity within one of Doncaster's premier shopping centers. Positioned directly opposite anchor supermarkets, guaranteeing massive daily customer exposure.",
    features: ["Shop", "High foot traffic", "Parking", "Shopping Mall"],
    agentId: "user_agent_1",
    agentName: "Alex Mercer",
    agentPhone: "+61 3 9555 0192",
    views: 521,
    status: "approved",
    featured: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1567401893930-7becd1221b5a?q=80&w=800",
      "https://images.unsplash.com/photo-1472851294608-062f824d296e?q=80&w=800"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=exampleret1",
    floorPlanUrl: "svg_floorplan_10"
  },
  {
    id: "ret_2",
    category: "retail",
    propertyType: "Kiosk",
    title: "Mall Central Food & Beverage Kiosk",
    address: "Kiosk K3, Melbourne Central, Melbourne VIC 3000",
    suburb: "Melbourne",
    city: "Melbourne",
    postcode: "3000",
    state: "VIC",
    price: 45000, // Per annum
    area: 60, // m2
    description: "Fitted out for grease-trap extraction and commercial coffee sales. Perfect for dessert shops, bubble tea, or fast-casual concepts looking for immediate walk-up traffic.",
    features: ["kiosk", "Food court nearby", "Grease trap", "Water connection"],
    agentId: "user_agent_1",
    agentName: "Alex Mercer",
    agentPhone: "+61 3 9555 0192",
    views: 312,
    status: "approved",
    featured: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=exampleret2",
    floorPlanUrl: "svg_floorplan_11"
  },
  {
    id: "ret_3",
    category: "retail",
    propertyType: "Food & Beverage",
    title: "Licensed Restaurant & Outdoor Area",
    address: "123 Strip Road, Suburb VIC 3000",
    suburb: "Suburb",
    city: "Melbourne",
    postcode: "3000",
    state: "VIC",
    price: 65000, // Per annum
    area: 95, // m2
    description: "Fully licensed restaurant premises located on a lively dining strip. Renders double window street frontage, walk-in cold rooms, deep-fryer lines, and an outdoor courtyard seat layout.",
    features: ["Food & Beverage", "Outdoor area", "Liquor License", "Air conditioning"],
    agentId: "user_agent_1",
    agentName: "Alex Mercer",
    agentPhone: "+61 3 9555 0192",
    views: 180,
    status: "approved",
    featured: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=exampleret3",
    floorPlanUrl: "svg_floorplan_12"
  },

  // ================= RURAL =================
  {
    id: "rur_1",
    category: "rural",
    propertyType: "Grazing",
    title: "Broadacre Cattle Grazing Property",
    address: "Grazing Property, Example Rd, Deniliquin NSW 2710",
    suburb: "Deniliquin",
    city: "Deniliquin",
    postcode: "2710",
    state: "NSW",
    price: 240000, // Per annum
    landSize: 1200, // ha
    description: "Stunning 1,200 hectare grazing estate. Features premium water licence allocations from the river frontage, fully fenced paddocks, heavy shearing sheds, and a cozy original homestead.",
    features: ["Grazing", "Water licence", "Fencing", "Cattle yards", "Homestead"],
    agentId: "user_agent_1",
    agentName: "Alex Mercer",
    agentPhone: "+61 3 9555 0192",
    views: 388,
    status: "approved",
    featured: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800",
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=examplerur1",
    floorPlanUrl: "svg_floorplan_13"
  },
  {
    id: "rur_2",
    category: "rural",
    propertyType: "Cropping",
    title: "High Yield Grain & Cropping Property",
    address: "Cropping Property, Warren VIC 2824",
    suburb: "Warren",
    city: "Warren",
    postcode: "2824",
    state: "VIC",
    price: 180000, // Per annum
    landSize: 850, // ha
    description: "Highly productive agricultural holding with fertile deep clay soils. Excellent machinery and silos, rain-gauge telemetry, water bore license, and dual road access.",
    features: ["Cropping", "Sheds", "Silos", "Bore water"],
    agentId: "user_agent_1",
    agentName: "Alex Mercer",
    agentPhone: "+61 3 9555 0192",
    views: 142,
    status: "approved",
    featured: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=800",
      "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=800"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=examplerur2",
    floorPlanUrl: "svg_floorplan_14"
  },
  {
    id: "rur_3",
    category: "rural",
    propertyType: "Vineyard",
    title: "Premium Boutique Vineyard & Estate",
    address: "Vineyard Property, Barossa Valley SA 5352",
    suburb: "Barossa Valley",
    city: "Barossa Valley",
    postcode: "5352",
    state: "SA",
    price: 320000, // Per annum
    landSize: 200, // ha
    description: "Acclaimed grape-growing property in the legendary Barossa Valley. Fully established irrigation grids, cellar-door license, processing machinery sheds, and panoramic tasting deck.",
    features: ["Vineyard", "Water access", "Cellar door", "Bore license"],
    agentId: "user_agent_1",
    agentName: "Alex Mercer",
    agentPhone: "+61 3 9555 0192",
    views: 450,
    status: "approved",
    featured: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1504279807002-52d3e0686957?q=80&w=800",
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=examplerur3",
    floorPlanUrl: "svg_floorplan_15"
  }
];

const SEED_ENQUIRIES = [
  {
    id: "enq_1",
    listingId: "res_1",
    listingTitle: "Charming Victorian Terrace",
    name: "John Doe",
    email: "john@example.com",
    phone: "+61 411 222 333",
    message: "Hi, I'm interested in viewing this property next Wednesday. Is 2:00 PM available?",
    date: "2026-05-23T10:30:00.000Z",
    agentId: "user_agent_1",
    replied: false
  },
  {
    id: "enq_2",
    listingId: "com_1",
    listingTitle: "Premium Corporate Office Space",
    name: "Sarah Lin",
    email: "sarah.lin@techcorp.com",
    phone: "+61 422 999 888",
    message: "Can we arrange a walk-through? We would like to see if the workstations can fit a team of 15.",
    date: "2026-05-22T14:15:00.000Z",
    agentId: "user_agent_1",
    replied: true,
    replyMessage: "Sure, Sarah! I can show you around on Monday morning at 10 AM. Let me know if that suits you."
  }
];

export const initDB = () => {
  if (!localStorage.getItem("werent_users")) {
    localStorage.setItem("werent_users", JSON.stringify(SEED_USERS));
  }
  if (!localStorage.getItem("werent_listings")) {
    localStorage.setItem("werent_listings", JSON.stringify(SEED_LISTINGS));
  }
  if (!localStorage.getItem("werent_enquiries")) {
    localStorage.setItem("werent_enquiries", JSON.stringify(SEED_ENQUIRIES));
  }
};

// Database Access Functions
export const db = {
  // Auth
  login: (email, password) => {
    initDB();
    const users = JSON.parse(localStorage.getItem("werent_users"));
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
      const userSafe = { ...user };
      delete userSafe.password;
      localStorage.setItem("werent_logged_in", JSON.stringify(userSafe));
      return { success: true, user: userSafe };
    }
    return { success: false, error: "Invalid email or password." };
  },

  getCurrentUser: () => {
    const raw = localStorage.getItem("werent_logged_in");
    return raw ? JSON.parse(raw) : null;
  },

  logout: () => {
    localStorage.removeItem("werent_logged_in");
  },

  // Listings
  getListings: () => {
    initDB();
    return JSON.parse(localStorage.getItem("werent_listings"));
  },

  getListingById: (id) => {
    initDB();
    const listings = JSON.parse(localStorage.getItem("werent_listings"));
    return listings.find(l => l.id === id);
  },

  incrementViews: (id) => {
    initDB();
    const listings = JSON.parse(localStorage.getItem("werent_listings"));
    const updated = listings.map(l => {
      if (l.id === id) {
        return { ...l, views: (l.views || 0) + 1 };
      }
      return l;
    });
    localStorage.setItem("werent_listings", JSON.stringify(updated));
  },

  createListing: (listingData) => {
    initDB();
    const listings = JSON.parse(localStorage.getItem("werent_listings"));
    const newListing = {
      ...listingData,
      id: `${listingData.category.substring(0, 3)}_${Date.now()}`,
      views: 0,
      status: "pending", // Admins must approve new listings
      featured: false,
      isNew: true,
      images: listingData.images && listingData.images.length > 0 ? listingData.images : [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800"
      ]
    };
    listings.unshift(newListing);
    localStorage.setItem("werent_listings", JSON.stringify(listings));
    return newListing;
  },

  updateListing: (id, updatedData) => {
    initDB();
    const listings = JSON.parse(localStorage.getItem("werent_listings"));
    const updated = listings.map(l => {
      if (l.id === id) {
        return { ...l, ...updatedData };
      }
      return l;
    });
    localStorage.setItem("werent_listings", JSON.stringify(updated));
    return updated.find(l => l.id === id);
  },

  deleteListing: (id) => {
    initDB();
    const listings = JSON.parse(localStorage.getItem("werent_listings"));
    const filtered = listings.filter(l => l.id !== id);
    localStorage.setItem("werent_listings", JSON.stringify(filtered));
  },

  // Admin approvals
  approveListing: (id) => {
    initDB();
    const listings = JSON.parse(localStorage.getItem("werent_listings"));
    const updated = listings.map(l => {
      if (l.id === id) {
        return { ...l, status: "approved" };
      }
      return l;
    });
    localStorage.setItem("werent_listings", JSON.stringify(updated));
  },

  toggleFeatureListing: (id) => {
    initDB();
    const listings = JSON.parse(localStorage.getItem("werent_listings"));
    const updated = listings.map(l => {
      if (l.id === id) {
        return { ...l, featured: !l.featured };
      }
      return l;
    });
    localStorage.setItem("werent_listings", JSON.stringify(updated));
  },

  // Enquiries
  getEnquiries: (agentId) => {
    initDB();
    const enquiries = JSON.parse(localStorage.getItem("werent_enquiries"));
    if (agentId) {
      return enquiries.filter(e => e.agentId === agentId);
    }
    return enquiries;
  },

  submitEnquiry: (enquiryData) => {
    initDB();
    const enquiries = JSON.parse(localStorage.getItem("werent_enquiries"));
    const newEnquiry = {
      ...enquiryData,
      id: `enq_${Date.now()}`,
      date: new Date().toISOString(),
      replied: false
    };
    enquiries.unshift(newEnquiry);
    localStorage.setItem("werent_enquiries", JSON.stringify(enquiries));
    return newEnquiry;
  },

  replyToEnquiry: (id, replyMessage) => {
    initDB();
    const enquiries = JSON.parse(localStorage.getItem("werent_enquiries"));
    const updated = enquiries.map(e => {
      if (e.id === id) {
        return { ...e, replied: true, replyMessage };
      }
      return e;
    });
    localStorage.setItem("werent_enquiries", JSON.stringify(updated));
  },

  // Analytics helper
  getAnalytics: () => {
    initDB();
    const listings = JSON.parse(localStorage.getItem("werent_listings"));
    const enquiries = JSON.parse(localStorage.getItem("werent_enquiries"));
    
    const totalListings = listings.length;
    const pendingListings = listings.filter(l => l.status === "pending").length;
    const approvedListings = listings.filter(l => l.status === "approved").length;
    const totalViews = listings.reduce((sum, l) => sum + (l.views || 0), 0);
    const totalEnquiries = enquiries.length;

    // Categories breakdown
    const categoryStats = {
      residential: listings.filter(l => l.category === "residential").length,
      commercial: listings.filter(l => l.category === "commercial").length,
      industrial: listings.filter(l => l.category === "industrial").length,
      retail: listings.filter(l => l.category === "retail").length,
      rural: listings.filter(l => l.category === "rural").length
    };

    // States breakdown
    const stateStats = {};
    listings.forEach(l => {
      const state = l.state || "Unknown";
      stateStats[state] = (stateStats[state] || 0) + 1;
    });

    return {
      totalListings,
      pendingListings,
      approvedListings,
      totalViews,
      totalEnquiries,
      categoryStats,
      stateStats
    };
  }
};
