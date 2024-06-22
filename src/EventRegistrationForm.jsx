import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    isAttendingWithGuest: false,
    guestName: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      setSubmittedData(formData);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (!data.age.trim() || isNaN(data.age) || +data.age <= 0) {
      errors.age = 'Age must be a number greater than 0';
    }
    if (data.isAttendingWithGuest && !data.guestName.trim()) {
      errors.guestName = 'Guest Name is required';
    }
    return errors;
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Event Registration</h2>
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          />
          {errors.age && <p className="text-red-500 text-xs italic">{errors.age}</p>}
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="isAttendingWithGuest"
            checked={formData.isAttendingWithGuest}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
          <label className="block text-gray-700 text-sm font-bold">Are you attending with a guest?</label>
        </div>

        {formData.isAttendingWithGuest && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1">Guest Name:</label>
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            />
            {errors.guestName && <p className="text-red-500 text-xs italic">{errors.guestName}</p>}
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>

      {submittedData && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4 animate-fade-in-up">
          <p className="font-bold text-lg">Form Submitted Successfully!</p>
          <p><span className="font-semibold">Name:</span> {submittedData.name}</p>
          <p><span className="font-semibold">Email:</span> {submittedData.email}</p>
          <p><span className="font-semibold">Age:</span> {submittedData.age}</p>
          <p><span className="font-semibold">Attending with Guest:</span> {submittedData.isAttendingWithGuest ? 'Yes' : 'No'}</p>
          {submittedData.isAttendingWithGuest && <p><span className="font-semibold">Guest Name:</span> {submittedData.guestName}</p>}
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
















































































