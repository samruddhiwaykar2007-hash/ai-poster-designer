import React, { useState } from "react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard.jsx";
import "../styles/Home.css";

// Home is the landing page of the app.
// It contains: Hero, Features, How It Works, Testimonials, and FAQ sections.
function Home() {
  // Data for the Features section - kept as an array so FeatureCard
  // can be reused without repeating JSX for every feature.
  const features = [
    {
      icon: "⚡",
      title: "Instant Generation",
      description: "Describe your idea and get a professional poster in seconds using AI.",
    },
    {
      icon: "🎨",
      title: "Beautiful Templates",
      description: "Choose from a wide range of modern, ready-to-use design styles.",
    },
    {
      icon: "🖌️",
      title: "Fully Customizable",
      description: "Adjust colours, fonts, layout and size to match your exact needs.",
    },
    {
      icon: "📤",
      title: "Easy Export & Share",
      description: "Download in high resolution or share a link with a single click.",
    },
    {
      icon: "🌍",
      title: "Multi-language Support",
      description: "Generate posters with text in multiple languages effortlessly.",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your designs and data are safely stored and never shared.",
    },
  ];

  // Data for testimonials section
  const testimonials = [
    {
      name: "Ananya Sharma",
      role: "Event Organizer",
      quote:
        "AI Poster Designer cut down my design time from hours to minutes. My event posters have never looked this professional!",
      avatar: "👩‍💼",
    },
    {
      name: "Rohit Verma",
      role: "Small Business Owner",
      quote:
        "I used to hire a designer for every sale banner. Now I create them myself in seconds, and they look amazing.",
      avatar: "🧑‍💻",
    },
    {
      name: "Priya Nair",
      role: "College Student",
      quote:
        "Perfect for club events and fests! Super easy to use even if you have zero design experience.",
      avatar: "👩‍🎓",
    },
  ];

  // Data for FAQ section
  const faqs = [
    {
      question: "Do I need design experience to use this tool?",
      answer:
        "Not at all! Just describe what you want, and our AI takes care of the design work for you.",
    },
    {
      question: "Can I edit the poster after it's generated?",
      answer:
        "Yes, you can adjust colours, text, and layout right from your dashboard before downloading.",
    },
    {
      question: "What formats can I download my poster in?",
      answer:
        "You can export your posters as high-resolution PNG or PDF files, ready for print or social media.",
    },
    {
      question: "Is there a free plan available?",
      answer:
        "Yes, you can sign up for free and generate a limited number of posters every month.",
    },
  ];

  // State to track which FAQ item is currently open (accordion behaviour)
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="home-page">
      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-badge">🚀 Powered by Generative AI</div>
          <h1 className="hero-title">
            Create Stunning Posters with <span className="highlight">AI</span> in Seconds
          </h1>
          <p className="hero-subtitle">
            Turn your ideas into eye-catching, professional posters instantly. No design
            skills needed — just describe it, and let AI do the rest.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn-primary">
              Get Started
            </Link>
            <button className="btn-outline">▶ Watch Demo</button>
          </div>
        </div>

        {/* Decorative gradient blobs for visual flair */}
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">Everything You Need to Design Faster</h2>
          <p className="section-subtitle">
            Powerful AI features packed into a simple, beautiful interface.
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section className="section how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Three simple steps to your perfect poster.
          </p>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Describe Your Idea</h3>
              <p>Tell us about your event, product, or campaign in a few words.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>AI Generates Designs</h3>
              <p>Our AI creates multiple poster options based on your description.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Customize & Download</h3>
              <p>Fine-tune colours and layout, then download or share instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">Loved by Creators Everywhere</h2>
          <p className="section-subtitle">
            Don't just take our word for it — hear from our users.
          </p>

          <div className="testimonials-grid">
            {testimonials.map((t, index) => (
              <div className="testimonial-card" key={index}>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <span className="testimonial-avatar">{t.avatar}</span>
                  <div>
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know before getting started.</p>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                className={`faq-item ${openFaqIndex === index ? "active" : ""}`}
                key={index}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h4>{faq.question}</h4>
                  <span className="faq-icon">{openFaqIndex === index ? "−" : "+"}</span>
                </div>
                {openFaqIndex === index && <p className="faq-answer">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="cta-section">
        <div className="container cta-container">
          <h2>Ready to design your next poster?</h2>
          <p>Join thousands of creators using AI Poster Designer today.</p>
          <Link to="/signup" className="btn-primary">
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
