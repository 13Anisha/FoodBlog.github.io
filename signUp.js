const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const container = document.getElementsByClassName('container')[0]; 

function displayText() {
    const image = document.createElement('img'); 
    image.src = 'images/tick.jpg';
    image.style.width = '200px';
    image.style.height = '200px';
    image.style.borderRadius = '50%';

    const text = document.createElement('p');
    text.textContent = "Thanks! You're all signed up";
    text.style.fontSize='40px';
    text.style.fontWeight='900';


    const text2 = document.createElement('p');
    text2.textContent = "You will now recieve our latest updates through the registered mail";
    text2.style.fontSize='28px';
    text2.style.fontWeight='700';
    


    container.appendChild(image);
    container.appendChild(text);
    container.appendChild(text2);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    validateInputs();
});

window.addEventListener('resize', function() {
    if (window.innerWidth < 700) {
        const image = container.querySelector('img');
        if (image) {
            image.style.width = '100px';
            image.style.height = '100px';
        }

        const textElements = container.querySelectorAll('p');
        textElements.forEach(function(element) {
            element.style.fontSize = '20px';
        });
    } 
    else {
        const image = container.querySelector('img');
        if (image) {
            image.style.width = '300px';
            image.style.height = '300px';
        }

        const textElements = container.querySelectorAll('p');
        textElements.forEach(function(element) {
            element.style.fontSize = '40px';
        });
    }
});

function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
    }
    else if(usernameValue.length<8)
    {
        setError(username,'Name should be atleast 8 characters long');
    }
    else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.');
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }

    const errorInputs = document.querySelectorAll('.input-control.error');
    if (errorInputs.length === 0) {
        setTimeout(function() {
            form.style.display = 'none';
            displayText();
        }, 500);
    }
};
