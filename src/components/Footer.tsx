import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-notebook-light border-t-3 border-notebook-dark py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="font-handwritten text-xl text-notebook-dark">
          © 2025. Built with <Heart className="inline w-5 h-5 text-red-500 fill-red-500" /> using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-notebook-dark hover:underline font-bold"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
