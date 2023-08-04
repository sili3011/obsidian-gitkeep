import { EventRef, Plugin, TAbstractFile, TFolder } from "obsidian";

export default class GitkeepPlugin extends Plugin {
	createFolderEventRef: EventRef;

	async onload() {
		if (!this.app.workspace.layoutReady) {
			this.app.workspace.onLayoutReady(
				async () => await this.onLayoutReady()
			);
		} else {
			await this.onLayoutReady();
		}
		this.app.workspace.onLayoutReady(async () => this.onLayoutReady());

		this.createFolderEventRef = this.app.vault.on(
			"create",
			(fileOrFolder) => {
				if (
					fileOrFolder.name === "assets" &&
					fileOrFolder instanceof TFolder
				) {
					this.createGitKeep(fileOrFolder);
				}
			}
		);
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

		if (
			folder.children.length === 0 ||
			(folder.name === "assets" &&
				!folder.children?.some((child) => child.name === ".gitkeep"))
		) {
			this.createGitKeep(folder);
		}
	}

	createGitKeep(fileOrFolder: TAbstractFile) {
		this.app.vault
			.create(fileOrFolder.path + "/.gitkeep", "")
			// surpressing errors if .gitkeep already exists,
			// which cant be detected as .gitkeep is not part of folder.children
			.then(
				(_) => {},
				(_) => {}
			);
	}

	async onunload() {
		this.app.vault.offref(this.createFolderEventRef);
	}
}
