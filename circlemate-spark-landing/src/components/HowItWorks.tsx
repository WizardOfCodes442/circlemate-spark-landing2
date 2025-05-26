
import { Card } from '@/components/ui/card';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Join Your Group",
      description: "Enter your group's code or search to find your community within CircleMate.",
      bgColor: "bg-[#22CCBE]"
    },
    {
      number: "02", 
      title: "Create Your Profile",
      description: "Tell us about yourself, your interests, and what kind of connection you're looking for.",
      bgColor: "bg-secondary"
    },
    {
      number: "03",
      title: "Get Matched",
      description: "Our algorithm finds compatible matches within your group based on shared interests and availability.",
      bgColor: "bg-accent"
    },
    {
      number: "04",
      title: "Plan & Meet",
      description: "Schedule a meetup at one of our suggested venues and start building a meaningful connection.",
      bgColor: "bg-[#22CCBE]"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            How CircleMate Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your journey to meaningful connections in four simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`absolute top-0 right-0 w-16 h-16 ${step.bgColor} rounded-bl-3xl flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">{step.number}</span>
              </div>
              
              <div className="pt-4">
                <h3 className="text-xl font-semibold text-secondary mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gray-300"></div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
