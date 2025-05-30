
import { Card } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: "⚡",
      title: "Smart Pairing Engine",
      description: "Our intelligent algorithm matches you with people based on shared interests, values, and even schedule compatibility."
    },
    {
      icon: "🛡️",
      title: "Trusted Communities",
      description: "Connect only with people from groups you already belong to, ensuring a layer of trust and safety."
    },
    {
      icon: "💝",
      title: "Purposeful Connections",
      description: "Whether you're looking for friendship, romance, or professional networking, help you find the right match."
    },
    {
      icon: "📅",
      title: "Date Planning Interface",
      description: "Seamlessly plan meetups with AI-suggested venues based on your mutual interests and budget preferences."
    },
    {
      icon: "⏰",
      title: "Schedule Compatibility",
      description: "Find matches who are available when you are, making it easier to plan and meet."
    },
    {
      icon: "🔒",
      title: "Privacy & Safety",
      description: "Your personal information is only shared after mutual matching, with no direct contact information exchanged."
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            Features That Connect
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            CircleMate is designed to create meaningful connections through a range of powerful features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-secondary mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
