<script lang="ts">
    interface IIntegration {
        type: string;
        name: string;
        categories: string[];
        logo_url?: string;
        color?: string;
        text_color?: string;
    }

    export let workspaceId: string | undefined;
    export let workspace_id: string | undefined;
    export let categories: string[] | undefined;
    export let external_xref: string | undefined;
    export let state: string | undefined;
    export let scopes: string[] | undefined;
    export let success_redirect: string | undefined;
    export let failure_redirect: string | undefined;
    export let nostyle: boolean | undefined;
    export let environment: string | undefined;
    export let lang: string | undefined;
    export let notabs: boolean | undefined;
    export let nocategories: boolean | undefined;
    export let dc: 'us' | 'eu' | undefined;

    const API_NA_URL = 'https://api.unified.to';
    const API_EU_URL = 'https://api-eu.unified.to';

    const CATEGORY_MAP: { [path in string]?: string } = {
        crm: 'CRM',
        martech: 'Marketing',
        ticketing: 'Ticketing',
        uc: 'Unified Communications',
        enrich: 'Enrichment',
        ats: 'ATS',
        hris: 'HR',
        accounting: 'Accounting',
        storage: 'Storage',
        commerce: 'E-Commerce',
        payment: 'Payments',
        genai: 'Generative AI',
        messaging: 'Messaging',
        kms: 'KMS',
        task: 'Tasks',
    };

    const API_URL = dc === 'eu' ? API_EU_URL : API_NA_URL;
    let INTEGRATIONS: IIntegration[] = [];
    let CATEGORIES: string[] = [];
    let selectedCategory: string | '' = '';
    let loading = false;

    function filter(integrations: IIntegration[]) {
        return integrations?.filter((integration) => !selectedCategory || integration.categories.indexOf(selectedCategory) !== -1) || [];
    }

    function unified_get_auth_url(integration: IIntegration) {
        let url = `${API_URL}/unified/integration/auth/${workspaceId || workspace_id}/${integration.type}?redirect=1`;

        if (external_xref) {
            url += `&external_xref=${encodeURIComponent(external_xref)}`;
        }
        if (state) {
            url += `&state=${encodeURIComponent(state)}`;
        }
        if (scopes?.length) {
            url += `&scopes=${encodeURIComponent(scopes.join(','))}`;
        }
        if (environment && environment !== 'Production') {
            url += `&env=${encodeURIComponent(environment)}`;
        }
        if (lang) {
            url += `&lang=${lang}`;
        }

        url += `&success_redirect=${encodeURIComponent(success_redirect || '')}`;
        url += `&failure_redirect=${encodeURIComponent(failure_redirect || '')}`;

        return url;
    }

    async function load_data() {
        const url = `${API_URL}/unified/integration/workspace/${workspaceId || workspace_id}?summary=1${
            categories?.length ? '&categories=' + categories.join(',') : ''
        }${environment === 'Production' || !environment ? '' : '&env=' + encodeURIComponent(environment)}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(String(response.status));
            }

            return response.json();
        } catch (error) {
            console.error('Failed to load data:', error);
            return [];
        }
    }

    $: {
        if (!loading && !INTEGRATIONS.length) {
            loading = true;
            load_data().then((data: IIntegration[]) => {
                data = data.filter((i) => !(i.categories.length === 1 && i.categories[0] === 'auth')) || [];
                INTEGRATIONS = data;

                let _CATEGORIES = [] as string[];
                data.forEach((integration) => {
                    integration.categories?.forEach((c) => {
                        if (CATEGORY_MAP[c] && (!categories?.length || categories.indexOf(c) !== -1)) {
                            _CATEGORIES.push(c);
                        }
                    });
                });

                _CATEGORIES = [...new Set(_CATEGORIES)];

                if (_CATEGORIES.length === 1) {
                    _CATEGORIES = [];
                } else {
                    _CATEGORIES = _CATEGORIES.sort((a, b) => a.localeCompare(b));
                }
                CATEGORIES = _CATEGORIES;
                loading = false;
            });
        }
    }
</script>

<div class="unified">
    {#if !nostyle}
        <style>
            @import url(https://api.unified.to/docs/unified.css);
        </style>
    {/if}

    {#if !notabs && CATEGORIES && CATEGORIES.length > 0 && filter(INTEGRATIONS).length}
        <div class="unified_menu">
            <button class="unified_button unified_button_all {selectedCategory ? '' : ' active'}" on:click={() => (selectedCategory = '')}> All </button>
            {#each CATEGORIES as cat}
                <button class="unified_button unified_button_{cat} {selectedCategory === cat ? 'active' : ''}" on:click={() => (selectedCategory = cat)}>
                    {CATEGORY_MAP[cat]}
                </button>
            {/each}
        </div>
    {/if}

    <div class="unified_vendors">
        {#each filter(INTEGRATIONS) as integration}
            <a href={unified_get_auth_url(integration)} class="unified_vendor">
                <img alt={integration.name} src={integration.logo_url} class="unified_image" />
                <div class="unified_vendor_inner">
                    <div class="unified_vendor_name">{integration.name}</div>
                    {#if !nocategories}
                        {#each integration.categories.filter((c) => !CATEGORIES || CATEGORIES.indexOf(c) > -1).filter((c) => CATEGORY_MAP[c]) as cat}
                            <div class="unified_vendor_cats">
                                <span>{CATEGORY_MAP[cat]}</span>
                            </div>
                        {/each}
                    {/if}
                </div>
            </a>
        {/each}
        {#if filter(INTEGRATIONS).length === 0}
            <div class="unified_vendor">No integrations available</div>
        {/if}
    </div>
</div>
