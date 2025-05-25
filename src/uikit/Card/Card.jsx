import React from "react";
import { motion } from "framer-motion";
import Badge from "../Badge/Badge";

// Card Header component
export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="mb-4 flex justify-between items-start">
      <div>
        {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
}

// Card Footer component
export function CardFooter({ actions, content }) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
      {content && <div className="text-sm text-gray-500">{content}</div>}
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

function Card({
  children,
  className = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
  hoverEffect = true,
  animate = {},
  header,
  footer,
  status,
  statusPosition = "top-right"
}) {
  // Status position styles
  const statusPositionStyles = {
    "top-right": "top-2 right-2",
    "top-left": "top-2 left-2",
    "bottom-right": "bottom-2 right-2",
    "bottom-left": "bottom-2 left-2"
  };

  return (
    <motion.div
      className={`bg-white p-6 rounded-xl shadow-sm border border-transparent hover:border-[#4361EE]/10 relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={
        hoverEffect
          ? {
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }
          : {}
      }
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...animate}
    >
      {/* Status indicator */}
      {status && (
        <div className={`absolute ${statusPositionStyles[statusPosition] || statusPositionStyles["top-right"]} z-10`}>
          {typeof status === "string" ? (
            <Badge
              content={status}
              variant={
                status === "new"
                  ? "primary"
                  : status === "warning"
                    ? "warning"
                    : status === "error"
                      ? "error"
                      : "primary"
              }
            />
          ) : (
            status
          )}
        </div>
      )}

      {/* Card Header */}
      {header}

      {/* Card Content */}
      <div className={`${header ? "mt-4" : ""} ${footer ? "mb-4" : ""}`}>{children}</div>

      {/* Card Footer */}
      {footer}
    </motion.div>
  );
}

export default Card;
