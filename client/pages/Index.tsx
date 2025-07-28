import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Star,
  Sparkles,
  Zap,
  Trophy,
  Target,
  Clock,
  Users,
  Heart,
  Smile,
  CheckCircle,
  Award,
  Play
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-50 to-green-50 border-b-2 border-blue-200 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F5a267f4263554fcdaf73c870cff110db%2F1f65beee26984d73909e666805de7da9?format=webp&width=800"
                alt="Colorado Elementary School Logo"
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-3 border-blue-500 shadow-md bg-white p-1"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600">
                  Letter Twist
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                  Colorado Elementary - Fun Learning! 🌟
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline" className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white rounded-full px-3 sm:px-6 text-sm sm:text-base">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with friendly elements */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden bg-gradient-to-br from-blue-25 via-white to-green-25">
        {/* Floating friendly elements - Hidden on small screens to reduce clutter */}
        <div className="absolute inset-0 overflow-hidden hidden sm:block">
          <div className="absolute top-10 sm:top-20 left-2 sm:left-10 w-6 sm:w-8 h-6 sm:h-8 text-blue-300 animate-bounce">
            <Star className="w-full h-full" />
          </div>
          <div className="absolute top-16 sm:top-32 right-4 sm:right-16 w-4 sm:w-6 h-4 sm:h-6 text-green-400 animate-pulse">
            <Heart className="w-full h-full" />
          </div>
          <div className="absolute top-20 sm:top-40 left-1/4 w-6 sm:w-10 h-6 sm:h-10 text-blue-400 animate-ping">
            <Sparkles className="w-full h-full" />
          </div>
          <div className="absolute bottom-16 sm:bottom-32 right-1/4 w-6 sm:w-8 h-6 sm:h-8 text-green-300 animate-bounce delay-300">
            <Smile className="w-full h-full" />
          </div>
          <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-16 w-4 sm:w-6 h-4 sm:h-6 text-blue-300 animate-pulse delay-500">
            <CheckCircle className="w-full h-full" />
          </div>

          {/* Decorative circles - Smaller on mobile */}
          <div className="absolute top-1/3 left-2 sm:left-5 w-8 sm:w-16 h-8 sm:h-16 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-2 sm:right-8 w-10 sm:w-20 h-10 sm:h-20 bg-green-100 rounded-full opacity-25 animate-ping delay-500"></div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center animate-bounce">
                <BookOpen className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-white" />
              </div>
              <div className="w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce delay-100">
                <Sparkles className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-white" />
              </div>
              <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center animate-bounce delay-200">
                <Star className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-white" />
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="text-blue-600 block sm:inline">Master Spelling</span>
              <br className="hidden sm:block" />
              <span className="text-green-600 block sm:inline"> with Letter Twist!</span>
              <span className="text-2xl sm:text-3xl md:text-4xl ml-0 sm:ml-2 block sm:inline">🌪️✨</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-2">
              Unscramble letters, build vocabulary, and become a spelling champion!
              Fun games for Grade 3 students. 📚🎮
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-2">
              <Link to="/game" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-base sm:text-lg md:text-xl py-4 sm:py-5 md:py-6 px-6 sm:px-8 md:px-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  <Play className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 mr-2 sm:mr-3" />
                  Start Playing Now!
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-3 border-green-500 text-green-600 hover:bg-green-500 hover:text-white text-base sm:text-lg md:text-xl py-4 sm:py-5 md:py-6 px-6 sm:px-8 md:px-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <Trophy className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 mr-2 sm:mr-3" />
                  Track Progress
                </Button>
              </Link>
            </div>

            {/* Fun stats with friendly design */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto px-2">
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-blue-100">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600"><p>100+</p></div>
                <div className="text-xs sm:text-sm text-gray-600"><p>Little Learners</p></div>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-green-100">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">25+</div>
                <div className="text-xs sm:text-sm text-gray-600">Fun Words</div>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-blue-100">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600"><p>2025</p></div>
                <div className="text-xs sm:text-sm text-gray-600"><p>Built In</p></div>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-green-100">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">100%</div>
                <div className="text-xs sm:text-sm text-gray-600">Fun!</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-blue-25 to-green-25 relative overflow-hidden">
        {/* Fun background patterns - Hidden on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          <div className="absolute top-10 left-1/4 w-24 h-24 border-2 border-blue-100 rounded-full opacity-20 animate-spin" style={{animationDuration: '15s'}}></div>
          <div className="absolute bottom-10 right-1/4 w-32 h-32 border-2 border-green-100 rounded-full opacity-15 animate-spin" style={{animationDuration: '20s', animationDirection: 'reverse'}}></div>
          <div className="absolute top-1/2 left-10 w-20 h-20 border border-blue-200 rounded-full opacity-25 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-28 h-28 border border-green-200 rounded-full opacity-20 animate-ping delay-1000"></div>

          {/* Floating mini icons */}
          <div className="absolute top-1/4 right-1/3 w-8 h-8 text-blue-200 animate-float">
            <BookOpen className="w-full h-full" />
          </div>
          <div className="absolute bottom-1/4 left-1/3 w-6 h-6 text-green-200 animate-float delay-500">
            <Trophy className="w-full h-full" />
          </div>
        </div>
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-6">
              🎯 Choose Your Adventure!
            </h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Three exciting ways to practice spelling and grow your vocabulary!
              Each mode makes learning fun and engaging.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Practice Mode */}
            <Card className="group hover:scale-105 transition-all duration-300 border-2 border-green-200 bg-white shadow-lg hover:shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden relative">
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 sm:w-8 h-6 sm:h-8 bg-green-300 rounded-full opacity-20 group-hover:animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-4 sm:w-6 h-4 sm:h-6 bg-green-200 rounded-full opacity-30 group-hover:animate-bounce delay-100"></div>
              <CardHeader className="text-center pb-3 sm:pb-4 bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
                <div className="mx-auto w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:animate-bounce shadow-lg ring-2 sm:ring-4 ring-green-100 group-hover:ring-green-200 transition-all">
                  <Target className="w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl text-green-700">Practice Mode</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-4 sm:p-6">
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Learn at your own pace with no time pressure. Perfect for building confidence! 🎯
                </p>
                <Link to="/game/practice">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg sm:rounded-xl py-2.5 sm:py-3 text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                    Start Practice
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Timed Challenge */}
            <Card className="group hover:scale-105 transition-all duration-300 border-2 border-blue-200 bg-white shadow-lg hover:shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden relative">
              <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-4 sm:w-6 h-4 sm:h-6 bg-blue-300 rounded-full opacity-25 group-hover:animate-spin"></div>
              <div className="absolute -bottom-1 -right-1 w-6 sm:w-10 h-6 sm:h-10 bg-blue-200 rounded-full opacity-20 group-hover:animate-pulse"></div>
              <CardHeader className="text-center pb-3 sm:pb-4 bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6">
                <div className="mx-auto w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:animate-bounce shadow-lg ring-2 sm:ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all">
                  <Clock className="w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl text-blue-700">Timed Challenge</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-4 sm:p-6">
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Race against time to unscramble words and boost your speed! ⏰
                </p>
                <Link to="/game/timed">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg sm:rounded-xl py-2.5 sm:py-3 text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                    Beat the Clock
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Achievement Hunt */}
            <Card className="group hover:scale-105 transition-all duration-300 border-2 border-blue-300 bg-white shadow-lg hover:shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden relative sm:col-span-2 lg:col-span-1">
              <div className="absolute top-1 right-1 w-3 sm:w-4 h-3 sm:h-4 bg-yellow-300 rounded-full opacity-40 group-hover:animate-ping delay-200"></div>
              <div className="absolute -bottom-1 -left-1 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-blue-200 to-green-200 rounded-full opacity-30 group-hover:animate-bounce delay-300"></div>
              <div className="absolute top-1/2 -right-1 w-4 sm:w-5 h-4 sm:h-5 bg-green-300 rounded-full opacity-35 group-hover:animate-pulse delay-100"></div>
              <CardHeader className="text-center pb-3 sm:pb-4 bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 sm:p-6">
                <div className="mx-auto w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:animate-bounce shadow-lg ring-2 sm:ring-4 ring-blue-100 group-hover:ring-yellow-200 transition-all">
                  <Award className="w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Achievement Hunt</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-4 sm:p-6">
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Unlock badges and trophies as you master different word categories! 🏆
                </p>
                <Link to="/game/achievements">
                  <Button className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-green-500 hover:from-blue-600 hover:via-blue-700 hover:to-green-600 text-white rounded-lg sm:rounded-xl py-2.5 sm:py-3 text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                    Hunt Trophies
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Educational Benefits */}
      <section className="py-8 sm:py-12 md:py-16 bg-white relative overflow-hidden">
        {/* Subtle background decorations - Hidden on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          <div className="absolute top-1/4 left-5 w-40 h-40 bg-blue-50 rounded-full opacity-30 animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-1/4 right-5 w-32 h-32 bg-green-50 rounded-full opacity-40 animate-ping" style={{animationDuration: '6s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-25 rounded-full opacity-50 animate-bounce" style={{animationDuration: '3s'}}></div>

          {/* Tiny floating educational icons */}
          <div className="absolute top-20 right-10 w-6 h-6 text-blue-200 animate-bounce delay-200">
            <BookOpen className="w-full h-full" />
          </div>
          <div className="absolute bottom-20 left-10 w-5 h-5 text-green-200 animate-pulse delay-700">
            <Sparkles className="w-full h-full" />
          </div>
        </div>
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-6">
              📚 Why Letter Twist Works
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
              Our game is designed based on educational research to help Grade 3 students
              improve their spelling and vocabulary skills through interactive learning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="text-center group sm:col-span-2 md:col-span-1">
              <div className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <BookOpen className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-blue-600 mb-3 sm:mb-4">Spelling Mastery</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">
                Interactive letter manipulation helps students recognize spelling patterns
                and improve accuracy through hands-on practice.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Sparkles className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-green-600 mb-3 sm:mb-4">Vocabulary Growth</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">
                Exposure to diverse words and helpful hints enhances vocabulary
                acquisition and reading comprehension skills.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Heart className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-3 sm:mb-4">Joyful Learning</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">
                Game-based learning increases motivation, engagement, and makes
                practice time enjoyable for young learners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-green-600 text-white" style={{padding: "48px 0 14px"}}>
        <div className="container mx-auto px-4">
          <div className="text-center flex flex-col">
            <div className="flex justify-center items-center gap-4 mb-6">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F5a267f4263554fcdaf73c870cff110db%2F1f65beee26984d73909e666805de7da9?format=webp&width=800"
                alt="Colorado Elementary School Logo"
                className="w-12 h-12 rounded-full border-2 border-white bg-white p-1"
              />
              <div>
                <h4 className="text-xl font-bold">Letter Twist</h4>
                <p className="text-blue-100">Colorado Elementary School</p>
              </div>
            </div>
            <p className="text-lg mb-4">
              "Enhancing Spelling and Vocabulary Skills Through Interactive Learning" 📖✨
            </p>
            <p className="text-blue-100">
              Educational Research Application | Grade 3 Spelling Enhancement Program
            </p>
            <p className="text-blue-100 text-xs" style={{margin: "12px auto 0"}}>
              <p>
                <br />
              </p>
              <p>© 2025 Wezs Coding — Made for Kids.</p>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
