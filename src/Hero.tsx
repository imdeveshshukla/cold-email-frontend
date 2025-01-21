import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Mail, Upload, Sparkles, Clock, Target } from "lucide-react"
import { motion } from "framer-motion"
import Form from "./Form"
// import Image from "next/image"

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

export default function Hero() {
  return (
    <>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
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
                    className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm"
                    >
                    <Sparkles className="mr-2 h-4 w-4 text-primary" />
                    AI-Powered Email Generation
                    </motion.div>
                    <motion.h1
                    className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
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
                    Upload your resume, paste the job description URL, and get a personalized cold email in seconds. Stand
                    out from the crowd with AI-powered email generation.
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
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-3xl" />
                <img
                    alt="Hero Illustration"
                    className="relative mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-2xl"
                    height={310}
                    src="/placeholder.svg?height=310&width=550"
                    width={550}
                />
                </motion.div>
            </div>
            </div>
        </section>

        <Form/>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
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
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
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
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
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
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
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
        <footer className="w-full py-6 border-t">
            <motion.div
            className="container px-4 md:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            >
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="text-center md:text-left">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Cold Email Generator. All rights reserved.
                </p>
                </div>
                <nav className="flex gap-4">
                <a className="text-sm text-gray-500 hover:underline transition-colors" href="#">
                    Terms
                </a>
                <a className="text-sm text-gray-500 hover:underline transition-colors" href="#">
                    Privacy
                </a>
                <a className="text-sm text-gray-500 hover:underline transition-colors" href="#">
                    Contact
                </a>
                </nav>
            </div>
            </motion.div>
        </footer>
        </div>
    </>
  )
}

