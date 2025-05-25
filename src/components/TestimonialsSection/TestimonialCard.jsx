import React from "react";
import Card from "../../uikit/Card/Card";
import Avatar from "../../uikit/Avatar/Avatar";

function TestimonialCard({ testimonial, index }) {
  return (
    <Card
      className="h-full flex flex-col"
      animate={{
        transition: { delay: index * 0.1 }
      }}
      hoverEffect={false}
    >
      <div className="mb-4">
        <div className="flex items-center mb-3">
          <Avatar initials={testimonial.name.charAt(0)} color="#4361EE" size="md" className="text-white" />
          <div className="ml-3">
            <h4 className="font-semibold text-[#313131]">{testimonial.name}</h4>
            <p className="text-sm text-[#6e7687]">{testimonial.company}</p>
          </div>
        </div>
        <p className="text-[#6e7687] italic">{testimonial.testimonial}</p>
      </div>
    </Card>
  );
}

export default TestimonialCard;
