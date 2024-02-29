const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

exports.handler = async (event, context) => {
    const record = event.Records[0];
    const srcBucket = record.s3.bucket.name;
    const srcKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));
    
    const dstBucket = 'image-outputbucket';
    const dstKey = 'resized-' + srcKey;

    try {
        const params = {
            Bucket: srcBucket,
            Key: srcKey
        };
        
        const inputData = await s3.getObject(params).promise();
        
        // Resize the image using sharp
        const resizedImageBuffer = await sharp(inputData.Body)
            .resize({ width: 200 }) // Adjust the width as needed
            .toBuffer();
        
        const uploadParams = {
            Bucket: dstBucket,
            Key: dstKey,
            Body: resizedImageBuffer,
            ContentType: inputData.ContentType // Assuming same content type
        };
        
        await s3.putObject(uploadParams).promise();

        console.log('Image resized and uploaded successfully:', dstKey);
        return 'Image processed successfully';
    } catch (error) {
        console.error('Error processing image:', error);
        throw error;
    }
};
