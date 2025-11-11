import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface QuoteIntakeProps {
  isModalOpen: boolean;
  closeModal: () => void;
  selectedService: string;
}

const services = [
  'Photography',
  'Video Editing',
  'Image Editing',
  'Website Development',
  'App Development',
  'Social Media Marketing',
  'Graphic Design',
  'Copywriting',
];

export default function QuoteIntake({ isModalOpen, closeModal, selectedService }: QuoteIntakeProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: selectedService || '',
    budget: 5000,
    name: '',
    email: '',
  });

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  useEffect(() => {
    if (!isModalOpen) {
      setCurrentStep(1);
    }
  }, [isModalOpen]);

  const handleServiceSelect = (service: string) => {
    setFormData({ ...formData, service });
  };

  const handleBudgetChange = (value: number[]) => {
    setFormData({ ...formData, budget: value[0] });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Quote Form Submitted:', formData);
    setFormData({
      service: '',
      budget: 5000,
      name: '',
      email: '',
    });
    setCurrentStep(1);
    closeModal();
  };

  const canProceed = () => {
    if (currentStep === 1) return formData.service !== '';
    if (currentStep === 2) return true;
    if (currentStep === 3) return formData.name !== '' && formData.email !== '';
    return false;
  };

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={closeModal}
      data-testid="modal-quote-backdrop"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 md:p-12 relative"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-quote-content"
      >
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          data-testid="button-close-modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-all ${
                  step <= currentStep ? 'bg-brand-orange' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          
          <p className="text-center text-sm font-body text-gray-500">
            Step {currentStep} of 3
          </p>
        </div>

        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="font-title text-3xl font-bold text-brand-dark-text text-center">
              What service do you need?
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {services.map((service) => (
                <button
                  key={service}
                  onClick={() => handleServiceSelect(service)}
                  className={`font-body text-sm py-3 px-4 rounded-lg border-2 transition-all ${
                    formData.service === service
                      ? 'bg-brand-orange text-white border-brand-orange'
                      : 'bg-white text-brand-dark-text border-brand-light-gray hover-elevate'
                  }`}
                  data-testid={`button-service-${service.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="font-title text-3xl font-bold text-brand-dark-text text-center">
              What's your budget?
            </h3>
            
            <div className="space-y-8">
              <div className="text-center">
                <p className="font-title text-5xl font-bold text-brand-orange">
                  ${formData.budget.toLocaleString()}
                </p>
                <p className="font-body text-gray-500 mt-2">Estimated project budget</p>
              </div>

              <Slider
                value={[formData.budget]}
                onValueChange={handleBudgetChange}
                min={1000}
                max={50000}
                step={500}
                className="w-full"
                data-testid="slider-budget"
              />

              <div className="flex justify-between font-body text-sm text-gray-500">
                <span>$1,000</span>
                <span>$50,000</span>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="font-title text-3xl font-bold text-brand-dark-text text-center">
              Let's get in touch
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="font-body text-brand-dark-text mb-2">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-12 border-brand-light-gray focus:border-brand-orange focus:ring-brand-orange"
                  placeholder="John Doe"
                  data-testid="input-name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="font-body text-brand-dark-text mb-2">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12 border-brand-light-gray focus:border-brand-orange focus:ring-brand-orange"
                  placeholder="john@example.com"
                  data-testid="input-email"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          {currentStep > 1 && (
            <Button
              onClick={() => setCurrentStep(currentStep - 1)}
              variant="outline"
              className="flex-1 h-12 font-body"
              data-testid="button-back"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}

          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className={`flex-1 h-12 font-body bg-brand-orange hover:bg-brand-orange/90 ${
                currentStep === 1 ? 'w-full' : ''
              }`}
              data-testid="button-next"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="flex-1 h-12 font-body bg-brand-orange hover:bg-brand-orange/90"
              data-testid="button-submit"
            >
              Schedule Your Consultation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
