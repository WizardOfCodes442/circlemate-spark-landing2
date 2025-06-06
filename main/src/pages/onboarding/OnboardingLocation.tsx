import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Lock } from "lucide-react";

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

const formSchema = z.object({
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "Please select your state" }),
  country: z.string().min(2, { message: "Please select your country" }),
  postalCode: z.string().min(3, { message: "Postal code must be at least 3 characters" }),
});

const OnboardingLocation = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
  });

  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [states, setStates] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then(res => res.json())
      .then(data => {
        if (data && data.data) {
          setCountriesData(data.data);
        }
      })
      .catch(err => console.error("Error fetching countries:", err));
  }, []);

  const handleCountryChange = (countryName: string) => {
    form.setValue("country", countryName);
    form.setValue("state", ""); // reset state selection
    const country = countriesData.find(c => c.name === countryName);
    if (country && country.states) {
      setStates(country.states.map((s: any) => s.name));
    } else {
      setStates([]);
    }
  };

const handleNext = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/onboarding/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.getValues()),
      });

      if (!response.ok) {
        throw new Error("Failed to submit location data");
      }

      const data = await response.json();
      console.log("Location submission response:", data);
      navigate("/onboarding/personality");
    } catch (err) {
      setError("Failed to submit location data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    navigate("/onboarding/profile");
  };

  const handlePrevious = () => {
    navigate("/onboarding/profile");
  };

const [loadingLocation, setLoadingLocation] = useState(false);

const handleUseCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  setLoadingLocation(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d49f71ddb825496f8c650f547ee83ba6`
        );
        const data = await response.json();

        const address = data.results[0]?.components || {};

        const countryName = address.country || "";
        const stateName =
          address.state || address.region || address.province || "";
        const cityName =
          address.city || address.town || address.village || address.hamlet || "";
        const postal = address.postcode || "";

        console.log("Fetched location:", {
          countryName,
          stateName,
          cityName,
          postal,
        });

        form.setValue("country", countryName);
        form.setValue("city", cityName);
        form.setValue("postalCode", postal);

        if (countryName) {
          handleCountryChange(countryName);
          setTimeout(() => {
            form.setValue("state", stateName);
          }, 300);
        }

      } catch (error) {
        console.error("Error fetching location details:", error);
        alert("Could not retrieve location details. Please try again.");
      } finally {
        setLoadingLocation(false);
      }
    },
    (error) => {
      console.error("Geolocation error:", error);
      alert("Unable to get your current location.");
      setLoadingLocation(false);
    }
  );
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
  onClick={handleUseCurrentLocation}
  disabled={loadingLocation}
  className={`flex items-center text-[#22CCBE] hover:underline ${
    loadingLocation ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  {loadingLocation ? (
    <>
      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      Locating...
    </>
  ) : (
    <>
      <MapPin className="h-4 w-4 mr-2" />
      Use current location
    </>
  )}
</button>

</div>


      <Form {...form}>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={handleCountryChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countriesData.map((country) => (
                        <SelectItem key={country.name} value={country.name}>
                          {country.name}
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
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
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
