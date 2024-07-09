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

    const businessCategories = [
      "Restaurant", "Retail", "Technology", "Consulting", "Healthcare",
      "Education", "Finance", "Real Estate", "Hospitality", "Entertainment",
      "Automotive", "Legal", "Marketing", "Construction", "Fitness",
      "Beauty & Wellness", "Travel", "Food & Beverage", "Manufacturing", "Fashion",
      "Art & Design", "Media & Communication", "Nonprofit", "E-commerce", "Transportation",
      "Insurance", "Technology Services", "Consulting Services", "Event Planning", "Software Development",
      "Architecture", "Interior Design", "Graphic Design", "Photography", "Music",
      "Film & Video", "Publishing", "Sports", "Telecommunications", "Energy",
      "Agriculture", "Environmental Services"
    ];

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
          {businessCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
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
