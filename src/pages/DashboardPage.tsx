import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useGetContentModules, useUpdateProgress } from '../hooks/useQueries';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Lock, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import SecureViewer from '../components/SecureViewer';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: contentModules, isLoading } = useGetContentModules();
  const updateProgressMutation = useUpdateProgress();

  const isAuthenticated = !!identity;

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to access the dashboard');
      navigate({ to: '/' });
      return;
    }

    if (userProfile && !userProfile.isPaid) {
      toast.error('Please complete enrollment to access the dashboard');
      navigate({ to: '/enroll' });
    }
  }, [isAuthenticated, userProfile, navigate]);

  const handleProgressUpdate = async (moduleId: string, progress: number) => {
    if (!userProfile) return;

    try {
      await updateProgressMutation.mutateAsync({
        contentModuleId: moduleId,
        progress: BigInt(progress),
        sessionToken: userProfile.sessionToken,
      });
      toast.success('Progress updated!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update progress');
    }
  };

  const getModuleProgress = (moduleId: string): number => {
    if (!userProfile) return 0;
    const progressEntry = userProfile.progress.find(([id]) => id === moduleId);
    return progressEntry ? Number(progressEntry[1]) : 0;
  };

  const calculateOverallProgress = (): number => {
    if (!contentModules || contentModules.length === 0) return 0;
    const totalProgress = contentModules.reduce((sum, module) => sum + getModuleProgress(module.id), 0);
    return Math.round(totalProgress / contentModules.length);
  };

  if (!isAuthenticated || !userProfile || !userProfile.isPaid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <Lock className="w-20 h-20 text-notebook-dark mx-auto mb-6" />
          <h2 className="font-heading text-5xl text-notebook-dark mb-4">Access Restricted</h2>
          <p className="font-handwritten text-2xl text-notebook-dark mb-8">
            Please enroll to access the dashboard
          </p>
          <Button
            size="lg"
            onClick={() => navigate({ to: '/enroll' })}
            className="font-handwritten text-xl px-8 py-6 bg-notebook-dark hover:bg-notebook-medium text-white border-2 border-notebook-dark"
          >
            Enroll Now
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-notebook-dark"></div>
          <p className="mt-6 font-handwritten text-2xl text-notebook-dark">Loading your content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="font-heading text-6xl md:text-7xl text-notebook-dark mb-4">
              Your Dashboard
            </h1>
            <p className="font-handwritten text-2xl text-notebook-dark">
              Welcome back, {userProfile.email}
            </p>
          </div>

          <Card className="border-3 border-notebook-dark bg-white shadow-lg mb-12">
            <CardHeader>
              <CardTitle className="font-heading text-4xl text-notebook-dark flex items-center gap-3">
                <TrendingUp className="w-10 h-10" />
                Overall Progress
              </CardTitle>
              <CardDescription className="font-handwritten text-xl text-notebook-dark">
                Track your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between font-handwritten text-2xl text-notebook-dark">
                  <span>Completion</span>
                  <span className="font-bold">{calculateOverallProgress()}%</span>
                </div>
                <Progress value={calculateOverallProgress()} className="h-6 bg-notebook-light" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-3 border-notebook-dark bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="font-heading text-4xl text-notebook-dark flex items-center gap-3">
                <BookOpen className="w-10 h-10" />
                Course Modules
              </CardTitle>
              <CardDescription className="font-handwritten text-xl text-notebook-dark">
                Click on any module to view content and track progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!contentModules || contentModules.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-notebook-medium mx-auto mb-4" />
                  <p className="font-handwritten text-2xl text-notebook-dark">
                    No content available yet. Check back soon!
                  </p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {contentModules.map((module) => {
                    const progress = getModuleProgress(module.id);
                    return (
                      <AccordionItem 
                        key={module.id} 
                        value={module.id}
                        className="border-2 border-notebook-dark rounded-lg bg-notebook-light px-4"
                      >
                        <AccordionTrigger className="font-handwritten text-xl hover:no-underline py-6">
                          <div className="flex-1 text-left pr-4">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-notebook-dark font-bold">{module.title}</span>
                              <span className="text-lg text-notebook-dark bg-notebook-accent px-3 py-1 rounded-full border-2 border-notebook-dark">
                                {progress}%
                              </span>
                            </div>
                            <Progress value={progress} className="h-3 bg-white" />
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-6 pb-4 space-y-6">
                            <p className="font-handwritten text-lg text-notebook-dark leading-relaxed">
                              {module.description}
                            </p>
                            {module.content && module.content.length > 0 && (
                              <div className="space-y-6">
                                {module.content.map((blob, index) => (
                                  <SecureViewer key={index} blob={blob} index={index} />
                                ))}
                              </div>
                            )}
                            <div className="flex gap-3 pt-4">
                              <Button
                                onClick={() => handleProgressUpdate(module.id, Math.min(progress + 10, 100))}
                                disabled={progress >= 100 || updateProgressMutation.isPending}
                                className="font-handwritten text-lg px-6 py-5 bg-notebook-dark hover:bg-notebook-medium text-white border-2 border-notebook-dark"
                              >
                                {progress >= 100 ? 'Completed ✓' : 'Mark Progress +10%'}
                              </Button>
                              {progress > 0 && (
                                <Button
                                  variant="outline"
                                  onClick={() => handleProgressUpdate(module.id, 0)}
                                  disabled={updateProgressMutation.isPending}
                                  className="font-handwritten text-lg px-6 py-5 border-2 border-notebook-dark text-notebook-dark hover:bg-notebook-accent"
                                >
                                  Reset Progress
                                </Button>
                              )}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
