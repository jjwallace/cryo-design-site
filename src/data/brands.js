// Brand logos for the scrolling brand bar
// Using enterprise logos from assets

import logo007 from '../assets/logo/enterprise_logos/CRYO_Enterprise_007.png';
import logo008 from '../assets/logo/enterprise_logos/CRYO_Enterprise_008.png';
import logo009 from '../assets/logo/enterprise_logos/CRYO_Enterprise_009.png';
import logo010 from '../assets/logo/enterprise_logos/CRYO_Enterprise_010.png';
import logo011 from '../assets/logo/enterprise_logos/CRYO_Enterprise_011.png';
import logo012 from '../assets/logo/enterprise_logos/CRYO_Enterprise_012.png';

export const brands = [
  { id: 1, name: "Enterprise 007", logo: logo007 },
  { id: 2, name: "Enterprise 008", logo: logo008 },
  { id: 3, name: "Enterprise 009", logo: logo009 },
  { id: 4, name: "Enterprise 010", logo: logo010 },
  { id: 5, name: "Enterprise 011", logo: logo011 },
  { id: 6, name: "Enterprise 012", logo: logo012 },
];

export const content = {
  hero: {
    tagline: "Design that freezes the moment.",
    subtitle: "Brand identity from scratch to overhaul.",
  },
  about: {
    bio: `CRYO Designs is an independent studio led by a single designer with nearly a decade of professional experience. The work is shaped by a split background: early roots as a Northeast coast street artist followed by formative years inside California corporate design environments. That mix of influences continues to define the output—bold, grounded, and functional, with a clear point of view that avoids feeling generic or overproduced.`,
    philosophy: `The studio specializes in brand identity at every stage. CRYO Designs brings clarity and direction to brands at any point in their evolution, from building complete visual systems from the ground up to refining long-established identities for a modern audience without losing what made them matter. Services extend across branding, design for events, and supporting visual assets as needed. Based in Southern California between Los Angeles and San Diego, CRYO Designs works with clients locally and remotely, bringing a considered, contemporary approach to each project.`,
    services: [
      { name: "Brand Identity", description: "Complete visual systems including typography, color, layout, and usage guidelines. Built from scratch or rebuilt for brands that need to evolve without losing their core." },
      { name: "Event Design", description: "Posters, flyers, and visual assets for shows, launches, pop-ups, and one-off events—designed to grab attention in the real world and online." },
      { name: "Social Media Design & Management", description: "Visual direction, post templates, and ongoing content support to keep brands consistent and recognizable across platforms." },
      { name: "Website Design", description: "Custom website design focused on clarity, usability, and tone—portfolio sites, brand sites, and small business builds." },
      { name: "Illustration", description: "Original illustrations and character work for brands, merchandise, packaging, and editorial use. No stock art, no filler." },
      { name: "Logo Design", description: "Custom marks built to last—wordmarks, symbols, and hybrid logos designed to work across digital, print, and physical use." },
      { name: "Animation", description: "Short-form motion graphics, animated logos, and visual loops for web, social, and presentations." },
      { name: "Packaging Design", description: "Packaging concepts and production-ready designs for physical products, from labels to full box systems." },
      { name: "Commissions", description: "One-off custom projects including artwork, special requests, and experimental pieces outside standard brand work." },
      { name: "Stickers", description: "Sticker designs for brands, events, and drops—die-cut, slap-ready, and made to circulate." },
      { name: "Apparel", description: "Graphics for shirts, hoodies, hats, and merch drops, designed with real-world printing and wear in mind." },
    ],
  },
  contact: {
    intro: `Ready to start a project? Have a question? Just want to say hello?

Fill out the form below and we'll get back to you within 48 hours. For urgent inquiries, reach out directly at cy@cryodesigns.com.`,
    success: `Thank you for reaching out. We've received your message and will be in touch soon. In the meantime, feel free to explore our work.`,
  },
  footer: {
    copyright: "© 2025 CRYO Designs. All rights reserved.",
  },
};
