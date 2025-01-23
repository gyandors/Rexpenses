import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaHeart,
} from "react-icons/fa6";

export default function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/gyandors",
      icon: FaGithub,
    },
    {
      name: "Twitter",
      url: "https://x.com/gyandors",
      icon: FaTwitter,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/gyandors",
      icon: FaLinkedin,
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@gyandors",
      icon: FaYoutube,
    },
    {
      name: "Facebook",
      url: "https://facebook.com/gyandors",
      icon: FaFacebook,
    },
  ];

  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700">
      <div className="px-4 lg:px-8 py-8 flex flex-col gap-4 items-center md:flex-row md:justify-between">
        {/* Made with Love */}
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <span>Made with</span>
          <FaHeart className="mx-1 text-red-500" />
          <span>by</span>
          <a
            href="https://gyandors.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
          >
            Sachin Gyandor
          </a>
        </div>

        {/* Copyright */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Budget Buddy. All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                aria-label={link.name}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
