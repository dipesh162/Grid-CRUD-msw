// React
import React, { useRef, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';

// Styles
import '../Overlay.css';

function Overlay({ isOverlayOpen, setOverlayOpen , children}) {

  const overlayRef = useRef()

  // Focus on overlay if it is opened
  useEffect(() => {
    if (isOverlayOpen && overlayRef.current) {
      overlayRef.current.focus();
    }
  }, [isOverlayOpen]);

  // Close overlay when Escape key is pressed
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setOverlayOpen(false);
    }
  };

  return (
    <>
        <div
          className='overlay'
          onKeyDown={handleKeyDown}
          ref={overlayRef}
          tabIndex={-1} // Make the div focusable
        >
          <div className='overlay-content'>
            {children}
            <RxCross2
              className='cross-icon'
              onClick={() => setOverlayOpen(false)}
            />
          </div>
        </div>
    </>
  );
}

export default Overlay;
