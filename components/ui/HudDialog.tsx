'use client'

import * as Dialog from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';

interface HudDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  width?: number;
}

export function HudDialog({ open, onOpenChange, children, width = 460 }: HudDialogProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize(); // init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay 
          className="swal2-container"
          style={{
            zIndex: 99999,
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(6px)',
          }}
        />
        <Dialog.Content 
          className="swal-hud-popup"
          style={{
            zIndex: 100000,
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#060d06',
            color: '#b8d4b0',
            width: isMobile ? '95vw' : width,
            maxWidth: '100vw',
            padding: isMobile ? '32px 16px 20px' : '36px 28px 28px',
            outline: 'none',
            border: '1px solid rgba(120,190,32,0.3)',
            clipPath: 'polygon(0 0,100% 0,100% calc(100% - 16px),calc(100% - 16px) 100%,0 100%)',
            boxShadow: '0 0 40px rgba(0,132,61,0.25), 0 0 80px rgba(0,80,30,0.15)',
            fontFamily: "'Share Tech Mono', monospace",
            maxHeight: '85vh',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(120,190,32,0.5) rgba(6,13,6,0.8)',
          }}
        >
          {/* Background scanline effect */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)',
              pointerEvents: 'none',
              zIndex: 0
            }} 
          />

          {/* Top-right X button */}
          <Dialog.Close asChild>
            <button 
              aria-label="Close"
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 10,
                background: 'transparent',
                border: '1px solid rgba(120,190,32,0.3)',
                color: '#78BE20',
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '12px',
                width: 26,
                height: 26,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                outline: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(120,190,32,0.15)';
                e.currentTarget.style.borderColor = '#78BE20';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(120,190,32,0.3)';
                e.currentTarget.style.color = '#78BE20';
              }}
            >
              ×
            </button>
          </Dialog.Close>

          <div style={{ position: 'relative', zIndex: 1, margin: 0, padding: 0 }}>
            {children}
          </div>

          <style>{`
            .swal-hud-popup::-webkit-scrollbar { width: 4px; }
            .swal-hud-popup::-webkit-scrollbar-track {
              background: rgba(6,13,6,0.9);
              border-left: 1px solid rgba(120,190,32,0.1);
            }
            .swal-hud-popup::-webkit-scrollbar-thumb {
              background: linear-gradient(180deg, #78BE20, #00843D);
              border-radius: 0;
              box-shadow: 0 0 6px rgba(120,190,32,0.6);
            }
            .swal-hud-popup::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(180deg, #9ade30, #00a84e);
              box-shadow: 0 0 10px rgba(120,190,32,0.9);
            }
          `}</style>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

