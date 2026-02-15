import React from 'react';
import { ContactCard } from '@/components/ui/contact-card';
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const CTA: React.FC = () => {
  return (
    <section className="py-24 relative z-20 bg-white text-black dark:bg-black dark:text-white transition-colors duration-300" id="contact">
      <div className="mx-auto max-w-5xl px-4">
        <ContactCard
          title="Get in touch"
          description="If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day."
          contactInfo={[
            {
              icon: MailIcon,
              label: 'Email',
              value: 'contact@stellarwave.dev',
            },
            {
              icon: PhoneIcon,
              label: 'Phone',
              value: '+1 (555) 123-4567',
            },
            {
              icon: MapPinIcon,
              label: 'Address',
              value: 'Chennai, India',
              className: 'col-span-2',
            }
          ]}
        >
          <form className="w-full space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input type="text" placeholder="Your name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Phone</Label>
              <Input type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Message</Label>
              <Textarea placeholder="Tell us about your project..." />
            </div>
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </ContactCard>
      </div>
    </section>
  );
};

export default CTA;