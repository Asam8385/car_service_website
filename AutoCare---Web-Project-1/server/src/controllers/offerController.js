const { json } = require('sequelize');
const AddOffer = require('../Models/offers');
const cloudinary = require("cloudinary").v2;
const bcrypt = require('../utils/bcrypt')

cloudinary.config({
    cloud_name: "dj94rzr1s",
    api_key: 178597126581692,
    api_secret: "zmBG4k3BJ8_Vcd8guUzwJORaLK0",
});

async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
}

exports.AddOffer = (req, res) => {
    const id = req.params.id;
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    handleUpload(dataURI)
        .then(cldRes => {
            const { title, discount_percentage, date_time, promo_code, description, centerId } = req.body;
            return AddOffer.create({
                title,
                discount_percentage,
                offer_image : cldRes.secure_url ,
                date_time,
                promo_code,
                description,
                centerId
              });
        })
        .then(newoffer => {
            
            res.status(201).json({ message: 'Service sender created successfully', data: newoffer });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        });
};


exports.getOffer = (req, res) => {
    const { centerId } = req.body;
  console.log(centerId)

  AddOffer.findAll({
      where: {
          centerId: centerId
      }
  })
  .then(offers => {
    
      res.json(offers);
  })
  .catch(error => {
      console.error('Error fetching offers:', error);
      res.status(500).json({ error: 'Error fetching offers' });
  });


};



exports.finishoffer = (req, res) => {
    const id = req.params.id;

    AddOffer.destroy({
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