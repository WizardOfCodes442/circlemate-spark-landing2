
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-navy">{question}</h3>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600 prose-sm">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  
  const faqItems = [
    {
      question: "What is CircleMate?",
      answer: (
        <p>
          CircleMate is a social matchmaking platform designed to foster meaningful connections 
          within trusted communities like churches, alumni groups, and professional associations. 
          We help people find friends, romantic partners, or professional contacts based on 
          compatibility factors including interests, values, and availability.
        </p>
      )
    },
    {
      question: "How does CircleMate work?",
      answer: (
        <>
          <p>
            CircleMate works in four simple steps:
          </p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Join a group you're already a member of in real life</li>
            <li>Complete your profile with your preferences and interests</li>
            <li>Receive match suggestions from within your community</li>
            <li>Connect and schedule meetups with your matches</li>
          </ol>
          <p className="mt-2">
            Our smart matching algorithm considers multiple factors like shared interests, values, 
            location, and availability to suggest compatible connections.
          </p>
        </>
      )
    },
    {
      question: "Is CircleMate free to use?",
      answer: (
        <>
          <p>
            CircleMate offers a free tier that allows you to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Create a profile</li>
            <li>Join one community group</li>
            <li>Receive limited match suggestions</li>
            <li>Connect with matches and schedule meetups</li>
          </ul>
          <p className="mt-2">
            Premium subscriptions are available for enhanced features like priority matching, 
            access to multiple groups, and advanced filtering options.
          </p>
        </>
      )
    },
    {
      question: "How is CircleMate different from other dating apps?",
      answer: (
        <p>
          Unlike traditional dating apps, CircleMate is community-based, meaning connections only 
          happen within verified groups where a foundation of trust already exists. We also cater to 
          multiple types of connections (friendship, romance, professional), and provide a structured 
          process from match to meetup, including venue suggestions and scheduling tools.
        </p>
      )
    },
    {
      question: "How do I join a group on CircleMate?",
      answer: (
        <>
          <p>
            There are two ways to join a group:
          </p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Enter a group code provided by your community leader</li>
            <li>Search for your group and request to join (approval may be required)</li>
          </ol>
          <p className="mt-2">
            Some groups may have specific requirements for membership verification.
          </p>
        </>
      )
    },
    {
      question: "Can I be in multiple groups?",
      answer: (
        <p>
          Yes! While free accounts can join one group, premium subscribers can join multiple groups 
          to expand their connection opportunities. For example, you might be part of both your alumni 
          network and a professional association.
        </p>
      )
    },
    {
      question: "How does CircleMate protect my privacy?",
      answer: (
        <>
          <p>
            We take privacy seriously with these protections:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>You're only visible to members of your own groups</li>
            <li>Personal contact information is never shared without your consent</li>
            <li>Initial meetups are arranged through our platform</li>
            <li>You control what information appears in your profile</li>
            <li>Group admins can remove problematic users</li>
          </ul>
          <p className="mt-2">
            For more details, please review our <Link to="/privacy" className="text-teal hover:underline">Privacy Policy</Link>.
          </p>
        </>
      )
    },
    {
      question: "What happens after I match with someone?",
      answer: (
        <>
          <p>
            When you match with someone, the following process begins:
          </p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Both users receive a notification about the match</li>
            <li>Both users must confirm interest to proceed</li>
            <li>After mutual confirmation, you can schedule a meetup</li>
            <li>Our system suggests venues based on your preferences and locations</li>
            <li>After the meetup, both users provide feedback</li>
          </ol>
        </>
      )
    },
    {
      question: "How do I start a new group for my community?",
      answer: (
        <p>
          If your community isn't yet on CircleMate, you can request to create a new group through 
          the "Start a Group" form in the app. Our team will review your request and provide guidance 
          on setting up and verifying your community. For large organizations, we offer specialized 
          onboarding support.
        </p>
      )
    },
    {
      question: "I'm experiencing technical issues. How can I get help?",
      answer: (
        <p>
          For technical support, please email <a href="mailto:support@circlemate.com" className="text-teal hover:underline">support@circlemate.com</a> with 
          details about your issue. Our support team typically responds within 24 hours. For common 
          issues, you might also find solutions in our Help Center.
        </p>
      )
    }
  ];
  
  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="h-8 w-8 text-teal" />
            <h1 className="text-3xl font-bold text-navy">Frequently Asked Questions</h1>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="space-y-1">
              {faqItems.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onClick={() => toggleFAQ(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-teal/5 border border-teal/20 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-navy mb-3">Still have questions?</h2>
            <p className="text-gray-700 mb-4">
              Our support team is ready to help with any other questions you might have.
            </p>
            <Link to="/contact">
              <Button className="bg-teal hover:bg-teal/90 text-white">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
