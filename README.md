# Obsidian Gitkeep

This plugin provides a solution for a narrow use case where git is used to sync the vault over multiple devices and folders include exclusively file types that are on the gitignore list.
This leads to empty folders that exist on some devices and are therefore lost by git.
This can also lead to the folders being delete on devices that do have files in them therefore losing data at worst and a ping pong of tracking untracking certain paths at best.

### Current behaviour

The plugin adds .gitkeep files to empty folders or folders called "assets".

### Wanted behaviour in future

Settings to configure if empty folders should get the .gitkeep file and settings where you provide an array of folder names that should get a .gitkeep file.
