import { useState } from 'react';
import Hook from '@/components/Hook';
import Marquee from '@/components/Marquee';
import Scene1_Photography from '@/components/Scene1_Photography';
import Scene2_WebDev from '@/components/Scene2_WebDev';
import Scene3_SMM from '@/components/Scene3_SMM';
import Statistics from '@/components/Statistics';
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
    <div className="w-full overflow-x-hidden bg-black">
      <Hook openModal={openModal} />
      <Marquee />
      <Scene1_Photography openModal={openModal} />
      <Scene2_WebDev openModal={openModal} />
      <Scene3_SMM openModal={openModal} />
      <Statistics />
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
