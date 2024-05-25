import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/events/${params.id}`);
      queryClient.invalidateQueries(["events"]);
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    return redirect("/dashboard/events");
  };
