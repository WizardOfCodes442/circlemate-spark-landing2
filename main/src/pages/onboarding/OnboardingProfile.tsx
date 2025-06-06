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

      <Form {...form}>
        <form className="space-y-6">
          {/* Name Fields */}
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

          {/* Age & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" min={18} max={120} placeholder="25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Occupation & Temperament */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Occupation
                    <span className="block text-xs text-muted-foreground">
                      Briefly describe your job or main activity. This helps others understand your background or career.
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="What do you do?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="temperament"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Temperament
                    <span className="block text-xs text-muted-foreground">
                      Core personality: <b>Choleric</b> (driven), <b>Sanguine</b> (sociable), <b>Phlegmatic</b> (calm), <b>Melancholic</b> (analytical).
                    </span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select temperament" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="choleric">Choleric</SelectItem>
                      <SelectItem value="sanguine">Sanguine</SelectItem>
                      <SelectItem value="phlegmatic">Phlegmatic</SelectItem>
                      <SelectItem value="melancholic">Melancholic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Matching Style & Age Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="matchingStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Matching Mode
                    <span className="block text-xs text-muted-foreground">
                      <b>Flexible</b> (looser preferences), <b>Strict</b> (exact matches), <b>Auto</b> (system decides).
                    </span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select matching mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="flexible">Flexible Mode</SelectItem>
                      <SelectItem value="strict">Strict Mode</SelectItem>
                      <SelectItem value="auto">Auto Mode</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ageRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Preferred Age Range
                    <span className="block text-xs text-muted-foreground">
                      Select the age range you want your matches to fall into.
                    </span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="18-25">18–25</SelectItem>
                      <SelectItem value="26-35">26–35</SelectItem>
                      <SelectItem value="36-45">36–45</SelectItem>
                      <SelectItem value="46+">46+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Education Level */}
          <FormField
            control={form.control}
            name="educationLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Educational Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="no_formal">No Formal Education</SelectItem>
                    <SelectItem value="primary">Primary School (Elementary)</SelectItem>
                    <SelectItem value="lower_secondary">Lower Secondary (Middle School/Junior High)</SelectItem>
                    <SelectItem value="upper_secondary">Upper Secondary (High School or equivalent)</SelectItem>
                    <SelectItem value="vocational">Vocational/Technical Certification</SelectItem>
                    <SelectItem value="some_college">Some College/No Degree</SelectItem>
                    <SelectItem value="associate">Associate Degree</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="postgrad_diploma">Postgraduate Diploma or Certificate</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="doctorate">Doctorate (PhD, EdD, etc.)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Bio */}

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a bit about yourself..."
                    {...field}
                    rows={4}
                    maxLength={500}
                    className="resize-y"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </form>
      </Form>
    </OnboardingLayout>
  
  );
};

export default OnboardingProfile;
