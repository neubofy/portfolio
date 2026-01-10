// Project metadata type definition
export interface ProjectMeta {
    id: string;
    title: string;
    description: string;
    tags: string[];
    thumbnail?: string;
    heroImage?: string;
    liveLink?: string;
    featured?: boolean;
    // For backward compatibility with JSON format
    gallery?: string[];
}

// Project component type
export interface ProjectComponent {
    meta: ProjectMeta;
    Component: React.ComponentType;
}
