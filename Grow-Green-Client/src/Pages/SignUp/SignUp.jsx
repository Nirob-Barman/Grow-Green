import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { useState } from 'react';
import useSweetAlert from '../../Hooks/useSweetAlert';
import { Helmet } from 'react-helmet-async';

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const SignUp = () => {

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    // Add a state to store the uploaded image URL
    const [imageUrl, setImageUrl] = useState('');
    const sweetAlert = useSweetAlert();

    // Function to handle image upload to ImgBB
    const handleImageUpload = async (e) => {
        try {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);

            // Upload the image to ImgBB server
            const response = await axios.post(img_hosting_url, formData);

            // Get the image URL from the response and set it in the state
            if (response.data && response.data.data && response.data.data.url) {
                setImageUrl(response.data.data.url);
            }
        } catch (error) {
            console.error('Failed to upload image:', error);
        }
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
        watch,
    } = useForm({ mode: 'onChange' });

    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data); // Perform sign up logic or submit form data


        // Check if an image has been uploaded to ImgBB
        if (imageUrl) {
            data.photoURL = imageUrl; // Set the photoURL to the ImgBB image URL
        }


        createUser(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                console.log('Logged in as', loggedUser);

                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // console.log('User Profile info Updated');
                        const saveUser = {
                            name: data.name,
                            email: data.email,
                            photoURL: data.photoURL,
                            gender: data.gender,
                            phoneNumber: data.phoneNumber,
                            address: data.address,
                            role: "user",
                        };

                        axios
                            .post('https://grow-green-server.vercel.app/users', saveUser)
                            .then((response) => {
                                const data = response.data;
                                console.log('Axios post submit data', data); // Perform sign up logic or submit form data
                                if (data.insertedId) {
                                    reset();

                                    // Confirmation message or alert
                                    sweetAlert.showUserCreatedSuccessAlert();

                                    // Navigation to desired page
                                    navigate('/');
                                }
                            })
                            .catch((error) => {
                                console.error('Error occurred while saving user:', error);
                            });
                    })
                    .catch((error) => {
                        console.error('Error occurred while updating user profile:', error);
                    });
            })
            .catch((error) => {
                console.error('Error occurred while creating user:', error);
            });
    };

    const password = watch('password');
    // const confirmPassword = watch('confirmPassword');

    return (
        <div className='pt-20'>
            <Helmet>
                <title>Grow Green | Register</title>
            </Helmet>
            <div className="container mx-auto mt-8">
                <div className='text-center'>
                    <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="md:flex md:space-x-4">
                        <div className="md:w-1/2">
                            <label className="label">
                                <span className="text-base label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full input input-bordered"
                                {...register('name', { required: 'Name is required' })}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div className="md:w-1/2">
                            <label className="label">
                                <span className="text-base label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Email"
                                className="w-full input input-bordered"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="md:flex md:space-x-4">
                        <div className="md:w-1/2">
                            <label className="label">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full input input-bordered"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long',
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*\W).*$/,
                                        message: 'Password must contain at least one capital letter and one special character',
                                    },
                                })}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>
                        <div className="md:w-1/2">
                            <label className="label">
                                <span className="text-base label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full input input-bordered"
                                {...register('confirmPassword', {
                                    required: 'Confirm Password is required',
                                    validate: (value) => value === password || 'Passwords do not match',
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="md:flex md:space-x-4">
                        {/* <div className="md:w-1/2">
                            <label className="label">
                                <span className="text-base label-text">Photo URL</span>
                            </label>

                            <input
                                type="text"
                                placeholder="Photo URL"
                                className="w-full input input-bordered"
                                {...register('photoURL')}
                            />
                            {errors.photoURL && <p className="text-red-500 text-xs mt-1">{errors.photoURL.message}</p>}
                        </div> */}

                        <div className="md:w-1/2">
                            <label className="label">
                                <span className="text-base label-text">Photo URL</span>
                            </label>
                            <input
                                type="file" // Change the input type to file
                                className="w-full input input-bordered"
                                onChange={handleImageUpload} // Call the handleImageUpload function on file change
                            />
                            {errors.photoURL && <p className="text-red-500 text-xs mt-1">{errors.photoURL.message}</p>}
                        </div>

                        <div className="md:w-1/2">
                            <label className="label">
                                <span className="text-base label-text">Gender</span>
                            </label>
                            <select className="w-full input input-bordered" {...register('gender')}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="md:flex md:space-x-4">
                        <div className="md:w-1/2">
                            <label className="label">
                                <span className="text-base label-text">Phone Number</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="w-full input input-bordered"
                                {...register('phoneNumber', { required: 'Phone Number is required' })}
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
                            )}
                        </div>
                        <div className="md:w-1/2">
                            <label className="label">
                                <span className="text-base label-text">Address</span>
                            </label>
                            <textarea
                                placeholder="Address"
                                className="w-full input input-bordered"
                                {...register('address',
                                    { required: 'Address is required' }
                                )}
                            ></textarea>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={!isValid}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className='mt-5 text-2xl font-semibold text-center text-gray-700'>
                    Social Login
                </div>
                <SocialLogin />
            </div>
        </div>
    );
};

export default SignUp;