import React, { useState, useRef } from "react";

const Contact = () => {
  const [result, setResult] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null); // Create a reference to the form

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "c046808a-f8b1-447a-9a10-3e24a5e1d8b8");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      // Use ref to reset the form instead of event.currentTarget
      if (formRef.current) {
        formRef.current.reset();
      }
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div id="contact">
      <h2>Get in Touch</h2>

      <form onSubmit={onSubmit} ref={formRef}>
        {" "}
        {/* Add ref here */}
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            required
            name="name"
          />
          <input
            type="email"
            placeholder="Enter your email"
            required
            name="email"
          />
        </div>
        <textarea
          name="message"
          rows={6}
          placeholder="Enter your message"
          required
        ></textarea>
        <button type="submit">Submit</button>
        <p>{result}</p>
      </form>
    </div>
  );
};

export default Contact;
