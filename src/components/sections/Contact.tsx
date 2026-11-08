import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink,
  MessageCircle,
  Sparkles
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { data, addContactMessage } = usePortfolio();
  const { profile } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Research Collaboration',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Save to admin inbox
    setTimeout(() => {
      addContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Research Collaboration',
        message: ''
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-slate-100/60 dark:bg-navy-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full mb-3">
            <span>Direct Channels</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Get in Touch
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Open to prospective graduate advisors (MSc/PhD), research collaborators, engineering inquiries, and academic networking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Details & Availability */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 shadow-sm space-y-6">
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Contact Information
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Feel free to reach out via email, phone, or any research platform.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-4 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-navy-900 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Official Email</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-500 transition-colors">
                      {profile.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-navy-900 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Phone & WhatsApp</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 transition-colors">
                      {profile.phone}
                    </span>
                  </div>
                </a>

                <div className="flex items-start space-x-3 p-3 rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Location</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {profile.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Quick Link */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/8801778332062?text=Hello%20Md.%20Al%20Emran,%20I%20visited%20your%20portfolio%20website...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat directly on WhatsApp</span>
                </a>
              </div>

              {/* Status Note */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900/60 border border-slate-200/80 dark:border-navy-800 text-xs space-y-1">
                <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                  <span>Graduate Admission & Research Status</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Actively preparing graduate school applications (MSc / PhD in Electrical Engineering / AI for Power Systems). Open to discussing research proposals and lab openings.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Your message is stored securely and delivered to my personal dashboard.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Thank You! Message Received.
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Your message has been delivered to Md. Al Emran's inbox. You will receive a response at your email address shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Prof. / Dr. / Engr. John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john.doe@university.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Subject / Inquiry Type
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="Graduate Studies / MSc-PhD Inquiry">Graduate Studies / MSc-PhD Inquiry</option>
                      <option value="Research Collaboration">Research Collaboration</option>
                      <option value="Paper & Preprint Discussion">Paper & Preprint Discussion</option>
                      <option value="DWDM / Optical Engineering Query">DWDM / Optical Engineering Query</option>
                      <option value="IEEE / Academic Invitation">IEEE / Academic Invitation</option>
                      <option value="General Message">General Message</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your research inquiry or proposal here..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-brand-500/25 transition-all w-full sm:w-auto disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
