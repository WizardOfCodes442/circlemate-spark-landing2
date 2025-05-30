
import React from 'react';
import Layout from '../components/layout/Layout';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: '1',
    title: 'The Science of Social Matching: How CircleMate Finds Your Perfect Connections',
    excerpt: 'Discover the technology and psychology behind our matching algorithm and how it creates meaningful connections.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    author: 'Dr. Aisha Johnson',
    date: 'May 15, 2025',
    category: 'Technology',
    tags: ['Algorithm', 'Psychology', 'Connections']
  },
  {
    id: '2',
    title: 'Building Community in the Digital Age: Why Trust Matters',
    excerpt: 'How CircleMate\'s community-first approach is changing the landscape of social connections.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b',
    author: 'Michael Okonkwo',
    date: 'May 8, 2025',
    category: 'Community',
    tags: ['Trust', 'Digital Relationships', 'Social Networks']
  },
  {
    id: '3',
    title: '5 Tips for a Successful First Meetup',
    excerpt: 'Make the most of your CircleMate connections with these proven advice for great first impressions.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad',
    author: 'Sarah Chen',
    date: 'April 30, 2025',
    category: 'Advice',
    tags: ['Meetups', 'Social Skills', 'Networking']
  },
  {
    id: '4',
    title: 'From Strangers to Friends: CircleMate Success Stories',
    excerpt: 'Read heartwarming stories from users who formed lasting bonds through our platform.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
    author: 'James Wilson',
    date: 'April 22, 2025',
    category: 'Success Stories',
    tags: ['Friendship', 'Testimonials', 'Community']
  },
  {
    id: '5',
    title: 'Networking with Purpose: Professional Connections That Matter',
    excerpt: 'How to use CircleMate to advance your career and build meaningful professional relationships.',
    image: 'https://images.unsplash.com/photo-1560439514-4e9645039924',
    author: 'Oluwaseun Adebayo',
    date: 'April 15, 2025',
    category: 'Professional',
    tags: ['Networking', 'Career Growth', 'Business']
  },
  {
    id: '6',
    title: 'The Psychology of Compatibility: Beyond Shared Interests',
    excerpt: 'Why values and temperament matter more than hobbies when it comes to lasting connections.',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21',
    author: 'Dr. Priya Sharma',
    date: 'April 8, 2025',
    category: 'Psychology',
    tags: ['Compatibility', 'Relationships', 'Values']
  }
];

const Blog: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-navy mb-2">CircleMate Blog</h1>
        <p className="text-gray-600 mb-8">
          Insights and stories about connections, communities, and relationships
        </p>
        
        {/* Featured Post */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title}
                className="h-64 md:h-full w-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="bg-teal/10 text-teal px-2 py-1 rounded text-xs">
                  Featured
                </span>
                <span className="mx-2">·</span>
                <span>{blogPosts[0].category}</span>
              </div>
              <h2 className="text-2xl font-bold text-navy mb-3">{blogPosts[0].title}</h2>
              <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <div className="flex items-center mr-4">
                  <User className="h-4 w-4 mr-1" />
                  <span>{blogPosts[0].author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{blogPosts[0].date}</span>
                </div>
              </div>
              
              <Button 
                className="bg-teal hover:bg-teal/90 text-white flex items-center gap-2"
                onClick={() => {
                  // This would typically navigate to the blog post
                  // For now, just stay on the blog listing
                }}
              >
                Read Article
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.slice(1).map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className="h-48 bg-gray-200">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="font-bold text-navy text-lg mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <div className="flex items-center mr-3">
                    <User className="h-3 w-3 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="text-teal hover:text-teal/90 p-0 h-auto text-sm"
                  onClick={() => {
                    // This would typically navigate to the blog post
                    // For now, just stay on the blog listing
                  }}
                >
                  Read More <ArrowRight className="h-3 w-3 ml-1 inline" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Categories and Tags */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-navy mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-4">
              Get the latest articles, tips, and community news delivered to your inbox.
            </p>
            
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-teal"
              />
              <Button className="bg-teal hover:bg-teal/90 text-white">
                Subscribe
              </Button>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-6">
              <h3 className="font-bold text-navy mb-3">Categories</h3>
              <div className="space-y-2">
                <Link to="#" className="block text-gray-600 hover:text-teal">
                  Technology (3)
                </Link>
                <Link to="#" className="block text-gray-600 hover:text-teal">
                  Community (5)
                </Link>
                <Link to="#" className="block text-gray-600 hover:text-teal">
                  Psychology (4)
                </Link>
                <Link to="#" className="block text-gray-600 hover:text-teal">
                  Advice (7)
                </Link>
                <Link to="#" className="block text-gray-600 hover:text-teal">
                  Success Stories (6)
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-navy mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Link to="#" className="bg-gray-100 hover:bg-teal/10 hover:text-teal text-gray-600 text-xs px-2.5 py-1.5 rounded-full transition-colors">
                  Relationships
                </Link>
                <Link to="#" className="bg-gray-100 hover:bg-teal/10 hover:text-teal text-gray-600 text-xs px-2.5 py-1.5 rounded-full transition-colors">
                  Matching
                </Link>
                <Link to="#" className="bg-gray-100 hover:bg-teal/10 hover:text-teal text-gray-600 text-xs px-2.5 py-1.5 rounded-full transition-colors">
                  Dating
                </Link>
                <Link to="#" className="bg-gray-100 hover:bg-teal/10 hover:text-teal text-gray-600 text-xs px-2.5 py-1.5 rounded-full transition-colors">
                  Friendship
                </Link>
                <Link to="#" className="bg-gray-100 hover:bg-teal/10 hover:text-teal text-gray-600 text-xs px-2.5 py-1.5 rounded-full transition-colors">
                  Networking
                </Link>
                <Link to="#" className="bg-gray-100 hover:bg-teal/10 hover:text-teal text-gray-600 text-xs px-2.5 py-1.5 rounded-full transition-colors">
                  Community
                </Link>
                <Link to="#" className="bg-gray-100 hover:bg-teal/10 hover:text-teal text-gray-600 text-xs px-2.5 py-1.5 rounded-full transition-colors">
                  Tips
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
