"use client";
import { toast } from "sonner";

export function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(error);
    toast.error(error.message);
  } else {
    console.error("An unknown error occurred", error);
    toast.error("An unknown error occurred");
  }
}
