const Privacy = () => (
  <div className="container py-8 sm:py-12">
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">Privacy</h1>

      <div className="rounded-xl bg-card p-6 sm:p-8 emoji-card-shadow">
        <p className="text-lg leading-relaxed text-foreground">
          <span className="text-2xl mr-2">🔒</span>
          emojis.rsvp collects absolutely nothing about you. No cookies. No analytics. No ads.
          No accounts. Your searches stay on your device. We built this because emoji tools
          shouldn't spy on you.
        </p>
      </div>

      <div className="mt-8 space-y-4 text-sm text-muted-foreground">
        <div className="flex items-start gap-3">
          <span className="text-lg">🚫</span>
          <div>
            <p className="font-medium text-foreground">No tracking scripts</p>
            <p>Zero third-party scripts. No Google Analytics, no Facebook pixel, nothing.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-lg">🍪</span>
          <div>
            <p className="font-medium text-foreground">No cookies</p>
            <p>We don't set any cookies. No cookie banners because there are no cookies.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-lg">📡</span>
          <div>
            <p className="font-medium text-foreground">No server calls</p>
            <p>All search and filtering happens entirely in your browser. No data leaves your device.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-lg">👤</span>
          <div>
            <p className="font-medium text-foreground">No accounts</p>
            <p>No sign-up, no login, no email collection. Just emojis.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-lg">💰</span>
          <div>
            <p className="font-medium text-foreground">No ads</p>
            <p>No ads, no sponsored content, no affiliate links. Ever.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Privacy;
