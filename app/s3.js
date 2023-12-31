const {PutObjectCommand, S3Client, ListObjectsV2Command, GetObjectCommand} = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { v4 : uuid} = require('uuid')

const s3 = new S3Client()
const BUCKET = process.env.BUCKET


const uploadToS3 = async ({file, userId = 123}) => {
    const key = `${userId}/${uuid()}`
    const command = new PutObjectCommand({Bucket: BUCKET, Key: key, Body: file.buffer, ContentType: file.mimetype})
    
    try {
        await s3.send(command)
        return { key }
    } catch (error) {
        return { error }
    }
}

const getImageKeysByUser = async (userId) => {
    const command = new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: userId
    })

    const {Contents= []} = await s3.send(command)

    return Contents.map(image => image.Key)
}

const getUserPresignedUrls = async (userId) => {
    try {
        const imageKeys = await getImageKeysByUser(userId)

        const presignedUrls = await Promise.all(imageKeys.map(key => {
            const command = new GetObjectCommand({Bucket: BUCKET, Key: key})
            return getSignedUrl(s3, command, {expiresIn: 900})
        }))

        return {presignedUrls}
    } catch (error) {
        console.log(error);
        return {error}
    }
}

module.exports.uploadToS3 = uploadToS3
module.exports.getUserPresignedUrls = getUserPresignedUrls