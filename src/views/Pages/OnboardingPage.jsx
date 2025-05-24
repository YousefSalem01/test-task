import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../uikit/Button/Button";
import { Check, Mail, Globe, Instagram, Facebook, Phone, MessageSquare } from "lucide-react";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import logoSrc from "../../assets/logos/armin-cx-logo-blue.0885e649.svg";
import { ChannelOrbit } from "../../uikit/ChannelOrbit/ChannelOrbit";

const steps = [
  {
    id: 1,
    title: "Welcome to your free trial! 🎉",
    description:
      "You now have access to armincx for the next 14 days. First, let's customize your setup by answering a few quick questions.",
    question: "What primary team will be using armincx?",
    options: [
      { id: "support", label: "Customer Support" },
      { id: "success", label: "Customer Success" },
      { id: "sales", label: "Sales" },
      { id: "management", label: "Account Management" },
      { id: "operations", label: "Operations" },
      { id: "accounting", label: "Accounting" },
      { id: "engineering", label: "Engineering" },
      { id: "product", label: "Product" },
      { id: "company", label: "Entire Company" }
    ],
    optionType: "radio",
    illustration: "team"
  },
  {
    id: 2,
    title: "Help us understand your setup",
    description: "",
    question: "How do customers contact you today?",
    options: [
      { id: "email", label: "Email" },
      { id: "chat", label: "Chat" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "voice", label: "Voice" },
      { id: "sms", label: "SMS" },
      { id: "social", label: "Social media" },
      { id: "other", label: "Other" }
    ],
    optionType: "checkbox",
    secondaryQuestion: "Are you currently using a customer support tool?",
    secondaryOptions: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" }
    ],
    illustration: "channels"
  },
  {
    id: 3,
    title: "Create shared inboxes for your team",
    description:
      "An inbox is a centralized space for your team to access messages coming from multiple channels (e.g. email, SMS, Facebook)",
    inputLabel: "Inbox name",
    inputPlaceholder: "Add inbox name",
    inputHelp: "e.g. Deliverability, On-call Alerts, Support Tier 1",
    illustration: "inbox"
  }
];

const channels = [
  { name: "Email", icon: <Mail className="h-full w-full" />, color: "#4361EE" },
  { name: "Web", icon: <Globe className="h-full w-full" />, color: "#4169e1" },
  { name: "WhatsApp", icon: <FaWhatsapp className="h-full w-full" />, color: "#25D366" },
  { name: "Instagram", icon: <Instagram className="h-full w-full" />, color: "#E1306C" },
  { name: "Facebook", icon: <Facebook className="h-full w-full" />, color: "#1877F2" },
  { name: "TikTok", icon: <FaTiktok className="h-full w-full" />, color: "#000000" },
  { name: "Voice", icon: <Phone className="h-full w-full" />, color: "#7C3AED" },
  { name: "SMS", icon: <MessageSquare className="h-full w-full" />, color: "#10B981" }
];

