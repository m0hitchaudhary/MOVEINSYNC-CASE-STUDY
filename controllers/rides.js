const Ride = require('../models/Ride');

exports.getRides = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    const query = { status: 'active' };
    
    if (from && to) {
      query.pickupLocation = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: from.split(',').map(Number).reverse() // [long, lat]
          },
          $maxDistance: 5000
        }
      };
      query.dropoffLocation = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: to.split(',').map(Number).reverse() // [long, lat]
          },
          $maxDistance: 5000
        }
      };
    }

    if (date) {
      query.departureTime = {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
      };
    }

    const rides = await Ride.find(query)
      .populate('driver', 'firstName lastName rating carModel carNumber')
      .sort({ departureTime: 1 });

    res.status(200).json({ success: true, data: rides });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createRide = async (req, res) => {
  try {
    const { 
      carModel,
      carNumber,
      pickupLocation,
      dropoffLocation,
      time,
      seatsAvailable,
      smokingAllowed,
      petsAllowed,
      alcoholAllowed,
      genderPreference,
      price
    } = req.body;

    const rideData = {
      driver: req.user.id,
      carModel,
      carNumber,
      pickupLocation: pickupLocation,
      dropoffLocation: dropoffLocation,
      departureTime: new Date(time),
      availableSeats: seatsAvailable,
      price: price,
      preferences: {
        smoking: smokingAllowed,
        pets: petsAllowed,
        alcohol: alcoholAllowed,
        gender: genderPreference
      }
    };

    const ride = await Ride.create(rideData);
    res.status(201).json({ success: true, data: ride });
  } catch (err) {
    res.status(400).json({ 
      success: false, 
      message: err.message || 'Error creating ride'
    });
  }
};

exports.requestRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    
    if (!ride) {
      return res.status(404).json({ 
        success: false,
        message: 'Ride not found'
      });
    }

    if (ride.availableSeats <= 0) {
      return res.status(400).json({
        success: false,
        message: 'No available seats'
      });
    }

    ride.passengers.push({ user: req.user.id, status: 'pending' });
    await ride.save();
    
    res.status(200).json({ success: true, data: ride });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}; 