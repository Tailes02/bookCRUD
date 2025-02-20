const jwt = require('jsonwebtoken');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhaWh1dWxlMDJAZ21haWwuY29tIiwic3ViIjo2LCJpYXQiOjE3NDAwMjMwMDQsImV4cCI6MTc0MDAyNjYwNH0.OAHLFkTmbSHcArTJt7Z11MT7ZUSQGHO9iV60EbF7T4E'; // Replace with your actual token
const secret = 'secret_key'; // Replace with your secret

try {
  const decoded = jwt.verify(token, secret);
  console.log('Decoded Token:', decoded);
} catch (err) {
  console.error('Invalid Token:', err.message);
}
