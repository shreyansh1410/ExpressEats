import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, Container, Grid } from '@mui/material';
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
        <Container maxWidth="lg" className="min-h-screen bg-gray-100 p-8">
            <Typography variant="h2" align="center" className="font-bold mb-6 text-gray-800">
                Contact Us
            </Typography>
            <Grid container spacing={4}>
                {/* Contact Information */}
                <Grid item xs={12} md={6}>
                    <Paper className="p-6 bg-white shadow-lg rounded-lg">
                        <Typography variant="h4" className="font-semibold mb-4 text-gray-700">
                            Get in Touch
                        </Typography>
                        <div className="flex items-center mb-4">
                            <FaPhone className="text-2xl mr-3 text-gray-600" />
                            <Typography className="text-gray-700">+91 8081602254</Typography>
                        </div>
                        <div className="flex items-center mb-4">
                            <FaEnvelope className="text-2xl mr-3 text-gray-600" />
                            <Typography className="text-gray-700">shreyansh.14010@gmail.com</Typography>
                        </div>
                        <div className="flex items-center mb-4">
                            <FaMapMarkerAlt className="text-2xl mr-3 text-gray-600" />
                            <Typography className="text-gray-700">123 Main St, Your City, YC 12345</Typography>
                        </div>
                    </Paper>
                </Grid>

                {/* Contact Form */}
                <Grid item xs={12} md={6}>
                    <Paper className="p-6 bg-white shadow-lg rounded-lg">
                        <Typography variant="h4" className="font-semibold mb-4 text-gray-700">
                            Send Us a Message
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <TextField
                                name="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <TextField
                                name="message"
                                label="Message"
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                                margin="normal"
                                value={formData.message}
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="mt-4"
                            >
                                Send
                            </Button>
                        </form>
                        {status && <Typography className="mt-4 text-center text-gray-700">{status}</Typography>}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Contact;
