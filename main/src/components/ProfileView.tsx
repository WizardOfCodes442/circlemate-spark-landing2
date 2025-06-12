import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";

interface Match {
  id: string;
  name: string;
  role: string;
  interests: string[];
  image: string;
  about: string;
  personalityType: string;
  essentials: { location: string };
}

interface ProfileViewProps {
  match: Match;
  onBack: () => void;
}

const ProfileView = ({ match, onBack }: ProfileViewProps) => {
  const [showNotification, setShowNotification] = useState<{ message: string } | null>(null);
  const [blockReason, setBlockReason] = useState<string>("");
  const [reportReason, setReportReason] = useState<string>("");
  const [selectedMedia, setSelectedMedia] = useState<{ type: "image" | "video"; src: string } | null>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  // Placeholder media from the internet
  const mediaGallery = [
    { type: "image", src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3" },
    { type: "image", src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12" },
    { type: "image", src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085" },
    { type: "image", src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97" },
    { type: "image", src: "https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8" },
    { type: "image", src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f" },
    { type: "image", src: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40" },
    { type: "image", src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2" },
    { type: "video", src: "https://videos.pexels.com/video-files/3195393/3195393-hd_1920_1080_30fps.mp4", thumbnail: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg" },
  ];

  const showNotificationMessage = (message: string) => {
    setShowNotification({ message });
    setTimeout(() => {
      setShowNotification(null);
    }, 3000); // Auto-dismiss after 3 seconds
  };

  const handleBlockConfirm = () => {
    if (!blockReason) {
      alert("Please select a reason to block.");
      return;
    }
    setIsBlocked(true);
    showNotificationMessage("You successfully blocked this user. They won't show up in chat again.");
    setBlockReason("");
    setBlockDialogOpen(false);
  };

  const handleReportConfirm = () => {
    if (!reportReason) {
      alert("Please select a reason to report.");
      return;
    }
    setIsReported(true);
    showNotificationMessage("Your report has been submitted. We will review it shortly.");
    setReportReason("");
    setReportDialogOpen(false);
  };

  const handleRevertBlock = () => {
    setIsBlocked(false);
    showNotificationMessage("Block reverted successfully.");
  };

  const handleRevertReport = () => {
    setIsReported(false);
    showNotificationMessage("Report reverted successfully.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Notification */}
      {showNotification && (
        <div
          className={`fixed z-50 w-full max-w-md mx-auto p-4 bg-teal-500 text-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${
            window.innerWidth < 768 ? "top-4" : "bottom-4"
          } transform ${window.innerWidth < 768 ? "translate-y-0" : "translate-y-0"}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm">{showNotification.message}</p>
            <button
              onClick={() => setShowNotification(null)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full">
        <DashboardHeader />
      </div>
      <main className="container mx-auto px-4 py-6 flex-grow max-w-7xl flex justify-center">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4 md:w-3/4 lg:w-1/2">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Button className="bg-transparent text-teal-500 hover:bg-teal-100 rounded-full px-6 py-2 w-auto" onClick={onBack}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </div>
          <div className="py-4">
            <Dialog>
              <DialogTrigger asChild>
                <img
                  src={match.image}
                  alt={match.name}
                  className="w-full h-64 object-cover rounded-t-lg mb-4 cursor-pointer"
                  onClick={() => setSelectedMedia({ type: "image", src: match.image })}
                />
              </DialogTrigger>
              <DialogContent className="bg-black p-0 max-w-[90vw] max-h-[90vh] flex items-center justify-center">
                {selectedMedia?.type === "image" ? (
                  <img src={selectedMedia.src} alt="Full-size media" className="max-w-full max-h-[90vh] object-contain" />
                ) : (
                  <video
                    src={selectedMedia?.src}
                    controls
                    className="max-w-full max-h-[90vh] object-contain"
                  />
                )}
                <button
                  className="absolute top-4 right-4 text-white hover:text-gray-300"
                  onClick={() => setSelectedMedia(null)}
                >
                  <X className="h-6 w-6" />
                </button>
              </DialogContent>
            </Dialog>

            {/* Media Gallery */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {mediaGallery.slice(0, 8).map((media, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div
                      className="relative w-full h-20 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => setSelectedMedia({ type: media.type, src: media.src })}
                    >
                      <img
                        src={media.type === "video" ? media.thumbnail : media.src}
                        alt={`Gallery item ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {media.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                  </DialogTrigger>
                </Dialog>
              ))}
              {mediaGallery[8] && (
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="relative w-full h-20 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => setSelectedMedia({ type: mediaGallery[8].type, src: mediaGallery[8].src })}
                    >
                      <img
                        src={mediaGallery[8].thumbnail}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </DialogTrigger>
                </Dialog>
              )}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold">{match.name}</h1>
              {isBlocked && (
                <span className="text-white bg-red-500 text-sm font-normal px-2 py-1 rounded-full flex items-center">
                  Blocked
                  <Button
                    variant="ghost"
                    className="text-white text-xs p-1 ml-2 h-auto"
                    onClick={handleRevertBlock}
                  >
                    Revert
                  </Button>
                </span>
              )}
              {isReported && !isBlocked && (
                <span className="text-white bg-orange-500 text-sm font-normal px-2 py-1 rounded-full flex items-center">
                  Reported
                  <Button
                    variant="ghost"
                    className="text-white text-xs p-1 ml-2 h-auto"
                    onClick={handleRevertReport}
                  >
                    Revert
                  </Button>
                </span>
              )}
            </div>
            <div className="flex justify-start space-x-2 mb-4">
              <span className="text-teal-500 bg-teal-100 px-2 py-1 rounded-full text-sm">{match.role}</span>
              <span className="text-gray-600">Lagos Tech Circle</span>
            </div>
            <div className="flex justify-start space-x-2 mb-4">
              <Button
                className="bg-teal-500 text-white rounded-full px-6 py-2"
                onClick={() => showNotificationMessage("Your connection request has been sent.")}
                disabled={isBlocked}
              >
                Connect
              </Button>
              <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-500 text-white rounded-full px-6 py-2" disabled={isBlocked || isReported}>
                    Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white p-6 rounded-lg max-w-md">
                  <div className="grid gap-4">
                    <h2 className="text-lg font-bold text-navy">Report {match.name}</h2>
                    <p className="text-sm text-gray-600">Please select a reason for reporting this user.</p>
                    <RadioGroup value={reportReason} onValueChange={setReportReason}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Inappropriate Behavior" id="report-inappropriate" />
                        <Label htmlFor="report-inappropriate">Inappropriate Behavior</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Spam" id="report-spam" />
                        <Label htmlFor="report-spam">Spam</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Fraud" id="report-fraud" />
                        <Label htmlFor="report-fraud">Fraud</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Other" id="report-other" />
                        <Label htmlFor="report-other">Other</Label>
                      </div>
                    </RadioGroup>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setReportReason("");
                          setReportDialogOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-teal-500 text-white"
                        onClick={handleReportConfirm}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gray-500 text-white rounded-full px-6 py-2" disabled={isBlocked}>
                    Block
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white p-6 rounded-lg max-w-md">
                  <div className="grid gap-4">
                    <h2 className="text-lg font-bold text-navy">Block {match.name}</h2>
                    <p className="text-sm text-gray-600">Please select a reason for blocking this user.</p>
                    <RadioGroup value={blockReason} onValueChange={setBlockReason}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Inappropriate Behavior" id="block-inappropriate" />
                        <Label htmlFor="block-inappropriate">Inappropriate Behavior</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Spam" id="block-spam" />
                        <Label htmlFor="block-spam">Spam</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Fraud" id="block-fraud" />
                        <Label htmlFor="block-fraud">Fraud</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Other" id="block-other" />
                        <Label htmlFor="block-other">Other</Label>
                      </div>
                    </RadioGroup>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setBlockReason("");
                          setBlockDialogOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-teal-500 text-white"
                        onClick={handleBlockConfirm}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-600">{match.about}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Location</h2>
              <p className="text-gray-600">{match.essentials.location}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Temperament</h2>
              <p className="text-gray-600">{match.personalityType} (ENTJ)</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {match.interests.map((interest, index) => (
                  <span key={index} className="text-xs bg-teal-100 text-teal-500 px-2 py-1 rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Values</h2>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Growth</span>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Innovation</span>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Authenticity</span>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Availability</h2>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full">Weekends</span>
                <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full">Evenings</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileView;
