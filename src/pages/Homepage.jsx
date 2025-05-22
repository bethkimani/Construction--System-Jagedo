import React from 'react';
import { Link } from 'react-router-dom';
import ConstructionChatbot from '../components/ConstructionChatbot';
import Footer from '../components/Footer';

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-800">JaGedo</div>
        <div className="space-x-4">
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Login
          </Link>
          <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-indigo-800 text-white text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Construct with a Builder Near You!</h1>
        <div className="flex justify-center space-x-6 mt-6">
          <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-lg">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/wrench.png" alt="Fundi" className="mx-auto mb-2" />
            <p className="text-lg">Fundi</p>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-lg">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/engineer-helmet.png" alt="Professional" className="mx-auto mb-2" />
            <p className="text-lg">Professional</p>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-lg">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/hammer.png" alt="Hardware" className="mx-auto mb-2" />
            <p className="text-lg">Hardware</p>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-lg">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/construction-helmet.png" alt="Contractor" className="mx-auto mb-2" />
            <p className="text-lg">Contractor</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">About JaGedo</h2>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Every Project Deserves a <span className="text-red-600">Solid</span> <span className="text-orange-600">Foundation</span></h3>
            <p className="text-gray-600 mb-4">
              JaGedo connects customers with skilled professionals, contractors, and suppliers for seamless construction projects. Our platform ensures quality, transparency, and timely delivery.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Efficient Project Management</li>
              <li>Verified Professionals</li>
              <li>Secure Payment Solutions</li>
            </ul>
            <div className="mt-6">
              <Link to="/login" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
              alt="Construction Site"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <p className="text-center text-gray-600 mb-12">Seamlessly connect with professionals, contractors, and suppliers in just a few steps</p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* For Customers */}
          <div className="col-span-1 text-center">
            <h3 className="text-xl font-semibold mb-4 text-indigo-800">For Customers</h3>
          </div>
          <div className="col-span-4 grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-bold mb-2">1. Sign Up</h4>
              <p>Create an account and provide basic details to access the platform.</p>
            </div>
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-bold mb-2">2. Request</h4>
              <p>Submit project details and requirements to receive responses from builders.</p>
            </div>
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-bold mb-2">3. Escrow Payment</h4>
              <p>Make secure payments that are held in escrow until project completion.</p>
            </div>
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-bold mb-2">4. Job Execution</h4>
              <p>Monitor project progress through updates from the service provider.</p>
            </div>
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-bold mb-2">5. Complete and Review</h4>
              <p>Release payment and leave a review for the builder.</p>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 text-indigo-800 text-center">For Builders</h3>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-orange-600 text-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-bold mb-2">1. Sign Up & Set Profile</h4>
              <p>Builders register and set up a profile showcasing skills, experience, and portfolio.</p>
            </div>
            <div className="bg-orange-600 text-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-bold mb-2">2. Receive Requests</h4>
              <p>Builders receive project requests and quotes from customers.</p>
            </div>
            <div className="bg-orange-600 text-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-bold mb-2">3. Bid and Win</h4>
              <p>Builders submit bids and best bid based on selection criteria.</p>
            </div>
            <div className="bg-orange-600 text-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-bold mb-2">4. Job Execution</h4>
              <p>Builders execute the project and provide in-app updates to the customer.</p>
            </div>
            <div className="bg-orange-600 text-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-bold mb-2">5. Get Paid</h4>
              <p>Builders receive payment upon milestone completion and customer reviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;