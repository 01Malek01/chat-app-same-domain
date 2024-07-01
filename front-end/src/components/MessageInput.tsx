import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiSend } from "react-icons/bi";
import { z } from "zod";
import { useSendMessage } from "../ApiHooks/useSendMessage";

const schema = z.object({
  message: z.string().min(1, "You cannot send an empty message"),
});

export default function MessageInput() {
  const { sendMessage, loading } = useSendMessage();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (message) => {
    await sendMessage(message);
    reset();
    
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full relative">
        <input
          {...register("message")}
          type="text"
          className="input input-bordered w-full text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Type your message here..."
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
        <button
          type="submit"
          className="rounded-lg absolute inset-y-0 end-0 flex items-center px-3"
        >
          {loading ? (
            <div className="loader loading-spinner"></div>
          ) : (
            <BiSend className="text-2xl text-gray-300" />
          )}
        </button>
      </div>
    </form>
  );
}
