import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useReactFlow } from "@xyflow/react";

// Define types for the wrapped component props
interface WithDeleteOnHoverProps {
  id: string; // The ID of the node to delete
}

const withDeleteOnHover = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithDelete = (props: P & WithDeleteOnHoverProps) => {
    const { setNodes, setEdges } = useReactFlow();

    const handleDelete = () => {
      // Delete the node by its ID
      if (props.id) {
        // Remove the node from the nodes list
        setNodes((prevNodes) => prevNodes.filter((n) => n.id !== props.id));

        // Get the current edges and filter out those that are related to the deleted node
        setEdges((prevEdges) => {
          return prevEdges.filter((edge) => edge.source !== props.id && edge.target !== props.id);
        });
      }
    };

    return (
      <div className="relative group">
        {/* The delete icon appears only on hover */}
        <button onClick={handleDelete} className="absolute top-0 left-0 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ zIndex: 10 }}>
          <FaTrashAlt />
        </button>
        <WrappedComponent {...(props as P)} />
      </div>
    );
  };

  // Set the display name of the component for debugging purposes
  ComponentWithDelete.displayName = `WithDeleteOnHover(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return ComponentWithDelete;
};

export default withDeleteOnHover;
