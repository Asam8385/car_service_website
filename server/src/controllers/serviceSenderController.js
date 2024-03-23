const { json } = require('sequelize');
const ServiceSender = require('../Models/serviceSender');
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

exports.updateServiceSender = (req, res) => {
    const id = req.params.id;
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    handleUpload(dataURI)
        .then(cldRes => {

            return ServiceSender.update({
                profilePicture: cldRes.secure_url,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address
            },
            {
                where :
                {
                    id : id
                }
            }
            
            
            );
        })
        .then(newServiceSender => {
            
            res.status(201).json({ message: 'Service sender created successfully', serviceSender: newServiceSender });
        })
        .catch(error => {
            // Handle any errors that occur during the process
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        });
};



exports.grantServiceSender = (req, res) => {
    const id = req.params.id;


ServiceSender.update({
                approved : true
            },
            {
                where :
                {
                    id : id
                }
            }
            
            
            ).then(newServiceSender => {
            
            res.status(201).json({ message: 'Service sender added successfully', serviceSender: newServiceSender });
        })
        .catch(error => {
            // Handle any errors that occur during the process
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        });
};
    
   
exports.getServiceSender = (req, res) => {
    ServiceSender.findAll(
       
    )
        .then(serviceSenders => {
            const serviceSenderDataValues = serviceSenders.map(sender => sender.dataValues);
            console.log(serviceSenderDataValues)
            res.json(serviceSenders);
        })
        .catch(err => {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
        });

}  


exports.getServiceSenderuser = (req, res) => {
    ServiceSender.findAll({
        where: {
            approved: true
        }
    })
        .then(serviceSenders => {
            const serviceSenderDataValues = serviceSenders.map(sender => sender.dataValues);
            console.log(serviceSenderDataValues)
            res.json(serviceSenders);
        })
        .catch(err => {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
        });

}




exports.createServiceSender = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await ServiceSender.findOne({ where: { email } });
        if (existingUser) {
            console.log(existingUser)
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password);

        const newUser = await ServiceSender.create({ name, email, password: hashedPassword, role });
        console.log(newUser);

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
   
};

exports.deleteServiceSender = async (req, res) => {
    try {
        const serviceSenderId = req.params.id;
        const deletedServiceSender = await ServiceSender.destroy({ where: { id: serviceSenderId } });
        if (deletedServiceSender === 1) {
            res.status(200).json({ message: 'Service sender deleted successfully' });
        } else {
            res.status(404).json({ message: 'Service sender not found' });
        }
    } catch (error) {
        console.error('Error deleting service sender:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};