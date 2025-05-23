
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
    },
  });
  
  const handleNext = () => {
    const isValid = form.trigger();
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us a little about yourself..." 
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
