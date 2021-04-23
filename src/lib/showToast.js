import Toastify from "toastify-js";

const showToast = (text, color = "#222") => {
  Toastify({
    text: text,
    backgroundColor: color,
    className:
      "w-full flex px-4 rounded-lg font-medium text-sm py-3",
    gravity: "bottom",
    position: "center",
  }).showToast();
};

export default showToast;
