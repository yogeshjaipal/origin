import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Watch = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Video Player */}
            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">Video Player</p>
              </div>
            </div>

            {/* Episode Navigation */}
            <div className="flex justify-between items-center">
              <Button variant="outline" className="glass-card">
                <ChevronLeft className="mr-2" /> Previous Episode
              </Button>
              <Button variant="outline" className="glass-card">
                Next Episode <ChevronRight className="ml-2" />
              </Button>
            </div>

            {/* Episode List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`glass-card ${index === 0 ? 'border-orange-500 text-orange-500' : ''}`}
                >
                  Episode {index + 1}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Watch;