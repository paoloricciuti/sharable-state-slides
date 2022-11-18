import { sveltekit } from '@sveltejs/kit/vite';
import { ssp } from "sveltekit-search-params/plugin";
import type { UserConfig } from 'vite';

const config: UserConfig = {
    plugins: [ssp(), sveltekit()]
};

export default config;
