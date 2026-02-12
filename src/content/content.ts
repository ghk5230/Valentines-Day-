// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EDIT THIS FILE to customize your Valentine's Day website.
// All text, photos, playlist, and timeline entries live here.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const siteContent = {
  /* ──────────────────────────────────────────────────────────────
     LOGIN PAGE
     ────────────────────────────────────────────────────────────── */
  login: {
    title: 'DEAR മാളു',
    subtitle: "I hope you like what I've come up with. It may not be perfect but I've poured my heart and soul into this because this is the first Valentine's gift (handmade you could say) I'm giving to someone. Enter the day we first melted into an embrace DD/MM/YYYY.",
    hint: '',
    placeholder: 'Enter our secret passphrase…',
    buttonText: 'Enter our little world ❤️',
    errorMessage: 'Try again Maloottti 💝',
  },

  /* ──────────────────────────────────────────────────────────────
     HERO SECTION  (first thing she sees after login)
     ────────────────────────────────────────────────────────────── */
  hero: {
    greeting: "Happy Valentine's Day",
    name: 'DEAR മാളു',
    message: '',
    startButtonText: 'Click here ❤️',
  },

  /* ──────────────────────────────────────────────────────────────
     PHOTOS
     Place your image files in  public/photos/
     Supported formats: .jpg .jpeg .png .webp .svg
     ────────────────────────────────────────────────────────────── */
  photos: [
    { filename: '20250604_211854_-_Copy.jpg', caption: 'Where it all began' },
    { filename: '20250604_211923.jpg', caption: 'A stolen moment' },
    { filename: '20250604_215545.jpg', caption: 'That magical evening' },
    { filename: '20250607_170451_-_Copy.jpg', caption: 'Together again' },
    { filename: '20250607_170515.jpg', caption: 'Sun-kissed days with you' },
    { filename: '20250607_202930.jpg', caption: 'Our little world' },
    { filename: '20250704_105045.jpg', caption: 'Making memories' },
    { filename: '20250704_110642.jpg', caption: 'Adventures with you' },
    { filename: '20250725_100040.jpg', caption: 'My favorite view' },
    { filename: '20250725_120611.jpg', caption: 'Golden hour walks' },
    { filename: '20250803_095353.jpg', caption: 'Our favorite spot' },
    { filename: '20250803_095356.jpg', caption: 'Smiles and sunshine' },
    { filename: '20250803_095521.jpg', caption: 'Lost in the moment' },
    { filename: '20250803_095546.jpg', caption: 'Your beautiful smile' },
    { filename: '20250803_100132.jpg', caption: 'Heart full of love' },
    { filename: '20250803_100136.jpg', caption: 'Every second counts' },
    { filename: '20250803_100212.jpg', caption: 'Forever grateful' },
    { filename: '20250803_100436.jpg', caption: 'Beautiful memories' },
    { filename: '20250803_100948.jpg', caption: 'Warmth in your eyes' },
    { filename: '20250821_130753.jpg', caption: 'Another perfect day' },
    { filename: '20250915_143013(1).jpg', caption: 'Us, always' },
    { filename: 'IMG-20250705-WA0043.jpg', caption: 'Forever us ❤️' },
  ],

  /* ──────────────────────────────────────────────────────────────
     PLAYLIST
     Place your audio files in  public/music/
     Supported formats: .mp3 .m4a .ogg .wav
     ────────────────────────────────────────────────────────────── */
  playlist: [
    { filename: 'Janum_Janum.mp3', title: 'Janam Janam — Dilwale' },
    { filename: 'Mozhikalum (PenduJatt.Com.Se).mp3', title: 'Mozhikalum' },
    { filename: 'Sundari.mp3', title: 'Sundari' },
    { filename: 'Te_amo.mp3', title: 'Te Amo' },
  ],

  /* ──────────────────────────────────────────────────────────────
     MEMORY TIMELINE
     Each entry appears as a scroll‑reveal card with your photo.
     The `photo` field should match a filename in public/photos/.
     ────────────────────────────────────────────────────────────── */
  timeline: [
    {
      date: 'January 2024',
      title: 'The Day We Met',
      text: 'I walked in and saw you, and the whole world went quiet. I knew right then something wonderful was about to begin.',
      photo: '20250803_095353.jpg',
    },
    {
      date: 'March 2024',
      title: 'Our First Date',
      text: 'Nervous laughter, stolen glances, and a connection that felt like it had existed forever.',
      photo: '20250803_095521.jpg',
    },
    {
      date: 'July 2024',
      title: 'Summer of Us',
      text: 'Road trips, beach sunsets, and late-night conversations that made me fall deeper in love with you every day.',
      photo: '20250803_100132.jpg',
    },
    {
      date: 'December 2024',
      title: 'Holiday Magic',
      text: 'Our first holiday season together — hot chocolate, fairy lights, and your smile that outshines them all.',
      photo: '20250803_100436.jpg',
    },
    {
      date: 'February 2026',
      title: "This Valentine's Day",
      text: "Every day with you is Valentine's Day. But today, I wanted to make it extra special — just like you make my life.",
      photo: 'IMG-20250705-WA0043.jpg',
    },
  ],

  /* ──────────────────────────────────────────────────────────────
     CLOSING SECTION
     ────────────────────────────────────────────────────────────── */
  closing: {
    message: 'I Love You ❤️',
    signature: 'Forever & Always',
    name: '— Your Valentine',
  },
};
