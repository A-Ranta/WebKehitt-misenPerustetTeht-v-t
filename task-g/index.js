// index.js
// Author: Antti Ranta
// Date: 27.10.2025


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const table = document.getElementById("userInformation").querySelector("tbody");
    //const tbody = document.querySelector('#userInformation tbody');

    //lomakkeen tekstikentät
    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        BD: document.getElementById('BD'),
        terms: document.getElementById('terms')
    };

    //virheilmoitukset
    const errorMessage = {
        name: document.getElementById('errorName'),
        email: document.getElementById('errorEmail'),
        phone: document.getElementById('errorPhone'),
        BD: document.getElementById('errorBD'),
        terms: document.getElementById('errorTerms')
    };

    function clearerrorMessage() {
        Object.values(errorMessage).forEach(e => e.textContent = "");
    }

    function validate() {
        clearerrorMessage();
        let valid = true;


        //koko nimi validointi, ainakin 2 kirjainta ja virheilmoitus
        const parts = fields.name.value.trim().split(/\s+/);
        if (parts.length < 2 || parts.some(p => p.length < 2)) {
            errorMessage.name.textContent = 'Please enter your full name (first and last, at least 2 letters each).';
            valid = false;
        }

        //email validointi ja virheilmoitus
        const email = fields.email.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorMessage.email.textContent = 'Please provide a valid email address (name@example.com).';
            valid = false;
        }

        //puh.nro validointi ja virheilmoitus
        const phone = fields.phone.value.replace(/\s+/g, '');
        if (!/^\+358\d{7,9}$/.test(phone)) {
            errorMessage.phone.textContent = 'Phone number must start with +358 and contain 7-9 digits.';
            valid = false;
        }

        //syntymäaika validointi ja virheilmoitus
        const BD = new Date(fields.BD.value);
        const today = new Date();
        if (isNaN(BD)) {
            errorMessage.BD.textContent = 'Please select your birth date.';
            valid = false;
        } else {
            const age = today.getFullYear() - BD.getFullYear() -
                (today < new Date(today.getFullYear(), BD.getMonth(), BD.getDate()) ? 1 : 0);
            if (BD > today) {
                errorMessage.BD.textContent = 'Birth date cannot be in the future.';
                valid = false;
            } else if (age < 13) {
                errorMessage.BD.textContent = 'You must be at least 13 years old.';
                valid = false;
            }
        }
        // ehdot validointi ja virheilmoitus
        if (!fields.terms.checked) {
            errorMessage.terms.textContent = 'You must accept the terms to continue.';
            valid = false;
        }

        return valid;
    }

    // lomakkeen lähetys
    //document.getElementById("registrationForm").submit();
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validate()) return;

        //täytä aikaleima automaattisesti
        const timestamp = new Date().toLocaleString();
        document.getElementById('timestamp').value = timestamp;

        // Create new table row
        const row = document.createElement('tr');

        //table data td/infoSolu
        //const row = document.createElement("td");
        //infoCell.textContent = userInformation;
        //row.appendChild(infoCell);




        //tbody.appendChild(row);
        table.appendChild(row);

        // Reset form and focus
        form.reset();
    });
});