import React, { useState } from 'react';
import { submitContact } from '../utils/api';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await submitContact({ name, email, message });
      setOk('Message sent — I will respond within 48 hours.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (e: any) {
      setErr(e.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="field">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="field">
        <label>Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} required />
      </div>

      <div className="form-submit">
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Sending…' : 'Send Message'}</button>
        {ok && <div className="text-sm text-green-400 ml-3">{ok}</div>}
        {err && <div className="text-sm text-red-400 ml-3">{err}</div>}
      </div>
    </form>
  );
};

export default ContactForm;
