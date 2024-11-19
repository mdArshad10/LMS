import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs';
import {
	CLOUDINARY_API_KEY,
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_SECRET_KEY,
} from '../constants.js';

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});

export const fileUploadInCloudinary = async (fileUrl, fileType = 'image') => {
	if (!fileUrl) return null;
	try {
		const response = await cloudinary.uploader.upload(fileUrl, {
			folder: 'LMS',
			resource_type: fileType,
		});
		console.log('file upload successfully');
		fs.unlinkSync(fileUrl);
		return { public_id: response.public_id, url: response.url };
	} catch (error) {
		console.error('Error uploading file: ', error.message);
		fs.unlinkSync(fileUrl);
		return null;
	}
};

export const deleteMediaFromCloudinary = async (
	publicId,
	fileType = 'image',
) => {
	if (!publicId) return null;
	try {
		await cloudinary.uploader.destroy(publicId, {
			resource_type: fileType,
		});
		console.log('file deleted successfully from cloudinary');
		return true;
	} catch (error) {
		console.error('Error deleting file: ', error.message);
		return null;
	}
};
