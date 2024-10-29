/// <reference types="svelte" />
import { SvelteComponent } from 'svelte';

export interface UnifiedDirectoryProps {
    workspaceId: string | undefined;
    workspace_id: string | undefined;
    categories: string[] | undefined;
    external_xref: string | undefined;
    state: string | undefined;
    scopes: string[] | undefined;
    success_redirect: string | undefined;
    failure_redirect: string | undefined;
    nostyle: boolean | undefined;
    environment: string | undefined;
    lang: string | undefined;
    notabs: boolean | undefined;
    nocategories: boolean | undefined;
    dc: 'us' | 'eu' | undefined;
}

export default class UnifiedDirectory extends SvelteComponent {
    UnifiedDirectoryProps;
}
