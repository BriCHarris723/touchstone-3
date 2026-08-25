const priceMenu = {
    "pre-order": { price: 15.00, label: "Pre-Order Items (Base Total)" },
    "general": { price: 0.00, label: "General Question" },
    "catering": { price: 150.00, label: "Catering Event Inquiry (Deposit)" }
};

const allergyAlerts = {
    "pre-order": "Notice: Sourdough rounds utilize wild yeast cultures; croissants contain dairy.",
    "general": "Notice: Feel free to ask about our clean ingredient sourcing matrix.",
    "catering": "Notice: Custom recipes can be fully modified to fit gluten sensitivities."
};

function initBakeryFeature() {
    const requestSelect = document.getElementById('requesttype');
    const orderForm = document.querySelector('form');
    if (!requestSelect || !orderForm) return;

    const feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'price-feedback';
    feedbackDiv.style.marginTop = '10px';
    feedbackDiv.style.fontWeight = 'bold';
    feedbackDiv.style.color = '#8b5a2b';
    requestSelect.parentNode.appendChild(feedbackDiv);

    const alertDiv = document.createElement('div');
    alertDiv.id = 'allergy-feedback';
    alertDiv.style.marginTop = '5px';
    alertDiv.style.fontSize = '0.9rem';
    alertDiv.style.color = '#7d5c00';
    alertDiv.style.fontStyle = 'italic';
    requestSelect.parentNode.appendChild(alertDiv);

    createErrorContainers();

    const savedType = localStorage.getItem('savedBakeryRequest');
    if (savedType) {
        requestSelect.value = savedType;
        updateDynamicPrice(savedType);
    }

    requestSelect.addEventListener('change', function() {
        const selectedValue = requestSelect.value;
        localStorage.setItem('savedBakeryRequest', selectedValue);
        updateDynamicPrice(selectedValue);
    });

    orderForm.addEventListener('submit', function(event) {
        const isFormValid = validateBakeryForm();
        if (!isFormValid) {
            event.preventDefault();
        }
    });
}

function updateDynamicPrice(value) {
    const feedbackBox = document.getElementById('price-feedback');
    const alertBox = document.getElementById('allergy-feedback');
    if (!feedbackBox || !alertBox) return;

    if (priceMenu[value] && allergyAlerts[value]) {
        feedbackBox.textContent = `Estimated ${priceMenu[value].label}: $${priceMenu[value].price.toFixed(2)}`;
        alertBox.textContent = allergyAlerts[value];
    } else {
        feedbackBox.textContent = "";
        alertBox.textContent = "";
    }
}

function createErrorContainers() {
    const fields = ['username', 'useremail'];
    fields.forEach(fieldId => {
        const inputField = document.getElementById(fieldId);
        if (inputField) {
            const errorSpan = document.createElement('span');
            errorSpan.id = `${fieldId}-error`;
            errorSpan.style.display = 'block';
            errorSpan.style.color = '#cc0000';
            errorSpan.style.fontSize = '0.9rem';
            errorSpan.style.marginTop = '5px';
            inputField.parentNode.appendChild(errorSpan);
        }
    });
}

function validateBakeryForm() {
    let isValid = true;
    const nameInput = document.getElementById('username');
    const emailInput = document.getElementById('useremail');
    const nameError = document.getElementById('username-error');
    const emailError = document.getElementById('useremail-error');

    if (nameInput.value.trim().length < 3) {
        nameError.textContent = "Error: Name must be at least 3 characters long.";
        nameInput.style.borderColor = "#cc0000";
        isValid = false;
    } else {
        nameError.textContent = "";
        nameInput.style.borderColor = "#4a3728";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = "Error: Please enter a valid email address layout (e.g. name@domain.com).";
        emailInput.style.borderColor = "#cc0000";
        isValid = false;
    } else {
        emailError.textContent = "";
        emailInput.style.borderColor = "#4a3728";
    }

    return isValid;
}

document.addEventListener('DOMContentLoaded', initBakeryFeature);