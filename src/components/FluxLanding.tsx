import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Users, Lightbulb, Target, Sparkles, ArrowRight } from 'lucide-react';
import EmailRegistrationModal from './EmailRegistrationModal';

const FluxLanding: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Technical Growth",
      description: "Master cutting-edge technologies through hands-on workshops and projects."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Network Building", 
      description: "Connect with like-minded peers and industry professionals."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation Hub",
      description: "Transform your ideas into reality with our collaborative environment."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Career Boost",
      description: "Gain skills and experiences that accelerate your professional journey."
    }
  ];

  return (
    <div className="min-h-screen bg-animated overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border/50 transition-all duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center animate-glow">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Flux
              </span>
            </div>
            <Button 
              onClick={() => setShowModal(true)}
              className="btn-hero"
            >
              Join Society
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="mb-6 px-4 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
              <Sparkles className="w-4 h-4 mr-2" />
              Welcome to Innovation
            </Badge>
            
            <h1 className="hero-title mb-8 animate-slide-up">
              Join <span className="bg-gradient-primary bg-clip-text text-transparent">Flux</span>
              <br />Society
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-slide-up animation-delay-200">
              Where innovation meets excellence. Connect with passionate tech enthusiasts, 
              build groundbreaking projects, and shape the future together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-400">
              <Button 
                onClick={() => setShowModal(true)}
                className="btn-hero group"
                size="lg"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-animate">
              <h2 className="section-title">About Flux Society</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Flux Society is MMMUT's premier technology community, fostering innovation 
                and collaboration among students passionate about technology and entrepreneurship.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We believe in the power of collective intelligence and provide a platform 
                where ideas transform into impactful solutions that make a difference.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Built</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">25+</div>
                  <div className="text-sm text-muted-foreground">Tech Workshops</div>
                </div>
              </div>
            </div>
            
            <div className="scroll-animate">
              <div className="card-glow p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4 text-primary">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the catalyst for technological innovation at MMMUT, creating an 
                  ecosystem where students can explore, learn, and build solutions that 
                  address real-world challenges while fostering entrepreneurial mindset.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="section-title">Why Join Flux?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock your potential with exclusive benefits designed to accelerate your growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="card-glow p-6 hover-lift scroll-animate group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto card-glow p-12 rounded-3xl scroll-animate">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Ready to Innovate?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of students already building the future. Your journey to 
              excellence starts with a single click.
            </p>
            <Button 
              onClick={() => setShowModal(true)}
              className="btn-hero group"
              size="lg"
            >
              Join Flux Society
              <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-180 transition-transform duration-500" />
            </Button>
          </div>
        </div>
      </section>

      {/* Email Registration Modal */}
      <EmailRegistrationModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default FluxLanding;