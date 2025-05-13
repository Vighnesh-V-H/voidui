import ChatForm from "@/components/chat-form";
import FileUpload from "@/components/file-input";

function Components() {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <ChatForm enableAttachments showModels />
    </div>
  );
}

export default Components;
