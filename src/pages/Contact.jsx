import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { content } from '../data/brands';
import FormField from '../components/ui/FormField';
import Button from '../components/ui/Button';

const projectTypes = [
  { value: 'brand-identity', label: 'Brand Identity' },
  { value: 'logo-design', label: 'Logo Design' },
  { value: 'packaging', label: 'Packaging Design' },
  { value: 'illustration', label: 'Illustration' },
  { value: 'corporate', label: 'Corporate Collateral' },
  { value: 'other', label: 'Other' },
];

const budgetRanges = [
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k+', label: '$50,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
];

const timelines = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-2-months', label: '1-2 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: 'flexible', label: 'Flexible' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heroRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // Animate on mount
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      heroRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    ).fromTo(
      formRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);

    // Animate success state
    gsap.fromTo(
      formRef.current,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div ref={formRef} className="text-center max-w-lg">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-8 h-8 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-light mb-4 text-white">Message Sent</h2>
          <p className="text-gray-400 mb-8 whitespace-pre-line">
            {content.contact.success}
          </p>
          <Button to="/" variant="secondary">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header ref={heroRef} className="pt-20 pb-12 px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-8">
            Get a Quote
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl whitespace-pre-line">
            {content.contact.intro}
          </p>
        </div>
      </header>

      {/* Form */}
      <div ref={formRef} className="max-w-[1800px] mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form Column */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Name"
                name="name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Company */}
            <FormField
              label="Company"
              name="company"
              placeholder="Company name (optional)"
              value={formData.company}
              onChange={handleChange}
            />

            {/* Project Type */}
            <FormField
              label="Project Type"
              name="projectType"
              type="select"
              placeholder="Select project type"
              required
              options={projectTypes}
              value={formData.projectType}
              onChange={handleChange}
            />

            {/* Budget & Timeline Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Budget Range"
                name="budget"
                type="select"
                placeholder="Select budget"
                options={budgetRanges}
                value={formData.budget}
                onChange={handleChange}
              />
              <FormField
                label="Timeline"
                name="timeline"
                type="select"
                placeholder="Select timeline"
                options={timelines}
                value={formData.timeline}
                onChange={handleChange}
              />
            </div>

            {/* Message */}
            <FormField
              label="Project Details"
              name="message"
              type="textarea"
              placeholder="Tell us about your project..."
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
            />

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>

          {/* Contact Info Column */}
          <div className="lg:pl-12">
            <div className="sticky top-32 space-y-12">
              {/* Email */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                  Email
                </h3>
                <a
                  href="mailto:cy@cryodesign.com"
                  className="text-xl text-white hover:text-gray-400 transition-colors"
                >
                  cy@cryodesign.com
                </a>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                  Location
                </h3>
                <p className="text-xl text-white">
                  Los Angeles, CA
                </p>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                  Follow
                </h3>
                <div className="flex gap-6">
                  <a
                    href="#"
                    className="text-white hover:text-gray-400 transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="text-white hover:text-gray-400 transition-colors"
                  >
                    Dribbble
                  </a>
                  <a
                    href="#"
                    className="text-white hover:text-gray-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
