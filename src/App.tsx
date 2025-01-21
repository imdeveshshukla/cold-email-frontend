import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Mail, Upload, Sparkles, Clock, Target } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "./components/theme-toggle"
import { EmailDisplay } from "./components/email-display"
import { ProcessingState } from "./components/processing-state"
import { useState } from "react"
import { ThemeProvider } from "./components/theme-provider"
import axios from 'axios'
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

function App() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [generatedEmail, setGeneratedEmail] = useState<{ email: string; subject: string } | null>(null)
  const [file, setFile] = useState<any>(null);
  const [jd_link,setJd] = useState<string>("")
  const handleFileChange = (event:any) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };
  function isValidUrl(value:string):boolean {
    try {
      if(value=="")return true
      new URL(value);
      return true;
    } catch (err) {
      return false;
    }
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    if(!isValidUrl(jd_link)){
      alert("Please enter correct value of URL")
      return;
    }
    setIsProcessing(true)
    setGeneratedEmail(null)
    const formData = new FormData();
    formData.append("file", file);
    try {
      
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "JdLink":jd_link
        },
      });
      const email = response?.data?.Response;
      setGeneratedEmail({
        subject: email?.subject,
        email: email?.content
        })
      setIsProcessing(false)
    } catch (error:any) {
      alert("Error uploading file: " + error?.response?.data?.error || error?.message);
      setIsProcessing(false)
    }
    
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-sm">
          <div className="container flex items-center justify-between h-16 px-4">
            <span className="text-xl font-bold">Cold Email Generator</span>
            <ThemeToggle />
          </div>
        </nav>

        {/* Hero Section */}
        <section className="w-full pt-24 py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm dark:bg-primary/20"
                  >
                    <Sparkles className="mr-2 h-4 w-4 text-primary" />
                    AI-Powered Email Generation
                  </motion.div>
                  <motion.h1
                    className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 dark:from-primary dark:to-primary/60"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Generate Perfect Cold Emails
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Upload your resume, paste the job description URL, and get a personalized cold email in seconds.
                    Stand out from the crowd with AI-powered email generation.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button className="inline-flex items-center justify-center text-lg" size="lg">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg">
                    View Examples
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-3xl dark:from-primary/10 dark:to-primary/5" />
                <img
                  alt="Email Generation Illustration"
                  className="relative mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-2xl"
                  height={620}
                  src="/placeholder.svg?height=620&width=1100&text=AI+Email+Generation&fontSize=64&background=%230EA5E9&foreground=%23FFFFFF"
                  width={1100}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Form Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            className="container px-4 md:px-6"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="flex flex-col items-center justify-center space-y-4 text-center" variants={fadeIn}>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Create Your Cold Email</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Let AI help you craft the perfect cold email for your job application.
                </p>
              </div>
            </motion.div>
            <div className="mx-auto max-w-6xl space-y-8 mt-8">
              <div className="grid gap-8 lg:grid-cols-2">
                <motion.div variants={fadeIn}>
                  <Card className="border-2 shadow-lg dark:border-gray-800">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="resume" className="text-lg">
                              Upload Resume
                            </Label>
                            <motion.div
                              className="flex items-center justify-center w-full"
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <label
                                htmlFor="resume-upload"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50/50 hover:bg-gray-100/50 dark:bg-gray-950/50 dark:hover:bg-gray-900/50 transition-colors duration-200"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="h-10 w-10 mb-4 text-primary" />{
                                    !file
                                    &&
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  }
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{file? file.name : "PDF, DOCX (MAX. 5MB)"}</p>
                                </div>
                                <input id="resume-upload" type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileChange}/>
                              </label>
                            </motion.div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="job-url" className="text-lg">
                              Job Description URL
                            </Label>
                            <Input
                              id="job-url"
                              placeholder="https://example.com/job-posting"
                              type="url"
                              required
                              className="h-12 text-lg"
                              onChange={(e:any)=>setJd(e.target.value)}
                            />
                          </div>
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="w-full h-12 text-lg" size="lg" disabled={isProcessing} onClick={(e:any)=>handleSubmit(e)}>
                            <Mail className="mr-2 h-5 w-5" />
                            {isProcessing ? "Generating..." : "Generate Cold Email"}
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={fadeIn}>
                  {isProcessing ? (
                    <ProcessingState />
                  ) : generatedEmail ? (
                    <EmailDisplay email={generatedEmail.email} subject={generatedEmail.subject} />
                  ) : (
                    <Card className="w-full h-full border-2 border-dashed">
                      <CardContent className="flex flex-col items-center justify-center h-full py-8 space-y-4">
                        <Mail className="h-12 w-12 text-muted-foreground" />
                        <p className="text-lg font-medium text-center">Your generated email will appear here</p>
                        <p className="text-sm text-muted-foreground text-center max-w-sm">
                          Upload your resume and provide a job description URL to get started
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
          <motion.div
            className="container px-4 md:px-6"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <motion.div className="flex flex-col justify-center space-y-4" variants={fadeIn}>
                <div className="space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">AI-Powered</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Advanced AI technology analyzes your resume and the job description to create personalized emails.
                  </p>
                </div>
              </motion.div>
              <motion.div className="flex flex-col justify-center space-y-4" variants={fadeIn}>
                <div className="space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Professional Templates</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Carefully crafted email templates that follow industry best practices and increase response rates.
                  </p>
                </div>
              </motion.div>
              <motion.div className="flex flex-col justify-center space-y-4" variants={fadeIn}>
                <div className="space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Time-Saving</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Generate personalized cold emails in seconds, saving you hours of writing and editing time.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="w-full py-6 border-t dark:border-gray-800">
          <motion.div
            className="container px-4 md:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} Cold Email Generator. All rights reserved.
                </p>
              </div>
              <nav className="flex gap-4">
                <a
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                  href="#"
                >
                  Terms
                </a>
                <a
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                  href="#"
                >
                  Privacy
                </a>
                <a
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                  href="#"
                >
                  Contact
                </a>
              </nav>
            </div>
          </motion.div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App

