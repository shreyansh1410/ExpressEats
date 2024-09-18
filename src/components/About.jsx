import React from 'react';
import { Typography, Paper } from '@mui/material';
import { FaRegHandshake, FaUsers, FaAward } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Typography variant="h2" className="text-center font-bold mb-6 text-gray-800">
        About Us
      </Typography>
      <div className="container mx-auto">
        <Paper className="p-6 mb-6 bg-white shadow-lg rounded-lg">
          <Typography variant="h4" className="font-semibold mb-4 text-gray-700">
            Our Mission
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            We are dedicated to providing the best food delivery experience with a focus on quality and customer satisfaction. Our goal is to connect you with your favorite restaurants and make dining experiences enjoyable.
          </Typography>
        </Paper>
        <div className="flex flex-wrap justify-around">
          <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg w-full sm:w-1/3 mb-4">
            <FaRegHandshake className="text-4xl text-blue-500 mb-3" />
            <Typography variant="h5" className="font-semibold mb-2 text-gray-700">
              Our Values
            </Typography>
            <Typography variant="body1" className="text-gray-600 text-center">
              Integrity, Quality, and Innovation are at the core of everything we do. We strive to deliver exceptional service and build lasting relationships with our customers and partners.
            </Typography>
          </div>
          <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg w-full sm:w-1/3 mb-4">
            <FaUsers className="text-4xl text-green-500 mb-3" />
            <Typography variant="h5" className="font-semibold mb-2 text-gray-700">
              Our Team
            </Typography>
            <Typography variant="body1" className="text-gray-600 text-center">
              Our team consists of passionate and dedicated professionals who work tirelessly to ensure you receive the best service. Meet the people behind the scenes making it all happen.
            </Typography>
          </div>
          <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg w-full sm:w-1/3 mb-4">
            <FaAward className="text-4xl text-yellow-500 mb-3" />
            <Typography variant="h5" className="font-semibold mb-2 text-gray-700">
              Awards & Recognition
            </Typography>
            <Typography variant="body1" className="text-gray-600 text-center">
              We are proud to have received numerous awards and recognition for our commitment to excellence and innovation in the food delivery industry.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
