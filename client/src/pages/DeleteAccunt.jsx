import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = (queryClient) => async () => {
  const firstConfirmation = window.confirm(
    "Do you really want to delete your profile? 😞"
  );
  if (!firstConfirmation) {
    console.log("User canceled the deletion");
    return redirect("/dashboard/edit-profile");
  }
  const finalConfirmation = window.confirm(
    "Are you absolutely sure? This action is irreversible."
  );
  if (finalConfirmation) {
    try {
      await customFetch.delete("/users/delete-user");
      queryClient.invalidateQueries(["users"]);
      toast.success("User deleted successfully");
      return redirect("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  } else {
    console.log("User canceled the deletion");
    return;
  }
};
