import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { PSSSUQData } from "@/data/researchFramework";

interface PSUQSurveyProps {
  participantId: string;
  onSurveyComplete: (data: Partial<PSSSUQData>) => void;
}

const pssuqQuestions = [
  {
    key: "overall_satisfaction",
    question: "Overall, I am satisfied with how easy it is to use the WFD dashboard",
    category: "Overall Satisfaction"
  },
  {
    key: "ease_of_use", 
    question: "It was simple to use the dashboard",
    category: "Ease of Use"
  },
  {
    key: "effectiveness",
    question: "I could effectively complete my compliance tracking using the dashboard",
    category: "Effectiveness" 
  },
  {
    key: "learning_speed",
    question: "I learned to use the dashboard quickly",
    category: "Learning"
  },
  {
    key: "information_quality",
    question: "The information provided by the dashboard was clear and helpful",
    category: "Information Quality"
  },
  {
    key: "interface_quality",
    question: "The interface of the dashboard was pleasant",
    category: "Interface"
  },
  {
    key: "system_capabilities", 
    question: "The dashboard has all the functions and capabilities I expected",
    category: "Capabilities"
  },
  // WFD-specific questions
  {
    key: "compliance_improvement",
    question: "The dashboard helped me improve my compliance tracking",
    category: "WFD Specific"
  },
  {
    key: "workflow_efficiency",
    question: "The dashboard made my daily workflow more efficient", 
    category: "WFD Specific"
  },
  {
    key: "decision_confidence",
    question: "I feel more confident making data-driven decisions with the dashboard",
    category: "WFD Specific"
  }
];

