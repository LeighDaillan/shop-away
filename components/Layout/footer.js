import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Footer = function () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const form = useRef();

  const contactHandler = function (e) {
    e.preventDefault();

    const data = { name, email, message };

    emailjs
      .sendForm(
        "service_2z9nz7r",
        "template_xpfceos",
        form.current,
        "9wA3T3ZGsF7C2g-hj"
      )
      .then(
        (result) => {
          alert("Your email has been sent!");
        },
        (error) => {
          console.log(error.text);
        }
      );

    setEmail("");
    setMessage("");
    setName("");
    return;
  };
  return (
    <footer>
      <div className="bg-neutral-900 text-white px-14 py-8 md:px-32 md:py-16 gap-5">
        <div className=" sm:grid sm:grid-cols-3">
          <h4 className="text-2xl md:text-4xl font-bold">By Arcane:</h4>
          <div className="justify-self-center  self-center">
            <h5 className="font-semibold">Social</h5>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>LinkedIn</p>
          </div>
          <div className="py-5 sm:py-0 justify-self-center  self-center">
            <h5 className="font-semibold">Contact</h5>
            <p>(+63) 951-018-9773</p>
            <p>francodaillanleigh@gmail.com</p>
          </div>
        </div>
        <form
          ref={form}
          onSubmit={contactHandler}
          className="bg-neutral-800 mx-auto col-span-2 md:col-span-1 mt-5 md:max-w-3xl p-3"
        >
          <label className="block mb-2">Email Address: *</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className=" bg-neutral-300 text-sm md:text-base mr-5 w-5/6 text-black font-bold px-2 py-1 rounded-sm"
            type="email"
            name="email"
            required
          />

          <input
            type="submit"
            value="Send"
            className="mt-5 bg-neutral-700 text-white px-4 py-1 rounded-sm"
          />
        </form>
      </div>
      <div className="bg-neutral-500 px-5 py-3 text-black">
        <p className="text-base md:text-lg font-bold tracking-wider text-center">
          © 2023 Created and Design by: ◀ Daillan Leigh Franco
        </p>
      </div>
    </footer>
  );
};

export default Footer;
