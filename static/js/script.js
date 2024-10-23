// script.js

document.getElementById('predict-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    // Collect form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        // Convert numeric fields to appropriate types
        if (['age', 'trestbps', 'chol', 'thalach', 'oldpeak', 'ca'].includes(key)) {
            data[key] = parseFloat(value);
        } else {
            data[key] = value;
        }
    });

    try {
        // Send data to the Flask backend
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Parse the JSON response
        const result = await response.json();

        // Display the result
        const resultDiv = document.getElementById('result');
        if (result.prediction === 1) {
            resultDiv.innerHTML = `<strong>Prediction:</strong> <span style="color:red;">Yes, you have heart disease.</span>`;
        } else {
            resultDiv.innerHTML = `<strong>Prediction:</strong> <span style="color:green;">No, you do not have heart disease.</span>`;
        }
        resultDiv.style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while predicting. Please try again.');
    }
});
