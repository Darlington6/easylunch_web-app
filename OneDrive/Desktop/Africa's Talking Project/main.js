const express = require("express");

const router = express.Router();

router.post("/ussd", (req, res) => {

  // Read variables sent via POST from our SDK
  
  const { sessionId, serviceCode, text } = req.body;

  console.log('####################', req.body);
  let response = "";

  // Chained IF statements will take us through the USSD logic
  if (text === "") {
    console.log(text);
    // This is the first request 
    // Start responses with CON if they have further options/they CONtinue
    response = `CON Choose an option to proceed:
        1. View National Budget
        2. View Local Budget
        3. Track Specific Expenditures
        4. Report Concerns
        5. Provide Feedback
        6. Learn About Fiscal Policies `;
  } else if (text === "1") {
    // Business logic for first level response
    // response = `CON Please enter your registration number:
    //     1. Yes
    //     2. No`;
    response = `END Rwanda's National Budget is Rwf 5,690.1 billion`;

  } else if (text === "2") {
    // Business logic for first level response, option 2
    // Start the response with END since it does not proceed further, (terminal request) it ENDs
    response = `CON Select a Province
    1. Kigali
    2. Southern Province
    3. Northern Province
    4. Eastern Province
    5. Western Province`;
  } else if (text === "2*1") {
    
    response = `END Kigali's local budget is Rwf 265.9 billion`;
  
  } else if (text === "2*2") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `END Southern Province's local budget is Rwf 125.8 billion `;
  }
  else if (text === "2*3") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `END Northern Province's local budget is Rwf 166.2 billion`;
  }
  else if (text === "2*4") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `END Eastern Province's local budget is Rwf 187.7 billion`;
  }
  else if (text === "2*5") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `END Western Province's local budget is Rwf 126.4 billion`;
  }
  else if (text === "3") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `CON Which specific expenditure would do you want to track?
    1. Education
    2. Health
    3. Infrastructure`;
  }
  else if (text === "3*1") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `END Educational expenditure is Rwf 240.9 billion`;
  }
  else if (text === "3*2") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `END Health's expenditure is Rwf 130.5 billion`;
  }
  else if (text === "3*3") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `END Infrastructure's expenditure is Rwf 306.7 billion`;
  }
  else if (text === "4") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `CON Select an option below 
    1. Mismanagement of Funds
    2. Unfair Budget Distribution`;
  }
  else if (text === "4*1") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `END Thank You! Your report has been taken into consideration`;
  }
  else if (text === "4*2") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `END Thank You! Your report has been taken into consideration`;
  }
  else if (text === "5") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `CON How satisfied are you with the Fiscal Openness of the Government?
    1. Satisfied
    2. Dissatisfied`;
  }
  else if (text === "5*1") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `END Thank you for your feedback!`;
  }
  else if (text === "5*2") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `END Thank you for your feedback!`;
  }
  else if (text === "6") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `END To learn more about our policies visit our nearest District Office`;
  }

  // Print the response onto the page so that our SDK can read it
  res.set("Content-Type: text/plain");
  res.send(response);
});

module.exports = router;