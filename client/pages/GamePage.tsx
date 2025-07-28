import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Construction, Sparkles } from "lucide-react";

interface GamePageProps {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

export default function GamePage({ title, description, color, icon }: GamePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sunshine/20 via-background to-ocean/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b-4 border-primary shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-primary hover:text-primary/80">
              <ArrowLeft className="w-6 h-6" />
              <span className="text-lg font-semibold">Back to Home</span>
            </Link>
            <h1 className="text-3xl font-bold text-primary">{title}</h1>
            <div></div>
          </div>
        </div>
      </header>

      {/* Coming Soon Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className={`w-24 h-24 bg-${color} rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce`}>
              {icon}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {description}
            </p>
          </div>

          <Card className="border-4 border-orange bg-white/90 shadow-xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Construction className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-orange-foreground">Coming Soon!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-muted-foreground">
                We're working hard to bring you amazing {title.toLowerCase()} activities! 
                This section will be filled with fun, educational games and exercises.
              </p>
              <div className="flex items-center justify-center gap-2 text-orange">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Stay tuned for awesome updates!</span>
                <Sparkles className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 space-y-4">
            <p className="text-muted-foreground">
              Want to see this feature completed? Ask your teacher to continue building this section!
            </p>
            <Link to="/">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl py-6 px-12 rounded-2xl"
              >
                Explore Other Games
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
