
    document.addEventListener('DOMContentLoaded', function() {
        const signInBtn = document.getElementById('signInBtn');

        signInBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default action of the button click (form submission or navigation)

            const username = document.getElementById('usernameInput').value;
            const password = document.getElementById('passwordInput').value;

            fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                 username: username,
                 password: password
                   
                })
            })
            .then(response => {
                if (!response.ok) {
                    alert('Sign in failed');
                    return;
                }
                return response.json(); // Parse response body as JSON
            })
            .then(data => {
                
                localStorage.setItem('token', data.token);
            
               
                window.location.href = 'dashboard.html';
            })
            .catch(error => {
                console.error('Error signing in:', error);
                
            });
        });
    });

