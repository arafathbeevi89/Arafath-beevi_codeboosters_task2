const { handler } = require('./index'); // Assuming your Lambda function file is named 'index.js'
const path = require('path');

// Define the path to your local image file
const localFile = '*********'; // Replace with the actual path to your local image file

// Create the event object with the appropriate key for the image in the source bucket
const event = {
    Records: [
        {
            s3: {
                bucket: {
                    name: 'image-inputbucket' // Replace with your source bucket name
                },
                object: {
                    key: '*******'// Replace with the key of the image in your source bucket
                }
            }
        }
    ]
};

const context = {};

handler(event, context)
    .then(result => console.log(result))
    .catch(error => console.error(error));
