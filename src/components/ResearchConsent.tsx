import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ResearchConsentProps {
  onConsentGiven: (consent: boolean) => void;
  participantInfo?: {
    name: string;
    email: string;
    role: string;
    program: string;
  };
}

export const ResearchConsent = ({ onConsentGiven, participantInfo }: ResearchConsentProps) => {
  const [consentChecks, setConsentChecks] = useState({
    participation: false,
    dataCollection: false,
    anonymization: false,
    withdrawal: false,
    publication: false
  });

  const allConsentsGiven = Object.values(consentChecks).every(Boolean);

  const handleConsentChange = (key: keyof typeof consentChecks, checked: boolean) => {
    setConsentChecks(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleSubmit = () => {
    if (allConsentsGiven) {
      onConsentGiven(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/lovable-uploads/99d2ad22-59f8-4c35-8f1b-8947ccf5657e.png" 
              alt="WFD Logo" 
              className="w-12 h-12 object-contain"
            />
            <h1 className="text-hero font-bold text-primary">Research Participation Consent</h1>
          </div>
          <p className="text-title text-primary">Digital Transformation in Homeless Services</p>
          <p className="text-body text-muted-foreground">Gates Foundation Research Framework Study</p>
        </div>

        {/* Participant Info */}
        {participantInfo && (
          <div className="bg-muted/30 p-4 rounded-lg mb-6">
            <h3 className="text-title font-semibold mb-2">Participant Information</h3>
            <div className="grid grid-cols-2 gap-4 text-body">
              <div><strong>Name:</strong> {participantInfo.name}</div>
              <div><strong>Email:</strong> {participantInfo.email}</div>
              <div><strong>Role:</strong> {participantInfo.role}</div>
              <div><strong>Program:</strong> {participantInfo.program}</div>
            </div>
          </div>
        )}

        {/* Study Information */}
        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-title font-semibold mb-3 text-primary">Study Purpose</h3>
            <p className="text-body leading-relaxed">
              This research study investigates how implementing a digital dashboard affects compliance rates and operational 
              effectiveness in homeless services programs. We are using validated research methodologies from the Gates 
              Foundation to ensure academic rigor and publication-quality results.
            </p>
          </div>

          <div>
            <h3 className="text-title font-semibold mb-3 text-primary">What You'll Be Asked To Do</h3>
            <ul className="text-body space-y-2 list-disc list-inside">
              <li><strong>Pre-training survey:</strong> 10-15 minutes documenting current practices and knowledge (today)</li>
              <li><strong>Dashboard training:</strong> Participate in training sessions and use the new dashboard</li>
              <li><strong>PSSUQ usability assessment:</strong> 5-10 minutes rating dashboard usability (after 60 days)</li>
              <li><strong>Post-implementation survey:</strong> 10-15 minutes documenting changes and impacts</li>
              <li><strong>Optional follow-up:</strong> Brief check-ins at 6 months for longitudinal data</li>
            </ul>
          </div>

          <div>
            <h3 className="text-title font-semibold mb-3 text-primary">Data Protection & Your Rights</h3>
            <ul className="text-body space-y-2 list-disc list-inside">
              <li>All personal identifiers will be removed before analysis and publication</li>
              <li>Data will be stored securely and accessed only by authorized research team members</li>
              <li>You may withdraw from the study at any time without penalty</li>
              <li>Results may be published in academic journals and presented at conferences</li>
              <li>You will receive a summary of findings upon study completion</li>
            </ul>
          </div>

          <div>
            <h3 className="text-title font-semibold mb-3 text-primary">Benefits & Risks</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">Benefits:</h4>
                <ul className="text-body space-y-1 list-disc list-inside">
                  <li>Improved dashboard tools for your work</li>
                  <li>Enhanced compliance tracking capabilities</li>
                  <li>Contributing to sector-wide best practices</li>
                  <li>Professional development opportunity</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Risks:</h4>
                <ul className="text-body space-y-1 list-disc list-inside">
                  <li>Minimal - primarily time commitment</li>
                  <li>Potential minor inconvenience during training</li>
                  <li>No anticipated professional or personal risks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Consent Checkboxes */}
        <div className="space-y-4 mb-8">
          <h3 className="text-title font-semibold text-primary">Consent Statements</h3>
          <p className="text-body text-muted-foreground mb-4">
            Please check each box to indicate your understanding and agreement:
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-muted/20 rounded-lg">
              <Checkbox 
                id="participation"
                checked={consentChecks.participation}
                onCheckedChange={(checked) => handleConsentChange('participation', checked as boolean)}
              />
              <Label htmlFor="participation" className="text-body leading-relaxed cursor-pointer">
                I understand the purpose of this study and voluntarily agree to participate in all research activities 
                including surveys, training, and usability assessments.
              </Label>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-muted/20 rounded-lg">
              <Checkbox 
                id="dataCollection"
                checked={consentChecks.dataCollection}
                onCheckedChange={(checked) => handleConsentChange('dataCollection', checked as boolean)}
              />
              <Label htmlFor="dataCollection" className="text-body leading-relaxed cursor-pointer">
                I consent to the collection of my survey responses, dashboard usage data, and performance metrics 
                for research purposes.
              </Label>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-muted/20 rounded-lg">
              <Checkbox 
                id="anonymization"
                checked={consentChecks.anonymization}
                onCheckedChange={(checked) => handleConsentChange('anonymization', checked as boolean)}
              />
              <Label htmlFor="anonymization" className="text-body leading-relaxed cursor-pointer">
                I understand that my data will be anonymized before analysis and that no personally identifiable 
                information will be included in publications or presentations.
              </Label>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-muted/20 rounded-lg">
              <Checkbox 
                id="withdrawal"
                checked={consentChecks.withdrawal}
                onCheckedChange={(checked) => handleConsentChange('withdrawal', checked as boolean)}
              />
              <Label htmlFor="withdrawal" className="text-body leading-relaxed cursor-pointer">
                I understand that I may withdraw from this study at any time without penalty or negative impact 
                on my employment or access to services.
              </Label>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-muted/20 rounded-lg">
              <Checkbox 
                id="publication"
                checked={consentChecks.publication}
                onCheckedChange={(checked) => handleConsentChange('publication', checked as boolean)}
              />
              <Label htmlFor="publication" className="text-body leading-relaxed cursor-pointer">
                I consent to the use of my anonymized data in academic publications, conference presentations, 
                and reports to improve homeless services practices.
              </Label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            onClick={() => onConsentGiven(false)}
            className="sm:w-40"
          >
            Decline Participation
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!allConsentsGiven}
            className="sm:w-40"
          >
            {allConsentsGiven ? "Begin Study" : "Complete All Consents"}
          </Button>
        </div>

        {/* Contact Information */}
        <div className="mt-8 p-4 bg-primary/10 rounded-lg text-center">
          <h4 className="font-semibold text-primary mb-2">Questions or Concerns?</h4>
          <p className="text-body">
            Contact Dr. Donna Gallup at <a href="mailto:donna@wfd.org" className="text-primary underline">donna@wfd.org</a> 
            or Eric at <a href="mailto:eric@recovery-compass.org" className="text-primary underline">eric@recovery-compass.org</a>
          </p>
        </div>
      </Card>
    </div>
  );
};