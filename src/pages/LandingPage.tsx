import { useNavigate } from '@tanstack/react-router';

export default function LandingPage() {
  const navigate = useNavigate();

  const courseModules = [
    {
      id: 1,
      title: 'Drilling Engineering',
      description: 'Master drilling fundamentals, techniques, and advanced concepts for petroleum operations'
    },
    {
      id: 2,
      title: 'Production Engineering',
      description: 'Well completion, artificial lift systems, and production optimization strategies'
    },
    {
      id: 3,
      title: 'Reservoir Engineering',
      description: 'Fluid properties, material balance, and comprehensive reservoir characterization'
    },
    {
      id: 4,
      title: 'Formation Evaluation',
      description: 'Well logging techniques, log interpretation, and detailed formation analysis'
    },
    {
      id: 5,
      title: 'Natural Gas Engineering',
      description: 'Gas processing, transportation systems, and storage facility management'
    },
    {
      id: 6,
      title: 'Engineering Mathematics',
      description: 'Calculus, linear algebra, differential equations, and numerical methods'
    },
    {
      id: 7,
      title: 'Fluid Mechanics',
      description: 'Flow dynamics, pressure systems, and comprehensive fluid properties'
    },
    {
      id: 8,
      title: 'Thermodynamics',
      description: 'Energy systems, heat transfer principles, and thermodynamic cycles'
    },
    {
      id: 9,
      title: 'General Aptitude',
      description: 'Verbal ability, numerical reasoning, and logical thinking skills'
    }
  ];

  return (
    <div className="min-h-screen grid-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center mb-12 md:mb-16">
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-notebook-dark mb-4 md:mb-6 leading-tight">
            GATE Petroleum Engineering 2026
          </h1>
          <p className="font-handwritten text-lg sm:text-xl md:text-2xl text-notebook-dark mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            Master GATE Petroleum Engineering with our comprehensive, secure, and expertly crafted study materials. 
            Your journey to success starts here!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button
              onClick={() => navigate({ to: '/enroll' })}
              className="font-handwritten text-lg md:text-xl px-6 md:px-10 py-3 md:py-4 bg-notebook-dark hover:bg-notebook-medium text-white border-2 border-notebook-dark rounded-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
            >
              Enroll Now →
            </button>
            <button
              onClick={() => navigate({ to: '/enroll' })}
              className="font-handwritten text-lg md:text-xl px-6 md:px-10 py-3 md:py-4 bg-white hover:bg-notebook-accent text-notebook-dark border-2 border-notebook-dark rounded-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
            >
              Learn More
            </button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-12 md:mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-notebook-dark text-center mb-8 md:mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Feature Card 1 */}
            <div className="bg-white border-2 border-notebook-dark rounded-lg p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="mb-4">
                <svg className="w-12 h-12 md:w-14 md:h-14 text-notebook-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl text-notebook-dark mb-3">
                Comprehensive Content
              </h3>
              <p className="font-handwritten text-base md:text-lg text-notebook-dark leading-relaxed">
                Complete study materials covering all GATE Petroleum Engineering topics with detailed explanations and examples
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white border-2 border-notebook-dark rounded-lg p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="mb-4">
                <svg className="w-12 h-12 md:w-14 md:h-14 text-notebook-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl text-notebook-dark mb-3">
                Secure Platform
              </h3>
              <p className="font-handwritten text-base md:text-lg text-notebook-dark leading-relaxed">
                Advanced anti-piracy measures and content protection to safeguard your investment and our premium materials
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white border-2 border-notebook-dark rounded-lg p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="mb-4">
                <svg className="w-12 h-12 md:w-14 md:h-14 text-notebook-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl text-notebook-dark mb-3">
                Track Progress
              </h3>
              <p className="font-handwritten text-base md:text-lg text-notebook-dark leading-relaxed">
                Monitor your learning journey with our intuitive progress tracking system and stay motivated throughout
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white border-2 border-notebook-dark rounded-lg p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="mb-4">
                <svg className="w-12 h-12 md:w-14 md:h-14 text-notebook-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl text-notebook-dark mb-3">
                Expert Guidance
              </h3>
              <p className="font-handwritten text-base md:text-lg text-notebook-dark leading-relaxed">
                Content curated and reviewed by experienced petroleum engineering professionals and GATE toppers
              </p>
            </div>
          </div>
        </section>

        {/* Course Modules Section - Enhanced with note-card styling */}
        <section className="mb-12 md:mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-notebook-dark text-center mb-4">
            Course Modules
          </h2>
          <p className="font-handwritten text-lg md:text-xl text-notebook-dark text-center mb-8 md:mb-12 max-w-3xl mx-auto">
            Explore our comprehensive curriculum designed to cover every aspect of GATE Petroleum Engineering
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {courseModules.map((module) => (
              <div
                key={module.id}
                className="bg-white border-2 border-notebook-dark rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-notebook-accent group cursor-pointer relative overflow-hidden"
              >
                {/* Yellow highlight accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-notebook-accent opacity-30 rounded-bl-full transition-all duration-300 group-hover:opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-notebook-accent group-hover:bg-white border-2 border-notebook-dark rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm">
                      <span className="font-heading text-2xl text-notebook-dark">{module.id}</span>
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl text-notebook-dark mb-3 leading-tight">
                    {module.title}
                  </h3>
                  <p className="font-handwritten text-base md:text-lg text-notebook-dark leading-relaxed mb-4">
                    {module.description}
                  </p>
                  <button
                    onClick={() => navigate({ to: '/enroll' })}
                    className="font-handwritten text-base md:text-lg px-5 py-2 bg-notebook-dark hover:bg-notebook-medium text-white border-2 border-notebook-dark rounded-lg shadow transition-all duration-300 hover:shadow-md group-hover:scale-105"
                  >
                    View Module →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What You'll Learn Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-notebook-dark text-center mb-8 md:mb-12">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Core Subjects Card */}
            <div className="bg-white border-2 border-notebook-dark rounded-lg p-6 md:p-8 shadow-lg">
              <h3 className="font-heading text-3xl md:text-4xl text-notebook-dark mb-6">
                Core Petroleum Subjects
              </h3>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-notebook-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-handwritten text-base md:text-lg text-notebook-dark">Drilling Engineering - Fundamentals, techniques, and advanced concepts</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-notebook-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-handwritten text-base md:text-lg text-notebook-dark">Production Engineering - Well completion and production optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-notebook-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-handwritten text-base md:text-lg text-notebook-dark">Reservoir Engineering - Fluid properties and reservoir characterization</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-notebook-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-handwritten text-base md:text-lg text-notebook-dark">Formation Evaluation - Well logging and interpretation techniques</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-notebook-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-handwritten text-base md:text-lg text-notebook-dark">Natural Gas Engineering - Processing and transportation</span>
                </li>
              </ul>
            </div>

            {/* Supporting Subjects Card */}
            <div className="bg-white border-2 border-notebook-dark rounded-lg p-6 md:p-8 shadow-lg">
              <h3 className="font-heading text-3xl md:text-4xl text-notebook-dark mb-6">
                Supporting Subjects
              </h3>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-notebook-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-handwritten text-base md:text-lg text-notebook-dark">Engineering Mathematics - Calculus, linear algebra, and differential equations</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-notebook-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-handwritten text-base md:text-lg text-notebook-dark">Fluid Mechanics - Flow dynamics and pressure systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-notebook-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-handwritten text-base md:text-lg text-notebook-dark">Thermodynamics - Energy systems and heat transfer</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-notebook-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-handwritten text-base md:text-lg text-notebook-dark">General Aptitude - Verbal and numerical reasoning</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-notebook-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-handwritten text-base md:text-lg text-notebook-dark">Engineering Mechanics - Statics and dynamics fundamentals</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="mb-12 md:mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-notebook-dark text-center mb-8 md:mb-12">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-notebook-accent border-2 border-notebook-dark rounded-lg p-6 shadow-lg">
              <div className="mb-4">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-notebook-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl text-notebook-dark mb-3">
                Secure Access
              </h3>
              <p className="font-handwritten text-base md:text-lg text-notebook-dark leading-relaxed">
                Internet Identity authentication ensures your account is protected with cutting-edge blockchain security
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-notebook-accent border-2 border-notebook-dark rounded-lg p-6 shadow-lg">
              <div className="mb-4">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-notebook-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl text-notebook-dark mb-3">
                Progress Tracking
              </h3>
              <p className="font-handwritten text-base md:text-lg text-notebook-dark leading-relaxed">
                Keep track of completed modules, time spent, and areas that need more focus with detailed analytics
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-notebook-accent border-2 border-notebook-dark rounded-lg p-6 shadow-lg">
              <div className="mb-4">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-notebook-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl text-notebook-dark mb-3">
                Interactive Content
              </h3>
              <p className="font-handwritten text-base md:text-lg text-notebook-dark leading-relaxed">
                Engage with diagrams, illustrations, and visual aids that make complex concepts easy to understand
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-notebook-accent border-2 border-notebook-dark rounded-lg p-6 shadow-lg">
              <div className="mb-4">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-notebook-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl text-notebook-dark mb-3">
                24/7 Access
              </h3>
              <p className="font-handwritten text-base md:text-lg text-notebook-dark leading-relaxed">
                Study at your own pace, anytime, anywhere. All materials are available round the clock
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-notebook-accent border-2 border-notebook-dark rounded-lg p-6 shadow-lg">
              <div className="mb-4">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-notebook-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl text-notebook-dark mb-3">
                Regular Updates
              </h3>
              <p className="font-handwritten text-base md:text-lg text-notebook-dark leading-relaxed">
                Content is continuously updated to reflect the latest GATE syllabus and exam patterns
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-notebook-accent border-2 border-notebook-dark rounded-lg p-6 shadow-lg">
              <div className="mb-4">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-notebook-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl text-notebook-dark mb-3">
                Structured Learning
              </h3>
              <p className="font-handwritten text-base md:text-lg text-notebook-dark leading-relaxed">
                Follow a carefully designed curriculum that builds knowledge progressively from basics to advanced
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="mb-12 md:mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-notebook-dark text-center mb-8 md:mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border-2 border-notebook-dark rounded-lg p-8 md:p-10 shadow-xl">
              <div className="text-center mb-6">
                <h3 className="font-heading text-4xl md:text-5xl text-notebook-dark mb-4">
                  Complete Access
                </h3>
                <div className="mb-4">
                  <span className="font-heading text-5xl md:text-6xl text-notebook-dark">₹4,999</span>
                  <span className="font-handwritten text-xl md:text-2xl text-notebook-dark ml-2">one-time</span>
                </div>
                <p className="font-handwritten text-lg md:text-xl text-notebook-dark">
                  Lifetime access to all materials
                </p>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-notebook-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-handwritten text-base md:text-lg text-notebook-dark">Complete study materials for all subjects</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-notebook-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-handwritten text-base md:text-lg text-notebook-dark">Progress tracking and analytics</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-notebook-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-handwritten text-base md:text-lg text-notebook-dark">24/7 access from any device</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-notebook-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-handwritten text-base md:text-lg text-notebook-dark">Regular content updates</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-notebook-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-handwritten text-base md:text-lg text-notebook-dark">Secure, anti-piracy protected content</span>
                </div>
              </div>
              <button
                onClick={() => navigate({ to: '/enroll' })}
                className="w-full font-handwritten text-xl px-8 py-4 bg-notebook-dark hover:bg-notebook-medium text-white border-2 border-notebook-dark rounded-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Started Now →
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-notebook-dark text-center mb-8 md:mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {/* FAQ 1 */}
            <div className="bg-white border-2 border-notebook-dark rounded-lg p-6 shadow-lg">
              <h3 className="font-heading text-2xl md:text-3xl text-notebook-dark mb-3">
                How long do I have access to the materials?
              </h3>
              <p className="font-handwritten text-base md:text-lg text-notebook-dark leading-relaxed">
                You get lifetime access to all materials with a one-time payment. Study at your own pace without any time restrictions.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white border-2 border-notebook-dark rounded-lg p-6 shadow-lg">
              <h3 className="font-heading text-2xl md:text-3xl text-notebook-dark mb-3">
                Can I access the content on multiple devices?
              </h3>
              <p className="font-handwritten text-base md:text-lg text-notebook-dark leading-relaxed">
                Yes, you can access your account from any device. However, for security reasons, only one active session is allowed at a time.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white border-2 border-notebook-dark rounded-lg p-6 shadow-lg">
              <h3 className="font-heading text-2xl md:text-3xl text-notebook-dark mb-3">
                Is the content updated regularly?
              </h3>
              <p className="font-handwritten text-base md:text-lg text-notebook-dark leading-relaxed">
                Yes, we continuously update our content to reflect the latest GATE syllabus, exam patterns, and industry developments.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white border-2 border-notebook-dark rounded-lg p-6 shadow-lg">
              <h3 className="font-heading text-2xl md:text-3xl text-notebook-dark mb-3">
                What makes this platform secure?
              </h3>
              <p className="font-handwritten text-base md:text-lg text-notebook-dark leading-relaxed">
                We use Internet Identity for authentication and implement multiple anti-piracy measures including watermarking, content protection, and secure delivery to protect both your investment and our premium materials.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-notebook-accent border-2 border-notebook-dark rounded-lg p-8 md:p-12 shadow-xl">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-notebook-dark mb-4 md:mb-6">
            Ready to Ace GATE 2026?
          </h2>
          <p className="font-handwritten text-xl md:text-2xl text-notebook-dark mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful students who trusted our platform for their GATE preparation. 
            Start your journey to success today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate({ to: '/enroll' })}
              className="font-handwritten text-lg md:text-xl px-8 md:px-12 py-3 md:py-4 bg-notebook-dark hover:bg-notebook-medium text-white border-2 border-notebook-dark rounded-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
            >
              Enroll Now - ₹4,999 →
            </button>
          </div>
          <p className="font-handwritten text-base md:text-lg text-notebook-dark mt-6 opacity-75">
            One-time payment • Lifetime access • No hidden fees
          </p>
        </section>
      </div>
    </div>
  );
}
