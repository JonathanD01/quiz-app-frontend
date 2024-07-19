import { toast } from "sonner";

const useToastHandler = () => {
  function showSuccessToast(title, message) {
    toast.success(title, {
      description: message,
      unstyled: false,
      classNames: {
        title: "ml-5 text-lg",
        description: "ml-5 text-[15px]",
      },
    });
  }

  function showCustomErrorToast(title, message) {
    toast.error(title, {
      description: message,
      unstyled: false,
      classNames: {
        title: "ml-5 text-lg",
        description: "ml-5 text-[15px]",
      },
    });
  }

  function showErrorToast(error) {
    console.error(error);
    if (error && error.code && error.code.includes("ERR_NETWORK")) {
      showCustomErrorToast("Feil", "Nettverkstilkoblingen ble nektet");
    } else if (error && error.response && error.response.data) {
      const msg = Array.from(error.response.data.errors)
        .map((error) => error.message)
        .join(", \n");

      toast.error("Feil", {
        description: msg,
        unstyled: false,
        classNames: {
          title: "ml-5 text-[18px]",
          description: "ml-5 text-[15px]",
        },
      });
    } else {
      toast.error("Oisann, en feil oppstod.", {
        description: `Pass på at informasjonen du oppga er riktig`,
        unstyled: false,
        classNames: {
          title: "ml-5 text-lg",
          description: "ml-5 text-[15px]",
        },
      });
    }
  }

  return {
    showSuccessToast,
    showErrorToast,
    showCustomErrorToast,
  };
};

export default useToastHandler;
