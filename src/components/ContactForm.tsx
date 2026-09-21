import { useState, type SubmitEvent } from 'react';

const SERVICES = [
  'Link Building',
  'Digital PR',
  'SEO',
  'Influencer Marketing',
  'Agency Partnerships',
  'Not sure yet',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? 'Something went wrong. Please try again.');
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-ink/10 bg-paper-dim p-8 text-center dark:border-paper/10 dark:bg-ink-soft">
        <p className="font-display text-xl font-semibold">Message sent.</p>
        <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">
          We'll reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-ink/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-paper/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-ink/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-paper/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="text-sm font-medium">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          autoComplete="organization"
          className="mt-2 w-full rounded-xl border border-ink/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-paper/20"
        />
      </div>

      <div>
        <label htmlFor="service" className="text-sm font-medium">
          What are you interested in?
        </label>
        <select
          id="service"
          name="service"
          required
          defaultValue=""
          className="mt-2 w-full rounded-xl border border-ink/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-paper/20"
        >
          <option value="" disabled>
            Select a service
          </option>
          {SERVICES.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Tell us a bit about what you need
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-2 w-full rounded-xl border border-ink/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-paper/20"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60 dark:bg-paper dark:text-ink"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
