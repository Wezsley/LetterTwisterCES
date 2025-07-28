import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  User,
  Trophy,
  Star,
  Target,
  Clock,
  LogOut,
  Play,
  BarChart3,
  Award
} from "lucide-react";

interface UserData {
  name: string;
  totalScore: number;
  gamesPlayed: number;
  achievements: string[];
  loginTime: string;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('letterTwistUser');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user data
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('letterTwistUser');
    navigate('/');
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const averageScore = userData.gamesPlayed > 0 ? Math.round(userData.totalScore / userData.gamesPlayed) : 0;
  const level = Math.floor(userData.totalScore / 100) + 1;
  const progressToNextLevel = (userData.totalScore % 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bubblegum/20 via-background to-lavender/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b-4 border-bubblegum shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-bubblegum rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-bubblegum">
                  Welcome back, {userData.name}! 👋
                </h1>
                <p className="text-muted-foreground">Ready for more Letter Twist fun?</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-2 border-destructive text-destructive hover:bg-destructive hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-bubblegum bg-white/90">
            <CardContent className="pt-6">
              <div className="text-center">
                <Trophy className="w-8 h-8 text-bubblegum mx-auto mb-2" />
                <div className="text-2xl font-bold text-bubblegum">{userData.totalScore}</div>
                <div className="text-sm text-muted-foreground">Total Score</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-sunshine bg-white/90">
            <CardContent className="pt-6">
              <div className="text-center">
                <Play className="w-8 h-8 text-sunshine mx-auto mb-2" />
                <div className="text-2xl font-bold text-sunshine">{userData.gamesPlayed}</div>
                <div className="text-sm text-muted-foreground">Games Played</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-grass bg-white/90">
            <CardContent className="pt-6">
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-grass mx-auto mb-2" />
                <div className="text-2xl font-bold text-grass">{averageScore}</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-lavender bg-white/90">
            <CardContent className="pt-6">
              <div className="text-center">
                <Star className="w-8 h-8 text-lavender mx-auto mb-2" />
                <div className="text-2xl font-bold text-lavender">{level}</div>
                <div className="text-sm text-muted-foreground">Current Level</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-8 border-4 border-primary bg-white/90">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              Level {level} Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Level {level}</span>
                <span>Level {level + 1}</span>
              </div>
              <Progress value={progressToNextLevel} className="h-3" />
              <div className="text-center text-muted-foreground">
                {progressToNextLevel}/100 points to next level
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Play Section */}
          <Card className="border-4 border-bubblegum bg-white/90">
            <CardHeader>
              <CardTitle className="text-2xl text-bubblegum text-center">
                🎮 Quick Play
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/game/practice">
                <Button className="w-full bg-grass hover:bg-grass/90 text-white text-lg py-6 rounded-xl">
                  <Target className="w-5 h-5 mr-2" />
                  Practice Mode
                </Button>
              </Link>
              <Link to="/game/timed">
                <Button className="w-full bg-orange hover:bg-orange/90 text-white text-lg py-6 rounded-xl">
                  <Clock className="w-5 h-5 mr-2" />
                  Timed Challenge
                </Button>
              </Link>
              <Link to="/game/achievements">
                <Button className="w-full bg-sunshine hover:bg-sunshine/90 text-white text-lg py-6 rounded-xl">
                  <Trophy className="w-5 h-5 mr-2" />
                  Achievement Hunt
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Achievements Section */}
          <Card className="border-4 border-sunshine bg-white/90">
            <CardHeader>
              <CardTitle className="text-2xl text-sunshine text-center">
                🏆 Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userData.achievements.length > 0 ? (
                <div className="space-y-3">
                  {userData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-sunshine/10 rounded-lg">
                      <Award className="w-6 h-6 text-sunshine" />
                      <span className="font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    No achievements yet! 
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Play games to unlock your first achievement!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8 border-2 border-lavender bg-white/70">
          <CardHeader>
            <CardTitle className="text-xl text-lavender">📊 Your Learning Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-bubblegum mb-2">
                  {Math.floor(userData.totalScore / 10)}
                </div>
                <div className="text-sm text-muted-foreground">Words Mastered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-grass mb-2">
                  {userData.gamesPlayed * 5}
                </div>
                <div className="text-sm text-muted-foreground">Minutes Played</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange mb-2">
                  {Math.floor(userData.totalScore / 50)}
                </div>
                <div className="text-sm text-muted-foreground">Levels Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
