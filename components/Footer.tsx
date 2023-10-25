import React from "react";
import { BsInstagram, BsFacebook, BsGoogle } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

const socialMediaLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com",
    icon: <BsInstagram size={20} />,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com",
    icon: <BsFacebook size={20} />,
  },
  {
    name: "Twitter",
    url: "https://www.twitter.com",
    icon: <FaXTwitter size={20} />,
  },
  {
    name: "Google",
    url: "https://www.google.com",
    icon: <BsGoogle size={20} />,
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent text-black p-6">
      <div className="flex justify-center space-x-4 mb-4">
        {socialMediaLinks.map((link, index) => (
          <a key={index} href={link.url} className="hover:text-indigo-500">
            {link.icon}
          </a>
        ))}
      </div>
      <div className="flex justify-center space-x-4">
        <a href="/terms" className="hover:text-indigo-500">
          Terms & Conditions
        </a>
        <a href="/privacy" className="hover:text-indigo-500">
          Privacy Policy
        </a>
        <a href="/terms-of-use" className="hover:text-indigo-500">
          Terms of Use
        </a>
      </div>
    </footer>
  );
};

export default Footer;
