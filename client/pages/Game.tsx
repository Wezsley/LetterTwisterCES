import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  RotateCcw, 
  Star, 
  Trophy,
  Zap,
  CheckCircle,
  XCircle,
  Sparkles,
  Timer,
  Target,
  Heart,
  Home
} from "lucide-react";

const BASE_WORD_SETS = {
  easy: [
    { word: "CAT", hint: "A furry pet that says meow" },
    { word: "DOG", hint: "Man's best friend" },
    { word: "SUN", hint: "Bright star in the sky" },
    { word: "RED", hint: "Color of roses" },
    { word: "BIG", hint: "Opposite of small" },
    { word: "FUN", hint: "Something enjoyable" },
    { word: "RUN", hint: "Moving fast with your legs" },
    { word: "BALL", hint: "Round toy you can throw" },
    { word: "BLUE", hint: "Color of the sky" },
    { word: "FISH", hint: "Animal that swims in water" },
  ],
  medium: [
    { word: "BOOK", hint: "You read this" },
    { word: "TREE", hint: "Tall plant with leaves" },
    { word: "HOUSE", hint: "Where you live" },
    { word: "WATER", hint: "You drink this" },
    { word: "HAPPY", hint: "Feeling of joy" },
    { word: "CHAIR", hint: "You sit on this" },
    { word: "LIGHT", hint: "Makes things bright" },
    { word: "MUSIC", hint: "Sounds that are nice to hear" },
    { word: "DANCE", hint: "Moving to music" },
    { word: "SMILE", hint: "Happy expression on your face" },
  ],
  hard: [
    { word: "FRIEND", hint: "Someone you like to play with" },
    { word: "SCHOOL", hint: "Where you learn" },
    { word: "RAINBOW", hint: "Colorful arc in the sky" },
    { word: "BUTTERFLY", hint: "Colorful flying insect" },
    { word: "ELEPHANT", hint: "Large gray animal with trunk" },
    { word: "BIRTHDAY", hint: "Special day you celebrate each year" },
    { word: "SUNSHINE", hint: "Light and warmth from the sun" },
    { word: "ADVENTURE", hint: "Exciting journey or experience" },
    { word: "PLAYGROUND", hint: "Fun place with swings and slides" },
    { word: "FAVORITE", hint: "The thing you like best" },
  ]
};

interface WordItem {
  word: string;
  scrambled: string;
  hint: string;
}

