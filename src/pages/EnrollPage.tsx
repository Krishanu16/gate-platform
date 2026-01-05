import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSimulatePayment } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, CreditCard, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function EnrollPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const simulatePaymentMutation = useSimulatePayment();
  const [isProcessing, setIsProcessing] = useState(false);

  const isAuthenticated = !!identity;

  const handlePayment = async () => {
    if (!isAuthenticated) {
      toast.error('Please login first to enroll');
      return;
    }

    if (!userProfile) {
      toast.error('Profile not found. Please complete your profile setup.');
      return;
    }

    if (userProfile.isPaid) {
      toast.info('You are already enrolled!');
      navigate({ to: '/dashboard' });
      return;
    }

    setIsProcessing(true);
    try {
      await simulatePaymentMutation.mutateAsync(userProfile.sessionToken);
      toast.success('Payment successful! Welcome to GATE Petroleum Engineering 2026!');
      setTimeout(() => {
        navigate({ to: '/dashboard' });
      }, 1500);
    } catch (error: any) {
      toast.error(error.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (isAuthenticated && userProfile?.isPaid) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-3 border-notebook-dark bg-white shadow-xl">
            <CardHeader className="text-center">
              <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4" />
              <CardTitle className="font-heading text-5xl text-notebook-dark mb-4">
                You're Already Enrolled!
              </CardTitle>
              <CardDescription className="font-handwritten text-xl text-notebook-dark">
                Access your learning materials in the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                size="lg"
                onClick={() => navigate({ to: '/dashboard' })}
                className="font-handwritten text-xl px-8 py-6 bg-notebook-dark hover:bg-notebook-medium text-white border-2 border-notebook-dark"
              >
                Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-heading text-6xl md:text-7xl text-notebook-dark text-center mb-4">
            Enroll in GATE Petroleum Engineering 2026
          </h1>
          <p className="font-handwritten text-xl text-notebook-dark text-center mb-12 max-w-3xl mx-auto">
            Take the first step towards your success. Get lifetime access to all course materials.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-3 border-notebook-dark bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="font-heading text-4xl text-notebook-dark">
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent className="font-handwritten text-lg space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-notebook-dark">Complete study materials for all topics</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-notebook-dark">Progress tracking and analytics</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-notebook-dark">Secure, watermarked content</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-notebook-dark">Access until GATE 2026 exam</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-notebook-dark">Regular content updates</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-notebook-dark">Expert support and guidance</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-3 border-notebook-dark bg-notebook-accent shadow-lg">
              <CardHeader>
                <CardTitle className="font-heading text-4xl text-notebook-dark">
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-8">
                  <div className="font-heading text-7xl text-notebook-dark mb-2">₹4,999</div>
                  <div className="font-handwritten text-2xl text-notebook-dark">
                    One-time payment • Lifetime access
                  </div>
                </div>
                {!isAuthenticated ? (
                  <div className="text-center">
                    <p className="font-handwritten text-xl text-notebook-dark mb-6 leading-relaxed">
                      Please login to continue with enrollment
                    </p>
                    <div className="p-4 bg-white border-2 border-notebook-dark rounded-lg">
                      <p className="font-handwritten text-lg text-notebook-dark">
                        Click the "Login" button in the header to get started
                      </p>
                    </div>
                  </div>
                ) : (
                  <Button
                    size="lg"
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full font-handwritten text-xl py-6 bg-notebook-dark hover:bg-notebook-medium text-white border-2 border-notebook-dark"
                  >
                    {isProcessing ? (
                      'Processing Payment...'
                    ) : (
                      <>
                        <CreditCard className="w-6 h-6 mr-2" />
                        Proceed to Payment (Mock)
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="border-3 border-notebook-dark bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="font-heading text-4xl text-notebook-dark">
                Course Modules
              </CardTitle>
              <CardDescription className="font-handwritten text-xl text-notebook-dark">
                Comprehensive coverage of all GATE Petroleum Engineering topics
              </CardDescription>
            </CardHeader>
            <CardContent className="font-handwritten text-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-3xl text-notebook-dark mb-4">Core Subjects</h3>
                  <ul className="space-y-2 text-notebook-dark">
                    <li className="flex items-start gap-2">
                      <span className="text-notebook-dark font-bold">•</span>
                      <span>Drilling Engineering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-notebook-dark font-bold">•</span>
                      <span>Production Engineering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-notebook-dark font-bold">•</span>
                      <span>Reservoir Engineering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-notebook-dark font-bold">•</span>
                      <span>Formation Evaluation</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-3xl text-notebook-dark mb-4">Supporting Subjects</h3>
                  <ul className="space-y-2 text-notebook-dark">
                    <li className="flex items-start gap-2">
                      <span className="text-notebook-dark font-bold">•</span>
                      <span>Engineering Mathematics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-notebook-dark font-bold">•</span>
                      <span>Fluid Mechanics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-notebook-dark font-bold">•</span>
                      <span>Thermodynamics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-notebook-dark font-bold">•</span>
                      <span>General Aptitude</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
