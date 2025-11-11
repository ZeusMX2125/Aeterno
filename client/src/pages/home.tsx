import { useState } from 'react';
import Hook from '@/components/Hook';
import Scene1_Photography from '@/components/Scene1_Photography';
import Scene2_WebDev from '@/components/Scene2_WebDev';
import Scene3_SMM from '@/components/Scene3_SMM';
import OtherCapabilities from '@/components/OtherCapabilities';
import QuoteIntake from '@/components/QuoteIntake';
import Footer from '@/components/Footer';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openModal = (service: string) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService('');
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Hook openModal={openModal} />
      <Scene1_Photography openModal={openModal} />
      <Scene2_WebDev openModal={openModal} />
      <Scene3_SMM openModal={openModal} />
      <OtherCapabilities />
      <Footer />
      
      <QuoteIntake
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedService={selectedService}
      />
    </div>
  );
}
