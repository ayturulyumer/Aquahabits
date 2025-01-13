import { useMutation, useQueryClient } from "react-query";

export const useGenericMutation = ({
  mutationFn,
  queryKey,
  onMutate,
  onSuccess,
  onError,
  onSettled,
}) => {
  const queryClient = useQueryClient();

  return useMutation(mutationFn, {
    onMutate: async (variables) => {
      if (onMutate) {
        return await onMutate(variables);
      }
    },
    onSuccess: (data, variables, context) => {
      if (queryKey) {
        queryClient.invalidateQueries(queryKey);
      }
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (onError) {
        onError(error, variables, context);
      }
    },
    onSettled: (data, error, variables, context) => {
      if (onSettled) {
        onSettled(data, error, variables, context);
      }
    },
  });
};
