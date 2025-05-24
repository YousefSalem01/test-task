import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "../../uikit/Card/Card";

function FeatureCard({ feature, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="cursor-pointer"
      animate={{
        transition: { delay: index * 0.1 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="h-12 w-12 rounded-lg bg-[#4361EE]/10 flex items-center justify-center text-[#4361EE] mb-4"
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 5 : 0
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {feature.icon}
      </motion.div>
      <h3 className="text-xl font-semibold text-[#313131] mb-2">{feature.title}</h3>
      <p className="text-[#6e7687]">{feature.description}</p>
    </Card>
  );
}

export default FeatureCard;
