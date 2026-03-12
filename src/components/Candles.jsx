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
      <div className="candle-wrapper left">
        <div className="candle">
          <div className="wax"></div>
          <div className={`candle-flame ${isBlownOut ? 'blown-out' : ''}`}></div>
          {isBlownOut && <div className="smoke"></div>}
        </div>
      </div>
      <div className="candle-wrapper center">
        <div className="candle">
          <div className="wax"></div>
          <div className={`candle-flame ${isBlownOut ? 'blown-out' : ''}`}></div>
          {isBlownOut && <div className="smoke"></div>}
        </div>
      </div>
      <div className="candle-wrapper right">
        <div className="candle">
          <div className="wax"></div>
          <div className={`candle-flame ${isBlownOut ? 'blown-out' : ''}`}></div>
          {isBlownOut && <div className="smoke"></div>}
        </div>
      </div>
    </div>
  );
};

export default Candles;
