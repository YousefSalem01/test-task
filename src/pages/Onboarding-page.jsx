
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../components/ui/button"
import { Check } from "lucide-react"

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
      { id: "company", label: "Entire Company" },
    ],
    optionType: "radio",
    illustration: "team",
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
      { id: "other", label: "Other" },
    ],
    optionType: "checkbox",
    secondaryQuestion: "Are you currently using a customer support tool?",
    secondaryOptions: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
    illustration: "channels",
  },
  {
    id: 3,
    title: "Create shared inboxes for your team",
    description:
      "An inbox is a centralized space for your team to access messages coming from multiple channels (e.g. email, SMS, Facebook)",
    inputLabel: "Inbox name",
    inputPlaceholder: "Add inbox name",
    inputHelp: "e.g. Deliverability, On-call Alerts, Support Tier 1",
    illustration: "inbox",
  },
]

export function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selections, setSelections] = useState({
    team: "",
    channels: [],
    usingTool: "",
    inboxName: "",
  })

  const step = steps.find((s) => s.id === currentStep)

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // In a real app, this would save the onboarding data and redirect to the dashboard
      alert("Onboarding complete! You would now be redirected to your dashboard.")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleRadioChange = (id, field) => {
    setSelections({
      ...selections,
      [field]: id,
    })
  }

  const handleCheckboxChange = (id) => {
    const channels = [...selections.channels]
    if (channels.includes(id)) {
      setSelections({
        ...selections,
        channels: channels.filter((c) => c !== id),
      })
    } else {
      setSelections({
        ...selections,
        channels: [...channels, id],
      })
    }
  }

  const handleInputChange = (e) => {
    setSelections({
      ...selections,
      inboxName: e.target.value,
    })
  }

  // Determine if the next button should be enabled
  const isNextEnabled = () => {
    if (currentStep === 1) {
      return !!selections.team
    } else if (currentStep === 2) {
      return selections.channels.length > 0 && !!selections.usingTool
    } else if (currentStep === 3) {
      return !!selections.inboxName
    }
    return true
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side - Form */}
          <div className="p-8 md:p-12">
            <div className="flex items-center mb-8">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-[#4361EE]">armin</span>
                <span className="text-xl font-bold bg-gradient-to-r from-[#4361EE] to-[#1FB7DD] bg-clip-text text-transparent">
                  cx
                </span>
              </div>
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
                    {step.options.map((option) => (
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
                      {step.options.map((option) => (
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
                      {step.secondaryOptions.map((option) => (
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
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        width="300"
                        height="300"
                        viewBox="0 0 300 300"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="150" cy="150" r="120" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
                      </svg>
                    </div>

                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#4361EE] rounded-full flex items-center justify-center shadow-lg z-10">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                          fill="white"
                        />
                        <path
                          d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>

                    {/* Channel icons */}
                    <div className="absolute left-1/2 top-[20%] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-[#EA4335] rounded-full flex items-center justify-center shadow-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute left-[80%] top-[30%] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3 21L5 15L3 9L12 3L21 9L19 15L21 21L12 18L3 21Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 12V16"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute left-[85%] top-[70%] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center shadow-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute left-[20%] top-[30%] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-[#E1306C] rounded-full flex items-center justify-center shadow-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.5 6.5H17.51"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute left-[15%] top-[70%] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-[#7C3AED] rounded-full flex items-center justify-center shadow-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27097 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.2165 3.36162C2.30513 3.09849 2.44757 2.85669 2.63477 2.65162C2.82196 2.44655 3.04981 2.28271 3.30379 2.17052C3.55778 2.05833 3.83234 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47145 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
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
  )
}
