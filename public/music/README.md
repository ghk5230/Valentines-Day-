# Music

Place your audio files here. Supported formats: `.mp3`, `.m4a`, `.ogg`, `.wav`

Then update the filenames in `src/content/content.ts` → `playlist` array.

Example:
1. Copy `perfect-ed-sheeran.mp3` into this folder
2. In `content.ts`, change `{ filename: 'song1.mp3', title: '...' }` to `{ filename: 'perfect-ed-sheeran.mp3', title: 'Perfect — Ed Sheeran' }`

Tip: MP3 is the safest format for iOS Safari compatibility.
If no audio files are present, the player will still render but won't play anything.
