import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { USER_API } from '../utils/constant';
import toast from 'react-hot-toast';

import { useParams, useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import {getCroppedImg} from '../utils/cropImage'; 
import Avatar from 'react-avatar';
import { getUser } from '../redux/userSlice.js';


// Utility function to crop the image


const ProfileUpdate = () => {

  
   // Fetch the profile data when the component mounts
  
   const { user  } = useSelector((state) => state.user);
  const userId = user?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || '');
  const [bannerPhoto, setBannerPhoto] = useState(user?.bannerPhoto || '');
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [bannerPhotoFile, setBannerPhotoFile] = useState(null);
  const [cropType, setCropType] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [croppingImage, setCroppingImage] = useState(null);
  
  
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'banner') {
        setCroppingImage(reader.result); // Show the cropping interface
        setIsCropping(true);
        setCropType('banner'); // Set the crop type to banner
      } else if (type === 'profile') {
        setCroppingImage(reader.result); // Show the cropping interface
        setIsCropping(true); // Preview the image
        setCropType('profile'); // Set the crop type to profile
      }
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const cropImage = async () => {
    try {
      if (!croppingImage || !croppedAreaPixels) {
        toast.error('No image selected for cropping.');
        return;
      }
  
      const croppedImage = await getCroppedImg(croppingImage, croppedAreaPixels);
      const croppedImageURL = URL.createObjectURL(croppedImage);
  
      if(cropType === 'banner') {
      setBannerPhotoFile(croppedImage); // Set the cropped image file
      setBannerPhoto(croppedImageURL);
      toast.success('Banner cropped successfully!');
      } else if(cropType === 'profile') {
      setProfilePhotoFile(croppedImage); // Set the cropped image file
      setProfilePhoto(croppedImageURL);
      toast.success('Profile photo cropped successfully!');
      }
      setIsCropping(false); // Close the cropping interface
      setCropType(null); // Reset crop type
    } catch (error) {
      console.error('Error cropping image:', error);
      toast.error('Failed to crop image');
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'twitter-clone-preset'); // Replace with your Cloudinary upload preset

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/doasrg6su/image/upload`, // Replace 'your_cloud_name' with your Cloudinary cloud name
        formData
      );
      return res.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      toast.error('Failed to upload image');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      let uploadedProfilePhoto = profilePhoto;
      let uploadedBannerPhoto = bannerPhoto;

      // Upload profile photo to Cloudinary if a new file is selected
      if (profilePhotoFile) {
        uploadedProfilePhoto = await uploadToCloudinary(profilePhotoFile);
      }

      // Upload banner photo to Cloudinary if a new file is selected
      if (bannerPhotoFile) {
        uploadedBannerPhoto = await uploadToCloudinary(bannerPhotoFile);
      }

      // Send updated data to the backend
      const res = await axios.put(`${USER_API}/updateprofile`, {
        name,
        bio,
        profilePhoto: uploadedProfilePhoto,
        bannerPhoto: uploadedBannerPhoto,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      
     
      dispatch(getUser(res.data.user));
    
      toast.success(res.data.message);
      navigate(`/profile`) // Redirect to the profile page after update
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='w-[50%] border-l border-r border-gray-200 '>
      {isCropping ? (
        <div className="crop-container flex justify-center items-center z-50">
          <Cropper
            image={croppingImage}
            crop={crop}
            zoom={zoom}
            aspect={cropType == 'profile' ? 1 : 3} // Aspect ratio for banner (e.g., 3:1)
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
          <div className="mt-4">
            <button
              onClick={()=> { 
                cropImage();}}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 z-50 relative"
            >
              Apply
            </button>
            <button
              onClick={() => setIsCropping(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2 z-50 relative"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 ">
          {/* Banner Photo */}
          <div className="relative">
            <img
              src={bannerPhoto}
              alt="Banner"
              className=" cursor-pointer"
              onClick={() => document.getElementById('bannerPhotoInput').click()}
            />
            <input
              type="file"
              id="bannerPhotoInput"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'banner')}
            />
          </div>

          {/* Profile Photo */}
          <div className=" -mt-10 absolute top-52 ml-2  rounded-full border-4 border-white object-cover cursor-pointer mx-auto">
            <Avatar
              src={profilePhoto}
              size = "120"
              alt="Profile"round={true}
              onClick={() => document.getElementById('profilePhotoInput').click()}
            />
            <input
              type="file"
              id="profilePhotoInput"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'profile')}
            />
          </div>

          {/* Name */}
          <div className="  mt-25 px-6 ">
            <label className="block font-bold">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          {/* Bio */}
          <div className=" mt-10 px-6">
            <label className="block font-bold">Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-full hover:bg-blue-600 font-bold">
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileUpdate;