import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username or email is required';
    }
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters and include 1 capital letter, 1 number, and 1 symbol.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setSubmitted(true);
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-10">
      <div className="flex flex-col md:flex-row  rounded-2xl overflow-hidden w-full max-w-5xl">
        {/* Left - Form */}
        <div className="w-full md:w-[45%] p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-3">Sign In</h2>
          <p className="text-sm text-[#3D3D3D] mb-6">
            New user?{' '}
            <a href="/" className="text-blue-600 hover:underline font-medium">
              Create an account
            </a>
          </p>

          {submitted && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-sm">
              Login successful! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className='min-h-16'>
              <input
                type="text"
                name="username"
                placeholder="Username or email"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-3 border outline-none  transition duration-200 focus:ring-2 placeholder-gray-600 border-black ${
                  errors.username
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            <div className='min-h-16'>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border outline-none   transition duration-200 focus:ring-2  placeholder-gray-600 border-black ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="mr-2 accent-blue-600"
              />
              Keep me signed in
            </label>

            <button
              type="submit"
              className="w-full bg-black transition duration-200 text-white py-3  text-sm font-semibold"
            >
              Sign In
            </button>
          </form>

          <div className="my-6 border-t text-center border-gray-200 relative">
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-xs text-[#3D3D3D]">
              Or Sign In With
            </span>
          </div>

   <Footer/>
          
        </div>

        {/* Right - Image */}
        <div className="w-full md:w-full  hidden md:flex items-center justify-center p-6">
          <img
            src="https://img.freepik.com/free-vector/online-resume-concept-illustration_114360-5166.jpg?ga=GA1.1.843719782.1716809529&semt=ais_hybrid&w=740"
            alt="Login illustration"
            className="w-full max-w-md object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
