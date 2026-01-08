// Project data using real portfolio images from assets
// Using Vite's glob import to dynamically load images

// Import all images from each portfolio folder
const brandIdentityImages = import.meta.glob('../assets/portfolio/Brand Identity/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, import: 'default' });
const corporateImages = import.meta.glob('../assets/portfolio/Corporate/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, import: 'default' });
const graphicsImages = import.meta.glob('../assets/portfolio/Graphics/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, import: 'default' });
const illustrationImages = import.meta.glob('../assets/portfolio/Illustrative Branding/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, import: 'default' });
const topImages = import.meta.glob('../assets/portfolio/top-images/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, import: 'default' });

// Custom order for top images (home page gallery)
const topImageOrder = [
  'CRYO_Ritual_Rosin_022',
  'CRYO_Ritual_Rosin_023',
  'CRYO_Aston_Martin_003',
  'CRYO_Aston_Martin_004',
  'CRYO_SentinelOne_Booth_004',
  'CRYO_SentinelOne_Booth_001',
  'CRYO_Pokneon_011',
  'CRYO_Ritual_Rosin_016',
  'CRYO_Altered_Ego_001',
];

// Helper to create ordered projects from top images
const createOrderedTopProjects = (globResult, order) => {
  const sizes = ['med-square', 'lg-landscape', 'med-portrait', 'lg-square', 'sm-square', 'med-landscape', 'lg-portrait', 'xl-landscape'];

  // Create a map of filename -> src for quick lookup
  const imageMap = {};
  Object.entries(globResult).forEach(([path, src]) => {
    const filename = path.split('/').pop().replace(/\.[^.]+$/, '');
    imageMap[filename] = src;
  });

  // Build array in specified order
  return order.map((filename, index) => {
    const src = imageMap[filename];
    if (!src) return null;

    const parts = filename.split('_');
    let client = parts.slice(1, -1).join(' ');
    // Rename "Ritual Rosin" to "Ritual"
    if (client === 'Ritual Rosin') client = 'Ritual';

    return {
      id: index + 1,
      title: client || `Project ${index + 1}`,
      client: client || 'CRYO Designs',
      year: 2024,
      src,
      size: sizes[index % sizes.length],
      category: 'top',
    };
  }).filter(Boolean);
};

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
// Mapping: Illustration folder → Branding, Brand Identity folder → Identity, Corporate folder → Spatial
export const brandingProjects = createProjectsFromGlob(illustrationImages, 'branding');
export const identityProjects = createProjectsFromGlob(brandIdentityImages, 'identity');
export const spatialProjects = createProjectsFromGlob(corporateImages, 'spatial');
export const graphicsProjects = createProjectsFromGlob(graphicsImages, 'graphics');
export const topProjects = createOrderedTopProjects(topImages, topImageOrder);

// All projects combined
export const allProjects = [
  ...brandingProjects,
  ...identityProjects,
  ...spatialProjects,
  ...graphicsProjects,
];

// Get projects by category
export const getProjectsByCategory = (category) => {
  switch (category) {
    case 'branding':
      return brandingProjects;
    case 'identity':
      return identityProjects;
    case 'spatial':
      return spatialProjects;
    case 'graphics':
      return graphicsProjects;
    default:
      return allProjects;
  }
};

// Category metadata
export const categories = [
  { slug: 'branding', name: 'Branding', count: brandingProjects.length },
  { slug: 'identity', name: 'Identity', count: identityProjects.length },
  { slug: 'spatial', name: 'Spatial', count: spatialProjects.length },
  { slug: 'graphics', name: 'Graphics', count: graphicsProjects.length },
];

// Mixed gallery for home page
export const getHomeGallery = () => {
  return [
    ...brandingProjects.slice(0, 12),
    ...identityProjects.slice(0, 12),
    ...spatialProjects.slice(0, 8),
    ...graphicsProjects.slice(0, 12),
  ];
};

// Group images by project name (CRYO_PROJECTNAME_###)
// Returns array of { name, images: [] } objects
const groupByProject = (globResult) => {
  const projectMap = new Map();

  Object.entries(globResult).forEach(([path, src]) => {
    const filename = path.split('/').pop().replace(/\.[^.]+$/, '');
    // Extract project name: CRYO_ProjectName_### -> ProjectName
    const parts = filename.split('_');
    // Remove CRYO prefix and number suffix to get project name
    const projectName = parts.slice(1, -1).join('_');
    const imageNum = parts[parts.length - 1];

    if (!projectMap.has(projectName)) {
      projectMap.set(projectName, {
        name: projectName.replace(/_/g, ' '),
        description: '',
        images: [],
      });
    }

    projectMap.get(projectName).images.push({
      src,
      filename,
      number: imageNum,
    });
  });

  // Sort images within each project by number
  projectMap.forEach((project) => {
    project.images.sort((a, b) => {
      const numA = parseInt(a.number, 10) || 0;
      const numB = parseInt(b.number, 10) || 0;
      return numA - numB;
    });
  });

  return Array.from(projectMap.values());
};

// Custom sort order for spatial category
const spatialOrder = ['SentinelOne Booth', 'Aston Martin', 'SentinelOne'];

// Sort projects: reverse alphabetical (Z-A), with custom order for spatial
const sortProjects = (projects, category) => {
  if (category === 'spatial') {
    // Custom order for spatial
    return projects.sort((a, b) => {
      const aIndex = spatialOrder.findIndex(name => a.name.includes(name.replace(' ', '_')) || a.name.includes(name.replace('_', ' ')) || a.name === name);
      const bIndex = spatialOrder.findIndex(name => b.name.includes(name.replace(' ', '_')) || b.name.includes(name.replace('_', ' ')) || b.name === name);

      // If both are in custom order, sort by that order
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      // If only one is in custom order, put it first
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      // Otherwise reverse alphabetical
      return b.name.localeCompare(a.name);
    });
  }
  // Default: reverse alphabetical (Z-A)
  return projects.sort((a, b) => b.name.localeCompare(a.name));
};

// Get grouped projects by category for project-based layout
export const getGroupedProjectsByCategory = (category) => {
  let projects;
  switch (category) {
    case 'branding':
      projects = groupByProject(illustrationImages);
      break;
    case 'identity':
      projects = groupByProject(brandIdentityImages);
      break;
    case 'spatial':
      projects = groupByProject(corporateImages);
      break;
    case 'graphics':
      projects = groupByProject(graphicsImages);
      break;
    default:
      return [];
  }
  return sortProjects(projects, category);
};
