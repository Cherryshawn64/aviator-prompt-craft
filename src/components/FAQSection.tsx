import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Shield, BarChart3, Smartphone } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is this a gambling tool?",
      answer: "No. Aviator Stats Tracker is a statistical analysis tool only. It does not support, promote, or enable betting or gambling activities. We only provide historical data analysis and statistical predictions for educational purposes.",
      icon: Shield
    },
    {
      question: "How accurate are the predictions?",
      answer: "Our predictions are based on statistical analysis of historical data patterns. However, Aviator is a game of chance, and past results do not guarantee future outcomes. Predictions should be viewed as educational content only.",
      icon: BarChart3
    },
    {
      question: "Do I need internet access to use the app?",
      answer: "You need internet access to load the latest data and generate new predictions. However, once loaded, you can view previously loaded history and predictions offline.",
      icon: Smartphone
    },
    {
      question: "Does the app collect my personal data?",
      answer: "No. We do not collect any personal information, use cookies for tracking, or require user accounts. The app operates completely anonymously and respects your privacy.",
      icon: Shield
    },
    {
      question: "How often is the data updated?",
      answer: "Historical data is updated continuously as new rounds complete. You can manually refresh predictions at any time using the refresh button to get the latest statistical analysis.",
      icon: BarChart3
    },
    {
      question: "Can I use this app on mobile devices?",
      answer: "Yes! The app is fully responsive and optimized for mobile devices. It works seamlessly on smartphones, tablets, and desktop computers through any modern web browser.",
      icon: Smartphone
    },
    {
      question: "What algorithm do you use for predictions?",
      answer: "We use statistical analysis based on historical multiplier patterns, frequency analysis, and trend identification. The algorithm considers recent performance but cannot predict random outcomes with certainty.",
      icon: BarChart3
    },
    {
      question: "Is the app free to use?",
      answer: "Yes, Aviator Stats Tracker is completely free to use. There are no hidden fees, premium features, or subscription requirements. All features are available to all users.",
      icon: HelpCircle
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">Common questions about Aviator Stats Tracker</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Questions & Answers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <faq.icon className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pl-7">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <Shield className="h-8 w-8 text-primary mx-auto" />
            <h3 className="font-semibold">Privacy & Safety First</h3>
            <p className="text-sm text-muted-foreground">
              This app is designed for educational and statistical analysis purposes only. 
              We do not collect personal data and strongly discourage any form of gambling.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQSection;