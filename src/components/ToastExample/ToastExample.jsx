import React from "react";
import { Button } from "../../uikit/Button/Button";
import { useToast, showToast } from "../../uikit/Toast/Toast";

export function ToastExample() {
  const { toast } = useToast();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Toast Examples</h2>
      <p className="mb-4 text-gray-600">Click the buttons below to see different toast notifications.</p>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => showToast.success("Successfully completed!")} className="rounded-lg">
          Success Toast
        </Button>

        <Button onClick={() => showToast.error("An error occurred.")} variant="outline" className="rounded-lg">
          Error Toast
        </Button>

        <Button
          onClick={() => {
            const id = showToast.loading("Loading...");
            setTimeout(() => {
              toast.dismiss(id);
              showToast.success("Loaded successfully!");
            }, 2000);
          }}
          className="rounded-lg"
        >
          Loading Toast
        </Button>

        <Button
          onClick={() =>
            toast("Custom toast message", {
              icon: "👋",
              style: {
                borderRadius: "10px",
                background: "#4361EE",
                color: "#fff"
              }
            })
          }
          variant="secondary"
          className="rounded-lg"
        >
          Custom Toast
        </Button>

        <Button onClick={() => showToast.dismiss_all()} variant="outline" className="rounded-lg">
          Dismiss All
        </Button>
      </div>
    </div>
  );
}
