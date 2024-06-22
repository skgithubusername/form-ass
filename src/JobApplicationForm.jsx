
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false
    },
    interviewTime: null
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        additionalSkills: {
          ...prevState.additionalSkills,
          [name]: checked
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prevState => ({
      ...prevState,
      interviewTime: date
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
    if (!data.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (!data.phoneNumber.trim() || isNaN(data.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }
    if ((data.position === 'Developer' || data.position === 'Designer') && (!data.relevantExperience.trim() || isNaN(data.relevantExperience) || +data.relevantExperience <= 0)) {
      errors.relevantExperience = 'Relevant Experience must be a number greater than 0';
    }
    if (data.position === 'Designer' && !data.portfolioURL.trim()) {
      errors.portfolioURL = 'Portfolio URL is required';
    } else if (data.position === 'Designer' && !/^(ftp|http|https):\/\/[^ "]+$/.test(data.portfolioURL)) {
      errors.portfolioURL = 'Portfolio URL is invalid';
    }
    if (data.position === 'Manager' && !data.managementExperience.trim()) {
      errors.managementExperience = 'Management Experience is required';
    }
    if (!Object.values(data.additionalSkills).includes(true)) {
      errors.additionalSkills = 'At least one skill must be selected';
    }
    if (!data.interviewTime) {
      errors.interviewTime = 'Preferred Interview Time is required';
    }
    return errors;
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Job Application</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          />
          {errors.fullName && <p className="text-red-500 text-xs italic">{errors.fullName}</p>}
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
          <label className="block text-gray-700 text-sm font-bold mb-1">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">Applying for Position:</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          >
            <option value="">Select a position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.position && <p className="text-red-500 text-xs italic">{errors.position}</p>}
        </div>

        {(formData.position === 'Developer' || formData.position === 'Designer') && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1">Relevant Experience (Years):</label>
            <input
              type="number"
              name="relevantExperience"
              value={formData.relevantExperience}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            />
            {errors.relevantExperience && <p className="text-red-500 text-xs italic">{errors.relevantExperience}</p>}
          </div>
        )}

        {formData.position === 'Designer' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1">Portfolio URL:</label>
            <input
              type="text"
              name="portfolioURL"
              value={formData.portfolioURL}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            />
            {errors.portfolioURL && <p className="text-red-500 text-xs italic">{errors.portfolioURL}</p>}
          </div>
        )}

        {formData.position === 'Manager' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1">Management Experience:</label>
            <textarea
              name="managementExperience"
              value={formData.managementExperience}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            />
            {errors.managementExperience && <p className="text-red-500 text-xs italic">{errors.managementExperience}</p>}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">Additional Skills:</label>
          <div className="flex flex-wrap">
            {Object.keys(formData.additionalSkills).map(skill => (
              <div key={skill} className="mr-4 mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name={skill}
                    checked={formData.additionalSkills[skill]}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2 text-gray-700">{skill}</span>
                </label>
              </div>
            ))}
          </div>
          {errors.additionalSkills && <p className="text-red-500 text-xs italic">{errors.additionalSkills}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">Preferred Interview Time:</label>
          <DatePicker
            selected={formData.interviewTime}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          />
          {errors.interviewTime && <p className="text-red-500 text-xs italic">{errors.interviewTime}</p>}
        </div>

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
          <p className="font-bold text-lg">Application Submitted Successfully!</p>
          <p><span className="font-semibold">Full Name:</span> {submittedData.fullName}</p>
          <p><span className="font-semibold">Email:</span> {submittedData.email}</p>
          <p><span className="font-semibold">Phone Number:</span> {submittedData.phoneNumber}</p>
          <p><span className="font-semibold">Position:</span> {submittedData.position}</p>
          {submittedData.position === 'Developer' || submittedData.position === 'Designer' && (
            <p><span className="font-semibold">Relevant Experience:</span> {submittedData.relevantExperience} years</p>
          )}
          {submittedData.position === 'Designer' && (
            <p><span className="font-semibold">Portfolio URL:</span> {submittedData.portfolioURL}</p>
          )}
          {submittedData.position === 'Manager' && (
            <p><span className="font-semibold">Management Experience:</span> {submittedData.managementExperience}</p>
          )}
          <p><span className="font-semibold">Additional Skills:</span> {Object.keys(submittedData.additionalSkills).filter(skill => submittedData.additionalSkills[skill]).join(', ')}</p>
          <p><span className="font-semibold">Preferred Interview Time:</span> {submittedData.interviewTime.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;



