import { useEffect, useState } from 'react'
import {
  StickyNote,
  Loader2,
  CheckCircle2,
  Pencil,
  FileText,
} from 'lucide-react'

export function SplashScreen() {
  const [progress, setProgress] = useState(0)
  const [loadingSteps] = useState([
    'Loading your workspace...',
    'Preparing markdown editor...',
    'Syncing your notes...',
    'Setting up shortcuts...',
    'Almost ready!',
  ])
  const [currentStep, setCurrentStep] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          // Trigger fade out when complete
          setTimeout(() => setFadeOut(true), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepTimer)
          return prev
        }
        return prev + 1
      })
    }, 900)

    return () => clearInterval(stepTimer)
  }, [loadingSteps.length])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background:
          'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Notes Animation */}
        <div className="absolute top-10 left-[10%] w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 opacity-10 animate-float">
          <StickyNote className="w-full h-full text-teal-400" />
        </div>
        <div className="absolute bottom-20 right-[15%] w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 opacity-10 animate-float-delayed">
          <FileText className="w-full h-full text-teal-300" />
        </div>
        <div className="absolute top-1/3 right-[20%] w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 opacity-10 animate-float">
          <Pencil className="w-full h-full text-teal-500" />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="text-center space-y-6 sm:space-y-8 md:space-y-12 max-w-xs sm:max-w-sm md:max-w-md relative z-10 w-full px-4">
        {/* Main Logo with Pen Animation */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl shadow-teal-500/50 border border-teal-400/30 transform hover:scale-105 transition-transform duration-300">
            <StickyNote className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
            {/* Animated Pen */}
            <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-white rounded-full p-1.5 sm:p-2 shadow-lg animate-bounce-slow">
              <Pencil className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
            </div>
          </div>

          {/* Animated Rings */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-teal-400/30 animate-ping"></div>
          <div className="absolute inset-2 rounded-2xl sm:rounded-3xl border border-teal-400/20 animate-pulse"></div>
        </div>

        {/* App Name */}
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight animate-fade-in">
            Write-it-down
          </h1>
          <p className="text-teal-300 text-sm sm:text-base md:text-lg font-medium animate-fade-in-delayed">
            Professional Note-Taking for Developers
          </p>
        </div>

        {/* Loading Section */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* Progress Bar */}
          <div className="w-full space-y-2 sm:space-y-3">
            <div className="w-full bg-slate-700/50 rounded-full h-2 sm:h-2.5 md:h-3 backdrop-blur-sm border border-slate-600/30">
              <div
                className="bg-gradient-to-r from-teal-400 to-cyan-400 h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-300 ease-out shadow-lg shadow-teal-400/50"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-slate-400 text-xs sm:text-sm font-medium px-1">
              <span>{Math.round(progress)}%</span>
              <span>Loading...</span>
            </div>
          </div>

          {/* Loading Status */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-700/50 shadow-xl">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
              {progress < 100 ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 animate-bounce" />
              )}
              <span className="text-white text-sm sm:text-base font-semibold">
                {progress < 100 ? 'Setting Up' : 'Ready!'}
              </span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm text-center">
              {loadingSteps[currentStep]}
            </p>
          </div>

          {/* Feature Loading Indicators */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { name: 'Editor', icon: Pencil },
              { name: 'Storage', icon: FileText },
              { name: 'Sync', icon: StickyNote },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.name}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-slate-700/50 hover:border-teal-500/50 transition-all duration-300"
                >
                  <div className="text-center space-y-1.5 sm:space-y-2">
                    <div
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 mx-auto rounded-full transition-all duration-500 ${
                        currentStep > index
                          ? 'bg-green-400 shadow-lg shadow-green-400/50'
                          : currentStep === index
                            ? 'bg-teal-400 animate-pulse shadow-lg shadow-teal-400/50'
                            : 'bg-slate-600'
                      }`}
                    ></div>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-slate-400" />
                    <span className="text-slate-400 text-[10px] sm:text-xs font-medium block">
                      {feature.name}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tagline */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-700/30">
          <p className="text-slate-400 text-[10px] sm:text-xs leading-relaxed">
            Capture your thoughts, code snippets, and ideas with our powerful
            markdown editor.
            <span className="block mt-1 text-teal-400 font-medium">
              Write once, access anywhere.
            </span>
          </p>
        </div>
      </div>

      {/* Custom Animations add jsx attr to view in css format */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-5deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delayed {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delayed {
          animation: fade-in-delayed 1s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
