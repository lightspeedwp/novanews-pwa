/**
 * Example Netlify Function for NovaNews
 * This demonstrates the basic structure for serverless functions
 * 
 * This function can be accessed at: /.netlify/functions/example-api
 */

exports.handler = async (event, context) => {
  // Handle CORS for browser requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Example: Get request parameters
    const { name } = event.queryStringParameters || {};
    
    // Example: Get request body for POST requests
    const body = event.body ? JSON.parse(event.body) : {};

    // Your business logic here
    const response = {
      message: 'NovaNews API endpoint working',
      method: event.httpMethod,
      name: name || 'Anonymous',
      timestamp: new Date().toISOString()
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('Function error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};