import React, { useState, useEffect } from 'react';
import './Candles.css';

const Candles = () => {
  const [isBlownOut, setIsBlownOut] = useState(false);

  useEffect(() => {
    const handleSummon = (e) => {
      setIsBlownOut(e.detail.isSummoned);
    };

    window.addEventListener('summonRitual', handleSummon);
    return () => window.removeEventListener('summonRitual', handleSummon);
  }, []);

  return (
    <div className="candles-container">
      {/* Three realistic candles for occult symbolism */}
      <div className="candle left">
        <div className="wax"></div>
        <div className={`flame ${isBlownOut ? 'blown-out' : ''}`}></div>
        {isBlownOut && <div className="smoke"></div>}
      </div>
      <div className="candle center">
        <div className="wax"></div>
        <div className={`flame ${isBlownOut ? 'blown-out' : ''}`}></div>
        {isBlownOut && <div className="smoke"></div>}
      </div>
      <div className="candle right">
        <div className="wax"></div>
        <div className={`flame ${isBlownOut ? 'blown-out' : ''}`}></div>
        {isBlownOut && <div className="smoke"></div>}
      </div>
    </div>
  );
};

export default Candles;