export function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({
    team: "",
    channels: [],
    usingTool: "",
    inboxName: ""
  });
  const [activeChannelIndex, setActiveChannelIndex] = useState(0);

  // Add this useEffect for channel animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChannelIndex(prev => (prev + 1) % channels.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const step = steps.find(s => s.id === currentStep);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // In a real app, this would save the onboarding data and redirect to the dashboard
      alert("Onboarding complete! You would now be redirected to your dashboard.");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRadioChange = (id, field) => {
    setSelections({
      ...selections,
      [field]: id
    });
  };

  const handleCheckboxChange = id => {
    const channels = [...selections.channels];
    if (channels.includes(id)) {
      setSelections({
        ...selections,
        channels: channels.filter(c => c !== id)
      });
    } else {
      setSelections({
        ...selections,
        channels: [...channels, id]
      });
    }
  };

  const handleInputChange = e => {
    setSelections({
      ...selections,
      inboxName: e.target.value
    });
  };

  // Determine if the next button should be enabled
  const isNextEnabled = () => {
    if (currentStep === 1) {
      return !!selections.team;
    } else if (currentStep === 2) {
      return selections.channels.length > 0 && !!selections.usingTool;
    } else if (currentStep === 3) {
      return !!selections.inboxName;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side - Form */}
          <div className="p-8 md:p-12">
            <div className="flex items-center mb-8">
              <img src={logoSrc} alt="armincx logo" className="h-8" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h1>
                {step.description && <p className="text-gray-600 mb-6">{step.description}</p>}

                {step.question && <h2 className="text-lg font-medium text-gray-800 mb-4">{step.question}</h2>}

                {/* Options for step 1 and 2 */}
                {(currentStep === 1 || currentStep === 2) && step.optionType === "radio" && (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {step.options.map(option => (
                      <div
                        key={option.id}
                        className={`relative rounded-lg border ${
                          selections.team === option.id
                            ? "border-[#4361EE] bg-[#4361EE]/5"
                            : "border-gray-200 hover:border-gray-300"
                        } p-4 cursor-pointer transition-colors`}
                        onClick={() => handleRadioChange(option.id, "team")}
                      >
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              type="radio"
                              checked={selections.team === option.id}
                              onChange={() => handleRadioChange(option.id, "team")}
                              className="h-4 w-4 text-[#4361EE] border-gray-300 focus:ring-[#4361EE]"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label className="font-medium text-gray-700">{option.label}</label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {currentStep === 2 && (
                  <>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {step.options.map(option => (
                        <div
                          key={option.id}
                          className={`relative rounded-lg border ${
                            selections.channels.includes(option.id)
                              ? "border-[#4361EE] bg-[#4361EE]/5"
                              : "border-gray-200 hover:border-gray-300"
                          } p-4 cursor-pointer transition-colors`}
                          onClick={() => handleCheckboxChange(option.id)}
                        >
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                checked={selections.channels.includes(option.id)}
                                onChange={() => handleCheckboxChange(option.id)}
                                className="h-4 w-4 text-[#4361EE] rounded border-gray-300 focus:ring-[#4361EE]"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label className="font-medium text-gray-700">{option.label}</label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h2 className="text-lg font-medium text-gray-800 mb-4">{step.secondaryQuestion}</h2>
                    <div className="flex gap-4 mb-6">
                      {step.secondaryOptions.map(option => (
                        <div
                          key={option.id}
                          className={`relative rounded-lg border ${
                            selections.usingTool === option.id
                              ? "border-[#4361EE] bg-[#4361EE]/5"
                              : "border-gray-200 hover:border-gray-300"
                          } p-4 cursor-pointer transition-colors`}
                          onClick={() => handleRadioChange(option.id, "usingTool")}
                        >
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                type="radio"
                                checked={selections.usingTool === option.id}
                                onChange={() => handleRadioChange(option.id, "usingTool")}
                                className="h-4 w-4 text-[#4361EE] border-gray-300 focus:ring-[#4361EE]"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label className="font-medium text-gray-700">{option.label}</label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Input for step 3 */}
                {currentStep === 3 && (
                  <div className="mb-6">
                    <label htmlFor="inboxName" className="block text-sm font-medium text-gray-700 mb-1">
                      {step.inputLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="inboxName"
                      value={selections.inboxName}
                      onChange={handleInputChange}
                      placeholder={step.inputPlaceholder}
                      className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:border-transparent"
                    />
                    <p className="mt-1 text-sm text-gray-500">{step.inputHelp}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-8">
              <div className="text-sm text-gray-500">
                {currentStep} of {steps.length}
              </div>
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handlePrevious} className="rounded-lg">
                    Previous
                  </Button>
                )}
                {currentStep < steps.length && (
                  <Button onClick={handleNext} disabled={!isNextEnabled()} className="rounded-lg">
                    Next
                  </Button>
                )}
                {currentStep === steps.length && (
                  <Button onClick={handleNext} disabled={!isNextEnabled()} className="rounded-lg">
                    Finish
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="hidden md:block bg-gray-50 p-12 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.illustration}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full flex items-center justify-center"
              >
                {step.illustration === "team" && (
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 bg-white rounded-full shadow-md flex items-center justify-center">
                      <svg
                        width="120"
                        height="120"
                        viewBox="0 0 120 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="60" cy="40" r="20" fill="#4361EE" />
                        <circle cx="30" cy="70" r="15" fill="#1FB7DD" />
                        <circle cx="90" cy="70" r="15" fill="#9D4EDD" />
                        <path
                          d="M60 65C71.0457 65 80 73.9543 80 85V100H40V85C40 73.9543 48.9543 65 60 65Z"
                          fill="#4361EE"
                        />
                        <path
                          d="M30 90C36.6274 90 42 95.3726 42 102V110H18V102C18 95.3726 23.3726 90 30 90Z"
                          fill="#1FB7DD"
                        />
                        <path
                          d="M90 90C96.6274 90 102 95.3726 102 102V110H78V102C78 95.3726 83.3726 90 90 90Z"
                          fill="#9D4EDD"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Team</h3>
                    <p className="text-gray-600">Select which team will be using armincx</p>
                  </div>
                )}

                {step.illustration === "channels" && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <ChannelOrbit
                      activeIndex={activeChannelIndex}
                      setActiveIndex={setActiveChannelIndex}
                      orbitSize={300}
                      channelSize={56}
                      centerSize={80}
                      className="transform scale-90 md:scale-100"
                    />
                  </div>
                )}

                {step.illustration === "inbox" && (
                  <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                      <div className="bg-[#4361EE] p-4 text-white">
                        <div className="flex items-center">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 12H16L14 15H10L8 12H2"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="ml-2 font-medium">Shared Inbox</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-[#4361EE]/10 flex items-center justify-center text-[#4361EE]">
                              <Check size={18} />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">Engineering</div>
                              <div className="text-xs text-gray-500">3 members</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">2 min ago</div>
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                                  JD
                                </div>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">John Doe</div>
                                <div className="text-xs text-gray-500 mb-1">via Email • 5 min ago</div>
                                <div className="text-sm text-gray-700">
                                  Hi team, I'm having an issue with the latest update. Can you help?
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium">
                                  AS
                                </div>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">Alice Smith</div>
                                <div className="text-xs text-gray-500 mb-1">via WhatsApp • 2 min ago</div>
                                <div className="text-sm text-gray-700">When will the new feature be available?</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
