import { Plugin, TFolder } from "obsidian";

export default class GitkeepPlugin extends Plugin {
	async onload() {
		if (!this.app.workspace.layoutReady) {
			this.app.workspace.onLayoutReady(
				async () => await this.onLayoutReady()
			);
		} else {
			await this.onLayoutReady();
		}
		this.app.workspace.onLayoutReady(async () => this.onLayoutReady());
	}

	async onLayoutReady() {
		const vault = this.app.vault;
		const rootFolder = vault.getRoot();
		await this.traverseFolder(rootFolder);
	}

	async traverseFolder(folder: TFolder) {
		for (const item of folder.children) {
			if (item instanceof TFolder) {
				await this.traverseFolder(item);
			}
		}

		if (folder.children.length === 0) {
			this.app.vault.create(folder.path + "/.gitkeep", "");
		}
	}
}
