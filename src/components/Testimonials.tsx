
import { Card } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Michael K.",
      role: "Church Community Member",
      organization: "First Baptist Fellowship",
      quote: "Through CircleMate, I've made friends who share my faith and values. What started as coffee meetups has turned into deep, meaningful friendships that enrich my spiritual journey.",
      avatar: "M"
    },
    {
      name: "Sarah L.",
      role: "Professional Network Member", 
      organization: "Tech Women Alliance",
      quote: "The platform helped me connect with other women in tech for both mentorship and friendship. The shared professional background made it so easy to build genuine connections.",
      avatar: "S"
    },
    {
      name: "David R.",
      role: "Hiking Club Member",
      organization: "Mountain Explorers",
      quote: "I found my hiking partner and now close friend through CircleMate. We've explored dozens of trails together and our shared love for the outdoors created an instant bond.",
      avatar: "D"
    }
  ];

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real connections made through CircleMate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6">
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-secondary">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-xs text-primary">{testimonial.organization}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
