import { handleError } from "@/client/handlers/ErrorHandler";
import { uploadImage } from "@/client/services/image.service";
import { UploadImageParams } from "@/client/services/image.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function useUploadImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UploadImageParams) => uploadImage(params),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["paged", "images"]
      });
    },
    onError: (error) => {
      handleError(error);
    }
  });
}
