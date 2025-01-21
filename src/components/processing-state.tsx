import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function ProcessingState() {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-8 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-lg font-medium">Generating your email...</p>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          We're analyzing your resume and the job description to create a personalized email.
        </p>
      </CardContent>
    </Card>
  )
}

