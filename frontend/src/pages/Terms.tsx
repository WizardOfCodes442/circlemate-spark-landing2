
import React from 'react';
import Layout from '../components/layout/Layout';
import { FileText } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-8 w-8 text-teal" />
            <h1 className="text-3xl font-bold text-navy">Terms of Service</h1>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-600">Last updated: May 22, 2025</p>
            
            <div className="bg-navy/5 border border-navy/10 rounded-lg p-6 my-6">
              <p className="text-navy">
                Please read these Terms of Service carefully before using CircleMate. By accessing or using our service, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service.
              </p>
            </div>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By creating a CircleMate account and using our services, you agree to be bound by these Terms of Service and our Privacy Policy. If you are using the service on behalf of an organization or entity, you represent that you have authority to bind such organization to these Terms.
            </p>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">2. Description of Service</h2>
            <p className="text-gray-700">
              CircleMate provides a platform for individuals within established community groups to connect with each other for friendship, romantic relationships, or professional networking. The service includes profile creation, matchmaking algorithms, communication tools, and meetup planning features.
            </p>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">3. Eligibility</h2>
            <p className="text-gray-700">
              To use CircleMate, you must:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Be at least 18 years old</li>
              <li>Be a member of at least one verified community group on our platform</li>
              <li>Be able to form a legally binding contract</li>
              <li>Not be prohibited from using the service under applicable laws</li>
              <li>Not have been previously removed from our services</li>
            </ul>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">4. User Accounts</h2>
            <p className="text-gray-700">
              4.1. Registration. To use certain features of the service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process.
            </p>
            <p className="text-gray-700 mt-4">
              4.2. Account Security. You are responsible for safeguarding your password and for all activities that occur under your account. You should notify CircleMate immediately of any unauthorized use of your account.
            </p>
            <p className="text-gray-700 mt-4">
              4.3. Profile Content. You are solely responsible for the content you publish in your profile, including photos, biographical information, and preferences. All content must comply with our Content Guidelines.
            </p>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">5. Code of Conduct</h2>
            <p className="text-gray-700">
              As a CircleMate user, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Treat other users with respect and dignity</li>
              <li>Provide truthful information in your profile and communications</li>
              <li>Report any concerning behavior from other users</li>
              <li>Respect the privacy and boundaries of other users</li>
              <li>Not use the service for any illegal or unauthorized purpose</li>
              <li>Not harass, bully, or intimidate other users</li>
              <li>Not post content that is discriminatory, offensive, or inappropriate</li>
              <li>Not use the service to solicit money from other users</li>
              <li>Not impersonate any person or entity or misrepresent your affiliation with a person or entity</li>
            </ul>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700">
              6.1. Our Content. The service and its original content, features, and functionality are owned by CircleMate and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-700 mt-4">
              6.2. Your Content. By submitting content to CircleMate, you grant us a non-exclusive, transferable, sublicensable, royalty-free, worldwide license to use, modify, publicly display, and distribute such content in connection with our services.
            </p>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">7. Subscription and Payments</h2>
            <p className="text-gray-700">
              7.1. Free Services. Basic matching services within your primary community group are available at no charge.
            </p>
            <p className="text-gray-700 mt-4">
              7.2. Premium Features. Enhanced features such as priority matching, access to multiple groups, and advanced filtering options are available through subscription plans.
            </p>
            <p className="text-gray-700 mt-4">
              7.3. Payment Terms. If you purchase a premium subscription, you agree to pay all fees in accordance with the pricing and payment terms in effect at the time of your purchase.
            </p>
            <p className="text-gray-700 mt-4">
              7.4. Cancellation. You may cancel your subscription at any time. Upon cancellation, your account will revert to the free tier at the end of your billing cycle.
            </p>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700">
              In no event shall CircleMate, its directors, employees, or agents be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Your access to or use of or inability to access or use the service</li>
              <li>Any conduct or content of any third party on the service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              <li>The accuracy of matches or recommendations provided</li>
              <li>Any physical harm or emotional distress resulting from interactions with other users</li>
            </ul>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">9. Disclaimer</h2>
            <p className="text-gray-700">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THE ACCURACY, COMPLETENESS, OR USEFULNESS OF ANY INFORMATION ON THE SERVICE OR THE QUALITY OF ANY MATCHES.
            </p>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant changes through the service or via email. Your continued use of the service after such modifications constitutes your acceptance of the updated terms.
            </p>
            
            <h2 className="text-xl font-bold text-navy mt-8 mb-4">11. Contact Information</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms, please contact us at:
              <br />
              <a href="mailto:legal@circlemate.com" className="text-teal hover:underline">
                legal@circlemate.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
