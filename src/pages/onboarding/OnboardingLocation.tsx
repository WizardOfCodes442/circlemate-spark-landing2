
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Lock } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

const formSchema = z.object({
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "Please select your state" }),
  country: z.string().min(2, { message: "Please select your country" }),
  postalCode: z.string().min(3, { message: "Postal code must be at least 3 characters" }),
});

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "India",
  "Brazil",
  "Mexico",
];

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const OnboardingLocation = () => {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      state: "",
      country: "United States",
      postalCode: "",
    },
  });
  
  const handleNext = () => {
    const isValid = form.trigger();
    if (isValid) {
      console.log("Location data:", form.getValues());
      navigate("/onboarding/personality");
    }
  };
  
  const handlePrevious = () => {
    navigate("/onboarding/profile");
  };
  
  const useCurrentLocation = () => {
    // In a real app, this would use the browser's geolocation API
    // and then reverse geocode to get address details
    form.setValue("city", "San Francisco");
    form.setValue("state", "California");
    form.setValue("country", "United States");
    form.setValue("postalCode", "94105");
  };
  
  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={7}
      nextAction={handleNext}
      previousAction={handlePrevious}
      nextDisabled={!form.formState.isValid}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Your Location</h1>
        <p className="text-muted-foreground">
          Let us know where you're based to find nearby connections
        </p>
      </div>
      
      <div className="mb-6 flex justify-center">
        <button
          type="button"
          onClick={useCurrentLocation}
          className="flex items-center text-primary hover:underline"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Use current location
        </button>
      </div>
      
      <Form {...form}>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="San Francisco" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal/ZIP Code</FormLabel>
                  <FormControl>
                    <Input placeholder="94105" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      
      <Alert className="mt-8 bg-secondary/50 border-secondary">
        <AlertDescription className="flex items-center text-sm">
          <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
          Your location is only shared with people you connect with
        </AlertDescription>
      </Alert>
    </OnboardingLayout>
  );
};

export default OnboardingLocation;
