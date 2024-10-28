const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'fidzen_loyalty_cards',
    });
    return result.secure_url; // Retourner l'URL sécurisée de l'image
  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image sur Cloudinary:', error);
    throw new Error('Échec de l\'upload de l\'image');
  }
};

module.exports = { uploadImage };
