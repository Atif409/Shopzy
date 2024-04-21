// phoneVerificationRoutes.js
const express = require('express');
const router = express.Router();

// Twilio credentials
const accountSid = 'AC7e969e08dda90fdc57b86d4c854b027d';
const authToken = '963eaf488bea99292d47178c4f3d0888';
const verifySid = 'VA18efbe4633fbe1bc932e41197542076b';
const client = require('twilio')(accountSid, authToken);

// Function to validate and format phone number to E.164 format
const formatPhoneNumber = (phoneNumber) => {
  // Assuming the default country code is +92 for Pakistan
  if (phoneNumber.startsWith('0')) {
    return `+92${phoneNumber.substring(1)}`;
  }
  return phoneNumber;
};

// API endpoint for registering with a phone number
router.post('/registerWithPhoneNumber', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Check if the phone number is valid 
    if (!phoneNumber) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }

    // Format the phone number to E.164 format
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    // Send a verification code to the formatted phone number
    const verification = await client.verify.v2.services(verifySid)
      .verifications.create({ to: formattedPhoneNumber, channel: 'sms' });

    // Log the verification status
    console.log(verification.status);

    res.status(200).json({ message: 'Verification code sent successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

module.exports = router;
