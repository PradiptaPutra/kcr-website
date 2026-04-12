import React, { useState } from 'react';
import { kcrData } from '../data/kcrData';

const LeadGenerator: React.FC = () => {
  const [selectedService, setSelectedService] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    industry: '',
    requirements: ''
  });

  const industries = ['Infrastructure', 'Industrial', 'Commercial', 'Residential', 'Public Works', 'Other'];
  
  const allServices = kcrData.services.map(s => s.title);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="bg-black text-white p-12 md:p-24 min-h-[600px] flex flex-col justify-center border border-white/10">
      <div className="max-w-2xl mx-auto w-full">
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-8 block font-sans">Strategic Engagement / Project Inquiry</span>
        
        {step === 1 && (
          <div className="animate-fade-up">
            <h2 className="font-serif-italic text-4xl md:text-5xl mb-12 leading-tight">
              Request a <span className="italic text-white/50">Technical</span> Consultation.
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-white/60 mb-8 font-light">Select the service area for your project inquiry.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allServices.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedService(p); handleNext(); }}
                    className={`text-left p-6 border text-sm tracking-widest uppercase transition-all duration-500 ${selectedService === p ? 'bg-white text-black' : 'border-white/10 hover:border-white/40'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-up">
            <h2 className="font-serif-italic text-4xl mb-12 leading-tight">Project <span className="italic text-white/50">Context.</span></h2>
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-3">Project Sector</label>
                  <select 
                    className="w-full bg-transparent border-b border-white/20 py-2 text-sm focus:outline-none focus:border-white transition-colors"
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  >
                    <option value="" className="bg-black">Select...</option>
                    {industries.map(ind => <option key={ind} value={ind} className="bg-black">{ind}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-3">Project Location</label>
                  <input 
                    type="text"
                    className="w-full bg-transparent border-b border-white/20 py-2 text-sm focus:outline-none focus:border-white transition-colors"
                    placeholder="City / Region"
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  />
                </div>
              </div>
              <button 
                onClick={handleNext}
                className="w-full py-6 border border-white/40 text-sm tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-500"
              >
                Continue Consultation
              </button>
              <button onClick={handleBack} className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Back</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-up">
            <h2 className="font-serif-italic text-4xl mb-12 leading-tight">Contact <span className="italic text-white/50">Authorization.</span></h2>
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-8">
                <input 
                  className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-white transition-colors font-light"
                  placeholder="Full Name"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-white transition-colors font-light"
                  placeholder="Organization / Company"
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                By submitting, you authorize {kcrData.company.name} to contact you regarding your project inquiry. All data is handled according to Indonesian PDP regulations.
              </p>
              <button 
                className="w-full py-8 bg-white text-black text-sm tracking-[0.4em] uppercase hover:bg-white/90 transition-all duration-500 font-medium"
                onClick={() => {
                  console.log('Inquiry Captured:', { selectedService, ...formData });
                  alert('Thank you. A technical strategist will contact you shortly.');
                  setStep(1);
                }}
              >
                Submit Inquiry
              </button>
              <button onClick={handleBack} className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Back</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadGenerator;
