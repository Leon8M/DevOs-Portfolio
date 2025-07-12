import React from 'react';

const socialLinks = [
  { name: 'Email', user: 'leonmunene254@gmail.com', url: 'mailto:leonmunene254@gmail.com', icon: '/xp-icons/contact-me-icon.png' },
  { name: 'LinkedIn', user: 'leon-munene', url: 'https://www.linkedin.com/in/leon-munene', icon: '/xp-icons/linkedin-icon.png' },
  { name: 'GitHub', user: 'leon-munene', url: 'https://github.com/Leon8M', icon: '/xp-icons/github-icon.png' },
];

const ContactSocials: React.FC = () => {
  return (
    <div className="p-4 bg-[#ECE9D8] text-sm font-xp">
      <h2 className="text-lg font-bold mb-4 border-b border-gray-400 pb-2 text-[#003B7C]">Set Program Access and Defaults</h2>

      <p className="mb-4 text-gray-800">
        Choose a default program for activities like professional networking and collaboration.
      </p>

      <div className="bg-white border border-gray-300 shadow-inner rounded-sm">
        {socialLinks.map((link) => (
          <div key={link.name} className="flex items-center justify-between px-3 py-2 border-b last:border-b-0">
            <div className="flex items-center space-x-3">
              <img src={link.icon} alt={link.name} className="w-7 h-7" />
              <div>
                <p className="font-bold">{link.name}</p>
                <p className="text-xs text-gray-600">{link.user}</p>
              </div>
            </div>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-calendar-action text-xs px-3"
            >
              Open
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactSocials;
