import Swal from "sweetalert2";

const ErrorMsg = ({ message }) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
};

export default ErrorMsg;
