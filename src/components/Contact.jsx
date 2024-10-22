import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting...');

        try {
            const response = await fetch('https://formspree.io/f/xrbzwzoa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setStatus('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="font-bold mb-6 text-gray-800 text-4xl text-center">Contact Us</h2>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contact Information */}
                <div className="p-6 bg-white shadow-lg rounded-lg">
                    <h4 className="font-semibold mb-4 text-gray-700 text-2xl">Get in Touch</h4>
                    <div className="flex items-center mb-4">
                        <FaPhone className="text-2xl mr-3 text-gray-600" />
                        <span className="text-gray-700">+91 8081602254</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaEnvelope className="text-2xl mr-3 text-gray-600" />
                        <span className="text-gray-700">shreyansh.14010@gmail.com</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaMapMarkerAlt className="text-2xl mr-3 text-gray-600" />
                        <span className="text-gray-700">123 Main St, Your City, YC 12345</span>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="p-6 bg-white shadow-lg rounded-lg">
                    <h4 className="font-semibold mb-4 text-gray-700 text-2xl">Send Us a Message</h4>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="border border-gray-300 p-2 rounded w-full mb-4"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="border border-gray-300 p-2 rounded w-full mb-4"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <textarea
                            name="message"
                            placeholder="Message"
                            className="border border-gray-300 p-2 rounded w-full mb-4"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="w-full p-2 bg-red-500 text-white rounded"
                        >
                            Send
                        </button>
                    </form>
                    {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
                </div>
            </div>
        </div>
    );
};

export default Contact;
