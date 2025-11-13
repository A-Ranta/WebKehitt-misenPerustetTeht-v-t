// index.js
// Author: Antti Ranta
// Date: 6.11.2025


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const table = document.getElementById("userInformation")//.<querySelector("tbody");

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
        if (!/^\+358\d{7,12}$/.test(phone)) {
            errorMessage.phone.textContent = 'Phone number must start with +358 and contain 7-12 digits.';
            valid = false;
        }

        //syntymäaika validointi ja virheilmoitus
        const BD = new Date(fields.BD.value);
        const today = new Date();
        if (isNaN(BD)) {
            errorMessage.BD.textContent = 'Please input your birth date.';
            valid = false;
        } else {
            const age = today.getFullYear() - BD.getFullYear() -
                (today < new Date(today.getFullYear(), BD.getMonth(), BD.getDate()) ? 1 : 0);
            if (BD > today) {
                errorMessage.BD.textContent = "You can't be born in the future.";
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
    form.addEventListener('submit', function (e) {
        console.log("testaus")
        e.preventDefault();
        if (!validate()) return;

        //täytä aikaleima automaattisesti
        const timestamp = new Date().toLocaleString();
        document.getElementById('timestamp').value = timestamp;

        // Create new table row
        const row = document.createElement('tr');

        //table data vienti tableen
        const timestampCell = document.createElement("td");
        timestampCell.textContent = timestamp;
        row.appendChild(timestampCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = fields.name.value.trim();
        row.appendChild(nameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = fields.email.value.trim();
        row.appendChild(emailCell);

        const phoneCell = document.createElement("td");
        phoneCell.textContent = fields.phone.value.trim();
        row.appendChild(phoneCell);

        const BDCell = document.createElement("td");
        BDCell.textContent = fields.BD.value;
        row.appendChild(BDCell);

        const termsCell = document.createElement("td");
        termsCell.textContent = fields.terms.checked ? "Yes" : "No";
        row.appendChild(termsCell);

        table.appendChild(row);

        // Reset form and focus
        form.reset();
    });
});