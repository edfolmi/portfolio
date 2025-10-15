import React from 'react';
import { Camera, Heart, Lock, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { FloatingParticles } from '../ui/FloatingParticles';
import ProjectCard from '../ui/ProjectCard';
import { useScrollReveal } from '../../hooks/customHooks';
import type { Project } from '../../types/index';


// ============================================
// PORTFOLIO SECTION
// ============================================
const Portfolio: React.FC<{ onProjectClick: (project: Project) => void }> = ({ onProjectClick }) => {
  const { ref, isVisible } = useScrollReveal();

  const projects: Project[] = [
    {
      id: 'fintech',
      title: 'Fintech Payment Platform',
      description: 'Built a secure payment processing system handling multi-currency transactions with real-time fraud detection and compliance automation.',
      tags: ['Node.js', 'PostgreSQL', 'Redis', 'Stripe'],
      result: 'Integrated payment gateway for 2,000+ users',
      icon: <Camera className="w-24 h-24" />,
      details: {
        challenge: 'The client needed a secure, PCI-compliant payment processing system that could handle multiple currencies and integrate with local and international payment gateways while maintaining ACID compliance.',
        solution: 'Built a robust Node.js backend with PostgreSQL for transactional data and Redis for caching. Implemented multi-layered security with encryption at rest and in transit, real-time fraud detection algorithms, and comprehensive logging for audit trails.',
        impact: 'Successfully integrated payment gateway serving 2,000+ users with 99.8% transaction success rate. Reduced payment processing time from 8 seconds to 1.2 seconds. Zero security breaches since deployment.',
        tech: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Stripe API', 'Paystack', 'Docker', 'AWS', 'Kafka'],
      },
    },
    {
      id: 'saas',
      title: 'SaaS Analytics Dashboard',
      description: 'RESTful API delivering real-time analytics and reporting with advanced filtering, data aggregation, and export capabilities.',
      tags: ['Python', 'FastAPI', 'MongoDB', 'AWS'],
      result: 'Reduced API response time by 40%',
      icon: <Package className="w-24 h-24" />,
      details: {
        challenge: 'Analytics API was slow and couldn\'t handle complex queries efficiently. Response times were averaging 4+ seconds for dashboard loads, causing poor user experience and increased server costs.',
        solution: 'Migrated to FastAPI with Python for improved performance. Implemented sophisticated caching strategies, database query optimization with proper indexing, and introduced data aggregation pipelines. Added GraphQL for flexible data fetching.',
        impact: 'Reduced API response time by 40% (from 2.3s to 180ms average). Cut server costs by 30%. Dashboard now handles 10,000+ concurrent users. Customer satisfaction score increased from 6.2 to 8.9.',
        tech: ['Python', 'FastAPI', 'MongoDB', 'Redis', 'GraphQL', 'AWS Lambda', 'CloudWatch', 'ElasticSearch'],
      },
    },
    {
      id: 'health',
      title: 'Healthtech Appointment System',
      description: 'HIPAA-compliant booking and patient management system with automated reminders, telemedicine integration, and electronic health records.',
      tags: ['Django', 'PostgreSQL', 'Celery', 'Twilio'],
      result: 'Managed 5,000+ appointments monthly',
      icon: <Heart className="w-24 h-24" />,
      details: {
        challenge: 'Healthcare provider needed HIPAA-compliant system for managing patient appointments, medical records, and telemedicine consultations. Had to integrate with existing EMR systems and provide automated reminders.',
        solution: 'Developed Django-based system with end-to-end encryption, role-based access control, and comprehensive audit logging. Integrated Twilio for SMS reminders and video consultation API. Implemented automated backup and disaster recovery.',
        impact: 'Manages 5,000+ appointments monthly with 95% reduction in no-shows due to automated reminders. HIPAA audit passed with zero violations. Improved patient satisfaction by 40% and reduced administrative overhead by 60%.',
        tech: ['Django', 'PostgreSQL', 'Celery', 'RabbitMQ', 'Twilio', 'AWS S3', 'Docker', 'WebRTC'],
      },
    },
    {
      id: 'logistics',
      title: 'Logistics Tracking API',
      description: 'Real-time package tracking with route optimization, GPS integration, automated status notifications, and delivery time predictions.',
      tags: ['Node.js', 'Express', 'MySQL', 'Socket.io'],
      result: 'Track 10,000+ deliveries daily',
      icon: <TrendingUp className="w-24 h-24" />,
      details: {
        challenge: 'Delivery company struggled with real-time package tracking and route optimization. Drivers were making suboptimal routes, and customers had no visibility into delivery status.',
        solution: 'Built real-time tracking system with WebSocket for live updates. Integrated GPS tracking, implemented route optimization algorithms using graph theory, and created driver mobile app. Added predictive delivery time estimates using historical data and ML.',
        impact: 'Tracks 10,000+ deliveries daily with 25% reduction in fuel costs through route optimization. 90% improvement in on-time deliveries. Customer complaints reduced by 60%. Driver satisfaction increased by 45%.',
        tech: ['Node.js', 'Express', 'MySQL', 'Socket.io', 'Redis', 'Google Maps API', 'MongoDB', 'TensorFlow'],
      },
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Backend',
      description: 'Scalable microservices architecture with inventory management, order processing, payment integration, and third-party marketplace sync.',
      tags: ['Golang', 'gRPC', 'PostgreSQL', 'Docker'],
      result: 'Handle 50,000+ orders monthly',
      icon: <ShoppingCart className="w-24 h-24" />,
      details: {
        challenge: 'Online marketplace needed scalable architecture to handle growing order volume. Monolithic system was causing frequent outages during peak hours and making updates risky and time-consuming.',
        solution: 'Migrated to microservices architecture using Golang and gRPC. Separated services for inventory, orders, payments, and notifications. Implemented event-driven architecture with message queues for reliable communication between services.',
        impact: 'Handles 50,000+ orders monthly with 99.99% uptime achieved. Deployment time reduced from 4 hours to 15 minutes. System now scales automatically based on traffic. Revenue increased 300% after migration.',
        tech: ['Golang', 'gRPC', 'PostgreSQL', 'RabbitMQ', 'Docker', 'Kubernetes', 'AWS', 'Prometheus'],
      },
    },
    {
      id: 'auth',
      title: 'Auth & Identity Service',
      description: 'OAuth2 + JWT authentication system with multi-factor authentication, social login, role-based access control, and session management.',
      tags: ['Node.js', 'JWT', 'Redis', 'OAuth2'],
      result: 'Secure 15,000+ user accounts',
      icon: <Lock className="w-24 h-24" />,
      details: {
        challenge: 'Multiple applications needed centralized authentication and authorization. Existing systems had security vulnerabilities and lacked modern features like MFA, social login, and passwordless authentication.',
        solution: 'Built OAuth2-compliant authentication service with JWT tokens. Implemented multi-factor authentication with TOTP, social login integration (Google, Facebook, Apple), and comprehensive session management. Added rate limiting and brute-force protection.',
        impact: 'Secures 15,000+ user accounts across 5 applications. Zero authentication-related security incidents since deployment. Login success rate improved to 99.5%. Reduced support tickets by 40%. Average login time reduced to 0.8 seconds.',
        tech: ['Node.js', 'JWT', 'Redis', 'OAuth2', 'PostgreSQL', 'Docker', 'Passport.js', 'bcrypt'],
      },
    },
  ];

  return (
    <section id="portfolio" className="py-24 px-6 relative overflow-hidden">
      <FloatingParticles />
      
      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-cyan-400/10 to-amber-400/10 border border-cyan-400/30 rounded-full text-cyan-400 font-semibold text-sm animate-pulse-slow">
            🚀 Real Impact, Real Results
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From concept to deployment, these are production systems serving <span className="text-cyan-400 font-semibold">thousands of users daily</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => onProjectClick(project)} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
