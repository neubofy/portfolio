/**
 * Project Registry
 * 
 * This file auto-registers all custom project components.
 * When you add a new project folder, add it here to make it available.
 */

import { ProjectMeta } from '@/projects/types';

// Import all project metadata
import { meta as aimersMeta } from './aimers/meta';

// Registry of all custom projects with their components
export const projectRegistry: Record<string, {
    meta: ProjectMeta;
    component: () => Promise<{ default: React.ComponentType }>;
}> = {
    'aimers': {
        meta: aimersMeta,
        component: () => import('./aimers'),
    },
    // Add more projects here:
    // 'my-new-project': {
    //   meta: myNewProjectMeta,
    //   component: () => import('./my-new-project'),
    // },
};

// Get all project metadata for listings
export function getAllProjectsMeta(): ProjectMeta[] {
    return Object.values(projectRegistry).map(p => p.meta);
}

// Get featured projects for homepage
export function getFeaturedProjects(): ProjectMeta[] {
    return Object.values(projectRegistry)
        .filter(p => p.meta.featured)
        .map(p => p.meta);
}

// Check if a custom component exists for a project
export function hasCustomComponent(id: string): boolean {
    return id in projectRegistry;
}

// Get the component loader for a project
export function getProjectComponent(id: string) {
    return projectRegistry[id]?.component;
}

// Export types
export * from './types';
