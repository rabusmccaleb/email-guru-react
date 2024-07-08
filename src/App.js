import React from 'react';
import './App.css';
import { _key } from './v';

function App() {
  const copyToClipboard = () => {
    const responseText = document.getElementById("response").innerText;
    navigator.clipboard.writeText(responseText)
      .then(() => {
        const popup = document.getElementById("popup");
        popup.style.display = "block";
        setTimeout(() => {
          popup.style.opacity = "0";
          setTimeout(() => {
            popup.style.display = "none";
            popup.style.opacity = "1";
          }, 500);
        }, 2000);
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  const submitForm = () => {
    const businessCategory = document.getElementById("business_category").value;
    const uniqueFeatures = document.getElementById("unique_features").value;
    const competitionDifference = document.getElementById("competition_difference").value;
    const businessName = document.getElementById("business_name").value;
    const responseElement = document.getElementById("response");
    const loaderElement = document.querySelector(".loader");
    const copyButtonElement = document.querySelector(".copy-button");

    responseElement.textContent = "";
    loaderElement.style.visibility = "visible";
    copyButtonElement.style.visibility = "hidden";

    fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': _key
      },
      body: JSON.stringify({
        messages: [
          { 
            role: "user",
            content: `Create a marketing email to send out to customers.

It should be no longer than 5 sentences and really do a good job converting the customer.

Use the info below to generate a message

Business Category: ${businessCategory}

Business Name: ${businessName}

What makes your business different and special?: ${uniqueFeatures}

What separates your business from the competition?: ${competitionDifference}

---

`
          }
        ],
        model: "mixtral-8x7b-32768"
      })
    })
    .then(response => response.json())
    .then(data => {
      const emailResponse = data.choices[0].message.content;
      loaderElement.style.visibility = "hidden";
      responseElement.textContent = emailResponse;
      copyButtonElement.style.visibility = "visible";
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="content-container">
      <div className="container">
        <h2>Email Marketing Guru</h2>
        <label htmlFor="business_category">Select Business Category:</label>
        <select id="business_category" name="business_category">
          <option value="">Select One</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Retail">Retail</option>
          <option value="Technology">Technology</option>
          <option value="Consulting">Consulting</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Finance">Finance</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Hospitality">Hospitality</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Automotive">Automotive</option>
          <option value="Legal">Legal</option>
          <option value="Marketing">Marketing</option>
          <option value="Construction">Construction</option>
          <option value="Fitness">Fitness</option>
          <option value="Beauty & Wellness">Beauty & Wellness</option>
          <option value="Travel">Travel</option>
          <option value="Food & Beverage">Food & Beverage</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Fashion">Fashion</option>
          <option value="Art & Design">Art & Design</option>
          <option value="Media & Communication">Media & Communication</option>
          <option value="Nonprofit">Nonprofit</option>
          <option value="E-commerce">E-commerce</option>
          <option value="Transportation">Transportation</option>
          <option value="Insurance">Insurance</option>
          <option value="Technology Services">Technology Services</option>
          <option value="Consulting Services">Consulting Services</option>
          <option value="Event Planning">Event Planning</option>
          <option value="Software Development">Software Development</option>
          <option value="Architecture">Architecture</option>
          <option value="Interior Design">Interior Design</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Photography">Photography</option>
          <option value="Music">Music</option>
          <option value="Film & Video">Film & Video</option>
          <option value="Publishing">Publishing</option>
          <option value="Sports">Sports</option>
          <option value="Telecommunications">Telecommunications</option>
          <option value="Energy">Energy</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Environmental Services">Environmental Services</option>
        </select>
        <label htmlFor="business_name">Business Name</label>
        <input id="business_name" name="business_name" placeholder="Business Name" type="text"/>
        <label htmlFor="unique_features">What makes your business different and special?</label>
        <textarea id="unique_features" name="unique_features" rows="4" placeholder="Write something lengthy"></textarea>
        <label htmlFor="competition_difference">What separates your business from the competition?</label>
        <textarea id="competition_difference" name="competition_difference" rows="4" placeholder="Write something lengthy"></textarea>
        <button onClick={submitForm}>Request Email Response</button>
      </div>
      <div className="prompt-container"> 
        <div className="loader"/>
        <button className="copy-button" onClick={copyToClipboard}>Copy Response</button>
        <p id="response">No Marketing Request Yet</p>
        <div className="popup" id="popup">Copied to clipboard</div>
      </div>
    </div>
  );
}

export default App;