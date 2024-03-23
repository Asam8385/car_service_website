const Form = require('../Models/Form');


exports.createform = async (req, res) => {
    try {
        
        const { first_name, last_name, email, contact_number, subject, message } = req.body;

        
        const newSubmission = await Form.create({
            first_name,
            last_name,
            email,
            contact_number,
            subject,
            message
        });

       
        res.status(201).json({ message: 'Form submitted successfully', data: newSubmission });
    } catch (error) {
        console.error(error);
        
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getform = async (req, res) => {
    try {
    
        const submissions = await Form.findAll();

      
        res.status(200).json({ data: submissions });
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.finishform = async (req, res) => {
    try {

        const { id } = req.params;

 
        const submission = await Form.findByPk(id);

        if (!submission) {
            return res.status(404).json({ message: 'Form submission not found' });
        }

 
        await submission.destroy();

    
        res.status(200).json({ message: 'Form submission deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



  
exports.getform = (req, res) => {
    Form.findAll(
       
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



exports.finishform = async (req, res) => {
    try {
        const serviceSenderId = req.params.id;
        const deletedServiceSender = await Form.destroy({ where: { id: serviceSenderId } });
        if (deletedServiceSender === 1) {
            res.status(200).json({ message: ' deleted successfully' });
        } else {
            res.status(404).json({ message: ' not found' });
        }
    } catch (error) {
        console.error('Error deleting :', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};