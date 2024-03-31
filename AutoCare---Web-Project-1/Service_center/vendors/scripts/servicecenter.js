const form = document.getElementById('profileForm');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('centerId');
    
    for (const entry of formData.entries()) {
        console.log(entry[0], entry[1]);
    } 

    try {
        const response = await fetch(`http://localhost:5000/ServiceSender/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`  
            },
            body: formData
        });

        if(response.ok)
        {
            Swal.fire({
                title: "Done!",
                text: "Profile is uploaded",
                icon: "success"
            })
        }

        if (!response.ok) {
            const errorMessage = await response.text();
            Swal.fire({
                title: "Oops...",
                text: "Something went wrong.",
                icon: "error"
            });
            throw new Error(`HTTP error! Status: ${errorMessage}`);
            
        }

        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error(error);
    }
});

