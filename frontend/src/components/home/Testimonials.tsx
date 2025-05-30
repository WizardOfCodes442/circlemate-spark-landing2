
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Michael K.",
    role: "Church Community Member",
    group: "First Baptist Fellowship",
    quote: "Through CircleMate, I've made friends who share my faith and values. What started as coffee meetups has turned into deep, meaningful friendships that enrich my spiritual journey.",
    intent: "Friendship"
  },
  {
    id: 2,
    name: "Sarah & David",
    role: "Newly Engaged Couple",
    group: "Alumni Association",
    quote: "We were both part of the same university alumni group but never crossed paths until CircleMate matched us based on our shared interests in hiking and photography. Now we're planning our wedding!",
    intent: "Romance"
  },
  {
    id: 3,
    name: "Jennifer T.",
    role: "Marketing Professional",
    group: "Lagos Tech Circle",
    quote: "The business connections I've made through CircleMate have been game-changing for my career. I found a mentor who helped me transition into a leadership role at a tech startup.",
    intent: "Professional"
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy">Success Stories</h2>
          <p className="text-lg text-navy/80">
            Real connections made through CircleMate.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
              >
                <div className="bg-cream rounded-2xl p-8 md:p-12 shadow-md">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal to-teal/60 flex items-center justify-center text-white text-3xl font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-teal/10 text-teal text-sm rounded-full mb-2">
                          {testimonial.intent}
                        </span>
                      </div>
                      <blockquote className="text-lg md:text-xl italic text-gray-700 mb-6">
                        "{testimonial.quote}"
                      </blockquote>
                      <div>
                        <h4 className="font-semibold text-navy">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.role} · {testimonial.group}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <button 
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-navy hover:bg-teal hover:text-white hover:border-teal transition-colors"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${activeIndex === index ? 'bg-teal' : 'bg-gray-300'}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button 
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-navy hover:bg-teal hover:text-white hover:border-teal transition-colors"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