// Utility functions for randomization
function shuffleArray(array: any[]): any[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function scrambleWord(word: string): string {
  let scrambled = word;
  let attempts = 0;

  // Keep scrambling until it's different from the original word
  while (scrambled === word && attempts < 10) {
    const letters = word.split('');
    scrambled = shuffleArray(letters).join('');
    attempts++;
  }

  return scrambled;
}

function generateRandomizedWordSets(): Record<string, WordItem[]> {
  const wordSets: Record<string, WordItem[]> = {};

  Object.keys(BASE_WORD_SETS).forEach(level => {
    const levelKey = level as keyof typeof BASE_WORD_SETS;
    const shuffledWords = shuffleArray(BASE_WORD_SETS[levelKey]);

    wordSets[level] = shuffledWords.map(item => ({
      word: item.word,
      scrambled: scrambleWord(item.word),
      hint: item.hint
    }));
  });

  return wordSets;
}

type GameMode = "practice" | "timed" | "achievements";

export default function Game() {
  const { mode = "practice" } = useParams<{ mode: GameMode }>();
  const navigate = useNavigate();
  
  const [currentLevel, setCurrentLevel] = useState<"easy" | "medium" | "hard">("easy");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [randomizedWordSets, setRandomizedWordSets] = useState<Record<string, WordItem[]>>({});
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [attempts, setAttempts] = useState(0);
  const [showResult, setShowResult] = useState<"correct" | "incorrect" | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);

  // Initialize randomized word sets on component mount
  useEffect(() => {
    if (Object.keys(randomizedWordSets).length === 0) {
      setRandomizedWordSets(generateRandomizedWordSets());
    }
  }, []);

  const currentWordSet = randomizedWordSets[currentLevel] || [];
  const currentWord = currentWordSet[currentWordIndex] || { word: "", scrambled: "", hint: "" };
  const progress = ((currentWordIndex + 1) / currentWordSet.length) * 100;

  // Timer for timed mode
  useEffect(() => {
    if (mode === "timed" && gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (mode === "timed" && timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, mode, gameStarted, gameOver]);

  // Auto-advance after correct answer
  useEffect(() => {
    if (showResult === "correct") {
      const timer = setTimeout(() => {
        setShowResult(null);
        nextWord();
      }, 1500);
      return () => clearTimeout(timer);
    } else if (showResult === "incorrect") {
      const timer = setTimeout(() => {
        setShowResult(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showResult]);

  const checkAnswer = () => {
    setAttempts(attempts + 1);
    if (userInput.toUpperCase() === currentWord.word) {
      const points = mode === "timed" ? 15 : 10;
      setScore(score + points);
      setShowResult("correct");
      
      // Check for achievements
      checkAchievements();
    } else {
      setShowResult("incorrect");
      if (mode === "achievements") {
        setLives(lives - 1);
        if (lives <= 1) {
          endGame();
        }
      }
    }
  };

  const checkAchievements = () => {
    const newAchievements = [...achievements];
    
    if (score + 10 >= 50 && !achievements.includes("First Steps")) {
      newAchievements.push("First Steps");
    }
    if (score + 10 >= 100 && !achievements.includes("Word Warrior")) {
      newAchievements.push("Word Warrior");
    }
    if (attempts === 1 && !achievements.includes("Perfect Start")) {
      newAchievements.push("Perfect Start");
    }
    
    setAchievements(newAchievements);
  };

  const nextWord = () => {
    if (currentWordIndex < currentWordSet.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setUserInput("");
    } else {
      // Move to next difficulty or end game
      if (currentLevel === "easy") {
        setCurrentLevel("medium");
        setCurrentWordIndex(0);
        setUserInput("");
      } else if (currentLevel === "medium") {
        setCurrentLevel("hard");
        setCurrentWordIndex(0);
        setUserInput("");
      } else {
        endGame();
      }
    }
  };

  const endGame = () => {
    setGameOver(true);
    saveProgress();
  };

  const saveProgress = () => {
    const userData = localStorage.getItem('letterTwistUser');
    if (userData) {
      const user = JSON.parse(userData);
      user.totalScore += score;
      user.gamesPlayed += 1;
      user.achievements = [...new Set([...user.achievements, ...achievements])];
      localStorage.setItem('letterTwistUser', JSON.stringify(user));
    }
    
    // Save guest progress
    localStorage.setItem('totalScore', (parseInt(localStorage.getItem('totalScore') || '0') + score).toString());
    localStorage.setItem('gamesPlayed', (parseInt(localStorage.getItem('gamesPlayed') || '0') + 1).toString());
  };

  const resetGame = () => {
    setCurrentLevel("easy");
    setCurrentWordIndex(0);
    setUserInput("");
    setScore(0);
    setLives(3);
    setAttempts(0);
    setShowResult(null);
    setTimeLeft(60);
    setGameOver(false);
    setAchievements([]);
    setGameStarted(false);
    // Generate new randomized word sets each game
    setRandomizedWordSets(generateRandomizedWordSets());
  };

  const startGame = () => {
    // Generate randomized word sets when starting the game
    setRandomizedWordSets(generateRandomizedWordSets());
    setGameStarted(true);
    resetGame();
    setGameStarted(true);
  };

  const getGameModeConfig = () => {
    switch (mode) {
      case "timed":
        return {
          title: "Timed Challenge ⏰",
          description: "Race against the clock! You have 60 seconds to score as many points as possible.",
          color: "orange"
        };
      case "achievements":
        return {
          title: "Achievement Hunt 🏆",
          description: "Unlock achievements and master different word levels! You have 3 lives.",
          color: "sunshine"
        };
      default:
        return {
          title: "Practice Mode 🎯",
          description: "Learn at your own pace with no time pressure. Perfect for mastering new words!",
          color: "grass"
        };
    }
  };

  const gameConfig = getGameModeConfig();

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bubblegum/20 via-background to-lavender/20 flex items-center justify-center">
        <Card className="max-w-md mx-auto border-4 border-sunshine bg-white/90 shadow-xl">
          <CardHeader className="text-center">
            <Trophy className="w-16 h-16 text-sunshine mx-auto mb-4" />
            <CardTitle className="text-3xl text-sunshine">Game Complete! 🎉</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-3">
              <div className="text-2xl font-bold text-primary">Final Score: {score}</div>
              <div className="text-lg text-muted-foreground">Level Reached: {currentLevel}</div>
              <div className="text-lg text-muted-foreground">Total Attempts: {attempts}</div>
            </div>
            
            {achievements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-sunshine mb-2">New Achievements! 🏆</h3>
                <div className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <Badge key={index} className="bg-sunshine text-white">
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Button onClick={resetGame} className="w-full bg-bubblegum hover:bg-bubblegum/90 text-white">
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
              <Link to="/dashboard">
                <Button variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bubblegum/20 via-background to-lavender/20">
        <header className="bg-white/80 backdrop-blur-sm border-b-4 border-bubblegum shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 text-bubblegum hover:text-bubblegum/80">
                <ArrowLeft className="w-6 h-6" />
                <span className="text-lg font-semibold">Back to Home</span>
              </Link>
              <h1 className="text-3xl font-bold text-bubblegum">{gameConfig.title}</h1>
              <div></div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className={`w-24 h-24 bg-${gameConfig.color} rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce`}>
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                {gameConfig.title}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {gameConfig.description}
              </p>
            </div>

            <Card className={`border-4 border-${gameConfig.color} bg-white/90 shadow-xl`}>
              <CardHeader className="text-center">
                <CardTitle className={`text-2xl text-${gameConfig.color}-foreground`}>Game Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <Badge className={`bg-${gameConfig.color} text-white`}>1</Badge>
                  <span>Unscramble the letters to form correct words</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`bg-${gameConfig.color} text-white`}>2</Badge>
                  <span>Progress through Easy → Medium → Hard levels</span>
                </div>
                {mode === "timed" && (
                  <div className="flex items-center gap-3">
                    <Badge className="bg-orange text-white">3</Badge>
                    <span>You have 60 seconds to score as many points as possible</span>
                  </div>
                )}
                {mode === "achievements" && (
                  <div className="flex items-center gap-3">
                    <Badge className="bg-sunshine text-white">3</Badge>
                    <span>You have 3 lives - lose one for each wrong answer</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Badge className={`bg-${gameConfig.color} text-white`}>
                    {mode === "timed" || mode === "achievements" ? "4" : "3"}
                  </Badge>
                  <span>Use hints if you get stuck on a word</span>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Button 
                size="lg" 
                onClick={startGame}
                className={`bg-${gameConfig.color} hover:bg-${gameConfig.color}/90 text-white text-xl py-6 px-12 rounded-2xl`}
              >
                <Zap className="w-6 h-6 mr-3" />
                Start Game!
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bubblegum/20 via-background to-lavender/20">
      <header className="bg-white/80 backdrop-blur-sm border-b-4 border-bubblegum shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-bubblegum hover:text-bubblegum/80">
              <ArrowLeft className="w-6 h-6" />
              <span className="text-lg font-semibold">Exit Game</span>
            </Link>
            <h1 className="text-2xl font-bold text-bubblegum">{gameConfig.title}</h1>
            <Button 
              variant="outline" 
              onClick={resetGame}
              className="border-2 border-bubblegum text-bubblegum hover:bg-bubblegum hover:text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </header>

      {/* Timer Bar for Timed Mode */}
      {mode === "timed" && gameStarted && (
        <div className="bg-orange-500 py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between text-white mb-2">
              <span className="font-semibold">Time Remaining</span>
              <span className="font-bold text-lg">{timeLeft}s</span>
            </div>
            <div className="w-full bg-orange-300 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  timeLeft > 20 ? 'bg-green-500' :
                  timeLeft > 10 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Game Stats */}
      <div className="bg-white/50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-bubblegum">{score}</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sunshine capitalize">{currentLevel}</div>
                <div className="text-sm text-muted-foreground">Level</div>
              </div>
              {mode === "timed" && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange">{timeLeft}s</div>
                  <div className="text-sm text-muted-foreground">Time Left</div>
                </div>
              )}
              {mode === "achievements" && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(lives)].map((_, i) => (
                      <Heart key={i} className="w-6 h-6 text-red-500 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">Lives</div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <span className="text-sm font-medium">Progress:</span>
              <Progress value={progress} className="flex-1" />
              <span className="text-sm text-muted-foreground">
                {currentWordIndex + 1}/{currentWordSet.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 sm:border-4 border-bubblegum bg-white/90 shadow-xl rounded-xl sm:rounded-2xl">
            <CardHeader className="text-center p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl text-bubblegum mb-3 sm:mb-4">
                Unscramble this word:
              </CardTitle>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-widest bg-bubblegum/10 py-4 sm:py-6 rounded-lg sm:rounded-xl">
                {currentWord.scrambled}
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <label className="text-base sm:text-lg font-semibold text-muted-foreground">
                  Your Answer:
                </label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                  className="w-full text-lg sm:text-xl md:text-2xl text-center py-3 sm:py-4 px-4 sm:px-6 border-2 sm:border-4 border-bubblegum/30 rounded-lg sm:rounded-xl focus:border-bubblegum focus:outline-none bg-white"
                  placeholder="Type your answer here..."
                  disabled={showResult !== null}
                />
              </div>

              <Button
                onClick={checkAnswer}
                disabled={!userInput.trim() || showResult !== null}
                className="w-full bg-bubblegum hover:bg-bubblegum/90 text-white text-base sm:text-lg md:text-xl py-4 sm:py-5 md:py-6 rounded-lg sm:rounded-xl"
              >
                Check Answer
              </Button>

              {showResult && (
                <div className={`text-center py-6 rounded-xl ${
                  showResult === "correct" 
                    ? "bg-grass/20 text-grass" 
                    : "bg-destructive/20 text-destructive"
                }`}>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {showResult === "correct" ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : (
                      <XCircle className="w-8 h-8" />
                    )}
                    <span className="text-2xl font-bold">
                      {showResult === "correct" ? "Excellent!" : "Try Again!"}
                    </span>
                  </div>
                  {showResult === "correct" && (
                    <div className="text-lg">
                      The word was: <strong>{currentWord.word}</strong>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hint Card */}
          <Card className="mt-4 sm:mt-6 border-2 border-sunshine bg-white/70 rounded-lg sm:rounded-xl">
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-semibold text-sunshine mb-2">💡 Hint</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {currentWord.hint}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
