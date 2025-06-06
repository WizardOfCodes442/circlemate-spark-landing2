import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Popover, PopoverContent, PopoverTrigger, Info } from "@/components/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input }  from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Textarea} from "@/components/ui/textarea"
import {  Button} from "@/components/ui/button" 
import {Alert, AlertDescription} from "@/components/ui/alert"
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  age: z.string().refine((val) => {
    const age = parseInt(val);
    return !isNaN(age) && age >= 18 && age <= 120;
  }, { message: "Age must be between 18 and 120" }),
  gender: z.string().min(1, { message: "Please select your gender" }),
  occupation: z.string().max(200, { message: "Occupation must be 200 characters or less" }).optional(),
  temperament: z.string().min(1, { message: "Please select your temperament" }),
  matchingStyle: z.string().min(1, { message: "Please select your matching style" }),
  ageRange: z.string().min(1, { message: "Please select your preferred age range" }),
  educationLevel: z.string().min(1, { message: "Please select your education level" }),
  bio: z.string().max(500, { message: "Bio must be 500 characters or less" }).optional(),
});

const OnboardingProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      occupation: "",
      temperament: "",
      matchingStyle: "",
      ageRange: "",
      educationLevel: "",
      bio: "",
    },
  });

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://circlemate-spark-landing-jet.vercel.app/api/onboarding/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.getValues()),
      });

      if (!response.ok) {
        throw new Error("Failed to submit profile data");
      }

      const data = await response.json();
      console.log("Profile submission response:", data);
      navigate("/onboarding/location");
    } catch (err) {
      setError("Failed to submit profile data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    navigate("/onboarding");
  };

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={7}
      nextAction={handleNext}
      previousAction={handlePrevious}
      nextDisabled={!form.formState.isValid || loading}
      nextLabel={loading ? "Submitting..." : "Next"}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Tell Us About Yourself</h1>
        <p className="text-muted-foreground">
          Let others know who you are and what you're interested in.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form className="space-y-6">
          {/* Form fields remain unchanged */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Other form fields (age, gender, occupation, etc.) remain the same */}
          {/* ... */}
        </form>
      </Form>
    </OnboardingLayout>
  );
};

export default OnboardingProfile;
