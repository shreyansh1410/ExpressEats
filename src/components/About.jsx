import React from 'react';
import { FaRegHandshake, FaUsers, FaAward } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-center font-bold mb-6 text-gray-800 text-4xl">About Us</h2>
      <div className="container mx-auto">
        <div className="p-6 mb-6 bg-white shadow-lg rounded-lg">
          <h4 className="font-semibold mb-4 text-gray-700 text-2xl">Our Mission</h4>
          <p className="text-gray-600">
            We are dedicated to providing the best food delivery experience with a focus on quality and customer satisfaction. Our goal is to connect you with your favorite restaurants and make dining experiences enjoyable.
          </p>
        </div>
        <div className="flex flex-wrap justify-around">
          <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg w-full sm:w-1/3 mb-4">
            <FaRegHandshake className="text-4xl text-blue-500 mb-3" />
            <h5 className="font-semibold mb-2 text-gray-700 text-xl">Our Values</h5>
            <p className="text-gray-600 text-center">
              Integrity, Quality, and Innovation are at the core of everything we do. We strive to deliver exceptional service and build lasting relationships with our customers and partners.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg w-full sm:w-1/3 mb-4">
            <FaUsers className="text-4xl text-green-500 mb-3" />
            <h5 className="font-semibold mb-2 text-gray-700 text-xl">Our Team</h5>
            <p className="text-gray-600 text-center">
              Our team consists of passionate and dedicated professionals who work tirelessly to ensure you receive the best service. Meet the people behind the scenes making it all happen.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg w-full sm:w-1/3 mb-4">
            <FaAward className="text-4xl text-yellow-500 mb-3" />
            <h5 className="font-semibold mb-2 text-gray-700 text-xl">Awards & Recognition</h5>
            <p className="text-gray-600 text-center">
              We are proud to have received numerous awards and recognition for our commitment to excellence and innovation in the food delivery industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
