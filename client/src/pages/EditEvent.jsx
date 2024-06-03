import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ params, request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.patch(`/events/${params.id}`, data);
      queryClient.invalidateQueries(["events"]);
      toast.success("Event updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("/dashboard/events");
  };
