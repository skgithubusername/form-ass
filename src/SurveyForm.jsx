

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import axios from 'axios';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
  });

  const [errors, setErrors] = useState({});
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (formData.surveyTopic) {
      // Fetch additional questions from an external API based on survey topic
      axios.get(`https://api.example.com/survey-questions?topic=${formData.surveyTopic}`)
        .then(response => {
          setAdditionalQuestions(response.data);
        })
        .catch(error => {
          console.error('Error fetching additional questions:', error);
        });
    }
  }, [formData.surveyTopic]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
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
      // Optionally, you can send the form data to an API here
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
    if (!data.surveyTopic.trim()) {
      errors.surveyTopic = 'Survey Topic is required';
    }
    if (data.surveyTopic === 'Technology') {
      if (!data.favoriteProgrammingLanguage.trim()) {
        errors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
      }
      if (!data.yearsOfExperience.trim() || isNaN(data.yearsOfExperience) || +data.yearsOfExperience <= 0) {
        errors.yearsOfExperience = 'Years of Experience must be a number greater than 0';
      }
    }
    if (data.surveyTopic === 'Health') {
      if (!data.exerciseFrequency.trim()) {
        errors.exerciseFrequency = 'Exercise Frequency is required';
      }
      if (!data.dietPreference.trim()) {
        errors.dietPreference = 'Diet Preference is required';
      }
    }
    if (data.surveyTopic === 'Education') {
      if (!data.highestQualification.trim()) {
        errors.highestQualification = 'Highest Qualification is required';
      }
      if (!data.fieldOfStudy.trim()) {
        errors.fieldOfStudy = 'Field of Study is required';
      }
    }
    if (!data.feedback.trim() || data.feedback.length < 50) {
      errors.feedback = 'Feedback is required and must be at least 50 characters';
    }
    return errors;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Survey Form</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Full Name:</label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Survey Topic:</label>
          <select
            name="surveyTopic"
            value={formData.surveyTopic}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          >
            <option value="">Select a topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <p className="text-red-500 text-xs italic">{errors.surveyTopic}</p>}
        </div>

        {formData.surveyTopic === 'Technology' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Favorite Programming Language:</label>
              <select
                name="favoriteProgrammingLanguage"
                value={formData.favoriteProgrammingLanguage}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                <option value="">Select a language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
              {errors.favoriteProgrammingLanguage && <p className="text-red-500 text-xs italic">{errors.favoriteProgrammingLanguage}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Years of Experience:</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              />
              {errors.yearsOfExperience && <p className="text-red-500 text-xs italic">{errors.yearsOfExperience}</p>}
            </div>
          </>
        )}

        {formData.surveyTopic === 'Health' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Exercise Frequency:</label>
              <select
                name="exerciseFrequency"
                value={formData.exerciseFrequency}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                <option value="">Select frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
              {errors.exerciseFrequency && <p className="text-red-500 text-xs italic">{errors.exerciseFrequency}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Diet Preference:</label>
              <select
                name="dietPreference"
                value={formData.dietPreference}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                <option value="">Select diet</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
              {errors.dietPreference && <p className="text-red-500 text-xs italic">{errors.dietPreference}</p>}
            </div>
          </>
        )}

        {formData.surveyTopic === 'Education' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Highest Qualification:</label>
              <select
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                <option value="">Select qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.highestQualification && <p className="text-red-500 text-xs italic">{errors.highestQualification}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Field of Study:</label>
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              />
              {errors.fieldOfStudy && <p className="text-red-500 text-xs italic">{errors.fieldOfStudy}</p>}
            </div>
          </>
        )}

        {additionalQuestions.map((question, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-gray-700 text-sm font-bold mb-2">{question.label}:</label>
            <input
              type="text"
              name={question.name}
              value={formData[question.name] || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Feedback:</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          />
          {errors.feedback && <p className="text-red-500 text-xs italic">{errors.feedback}</p>}
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
          <p className="font-bold text-lg">Survey Submitted Successfully!</p>
          <p><span className="font-semibold">Full Name:</span> {submittedData.fullName}</p>
          <p><span className="font-semibold">Email:</span> {submittedData.email}</p>
          <p><span className="font-semibold">Survey Topic:</span> {submittedData.surveyTopic}</p>
          {submittedData.surveyTopic === 'Technology' && (
            <>
              <p><span className="font-semibold">Favorite Programming Language:</span> {submittedData.favoriteProgrammingLanguage}</p>
              <p><span className="font-semibold">Years of Experience:</span> {submittedData.yearsOfExperience}</p>
            </>
          )}
          {submittedData.surveyTopic === 'Health' && (
            <>
              <p><span className="font-semibold">Exercise Frequency:</span> {submittedData.exerciseFrequency}</p>
              <p><span className="font-semibold">Diet Preference:</span> {submittedData.dietPreference}</p>
            </>
          )}
          {submittedData.surveyTopic === 'Education' && (
            <>
              <p><span className="font-semibold">Highest Qualification:</span> {submittedData.highestQualification}</p>
              <p><span className="font-semibold">Field of Study:</span> {submittedData.fieldOfStudy}</p>
            </>
          )}
          {additionalQuestions.map((question, index) => (
            <p key={index}><span className="font-semibold">{question.label}:</span> {submittedData[question.name]}</p>
          ))}
          <p><span className="font-semibold">Feedback:</span> {submittedData.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
