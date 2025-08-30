    // utils/firebaseStorage.js
    import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { app } from '../firebase';

    const storage = getStorage(app);

    export const uploadImageToFirebase = async (file) => {
    try {
        // Generate a unique filename
        const fileName = `products/${Date.now()}-${file.name}`;
        const storageRef = ref(storage, fileName);
        
        // Upload the file
        const snapshot = await uploadBytes(storageRef, file);
        
        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image to Firebase:', error);
        throw error;
    }
    };

    export const uploadMultipleImages = async (files) => {
    try {
        const uploadPromises = files.map(file => uploadImageToFirebase(file));
        const urls = await Promise.all(uploadPromises);
        return urls;
    } catch (error) {
        console.error('Error uploading multiple images:', error);
        throw error;
    }
    };