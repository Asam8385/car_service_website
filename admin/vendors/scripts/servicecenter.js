const form = document.getElementById('serviceSenderForm');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    
    const token = localStorage.getItem('token');
    
    for (const entry of formData.entries()) {
        console.log(entry[0], entry[1]);
    } 

    try {
        const response = await fetch('http://localhost:5000/ServiceSender', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`  
            },
            body: formData
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            alert("error");
            throw new Error(`HTTP error! Status: ${errorMessage}`);
            
        }

        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error(error);
    }
});

