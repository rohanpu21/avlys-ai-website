const Footer = () => {
  return (
    <footer className="border-t border-[var(--border-subtle)] px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 text-sm text-[var(--muted)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--foreground)]">Avlys AI</p>
            <p className="mt-3 max-w-md text-sm leading-6">
              AI automation, calling agents, chatbots, custom platforms, and support systems for businesses
              in India and globally.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a href="mailto:official@avlysai.com" className="transition-opacity hover:opacity-50">
              official@avlysai.com
            </a>
            <a href="tel:+919337709699" className="transition-opacity hover:opacity-50">
              +91 93377 09699
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)] sm:flex-row sm:justify-between">
          <span>Hyderabad, India / Remote-first</span>
          <span>2026 Avlys AI. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
