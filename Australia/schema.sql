-- Werent Australia Leasing Marketplace
-- PostgreSQL + PostGIS Database Schema

-- Enable PostGIS extension for spatial queries (custom map search)
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Users Table (Agents, Admins, Tenants)
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('agent', 'admin', 'tenant')),
    agency VARCHAR(100),
    phone VARCHAR(20),
    avatar VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Property Listings Table
CREATE TABLE listings (
    id VARCHAR(50) PRIMARY KEY,
    category VARCHAR(20) NOT NULL CHECK (category IN ('residential', 'commercial', 'industrial', 'retail', 'rural')),
    property_type VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    address VARCHAR(255) NOT NULL,
    suburb VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postcode VARCHAR(10) NOT NULL,
    state VARCHAR(10) NOT NULL,
    
    -- Spatial location point (Latitude, Longitude) for map searches
    geom GEOMETRY(Point, 4326), 
    
    price NUMERIC(12, 2) NOT NULL, -- Per week (Residential) or Per annum (Commercial/Industrial/Retail/Rural)
    
    -- Residential specific fields (NULL for commercial/etc)
    bedrooms INT,
    bathrooms INT,
    car_spaces INT,
    
    -- Commercial/Industrial specific fields
    area_sqm NUMERIC(10, 2), -- Internal building area
    land_area_sqm NUMERIC(10, 2), -- Total land area (Industrial/Rural)
    clear_height VARCHAR(20), -- Clear ceiling height for Industrial
    floor_level VARCHAR(50), -- e.g. "Level 2", "Ground Floor"
    
    -- Rural specific fields
    land_size_hectares NUMERIC(10, 2), -- Rural size in hectares
    
    description TEXT NOT NULL,
    features TEXT[] DEFAULT '{}', -- Array of features/tags
    images TEXT[] DEFAULT '{}', -- Array of image URLs
    virtual_tour_url VARCHAR(255),
    floor_plan_url VARCHAR(255),
    
    agent_id VARCHAR(50) REFERENCES users(id) ON DELETE SET NULL,
    views INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    featured BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for spatial geo-filtering (Map-based search area bounds)
CREATE INDEX idx_listings_geom ON listings USING GIST(geom);
CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_listings_price ON listings(price);

-- 3. Enquiries Table
CREATE TABLE enquiries (
    id VARCHAR(50) PRIMARY KEY,
    listing_id VARCHAR(50) REFERENCES listings(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    agent_id VARCHAR(50) REFERENCES users(id) ON DELETE SET NULL,
    replied BOOLEAN DEFAULT FALSE,
    reply_message TEXT,
    replied_at TIMESTAMP WITH TIME ZONE
);

-- ==============================================================
-- SAMPLE SEED DATA INSERTS
-- ==============================================================

-- Seed Users
INSERT INTO users (id, email, password_hash, name, role, agency, phone, avatar) VALUES
('user_agent_1', 'agent@werent.com.au', '$2b$10$xyz...', 'Alex Mercer', 'agent', 'Mercer Partners', '+61 3 9555 0192', 'AM'),
('user_admin_1', 'admin@werent.com.au', '$2b$10$abc...', 'Sarah Jenkins', 'admin', NULL, '+61 2 8888 0100', 'SJ');

-- Seed Listings
INSERT INTO listings (
    id, category, property_type, title, address, suburb, city, postcode, state, geom, price, 
    bedrooms, bathrooms, car_spaces, area_sqm, land_area_sqm, clear_height, floor_level, 
    land_size_hectares, description, features, images, virtual_tour_url, floor_plan_url, 
    agent_id, views, status, featured, is_new
) VALUES
(
    'res_1', 'residential', 'House', 'Charming Victorian Terrace', 
    '23 Example Street, Suburb VIC 3000', 'Suburb', 'Melbourne', '3000', 'VIC', 
    ST_SetSRID(ST_Point(144.9631, -37.8136), 4326), 650.00, 
    3, 2, 2, NULL, NULL, NULL, NULL, NULL,
    'This beautifully renovated Victorian terrace combines classic period features with modern open-plan living...',
    ARRAY['Pets allowed', 'Furnished', 'Air conditioning', 'Heating'],
    ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800'],
    'https://my.matterport.com/show/?m=exampleres1', 'svg_floorplan_1',
    'user_agent_1', 245, 'approved', TRUE, TRUE
),
(
    'com_1', 'commercial', 'Office', 'Premium Corporate Office Space', 
    'Level 2, 123 Business Ave, Melbourne VIC 3000', 'Melbourne', 'Melbourne', '3000', 'VIC', 
    ST_SetSRID(ST_Point(144.9650, -37.8140), 4326), 36000.00, 
    NULL, NULL, NULL, 120.00, NULL, NULL, 'Level 2', NULL,
    'Fully-fitted corporate office with reception area, private boardrooms, open workstations, and kitchen...',
    ARRAY['Office', 'Parking', 'Lift', 'Air conditioning'],
    ARRAY['https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800'],
    'https://my.matterport.com/show/?m=examplecom1', 'svg_floorplan_4',
    'user_agent_1', 310, 'approved', TRUE, TRUE
);

-- Seed Enquiries
INSERT INTO enquiries (id, listing_id, name, email, phone, message, date, agent_id, replied, reply_message) VALUES
('enq_1', 'res_1', 'John Doe', 'john@example.com', '+61 411 222 333', 'Hi, I''m interested in viewing this property next Wednesday. Is 2:00 PM available?', NOW(), 'user_agent_1', FALSE, NULL);
