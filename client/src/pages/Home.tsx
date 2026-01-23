import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Users,
  Search,
  TrendingUp,
  Shield,
  Zap,
  ChevronRight,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Award,
  Target,
  Rocket,
} from "lucide-react";
import img from "../assets/1.png";
import img2 from "../assets/Frame 1 (1).png";
import img3 from "../assets/2.png";
import img4 from "../assets/3.png";
import img5 from "../assets/4.png";
import img6 from "../assets/9.png";
import img7 from "../assets/6.png";
import img8 from "../assets/7.png";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollReveal from "scrollreveal";
import { useNavigate } from "react-router";

export default function JobSearchLanding() {
  const [activeCategory, setActiveCategory] = useState("tech");
  const navigate = useNavigate();

  useEffect(() => {
    const lsr = ScrollReveal().reveal(".left-reveal", {
      distance: "50px",
      duration: 800,
      easing: "ease-in-out",
      origin: "left",
      interval: 200,
    });
    const rsr = ScrollReveal().reveal(".right-reveal", {
      distance: "50px",
      duration: 800,
      easing: "ease-in-out",
      origin: "right",
      interval: 200,
    });
    const bsr = ScrollReveal().reveal(".bottom-reveal", {
      distance: "50px",
      duration: 800,
      easing: "ease-in-out",
      origin: "bottom",
      interval: 200,
    });
    const tsr = ScrollReveal().reveal(".top-reveal", {
      distance: "50px",
      duration: 800,
      easing: "ease-in-out",
      origin: "top",
      interval: 200,
    });
  }, []);

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Precision Matching",
      description:
        "Advanced AI analyzes your profile to deliver personalized job recommendations that align with your career goals.",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Fast Track Applications",
      description:
        "One-click apply feature lets you submit applications instantly with your saved profile and resume.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Skill Development",
      description:
        "Access free courses, certifications, and resources to enhance your skills and stand out to employers.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy Protected",
      description:
        "Your data is encrypted and secure. Control who sees your profile and applications with privacy settings.",
    },
  ];

  const jobCategories = [
    { id: "tech", name: "Technology", count: "12.5K" },
    { id: "design", name: "Design", count: "8.2K" },
    { id: "marketing", name: "Marketing", count: "9.7K" },
    { id: "sales", name: "Sales", count: "7.3K" },
    { id: "finance", name: "Finance", count: "6.8K" },
  ];

  const featuredJobs = [
    {
      id: 1,
      title: "Senior Product Designer",
      company: "Innovate Labs",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$130K - $180K",
      posted: "2 days ago",
      applicants: 45,
      tags: ["UI/UX", "Figma", "Remote"],
      featured: true,
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "TechFlow Systems",
      location: "New York, NY",
      type: "Full-time",
      salary: "$120K - $160K",
      posted: "1 day ago",
      applicants: 67,
      tags: ["React", "Node.js", "AWS"],
      featured: true,
    },
    {
      id: 3,
      title: "Marketing Director",
      company: "GrowthHub Inc",
      location: "Remote",
      type: "Full-time",
      salary: "$110K - $150K",
      posted: "3 days ago",
      applicants: 32,
      tags: ["Strategy", "Digital", "SEO"],
      featured: false,
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "AI Dynamics",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$140K - $190K",
      posted: "4 days ago",
      applicants: 58,
      tags: ["Python", "ML", "Analytics"],
      featured: true,
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudSphere",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$115K - $155K",
      posted: "5 days ago",
      applicants: 41,
      tags: ["Docker", "K8s", "CI/CD"],
      featured: false,
    },
    {
      id: 6,
      title: "Brand Manager",
      company: "Creative Minds",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$95K - $125K",
      posted: "1 week ago",
      applicants: 28,
      tags: ["Branding", "Creative", "Strategy"],
      featured: false,
    },
  ];

  const employers = [
    { name: "Google", color: "from-red-500 to-yellow-500" },
    { name: "Microsoft", color: "from-blue-500 to-cyan-500" },
    { name: "Apple", color: "from-gray-700 to-gray-900" },
    { name: "Amazon", color: "from-orange-500 to-yellow-600" },
    { name: "Meta", color: "from-blue-600 to-purple-600" },
    { name: "Netflix", color: "from-red-600 to-red-700" },
    { name: "Tesla", color: "from-red-500 to-gray-800" },
    { name: "Spotify", color: "from-green-500 to-green-600" },
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Software Engineer",
      company: "TechCorp",
      image: "AT",
      rating: 5,
      text: "The job matching algorithm is incredible! I received relevant opportunities within hours of creating my profile. Landed my dream role in less than a month.",
    },
    {
      name: "Priya Sharma",
      role: "HR Director",
      company: "InnovateCo",
      image: "PS",
      rating: 5,
      text: "As a recruiter, this platform has been a game-changer. The quality of candidates and the ease of posting jobs has streamlined our entire hiring process.",
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager",
      company: "DesignHub",
      image: "MJ",
      rating: 5,
      text: "I was skeptical at first, but JobHub exceeded all expectations. The career resources helped me negotiate a 40% salary increase in my new position.",
    },
  ];

  const stats = [
    { number: "2.5M+", label: "Active Users", sublabel: "Growing daily" },
    { number: "50K+", label: "Live Jobs", sublabel: "Updated hourly" },
    { number: "15K+", label: "Companies", sublabel: "Verified partners" },
    { number: "94%", label: "Success Rate", sublabel: "Within 60 days" },
  ];

  return (
    <div className="bg-white">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#008CBA]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="left-reveal">
              <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight text-center lg:text-left">
                Your Career{" "}
                <span className="lg:block bg-[#008CBA] bg-clip-text text-transparent">
                  Starts Here
                </span>
              </h1>
              <p className="text-center lg:text-left text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with 15,000+ top companies and discover opportunities
                that match your skills, passion, and career aspirations.
              </p>
              <div className="flex flex-col sm:justify-center lg:justify-start sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/JobSearchLanding")}
                  className="cursor-pointer px-4 py-2 rounded-xl text-white font-semibold bg-[#008CBA] hover:bg-[#00668C] transition-all flex items-center justify-center"
                >
                  Explore Jobs
                </button>
                <button className="cursor-pointer hover:text-white box-border hover:bg-[#008CBA] text-[#008CBA] border-2 border-[#008CBA] rounded-xl px-4 py-2 font-medium transition">
                  For Employers
                </button>
              </div>
            </div>
            <div className="right-reveal hidden lg:flex justify-center items-center">
              <img src={img2} alt="hero" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-gray-50">
        <div className="bottom-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find opportunities in your field
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {jobCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-[#008CBA] to-[#005F7F] text-white shadow-lg shadow-[#008CBA]/30"
                    : "bg-white text-gray-700 hover:shadow-md"
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bottom-reveal text-center mb-16">
            <div className="inline-block bg-[#008CBA]/10 text-[#008CBA] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              POWERFUL FEATURES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with human expertise
              to deliver exceptional results
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`left-reveal group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 transition-all duration-300`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#008CBA]/10 to-transparent rounded-bl-3xl"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#008CBA] to-[#005F7F] rounded-xl flex items-center justify-center text-white mb-4 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bottom-reveal text-center mb-16">
            <div className="inline-block bg-[#008CBA]/10 text-[#008CBA] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              FEATURED OPPORTUNITIES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hand-Picked Jobs Just for You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover your next career move with our curated selection of
              featured jobs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="right-reveal group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#008CBA] hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {job.featured && (
                  <div className="inline-flex items-center space-x-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                    <Star className="w-3 h-3 fill-current" />
                    <span>FEATURED</span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#008CBA] transition-colors">
                  {job.title}
                </h3>
                <p className="text-gray-600 font-medium mb-4">{job.company}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-[#008CBA]" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2 text-[#008CBA]" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-[#008CBA]" />
                    Posted {job.posted}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    {job.applicants} applicants
                  </span>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#008CBA] to-[#005F7F] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#008CBA]/30 transition-all transform hover:scale-105">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Employers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bottom-reveal text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-gray-600">
              Join professionals working at world-class companies
            </p>
          </div>
          <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <img src={img8} alt="" className="right-reveal" />
            <img src={img3} alt="" className="right-reveal" />
            <img src={img4} alt="" className="right-reveal" />
            <img src={img5} alt="" className="right-reveal" />
            <img src={img6} alt="" className="right-reveal" />
            <img src={img7} alt="" className="right-reveal" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bottom-reveal text-center mb-16">
            <div className="inline-block bg-[#008CBA]/10 text-[#008CBA] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              SUCCESS STORIES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by Professionals Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See how JobHub transformed careers
            </p>
          </div>
          <div className=" grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="left-reveal bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#008CBA] to-[#005F7F] rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-[#008CBA] font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008CBA] via-[#006D94] to-[#005F7F]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="bottom-reveal relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-50 mb-10 max-w-2xl mx-auto">
            Join millions of professionals who have found their dream jobs
            through JobHub. Your next opportunity is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/SignIn")}
              className="cursor-pointer px-8 py-4 bg-white text-[#008CBA] rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
