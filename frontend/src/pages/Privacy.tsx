
import React from 'react';
import Layout from '../components/layout/Layout';
import { Shield } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-teal" />
            <h1 className="text-3xl font-bold text-navy">Privacy Policy</h1>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-600">Last updated: May 22, 2025</p>
            
            <div className="bg-teal/5 border border-teal/20 rounded-lg p-6 my-6">
              <p className="text-navy">
                At CircleMate, we take your privacy seriously. We believe in being transparent about how we collect, use, and share information about you. This Privacy Policy is designed to help you understand how we handle your data.
              </p>
            </div>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">Information We Collect</h2>
            <p className="text-gray-700">
              To provide our matchmaking services within communities, we collect and process the following types of information:
            </p>
            
            <h3 className="font-bold text-navy mt-6 mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Basic profile information (name, age, gender, photos)</li>
              <li>Contact information (email, and optionally phone number)</li>
              <li>Location data (to find matches in your area)</li>
              <li>Community affiliations and group memberships</li>
              <li>Preference information (interests, values, connection intent)</li>
              <li>Feedback and interaction history with matches</li>
            </ul>
            
            <h3 className="font-bold text-navy mt-6 mb-2">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Device information (type, operating system, browser)</li>
              <li>Usage data (features used, time spent in app)</li>
              <li>Log data and cookies</li>
              <li>IP address and general location</li>
            </ul>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700">We use the information we collect for the following purposes:</p>
            
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Providing our Services:</strong> Creating and managing your account, processing your matching preferences, facilitating connections.</li>
              <li><strong>Improving our Services:</strong> Analyzing usage patterns, conducting research, troubleshooting issues.</li>
              <li><strong>Communication:</strong> Sending service updates, notifications about matches, and responding to your inquiries.</li>
              <li><strong>Safety and Security:</strong> Verifying accounts, preventing fraud, and protecting against harmful conduct.</li>
              <li><strong>Marketing:</strong> With your consent, providing information about new features or services.</li>
            </ul>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">Sharing Your Information</h2>
            <p className="text-gray-700">
              We understand that privacy is especially important in a matchmaking platform. We share your information in the following limited circumstances:
            </p>
            
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>With Matches:</strong> We share relevant profile information with potential matches within your community groups.</li>
              <li><strong>With Community Administrators:</strong> Limited information may be shared with the administrators of your groups for safety and moderation.</li>
              <li><strong>Service Providers:</strong> We work with third parties who help us operate, improve, and protect our services.</li>
              <li><strong>Legal Requirements:</strong> We may share information if required by law, to protect rights and safety, or to enforce our policies.</li>
            </ul>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">Your Rights and Choices</h2>
            <p className="text-gray-700">Depending on your location, you may have certain rights regarding your personal information:</p>
            
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access and viewing your personal information</li>
              <li>Correcting inaccurate or incomplete information</li>
              <li>Requesting deletion of your account and data</li>
              <li>Opting out of certain data uses</li>
              <li>Controlling notification preferences</li>
              <li>Data portability</li>
            </ul>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate technical and organizational measures to protect your personal information. 
              However, no method of transmission over the Internet or electronic storage is 100% secure, 
              so we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">International Data Transfers</h2>
            <p className="text-gray-700">
              Our services operate globally, which means your information may be transferred to, stored, 
              and processed in countries other than your own. We take steps to ensure your data remains protected
              wherever it is transferred.
            </p>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes 
              through the app or by email. Your continued use of our services after such modifications constitutes 
              your acceptance of the updated policy.
            </p>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
              <br />
              <a href="mailto:privacy@circlemate.com" className="text-teal hover:underline">
                privacy@circlemate.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
