'use client';

import { useState, useEffect } from 'react';

interface DebugPanelProps {
  audioElement: HTMLAudioElement | null;
}

export function DebugPanel({ audioElement }: DebugPanelProps) {
  const [info, setInfo] = useState<Record<string, string>>({});

  useEffect(() => {
    const update = () => {
      const data: Record<string, string> = {};

      if (typeof navigator !== 'undefined') {
        data['User Agent'] = navigator.userAgent;
      }
      if (typeof screen !== 'undefined') {
        data['Screen'] = `${screen.width}×${screen.height}`;
      }
      if (typeof window !== 'undefined') {
        data['Viewport'] = `${window.innerWidth}×${window.innerHeight}`;
        data['DPR'] = `${window.devicePixelRatio}`;
        data['100vh px'] = `${window.innerHeight}`;
      }
      if (typeof document !== 'undefined') {
        const style = getComputedStyle(document.documentElement);
        data['Safe top'] = style.getPropertyValue('--sat') || '0px';
        data['Safe bottom'] = style.getPropertyValue('--sab') || '0px';
      }

      data['Audio element'] = audioElement ? 'exists' : 'null';
      if (audioElement) {
        data['Audio src'] = audioElement.src || 'none';
        data['Audio paused'] = String(audioElement.paused);
        data['Audio readyState'] = String(audioElement.readyState);
        data['Audio currentTime'] = audioElement.currentTime?.toFixed(1) ?? 'N/A';
        data['Audio duration'] = audioElement.duration
          ? audioElement.duration.toFixed(1)
          : 'N/A';
        data['Audio volume'] = audioElement.volume?.toFixed(2) ?? 'N/A';
        data['Audio error'] = audioElement.error
          ? `Code ${audioElement.error.code}: ${audioElement.error.message}`
          : 'none';
        data['Audio networkState'] = String(audioElement.networkState);
      }

      if (typeof screen !== 'undefined' && 'orientation' in screen) {
        data['Orientation'] = (screen.orientation as ScreenOrientation).type;
      }

      setInfo(data);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [audioElement]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-black/85 text-green-400 text-[11px] font-mono p-3 max-h-[40vh] overflow-auto pt-safe">
      <h3 className="text-green-300 font-bold mb-2 text-xs">🐛 Debug Panel (?debug=1)</h3>
      {Object.entries(info).map(([key, value]) => (
        <div key={key} className="flex gap-2 leading-5">
          <span className="text-green-600 flex-shrink-0">{key}:</span>
          <span className="break-all">{value}</span>
        </div>
      ))}
    </div>
  );
}
