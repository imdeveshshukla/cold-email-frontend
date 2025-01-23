import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, CheckCheck } from "lucide-react"

interface EmailDisplayProps {
  email: string
  subject: string
}

export function EmailDisplay({ email, subject }: EmailDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generated Email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold">Subject:</h3>
          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{subject}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Body:</h3>
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md whitespace-pre-wrap max-h-[245px] overflow-scroll">{email}</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={copyToClipboard} className="ml-auto">
          {copied ? (
            <>
              <CheckCheck className="h-4 w-4 mr-2" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy to Clipboard
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

