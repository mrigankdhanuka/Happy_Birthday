import React, { useState, useRef } from 'react';
import { Cake, Gift, PartyPopper, Sparkles, Moon as Balloon, PartyPopper as Party, Stars, SettingsIcon as Confetti, Volume2, VolumeX } from 'lucide-react';

const cakeImages = [
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1562777717-dc6984f65a63?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=80',
];

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % cakeImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSurpriseClick = () => {
    setShowSurprise(!showSurprise);
    if (!showSurprise && !audioError) {
      playBirthdaySong();
    } else {
      stopBirthdaySong();
    }
  };

  const playBirthdaySong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Audio playback failed:', error);
        setAudioError(true);
      });
    }
  };

  const stopBirthdaySong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopBirthdaySong();
    } else {
      playBirthdaySong();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-400 via-yellow-200 to-white">
      <audio
        ref={audioRef}
        // src="https://www2.cs.uic.edu/~i101/SoundFiles/HappyBirthday.wav"
        src="./audio/Garvit.mp3"
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onError={() => setAudioError(true)}
      />

      {/* Confetti overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          >
            <PartyPopper className="text-pink-500 w-6 h-6 transform rotate-45" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Central Image Section with Decorations */}
          <div className="relative mb-16">
            {/* Left Decorations */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8 items-center animate-float-left">
              <Balloon className="w-12 h-12 text-pink-500" />
              <Stars className="w-10 h-10 text-yellow-500" />
              <Party className="w-14 h-14 text-purple-500" />
              <Confetti className="w-12 h-12 text-blue-500" />
            </div>

            {/* Right Decorations */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8 items-center animate-float-right">
              <Party className="w-14 h-14 text-blue-500" />
              <Confetti className="w-12 h-12 text-purple-500" />
              <Balloon className="w-12 h-12 text-yellow-500" />
              <Stars className="w-10 h-10 text-pink-500" />
            </div>

            {/* Central Image */}
            <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 animate-spin-slow blur-xl opacity-75"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&h=400&q=80"
                  alt="Birthday boy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent"></div>
              </div>
            </div>

            {/* Name and Icons */}
            <div className="text-center">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
                Happy Birthday Alex!
              </h1>
              <div className="flex justify-center gap-4 mb-8">
                <Cake className="w-8 h-8 text-pink-500 animate-bounce" />
                <Gift className="w-8 h-8 text-purple-500 animate-bounce delay-100" />
                <Sparkles className="w-8 h-8 text-yellow-500 animate-bounce delay-200" />
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="bg-white bg-opacity-80 rounded-xl p-8 mb-12 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <p className="text-2xl text-gray-800 leading-relaxed">
              Wishing you endless joy, laughter, and love on your special day. Have a blast! 🎂🎉
            </p>
          </div>

          {/* Rotating Images Section */}
          <div className="mb-12">
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl">
              <img
                src={cakeImages[currentImageIndex]}
                alt="Birthday celebration"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>
          </div>

          {/* Surprise Button Section */}
          <div className="relative">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSurpriseClick}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Surprise Me! ✨
                </button>
                {!audioError && (
                  <div
                    onClick={toggleAudio}
                    className="cursor-pointer p-2 rounded-full hover:bg-purple-500/20 transition-colors"
                  >
                    {isPlaying ? (
                      <VolumeX className="w-6 h-6 text-purple-500" />
                    ) : (
                      <Volume2 className="w-6 h-6 text-purple-500" />
                    )}
                  </div>
                )}
              </div>

              {audioError && (
                <p className="text-red-500 text-sm">
                  ⚠️ Couldn't load the birthday song, but the party goes on! 🎉
                </p>
              )}
            </div>

            {showSurprise && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 p-6 bg-white rounded-xl shadow-2xl animate-fadeIn">
                <p className="text-xl text-gray-800">
                  🎉 Here's your special surprise! 🎁
                  <br />
                  May your day be filled with wonderful moments and sweet surprises!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;