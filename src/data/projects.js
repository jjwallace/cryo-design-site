// Project data using real portfolio images from assets
// Using Vite's glob import to dynamically load images

// Import all images from each portfolio folder
const brandIdentityImages = import.meta.glob('../assets/portfolio/Brand Identity/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, import: 'default' });
const corporateImages = import.meta.glob('../assets/portfolio/Corporate/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, import: 'default' });
const graphicsImages = import.meta.glob('../assets/portfolio/Graphics/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, import: 'default' });
const illustrationImages = import.meta.glob('../assets/portfolio/Illustrative Branding/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, import: 'default' });
const topImages = import.meta.glob('../assets/portfolio/top-images/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, import: 'default' });

// Helper to convert glob imports to project array
const createProjectsFromGlob = (globResult, category) => {
  return Object.entries(globResult).map(([path, src], index) => {
    const filename = path.split('/').pop().replace(/\.[^.]+$/, '');
    const parts = filename.split('_');
    const client = parts.slice(1, -1).join(' ');

    // Assign varied sizes based on index for visual interest
    const sizes = ['med-square', 'lg-landscape', 'med-portrait', 'lg-square', 'sm-square', 'med-landscape', 'lg-portrait', 'xl-landscape'];
    const size = sizes[index % sizes.length];

    return {
      id: index + 1,
      title: client || `Project ${index + 1}`,
      client: client || 'CRYO Designs',
      year: 2024,
      src,
      size,
      category,
    };
  });
};

// Create project arrays for each category
export const brandIdentityProjects = createProjectsFromGlob(brandIdentityImages, 'brand-identity');
export const corporateProjects = createProjectsFromGlob(corporateImages, 'corporate');
export const graphicsProjects = createProjectsFromGlob(graphicsImages, 'graphics');
export const illustrationProjects = createProjectsFromGlob(illustrationImages, 'illustration');
export const topProjects = createProjectsFromGlob(topImages, 'brand-identity');

// All projects combined
export const allProjects = [
  ...brandIdentityProjects,
  ...corporateProjects,
  ...graphicsProjects,
  ...illustrationProjects,
];

// Get projects by category
export const getProjectsByCategory = (category) => {
  switch (category) {
    case 'brand-identity':
      return brandIdentityProjects;
    case 'corporate':
      return corporateProjects;
    case 'graphics':
      return graphicsProjects;
    case 'illustration':
      return illustrationProjects;
    default:
      return allProjects;
  }
};

// Category metadata
export const categories = [
  { slug: 'brand-identity', name: 'Brand Identity', count: brandIdentityProjects.length },
  { slug: 'corporate', name: 'Corporate', count: corporateProjects.length },
  { slug: 'graphics', name: 'Graphics', count: graphicsProjects.length },
  { slug: 'illustration', name: 'Illustration', count: illustrationProjects.length },
];

// Mixed gallery for home page
export const getHomeGallery = () => {
  return [
    ...brandIdentityProjects.slice(0, 12),
    ...corporateProjects.slice(0, 8),
    ...graphicsProjects.slice(0, 12),
    ...illustrationProjects.slice(0, 12),
  ];
};
