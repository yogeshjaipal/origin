import { useState } from "react";
import { motion } from "framer-motion";
import { Bitcoin, Cube, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);

  const projects = [
    { id: 1, title: "Crypto Dashboard", description: "Web3 UI/UX Design", image: "photo-1518770660439-4636190af475" },
    { id: 2, title: "NFT Collection", description: "Digital Art Series", image: "photo-1487058792275-0ad4aaf24ca7" },
    { id: 3, title: "3D Animation", description: "Motion Design", image: "photo-1485827404703-89b55fcc595e" },
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8"
        >
          <Cube size={64} className="mx-auto text-primary" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4 gradient-text">
          Creative Designer
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Bridging Web3 & Creative Design
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            variant="outline"
            className="glass-card"
            onClick={() => toast({ title: "Thanks for connecting!" })}
          >
            <Bitcoin className="mr-2" /> Connect Wallet
          </Button>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8 gradient-text">Featured Works</h2>
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="glass-card p-4 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <img
                src={`https://source.unsplash.com/${project.image}`}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-400">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-8 gradient-text">Let's Connect</h2>
        <div className="flex justify-center gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="glass-card">
              <Twitter className="h-5 w-5" />
            </Button>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="glass-card">
              <Github className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;