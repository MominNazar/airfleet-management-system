const AirportService = require('../../models/Passenger/airportService');
const AirportLounge = require('../../models/Passenger/airportLounge');
const AirportShop = require('../../models/Passenger/airportShop');
const AirportAmenity = require('../../models/Passenger/airportAmenity');

// Add a new service
exports.addService = async (req, res) => {
  try {
    const newService = new AirportService(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add a new lounge
exports.addLounge = async (req, res) => {
  try {
    const newLounge = new AirportLounge(req.body);
    await newLounge.save();
    res.status(201).json(newLounge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add a new shop
exports.addShop = async (req, res) => {
  try {
    const newShop = new AirportShop(req.body);
    await newShop.save();
    res.status(201).json(newShop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add a new amenity
exports.addAmenity = async (req, res) => {
  try {
    const newAmenity = new AirportAmenity(req.body);
    await newAmenity.save();
    res.status(201).json(newAmenity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await AirportService.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all lounges
exports.getLounges = async (req, res) => {
  try {
    const lounges = await AirportLounge.find();
    res.status(200).json(lounges);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all shops
exports.getShops = async (req, res) => {
  try {
    const shops = await AirportShop.find();
    res.status(200).json(shops);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all amenities
exports.getAmenities = async (req, res) => {
  try {
    const amenities = await AirportAmenity.find();
    res.status(200).json(amenities);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
