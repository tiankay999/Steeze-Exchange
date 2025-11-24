// utils/paystack.js

export async function initializePayment(email, amount) {
  try {
    const response = await fetch('http://localhost:3001/api/payment/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, amount }),
    });

    if (!response.ok) {
      throw new Error('Payment initialization failed');
    }

    // The response from your API contains the authorization URL
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle error as appropriate in your app
    throw error;
  }
}
