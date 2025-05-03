"use client";

import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useReactFlow } from "@xyflow/react";
import { useDispatch } from "react-redux";
import { setId } from "@/store/slices/nodeSlice";

// Define types for the wrapped component props
interface ActionButtonsWrapperProps {
  id: string; // The ID of the node to delete
}

const ActionButtonsWrapper = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithDelete = (props: P & ActionButtonsWrapperProps) => {
    const { setNodes, setEdges } = useReactFlow();
    const dispatch = useDispatch();
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
    const handleEdit = (e: React.MouseEvent) => {
      e.preventDefault();
      dispatch(setId(props.id));
    };
    return (
      <div className="relative group">
        {/* The delete icon appears only on hover */}
        <button onClick={handleDelete} className="absolute top-[-20px] right-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ zIndex: 10 }}>
          <FaTrashAlt />
        </button>
        <button onClick={handleEdit} className="absolute top-[-20px] right-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ zIndex: 10 }}>
          <FaEdit />
        </button>
        <WrappedComponent {...(props as P)} />
      </div>
    );
  };

  // Set the display name of the component for debugging purposes
  ComponentWithDelete.displayName = `ActionButtonsWrapperProps(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return ComponentWithDelete;
};

export default ActionButtonsWrapper;
