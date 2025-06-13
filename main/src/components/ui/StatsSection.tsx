import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, ChevronUp, X } from "lucide-react";
import * as Dialog from "@/components/ui/dialog";
import { useState } from "react";

const StatsSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const statsCards = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
          <ChevronUp className="h-5 w-5 text-teal-500" />
        </div>
        <div>
          <p className="text-gray-500 text-sm font-bold">New Matches</p>
          <p className="text-2xl font-bold text-navy-700">
            2 <span className="text-sm text-gray-500">+2 this week</span>
          </p>
        </div>
      </Card>
      <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
          </svg>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-bold">Meetups Planned</p>
          <p className="text-2xl font-bold text-navy-700">
            1 <span className="text-sm text-gray-500">1 upcoming</span>
          </p>
        </div>
      </Card>
      <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-bold">Profile Views</p>
          <p className="text-2xl font-bold text-navy-700">
            15 <span className="text-sm text-gray-500">+6% from last week</span>
          </p>
        </div>
      </Card>
      <Card className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start w-full">
        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
          <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-bold">Satisfaction Rate</p>
          <p className="text-2xl font-bold text-navy-700">
            95% <span className="text-sm text-gray-500">Based on feedback</span>
          </p>
        </div>
      </Card>
    </div>
  );

  return (
    <>
      <div className="flex justify-end mb-4">
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Trigger asChild>
            <Button variant="ghost" className="bg-teal-500 text-white rounded-full px-4 py-1 text-sm">
              <UserCheck className="h-4 w-4 mr-2" /> View Accepted Connections
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-lg font-bold">Accepted Connections Stats</Dialog.Title>
                <Dialog.Close asChild>
                  <Button variant="ghost" className="p-1">
                    <X className="h-5 w-5" />
                  </Button>
                </Dialog.Close>
              </div>
              {statsCards}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      {statsCards}
    </>
  );
};

export default StatsSection;