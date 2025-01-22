import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800">
      <div className="px-6 py-8 flex gap-4 flex-col md:flex-row items-center md:justify-between lg:px-8">
        <div>
          <p>Made with ❤️ by Sachin Gyandor</p>
        </div>
        <div>
          <p className="text-center text-sm leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Budget Buddy. All rights reserved.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/gyandors"
            target="_blank"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">GitHub</span>
            <FaGithub className="size-6" />
          </a>
          <a
            href="https://x.com/gyandors"
            target="_blank"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Twitter</span>
            <FaTwitter className="size-6" />
          </a>
          <a
            href="https://linkedin.com/in/gyandors"
            target="_blank"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">LinkedIn</span>
            <FaLinkedin className="size-6" />
          </a>
          <a
            href="https://youtube.com/@gyandors"
            target="_blank"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">YouTube</span>
            <FaYoutube className="size-6" />
          </a>
          <a
            href="https://facebook.com/gyandors"
            target="_blank"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Facebook</span>
            <FaFacebook className="size-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
