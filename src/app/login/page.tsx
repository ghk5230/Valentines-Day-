import { LoginForm } from '@/components/LoginForm';
import { BackgroundSlideshow } from '@/components/BackgroundSlideshow';
import { siteContent } from '@/content/content';

export default function LoginPage() {
  return (
    <main className="min-h-screen-safe flex items-end justify-center p-4 pb-16 relative overflow-hidden">
      {/* Background slideshow */}
      <BackgroundSlideshow />

      <LoginForm content={siteContent.login} />
    </main>
  );
}
