'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGE = `Enth Parayaana Maalu. This is the first time I'm giving someone something "handmade", I'm really glad that its you. I'm still a bit disheartened that I could not build this gift to the grand extend I imagined, because you deserve the best. It may seem basic but know that it took considerable effort and a stubborn heart that would re-code from beginning with bits and pieces that remained after deleting. But there is invisible love in each and every pixel you see in your screen.

Now, excuses aside, I love you. Love you to the moon and back. I know things have not been as they should lately, I really pray that we settle our differences and uncertainities, in the upcoming days and form the unbreakable bond we always dreamt of.

Happy Valentines Day my CAPYkutti, can't wait to recieve you at the airport and smother you with kisses. Cant wait for those days we're gonna cuddle up, go binge eating , travel and make make memories that last a lifetime. Cant wait for the days we rock the bed and lie down staring into each others souls, sweaty and savouring each other till we slide into deep sleep. Cant wait for the days I wake up next to you, your drooling face in deep slumber the first thing I see every morning. Can't wait for the days we cook together, clean together and pretty much everything together. I miss your taste and I wanna taste you everyday for the rest of my days.

I love you, dear Maalu. But these few lines on the screen can't measure the depth of emotion I feel for you. I really hope that I could be expressive enough to convey the depth of it when I finally have you in my arms soon( which i will btw)

I'm praying for you every day. So, see you soon.

PS: Can't wait for the day that I will finally make you mine in front of the whole world. Sending you a capybara messenger with virtual flowers and chocolates`;

function TypewriterText({ text, speed = 25 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const idx = useRef(0);

  useEffect(() => {
    idx.current = 0;
    setDisplayed('');
    const timer = setInterval(() => {
      idx.current += 1;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-left">
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-rose-500 ml-0.5 align-middle"
        />
      )}
    </p>
  );
}

export function LoveLetter() {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="max-w-2xl mx-auto text-center"
    >
      <h2 className="font-serif text-3xl sm:text-4xl text-rose-800 mb-6">
        Dear Malootti 💕
      </h2>

      {!opened ? (
        /* ── Sealed envelope ── */
        <motion.div
          className="relative cursor-pointer mx-auto max-w-md"
          onClick={() => setOpened(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Envelope body */}
          <div className="bg-gradient-to-b from-rose-200 to-rose-300 rounded-2xl p-8 sm:p-12 shadow-xl
                        border-2 border-rose-300 relative overflow-hidden">
            {/* Envelope flap (triangle) */}
            <div className="absolute top-0 left-0 right-0">
              <svg viewBox="0 0 400 100" className="w-full" preserveAspectRatio="none">
                <polygon points="0,0 400,0 200,100" fill="#e8b4b8" />
                <polygon points="0,0 400,0 200,100" fill="none" stroke="#dba0a6" strokeWidth="2" />
              </svg>
            </div>

            {/* Heart seal */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 flex flex-col items-center gap-3 pt-6"
            >
              <span className="text-5xl">💌</span>
              <p className="text-rose-700 font-serif text-lg italic">
                Every heartbeat wrote a line in here...
                <br />
                <span className="text-rose-500 text-sm mt-1 inline-block">Tap to read</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        /* ── Opened letter ── */
        <AnimatePresence>
          <motion.div
            initial={{ rotateX: -90, opacity: 0, transformOrigin: 'top' }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.2 }}
          >
            <div className="rounded-2xl p-6 sm:p-10 bg-gradient-to-br from-rose-50 to-pink-50
                          border-2 border-rose-200 shadow-lg relative">
              {/* Paper texture lines */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e8b4b8 28px)',
                }}
              />
              <div className="relative z-10">
                <TypewriterText text={MESSAGE} speed={20} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
