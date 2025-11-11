import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';
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
    services: [] as string[],
    budget: 5000,
    name: '',
    email: '',
  });

  useEffect(() => {
    if (selectedService && !formData.services.includes(selectedService)) {
      setFormData((prev) => ({ ...prev, services: [selectedService] }));
    }
  }, [selectedService]);

  useEffect(() => {
    if (!isModalOpen) {
      setCurrentStep(1);
    }
  }, [isModalOpen]);

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const isSelected = prev.services.includes(service);
      return {
        ...prev,
        services: isSelected
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
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
      services: [],
      budget: 5000,
      name: '',
      email: '',
    });
    setCurrentStep(1);
    closeModal();
  };

  const canProceed = () => {
    if (currentStep === 1) return formData.services.length > 0;
    if (currentStep === 2) return true;
    if (currentStep === 3) return formData.name !== '' && formData.email !== '';
    return false;
  };

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-4"
      onClick={closeModal}
      data-testid="modal-quote-backdrop"
    >
      <div
        className="bg-card border border-border rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-10 relative"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-quote-content"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5"
          data-testid="button-close-modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-all ${
                  step <= currentStep ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
          
          <p className="text-center text-sm font-body text-muted-foreground">
            Step {currentStep} of 3
          </p>
        </div>

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-primary font-body text-xs uppercase tracking-wider mb-2">
                SELECT SERVICES
              </p>
              <h3 className="font-title text-3xl md:text-4xl font-bold text-white uppercase">
                What services do you need?
              </h3>
              {formData.services.length > 0 && (
                <p className="text-muted-foreground text-sm mt-3">
                  {formData.services.length} service{formData.services.length !== 1 ? 's' : ''} selected
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {services.map((service) => {
                const isSelected = formData.services.includes(service);
                return (
                  <button
                    key={service}
                    onClick={() => handleServiceToggle(service)}
                    className={`font-body text-sm py-3 px-4 rounded-xl border transition-all relative ${
                      isSelected
                        ? 'bg-primary text-white border-primary glow-orange'
                        : 'bg-background text-white border-border hover:border-primary/50 hover-elevate'
                    }`}
                    data-testid={`button-service-${service.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {isSelected && (
                      <Check className="w-4 h-4 absolute top-2 right-2" />
                    )}
                    {service}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-primary font-body text-xs uppercase tracking-wider mb-2">
                SET BUDGET
              </p>
              <h3 className="font-title text-3xl md:text-4xl font-bold text-white uppercase">
                What's your budget?
              </h3>
            </div>
            
            <div className="space-y-8">
              <div className="text-center glass rounded-2xl p-8">
                <p className="font-title text-6xl md:text-7xl font-bold text-primary text-glow-orange">
                  ${formData.budget.toLocaleString()}
                </p>
                <p className="font-body text-muted-foreground mt-3">Estimated project budget</p>
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

              <div className="flex justify-between font-body text-sm text-muted-foreground">
                <span>$1,000</span>
                <span>$50,000</span>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-primary font-body text-xs uppercase tracking-wider mb-2">
                CONTACT INFO
              </p>
              <h3 className="font-title text-3xl md:text-4xl font-bold text-white uppercase">
                Let's get in touch
              </h3>
            </div>
            
            <div className="space-y-5">
              <div>
                <Label htmlFor="name" className="font-body text-white mb-2 text-sm">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-12 bg-background border-border focus:border-primary focus:ring-primary text-white"
                  placeholder="John Doe"
                  data-testid="input-name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="font-body text-white mb-2 text-sm">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12 bg-background border-border focus:border-primary focus:ring-primary text-white"
                  placeholder="john@example.com"
                  data-testid="input-email"
                />
              </div>

              {/* Summary of selected services */}
              <div className="glass rounded-xl p-4 mt-6">
                <p className="text-white text-sm font-semibold mb-2">Selected Services:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.services.map((service) => (
                    <span
                      key={service}
                      className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          {currentStep > 1 && (
            <Button
              onClick={() => setCurrentStep(currentStep - 1)}
              variant="outline"
              className="flex-1 h-12 font-body border-border hover:border-primary/50"
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
              className={`flex-1 h-12 font-body bg-primary hover:bg-primary/90 glow-orange ${
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
              className="flex-1 h-12 font-body bg-primary hover:bg-primary/90 glow-orange"
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
