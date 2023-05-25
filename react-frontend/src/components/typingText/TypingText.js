import React, { useState, useEffect } from 'react';

const TypingText = ({ text, typingSpeed }) => {
    const [displayedText, setDisplayedText] = useState('');
  
    useEffect(() => {
      let index = 0;
      
      const type = () => {
        if (index < text.length) {
          setDisplayedText((prevText) => {
              if (prevText.length === index) {
                return prevText + text.charAt(index);
              } else {
                return prevText;
              }
            });
          index++;
          setTimeout(type, typingSpeed);
        }
      };
  
      // Start typing only when displayedText is empty
      if (displayedText === '') {
        type();
      }
    }, [text, typingSpeed, displayedText]);

  return <span className='text-5xl font-extrabold'>{displayedText}</span>;
};

export default TypingText;