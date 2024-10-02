import React, { useState, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { IconCircleCheck, IconEdit, IconTrash, IconCircleX, IconCheck } from "@tabler/icons-react";
import { FaSpinner } from "react-icons/fa"; // For the progress spinner
import "./FloatingDock.css"; // Importing CSS file

export const FloatingDock = ({ desktopClassName, mobileClassName, completed, onCheck, onDelete, onEdit, isEditing }) => {
  const items = [
    {
      title: completed ? "Uncheck" : "Check",
      icon: completed ? <IconCircleX className="icon-uncheck" /> : <IconCircleCheck className="icon-check" />,
      action: onCheck,
    },
    {
      title: isEditing ? "Done" : "Edit",
      icon: isEditing ? <IconCheck className="icon-done" /> : <IconEdit className="icon-edit" />,
      action: onEdit,
    },
    { title: "Delete", icon: <IconTrash className="icon-delete" />, action: onDelete },
  ];

  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

// Mobile Dock
const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`floating-dock-mobile ${className}`}>
      <AnimatePresence>
        {open && (
          <motion.div layoutId="nav" className="floating-dock-menu">
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { delay: idx * 0.05 } }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <button
                  className="floating-dock-button"
                  onClick={item.action}
                >
                  {item.icon}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen(!open)} className="floating-dock-toggle">
        {/* Toggle button icon */}
      </button>
    </div>
  );
};

// Desktop Dock
const FloatingDockDesktop = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`floating-dock-desktop ${className}`}
    >
      {items.map((item) => (
        <IconContainer
          mouseX={mouseX}
          key={item.title}
          {...item}
        />
      ))}
    </motion.div>
  );
};

// Icon Container
function IconContainer({ mouseX, title, icon, action }) {
  let ref = useRef(null);
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="floating-dock-icon-container"
      onClick={action}
    >
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 2, x: "-50%" }}
          className="floating-dock-tooltip"
        >
          {title}
        </motion.div>
      )}
      <motion.div className="floating-dock-icon">{icon}</motion.div>
    </motion.div>
  );
}
