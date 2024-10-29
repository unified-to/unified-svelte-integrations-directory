<h1>
    <a href="https://unified.to"><img src="https://unified.to/images/unified.svg" /></a>
</h1>

# Unified.to's Integrations Directory Svelte Component

## Installing

### Package manager

Using NPM:

```bash
$ npm install @unified-api/svelte-directory
```

Using yarn:

```bash
$ yarn add @unified-api/svelte-directory
```

Once the package is installed, you can import the component using `import`

```ts
import { UnifiedDirectory } from '@unified-api/svelte-directory';
```

## Example

```html
<script lang="ts">
    import UnifiedDirectory, { type UnifiedDirectorytProps } from 'UnifiedDirectory';

    let props: ComponentProps = {
        workspaceId: '', // my workspace ID from https://app.unified.to/settings/api
    };
</script>

<Component {...props} />
```

The following are the `props` that can be passed to the component:

```ts
{
    workspaceId: string;    // your workspace_id found at https://app.unified.to/settings/api
    categories?: string[];  // An array of integration categories to limit the list of integrations (crm, ats, hr, uc,. ticketing, martech)
    external_xref?: string; // Your ID for the account/user that is signed into your application
    state?: string;         // A state string that will be sent back to your success URL
    scopes?: string[];      // An array of Unified.to permission scopes to request from OAUTH2-based integrations found at https://unified.to/apidocs#unified_object_connection
    success_redirect?: string;  // The URL where you want the user to be redirect to after a successful authentication. The Integration ID will be appended with (id=) to this URL, as will the state provided
    failure_redirect?: string;  // The URL where you want the user to be redirect to after an unsuccessful or aborted authorization.  An 'error' variable will be appended.
    nostyle?: boolean;
    environment?: string;   // The development environment (Eg. Production, Sandbox, ...)
    lang?: string;          // The language for the API Key authorization page.  (en, fr, es, it, pt, hi, zh)
    notabs?: boolean;       // Do not display tabs in the embedded directory
    nocategories?: boolean; // Do not display category badges for each integration
    dc?: 'us'|'eu';         // data-region
}
```
