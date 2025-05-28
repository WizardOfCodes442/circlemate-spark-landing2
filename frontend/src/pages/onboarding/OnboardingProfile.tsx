import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  age: z.string().refine((val) => {
    const age = parseInt(val);
    return !isNaN(age) && age >= 18 && age <= 120;
  }, { message: "Age must be between 18 and 120" }),
  gender: z.string().min(1, { message: "Please select your gender" }),
  bio: z.string().max(200, { message: "Bio must be 200 characters or less" }).optional(),
  occupation: z.string().max(200, { message: "Please let us know what you do for a living." }).optional(),

  temperament: z.string().min(1, { message: "Please select your temperament" }),
  matchingStyle: z.string().min(1, { message: "Please select your matching style" }),
  ageRange: z.string().min(1, { message: "Please select your preferred age range" }),
  educationLevel: z.string().min(1, { message: "Please select your education level" }),
});

const OnboardingProfile = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      bio: "",
      occupation: "",
      temperament: "",
      matchingStyle: "",
      ageRange: "",
      educationLevel: "",
    },
  });

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      console.log("Form data:", form.getValues());
      navigate("/onboarding/location");
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
      nextDisabled={!form.formState.isValid}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Tell Us About Yourself</h1>
        <p className="text-muted-foreground">
          Let others know who you are and what you're interested in
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
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

            {/* Last Name */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" min={18} placeholder="25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Occupation */}
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input placeholder="What do you do?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Temperament */}
            <FormField
              control={form.control}
              name="temperament"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temperament</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Matching Style */}
            <FormField
              control={form.control}
              name="matchingStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matching Style</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select matching style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="romantic">Romantic</SelectItem>
                      <SelectItem value="friendship">Friendship</SelectItem>
                      <SelectItem value="adventurous">Adventurous</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Age Range */}
            <FormField
              control={form.control}
              name="ageRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Age Range</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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

          {/* Educational Level */}
          <FormField
            control={form.control}
            name="educationLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Educational Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
                    placeholder="A short description about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {field.value?.length || 0}/200
                </FormDescription>
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
