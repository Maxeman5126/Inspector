## Inspector

A tera-proxy module that automatically inspects players when they apply for your group and logs details about them in your console and ingame chat.  
It hides the inspect window during combat so you don't get distracted while fighting.  
  
![Screenshot](https://i.imgur.com/1umfe1R.png)
![Screenshot](https://i.imgur.com/1otnAV7.png)

## Auto-update guide
- Create a folder called `Inspector` in `tera-toolbox/mods` and download >> [`module.json`](https://raw.githubusercontent.com/maxeman/Inspector/master/module.json) << (right-click this link and save link as..) into the folder

## Usage
The script is enabled by default and will automatically inspect players that apply for your group.  
There are several options you can change in the config.json file:  
  
* To change which dungeon skills are shown on inspect set the dungeon to either "true" or "false"
* "inspectDelay" - Set the delay between application and inspect (in ms)
* "showDungeonSkills" - Set to "false" to not post dungeon skills in toolbox chat
* "showWindow" - Set to "false" to always hide the inspect window from applicants even when not in combat
  

# Commands
While in game, toolbox chat by typing "/8" in chat and hitting the space bar.  
  
* **inspect** - enable/disable Inspector
* **inspect skills** - show/hide dungeon skills
* **inspect window** - show/hide inspect window for applicants
* **inspect [x]** - change inspect delay to x in ms, e.g. "inspect 2000" for 2 seconds
  
## Changelog
<details>

### 1.5.2.max
* [*] Updated for patch 100.02 and removed some unused elements such as weapon crystals on this patch.
* [*] Corrected mapping values of class, race, and gender to align with game data.
* [~] Now pulls even more strings from the game files (class, race, and gender).
### 1.5.2
* [*] Updated definitions for patch 86
### 1.5.1
* [*] Remove support for patches < 85
### 1.5.0
* [~] Now showing dungeon skill instead of clear count (the server no longer sends you the clear count)
* [~] "showDungeonClears" changed to "showDungeonSkills" and "inspect clears" changed to "inspect skills" accordingly
* [~] Now pulls strings directly from the game files (the module will ALWAYS be up-to-date!)
* [-] Removed "strings" directory and files as they are not needed any longer
### 1.4.3
* [*] Update for patch 85 and below
### 1.4.2
* [*] Updated S_USER_PAPERDOLL_INFO version
### 1.4.1
* [*] Updated S_USER_PAPERDOLL_INFO version
* [+] Added talent level to console log
### 1.4.0
* [+] Added localization for JP, KR, RU, SE, TH, TW regions
* [+] Added "inspect clears" command and "showDungeonClears" config option
* [+] Added "inspect window" command and "showWindow" config option
* [+] Will now even inspect during combat (without opening the inspect window)
### 1.3.6
* [~] Look and feel will now be the same on Caali's and Pinkie's proxy
### 1.3.5
* [-] Removed support for patch versions < 75
### 1.3.4
* [*] Updated S_USER_PAPERDOLL_INFO version
* [+] Added a branch for Pinkie Pie's tera-proxy
### 1.3.3
* [~] Code changes due to Caali's recent tera-proxy updates
* [-] Removed support for Pinkie Pie's tera-proxy
### 1.3.2
* [+] Added option to edit which dungeons are shown via config.json
* [+] Added option to edit delay of auto-inspect
* [*] Performance optimization
### 1.3.0
* [+] Rewrote code to use Caali's "tera-game-state" module in order to reduce overhead
* [+] Now supports auto-updating via Caali's tera-proxy
* [+] Now prints applicant's item level to ingame chat
* [+] Now prints applicant's clear count of currently relevant dungeons to ingame chat and console (thanks tera-love)
* [~] Now using a json database instead of additional js files
### 1.2.1
* [*] Updated hook versions for compatibility with the latest tera-proxy
### 1.2.0
* [*] Some code cleanup
* [*] Full conversion to Pinkie Pie's command module
### 1.1.0
* [+] Added logging of a character's information to the console
### 1.0.0
* [~] Initial Release

</details>