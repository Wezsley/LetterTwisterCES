import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Sparkles
} from "lucide-react";

const WORDS = [
  { word: "CAT", scrambled: "TAC", level: 1 },
  { word: "DOG", scrambled: "GOD", level: 1 },
  { word: "SUN", scrambled: "UNS", level: 1 },
  { word: "BOOK", scrambled: "KOOB", level: 2 },
  { word: "TREE", scrambled: "EERT", level: 2 },
  { word: "HAPPY", scrambled: "PPYHA", level: 3 },
  { word: "SMILE", scrambled: "LIMES", level: 3 },
  { word: "FRIEND", scrambled: "DNEIFR", level: 4 },
  { word: "SCHOOL", scrambled: "LOOHCS", level: 4 },
];

export default function LetterTwist() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showResult, setShowResult] = useState<"correct" | "incorrect" | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);

  const currentWord = WORDS[currentWordIndex];
  const progress = ((currentWordIndex + 1) / WORDS.length) * 100;

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        setShowResult(null);
        if (showResult === "correct") {
          nextWord();
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showResult]);

  const checkAnswer = () => {
    setAttempts(attempts + 1);
    if (userInput.toUpperCase() === currentWord.word) {
      setScore(score + 10);
      setShowResult("correct");
    } else {
      setShowResult("incorrect");
    }
  };

  const nextWord = () => {
    if (currentWordIndex < WORDS.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setUserInput("");
      if (WORDS[currentWordIndex + 1].level > level) {
        setLevel(WORDS[currentWordIndex + 1].level);
      }
    } else {
      // Game finished
      alert(`🎉 Congratulations! You finished with ${score} points!`);
    }
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setUserInput("");
    setScore(0);
    setAttempts(0);
    setShowResult(null);
    setLevel(1);
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
    resetGame();
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bubblegum/20 via-background to-lavender/20">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b-4 border-bubblegum shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 text-bubblegum hover:text-bubblegum/80">
                <ArrowLeft className="w-6 h-6" />
                <span className="text-lg font-semibold">Back to Home</span>
              </Link>
              <h1 className="text-3xl font-bold text-bubblegum">Letter Twist</h1>
              <div></div>
            </div>
          </div>
        </header>

        {/* Game Introduction */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-bubblegum rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-bubblegum mb-4">
                Welcome to Letter Twist!
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Unscramble the letters to form the correct word! 
                This game helps improve your spelling and vocabulary skills. 🌪️📝
              </p>
            </div>

            <Card className="border-4 border-bubblegum bg-white/90 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-bubblegum">How to Play</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <Badge className="bg-bubblegum text-white">1</Badge>
                  <span>Look at the scrambled letters</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-bubblegum text-white">2</Badge>
                  <span>Type the correct word in the input box</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-bubblegum text-white">3</Badge>
                  <span>Press "Check Answer" to see if you're right!</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-bubblegum text-white">4</Badge>
                  <span>Earn 10 points for each correct answer</span>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Button 
                size="lg" 
                onClick={startGame}
                className="bg-bubblegum hover:bg-bubblegum/90 text-white text-xl py-6 px-12 rounded-2xl"
              >
                <Zap className="w-6 h-6 mr-3" />
                Start Playing!
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bubblegum/20 via-background to-lavender/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b-4 border-bubblegum shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-bubblegum hover:text-bubblegum/80">
              <ArrowLeft className="w-6 h-6" />
              <span className="text-lg font-semibold">Back to Home</span>
            </Link>
            <h1 className="text-3xl font-bold text-bubblegum">Letter Twist</h1>
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
                <div className="text-2xl font-bold text-sunshine">{level}</div>
                <div className="text-sm text-muted-foreground">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-grass">{attempts}</div>
                <div className="text-sm text-muted-foreground">Attempts</div>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <span className="text-sm font-medium">Progress:</span>
              <Progress value={progress} className="flex-1" />
              <span className="text-sm text-muted-foreground">
                {currentWordIndex + 1}/{WORDS.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-4 border-bubblegum bg-white/90 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-bubblegum mb-4">
                Unscramble this word:
              </CardTitle>
              <div className="text-6xl font-bold text-primary tracking-widest bg-bubblegum/10 py-6 rounded-xl">
                {currentWord.scrambled}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <label className="text-lg font-semibold text-muted-foreground">
                  Your Answer:
                </label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                  className="w-full text-2xl text-center py-4 px-6 border-4 border-bubblegum/30 rounded-xl focus:border-bubblegum focus:outline-none bg-white"
                  placeholder="Type your answer here..."
                  disabled={showResult !== null}
                />
              </div>

              <Button 
                onClick={checkAnswer}
                disabled={!userInput.trim() || showResult !== null}
                className="w-full bg-bubblegum hover:bg-bubblegum/90 text-white text-xl py-6 rounded-xl"
              >
                Check Answer
              </Button>

              {/* Result Display */}
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
                      {showResult === "correct" ? "Correct!" : "Try Again!"}
                    </span>
                  </div>
                  {showResult === "correct" && (
                    <div className="text-lg">
                      Great job! The word was: <strong>{currentWord.word}</strong>
                    </div>
                  )}
                  {showResult === "incorrect" && (
                    <div className="text-lg">
                      Not quite right. Keep trying! 💪
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hint Section */}
          <Card className="mt-6 border-2 border-sunshine bg-white/70">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-sunshine mb-2">💡 Hint</h3>
                <p className="text-muted-foreground">
                  This word has {currentWord.word.length} letter{currentWord.word.length > 1 ? "s" : ""}
                  {currentWord.level === 1 && " and is something you might see every day!"}
                  {currentWord.level === 2 && " and relates to things around us!"}
                  {currentWord.level === 3 && " and describes feelings or actions!"}
                  {currentWord.level === 4 && " and might be a place or person!"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