export const PSUQSurvey = ({ participantId, onSurveyComplete }: PSUQSurveyProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [qualitativeFeedback, setQualitativeFeedback] = useState("");
  const [recommendationLikelihood, setRecommendationLikelihood] = useState(5);

  const progress = ((currentQuestion + 1) / (pssuqQuestions.length + 2)) * 100;
  const isQualitativeSection = currentQuestion === pssuqQuestions.length;
  const isFinalSection = currentQuestion === pssuqQuestions.length + 1;

  const handleResponse = (value: number) => {
    const questionKey = pssuqQuestions[currentQuestion]?.key;
    if (questionKey) {
      setResponses(prev => ({
        ...prev,
        [questionKey]: value
      }));
    }
  };

  const handleNext = () => {
    if (isFinalSection) {
      // Complete survey
      const pssuqData: Partial<PSSSUQData> = {
        participantId,
        timestamp: new Date(),
        responses: responses as PSSSUQData['responses'],
        qualitative_feedback: qualitativeFeedback,
        recommendation_likelihood: recommendationLikelihood
      };
      onSurveyComplete(pssuqData);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const canProceed = () => {
    if (currentQuestion < pssuqQuestions.length) {
      const questionKey = pssuqQuestions[currentQuestion]?.key;
      return questionKey && responses[questionKey] !== undefined;
    }
    return true;
  };

  const renderLikertScale = (questionKey: string) => {
    const scaleLabels = [
      "Strongly Disagree", "Disagree", "Somewhat Disagree", "Neutral", 
      "Somewhat Agree", "Agree", "Strongly Agree"
    ];

    return (
      <div className="space-y-4">
        <RadioGroup 
          value={responses[questionKey]?.toString() || ""} 
          onValueChange={(value) => handleResponse(parseInt(value))}
          className="grid grid-cols-1 gap-3"
        >
          {scaleLabels.map((label, index) => {
            const value = index + 1;
            return (
              <div key={value} className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                <RadioGroupItem value={value.toString()} id={`${questionKey}-${value}`} />
                <Label htmlFor={`${questionKey}-${value}`} className="flex-1 cursor-pointer">
                  <span className="font-semibold mr-2">{value}</span>
                  {label}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    );
  };

  const renderCurrentSection = () => {
    if (isQualitativeSection) {
      return (
        <div className="space-y-8">
          <div className="text-center mb-6">
            <h2 className="text-headline font-semibold text-primary mb-2">Additional Feedback</h2>
            <p className="text-body text-muted-foreground">
              Please share any additional thoughts about your experience with the dashboard
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-body font-medium mb-4 block">
                Please provide any additional comments about your experience with the WFD dashboard:
              </Label>
              <Textarea
                value={qualitativeFeedback}
                onChange={(e) => setQualitativeFeedback(e.target.value)}
                placeholder="Share any specific feedback, suggestions for improvement, or positive experiences..."
                className="min-h-[120px]"
              />
            </div>

            <div>
              <Label className="text-body font-medium mb-4 block">
                How likely are you to recommend this dashboard to colleagues at other programs?
              </Label>
              <RadioGroup 
                value={recommendationLikelihood.toString()} 
                onValueChange={(value) => setRecommendationLikelihood(parseInt(value))}
                className="grid grid-cols-2 lg:grid-cols-5 gap-3"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <div key={value} className="flex items-center space-x-2 p-3 bg-muted/20 rounded-lg">
                    <RadioGroupItem value={value.toString()} id={`rec-${value}`} />
                    <Label htmlFor={`rec-${value}`} className="cursor-pointer font-semibold">
                      {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="flex justify-between mt-2 text-caption text-muted-foreground">
                <span>1 - Would not recommend</span>
                <span>10 - Highly recommend</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (isFinalSection) {
      return (
        <div className="space-y-8">
          <div className="text-center mb-6">
            <h2 className="text-headline font-semibold text-primary mb-2">PSSUQ Assessment Complete</h2>
            <p className="text-body text-muted-foreground">
              Thank you for completing the Post-Study System Usability Questionnaire!
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg">
            <h3 className="text-title font-semibold text-primary mb-4">Your Responses Summary</h3>
            <div className="grid md:grid-cols-2 gap-4 text-body">
              <div>
                <h4 className="font-semibold mb-2">Usability Scores (1-7 scale):</h4>
                <ul className="space-y-1 text-sm">
                  <li>Overall Satisfaction: {responses.overall_satisfaction || 'Not rated'}/7</li>
                  <li>Ease of Use: {responses.ease_of_use || 'Not rated'}/7</li>
                  <li>Effectiveness: {responses.effectiveness || 'Not rated'}/7</li>
                  <li>Learning Speed: {responses.learning_speed || 'Not rated'}/7</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">WFD-Specific Scores:</h4>
                <ul className="space-y-1 text-sm">
                  <li>Compliance Improvement: {responses.compliance_improvement || 'Not rated'}/7</li>
                  <li>Workflow Efficiency: {responses.workflow_efficiency || 'Not rated'}/7</li>
                  <li>Decision Confidence: {responses.decision_confidence || 'Not rated'}/7</li>
                  <li>Recommendation: {recommendationLikelihood}/10</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
            <h3 className="text-title font-semibold text-green-800 mb-2">Research Contribution</h3>
            <p className="text-body text-green-700">
              Your feedback will be included in Dr. Gallup's research publication and help improve 
              dashboard design for homeless services programs across the sector. Thank you for your valuable contribution!
            </p>
          </div>
        </div>
      );
    }

    // Regular PSSUQ question
    const question = pssuqQuestions[currentQuestion];
    return (
      <div className="space-y-8">
        <div className="text-center mb-6">
          <div className="inline-block bg-primary/10 px-3 py-1 rounded-full text-caption text-primary font-medium mb-2">
            {question.category}
          </div>
          <h2 className="text-headline font-semibold text-primary mb-4">
            Question {currentQuestion + 1} of {pssuqQuestions.length}
          </h2>
          <p className="text-title leading-relaxed">
            "{question.question}"
          </p>
        </div>

        {renderLikertScale(question.key)}

        <div className="bg-muted/30 p-4 rounded-lg">
          <p className="text-caption text-muted-foreground text-center">
            PSSUQ uses a 7-point scale where 1 = Strongly Disagree and 7 = Strongly Agree
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/99d2ad22-59f8-4c35-8f1b-8947ccf5657e.png" 
              alt="WFD Logo" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-headline font-bold text-primary">PSSUQ Usability Assessment</h1>
              <p className="text-body text-muted-foreground">Post-Study System Usability Questionnaire</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-body font-medium">
                {isFinalSection ? "Complete" : 
                 isQualitativeSection ? "Additional Feedback" : 
                 `Question ${currentQuestion + 1} of ${pssuqQuestions.length}`}
              </span>
              <span className="text-body text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Survey Content */}
          <Card className="p-8 mb-6">
            {renderCurrentSection()}
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {isFinalSection ? "Complete Assessment" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};