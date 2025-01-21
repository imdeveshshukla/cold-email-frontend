import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Form() {
  const [file, setFile] = useState<any>(null);
  const [jd_link,setJd] = useState<string>("")
  const handleFileChange = (event:any) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };
  function isValidUrl(value:string):boolean {
    try {
      new URL(value);
      return true;
    } catch (err) {
      return false;
    }
  }
  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    if(!isValidUrl(jd_link)){
      alert("Please enter correct value of URL")
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData) 
    try {
      
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "JdLink":jd_link
        },
      });
      alert("File uploaded successfully: " + response?.data?.message);
    } catch (error:any) {
      alert("Error uploading file: " + error?.response?.data?.error || error?.message);
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <motion.div
        className="container px-4 md:px-6"
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          variants={fadeIn}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Create Your Cold Email
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Let AI help you craft the perfect cold email for your job application.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="mx-auto max-w-2xl space-y-8 mt-8"
          variants={fadeIn}
        >
          <Card className="border-2 shadow-lg">
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
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-10 w-10 mb-4 text-primary" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            {file? file?.name : "PDF, DOCX (MAX. 5MB)"}
                          </p>
                        </div>
                        <input
                          id="resume-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.docx"
                          onChange={handleFileChange}
                        />
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
                      onChange={(e)=>setJd(e.target.value)}
                    />
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full h-12 text-lg"
                    size="lg"
                    onClick={handleFileUpload}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Generate Cold Email
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
