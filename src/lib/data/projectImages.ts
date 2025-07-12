// Import all your project images from the public/projects folder
// Make sure the paths are correct based on where you place your images within public/projects
import learnai from '../../../public/projects/learnai.png';
import refactor from '../../../public/projects/refactor.png';
import anchored from '../../../public/projects/anchored.png';
import blog from '../../../public/projects/blog.png';
import money from '../../../public/projects/money.png';
import peer from '../../../public/projects/peer.png';
import linked from '../../../public/projects/linked.png';
import screen from '../../../public/projects/screen.jpg';
import og from '../../../public/projects/og.png'; // Assuming 'My Former Portfolio' uses 'og.png'
import luminous from '../../../public/projects/luminous.png';
import wellbe from '../../../public/projects/wellbe.png';
import leads from '../../../public/projects/leads.png';
import xpPortfolio from '../../../public/projects/xp-portfolio.png'; // Add an image for this portfolio



// Export your images as an object for easy access
export const projectImages = {
  learnai: { src: learnai, alt: "AI LearnHub Screenshot" },
  refactor: { src: refactor, alt: "Python Code Refactor AI Screenshot" },
  anchored: { src: anchored, alt: "Vertical Techniques Website Screenshot" },
  blog: { src: blog, alt: "The Nex Journal Screenshot" },
  money: { src: money, alt: "Me Manager Screenshot" },
  peer: { src: peer, alt: "Peer-Learn Platform Screenshot" },
  linked: { src: linked, alt: "LinkedList API Screenshot" },
  screen: { src: screen, alt: "Anthony's Portfolio Screenshot" },
  og: { src: og, alt: "My Former Portfolio Screenshot" },
  luminous: { src: luminous, alt: "Luminous Solutions Website Screenshot" },
  wellbe: { src: wellbe, alt: "WellBe App Screenshot" },
  leads: { src: leads, alt: "Leads Chrome Addon Screenshot" },
  xpPortfolio: { src: xpPortfolio, alt: "Windows XP Inspired Portfolio Screenshot" }, // Add this
};

// Re-export the actual image imports if needed elsewhere (less common)
export {
  learnai,
  refactor,
  anchored,
  blog,
  money,
  peer,
  linked,
  screen,
  og,
  luminous,
  wellbe,
  leads,
  xpPortfolio,
};