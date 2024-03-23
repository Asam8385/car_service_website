const Booking = require('../Models/Booking');
const QRCode = require('qrcode');

exports.createBooking = async (req, res) => {
    try {
        const {
            name,
            email,
            service,
            mode,
            service_date,
            time_slot,
            vehicle_type,
            vehicle_model,
            special_request,
            userId,
            centerId
        } = req.body;

        // Create a new booking record in the database
        const booking = await Booking.create({
            name,
            email,
            service,
            mode,
            service_date,
            time_slot,
            vehicle_type,
            vehicle_model,
            special_request,
            userId,
            centerId
        });

        // Encode booking details into a JSON object
        const bookingDetails = {
            id: booking.id,
            name,
            email,
            service,
            mode,
            service_date,
            time_slot,
            vehicle_type,
            vehicle_model,
            special_request,
            userId,
            centerId
        };


        const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(bookingDetails));
        const qrCodeBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');

        res.set({
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="booking_qr_code.png"'
        });


        res.send(qrCodeDataURL.split(',')[1]);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Error creating booking' });
    }
}


exports.getBooking = (req, res) => {
    const {centerId}  = req.body;
  console.log(centerId)

  Booking.findAll({
      where: {
          centerId: centerId
      }
  })
  .then(bookings => {
    
      res.json(bookings);
  })
  .catch(error => {
      console.error('Error fetching offers:', error);
      res.status(500).json({ error: 'Error fetching offers' });
  });

}  

exports.getBookingUser = (req, res) => {
    id = req.params.id
  console.log(id)

  Booking.findAll({
      where: {
        userId : id
      }
  })
  .then(bookings => {
    
      res.json(bookings);
  })
  .catch(error => {
      console.error('Error fetching offers:', error);
      res.status(500).json({ error: 'Error fetching offers' });
  });

} 






exports.finishbooking = (req, res) => {
    const id = req.params.id;

    Booking.destroy({
            where: {
                id: id
            }
        })
        .then(affectedRows => {
            if (affectedRows > 0) {
         
                res.status(200).json({ message: 'Booking deleted successfully' });
            } else {
     
                res.status(404).json({ message: 'Booking not found' });
            }
        })
        .catch(error => {

            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        });
};


