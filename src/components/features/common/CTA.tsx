import React, { useState } from 'react';
import { ContactCard } from '@/components/ui/contact-card';
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const FORM_SUBMIT_URL = 'https://formsubmit.co/ajax/info@stellarwave.in';

const CTA: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: `New enquiry from ${form.name} — Stellar Wave`,
          _captcha: 'false',
          _cc: 'stellarwavemarketing@gmail.com',
        }),
      });
      const data = await res.json();
      if (data.success === 'true' || data.success === true) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        const msg: string = data.message ?? '';
        setErrorMsg(
          msg.toLowerCase().includes('activation') || msg.toLowerCase().includes('confirm')
            ? '📬 Check info@stellarwave.in for a confirmation email from FormSubmit and click the link, then resubmit.'
            : `FormSubmit error: ${msg || 'Unknown error'}`
        );
        setStatus('error');
      }
    } catch (err) {
      console.error('Form submit error:', err);
      setErrorMsg('Network error — please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <section className="py-24 relative z-20 bg-white text-black dark:bg-black dark:text-white transition-colors duration-300" id="contact">
      <div className="mx-auto max-w-5xl px-4">
        <ContactCard
          title="Get in touch"
          description="If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day."
          contactInfo={[
            { icon: MailIcon, label: 'Email', value: 'info@stellarwave.in' },
            { icon: PhoneIcon, label: 'Phone', value: '+91 81241 79141' },
            { icon: MapPinIcon, label: 'Address', value: '10th Floor, Gee Gee Crystals, 91, Dr Radha Krishnan Salai, Mylapore, Chennai, Tamil Nadu 600004', className: 'col-span-2' },
          ]}
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
              <div className="text-4xl">✅</div>
              <p className="text-lg font-semibold text-green-500">Message sent!</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                We'll get back to you within 1 business day.
              </p>
              <Button variant="outline" className="mt-4" onClick={() => setStatus('idle')}>
                Send another
              </Button>
            </div>
          ) : (
            <form className="w-full space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name" name="name" type="text" placeholder="Your name"
                  value={form.name} onChange={handleChange} required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email" name="email" type="email" placeholder="your@email.com"
                  value={form.email} onChange={handleChange} required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone" name="phone" type="tel" placeholder="+91 81241 79141"
                  value={form.phone} onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message" name="message" placeholder="Tell us about your project..."
                  value={form.message} onChange={handleChange} required
                />
              </div>
              {status === 'error' && (
                <p className="text-sm text-red-500">{errorMsg || 'Something went wrong. Please try again.'}</p>
              )}
              <Button className="w-full" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Submit'}
              </Button>
            </form>
          )}
        </ContactCard>
      </div>
    </section>
  );
};

export default CTA;