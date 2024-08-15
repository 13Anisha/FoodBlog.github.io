const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const Phone = document.getElementById('Phone');
const message = document.getElementById('Message');

var phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const container = document.getElementsByClassName('container')[0];

function displayText() {
    const text = document.createElement('p');
    text.textContent = "Thank You! for connecting with Us";
    text.style.fontSize = '25px';
    text.style.fontWeight = '900';
    text.style.display = 'flex';
    text.style.justifyContent = 'center';
    text.style.color='black';
    text.style.paddingLeft='10px';

    const image = document.createElement('img');
    image.src = "images/confirmation.jpg";
    image.style.width = '150px';
    image.style.height = '150px';
    image.style.display = 'flex';
    image.style.justifyContent = 'center';
    image.style.borderRadius = '50%';

    const text2 = document.createElement('p');
    text2.textContent = "You Message was sent successfully";
    text2.style.fontSize = '21px';
    text2.style.fontWeight = '700';
    text2.style.display = 'flex';
    text2.style.justifyContent = 'center';
    text2.style.color='black';
    text2.style.paddingLeft='18px';

    container.style.marginTop='70px';
    container.appendChild(text);
    container.appendChild(image);
    container.appendChild(text2);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    validateInputs();
});

window.addEventListener('resize', function () {
    if (window.innerWidth < 700) {
        const image = container.querySelector('img');
        if (image) {
            image.style.width = '100px';
            image.style.height = '100px';
        }

        const textElements = container.querySelectorAll('p');
        textElements.forEach(function (element) {
            element.style.fontSize = '16px';
        });

        container.marginTop='80px';
    } 
    else {
        const image = container.querySelector('img');
        if (image) {
            image.style.width = '200px';
            image.style.height = '200px';
        }

        const textElements = container.querySelectorAll('p');
        textElements.forEach(function (element) {
            element.style.fontSize = '30px';
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
    const subjectValue = subject.value.trim();
    const PhoneValue = Phone.value.trim();
    const messageValue = message.value.trim();

    if (usernameValue == '') {
        setError(username, 'Username is required');
    } else if (usernameValue.length < 8) {
        setError(username, 'Name should be at least 8 characters long');
    } else {
        setSuccess(username);
    }

    if (emailValue == '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if (subjectValue == '') {
        setError(subject, 'Subject is required');
    } else {
        setSuccess(subject);
    }

    if (PhoneValue.length < 10 && !phoneNumberRegex.test(PhoneValue)) {
        setError(Phone, 'Please enter a valid mobile number');
    } else if (PhoneValue.length > 10) {
        setError(Phone, 'Please enter a valid mobile number');
    } else {
        setSuccess(Phone);
    }

    if (messageValue == '') {
        setError(message, 'Message is required');
    } else {
        setSuccess(message);
    }

    const errorInputs = document.querySelectorAll('.input-control.error');
    if (errorInputs.length === 0) {
        setTimeout(function () {
            form.style.display = 'none';
            displayText();
            saveToExcel([usernameValue, emailValue, subjectValue, PhoneValue, messageValue]);
        }, 500);
    }
}



function saveToExcel(dataArray) {
   
    let existingData = localStorage.getItem('userData');

    
    if (!existingData) {
        existingData = [];
    } else {
        try {
            
            existingData = JSON.parse(existingData);
        } catch (error) {
           
            existingData = [];
        }
    }

    
    existingData.push({
        Username: dataArray[0],
        Email: dataArray[1],
        Subject: dataArray[2],
        Phone: dataArray[3],
        Message: dataArray[4]
    });

    localStorage.setItem('userData', JSON.stringify(existingData));

    
    let csvContent = "Username,Email,Subject,Phone,Message\n";

    
    existingData.forEach(entry => {
        csvContent += `${entry.Username},${entry.Email},${entry.Subject},${entry.Phone},${entry.Message}\n`;
    });

    
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_data.csv");
    document.body.appendChild(link);
    link.click();
}

