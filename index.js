'use strict'

//const Data = require('./data')

module.exports = function PlayerInspector(m) {
	//const library = dispatch.require.library;
    //const races = Data["races"],
    //    jobs = Data["jobs"]

    let name = '',
        appliedInCombat = false,
        niceName = '[Inspect] ',
        dungeons = {};
//should move data into a library, but to reduce dependancies, it can stay here... for now...
    m.queryData('/StrSheet_Dungeon/String/', [], true, false).then(results => {
        results.forEach(entry => { if(m.game.data.continents.has(entry.attributes.id)) dungeons[entry.attributes.id] = entry.attributes.string })
    })
	const templateIds = new Map;
    m.queryData('/StrSheet_Creature/HuntingZone@id=?/String/', [0], true, false, ['templateId','name']).then(results => {
        results.forEach(entry => { 
			templateIds.set(entry.attributes.templateId, entry.attributes);
		})
    });

    // ############# //
    // ### Hooks ### //
    // ############# //

    m.hook('S_OTHER_USER_APPLY_PARTY', 1, S_OTHER_USER_APPLY_PARTY)
    m.hook('S_USER_PAPERDOLL_INFO', 11, S_USER_PAPERDOLL_INFO)
    m.hook('S_DUNGEON_CLEAR_COUNT_LIST', 1, S_DUNGEON_CLEAR_COUNT_LIST)

    // ################# //
    // ### Functions ### //
    // ################# //

    function S_OTHER_USER_APPLY_PARTY(event) {
        if(!m.settings.enabled) return
        let name = event.name,
            level = event.level,
            templateId = "1".concat( ((event.race*2)+(event.gender+1)).toString().padStart(2,'0'), (event.class + 1).toString().padStart(2,'0') ),
            description = templateIds.get(templateId).name
            //job = event.class,
            //gender = event.gender,
            //race = event.race
            

        setTimeout( () => {
            if(m.game.me.inCombat) appliedInCombat = true
            m.toServer('C_REQUEST_USER_PAPERDOLL_INFO', 3, { zoom: false, name: name })
        }, m.settings.inspectDelay)

        console.log('[Inspector] ' + name + ' has applied to your group')
    }

    function S_USER_PAPERDOLL_INFO(event) {
        name = event.name

        let description = templateIds.get(event.templateId).name,
            weaponenchant, chestenchant, glovesenchant, bootsenchant,
			totalEnchant
            //level = event.level,
            //talentLevel = event.talentLevel,
            //race = Math.floor((event.templateId - 100) / 200 % 50), // 0 Human, 1 High Elf, 2 Aman, 3 Castanic, 4 Popori/Elin, 5 Baraka
            //gender = Math.floor(((event.templateId / 100)1) % 2), // 1 female, 0 male
            //job = event.templateId % 100 - 1, // 0 Warrior, 1 Lancer, [...], 12 Valkyrie
            //weapon = event.weapon,
            //chest = event.body,
            //gloves = event.hand,
            //boots = event.feet,
            //innerwear = event.underwear,
            //circlet = event.head,
            //itemLevel = event.itemLevel,
            //itemLevelInventory = event.itemLevelInventory,
            //guild = event.guild != '' ? 'Guild: ' + event.guild : 'Not in a guild',


        for(let item of event.items) {
            switch(item.slot) {
                case 1: // weapon
                    weaponenchant = item.enchant
                    break;
                case 3: // chest
                    chestenchant = item.enchant
                    break;
                case 4: // gloves
                    glovesenchant = item.enchant
                    break;
                case 5: // boots
                    bootsenchant = item.enchant
                    break;
            }
        }
        totalEnchant = weaponenchant + chestenchant + glovesenchant + bootsenchant;
        m.command.message(event.name + '\'s Gear Level Total: ' + totalEnchant);
		console.log('\n\t[Inspector] ' + event.name + ' (Level ' + event.level + ' ' + description + ')\n' +
           '\t\t' + (event.guild || 'Not in a guild') + ' ~ EP-Level: ' + event.talentLevel + '\n' + // ' ~ Item-Level: ' + event.itemLevel + '(' + event.itemLevelInventory + ')\n' +
           '\t\t' + 'Weapon: ' + conv(event.weapon) + ' +' + weaponenchant + '\n' +
           '\t\t' + 'Armor: ' + conv(event.body) + ' +' + chestenchant + '\n' +
           '\t\t' + 'Gloves: ' + conv(event.hand) + ' +' + glovesenchant + '\n' +
           '\t\t' + 'Boots: ' + conv(event.feet) + ' +' + bootsenchant + '\n' +
           '\t\t' + 'Innerwear: ' + conv(event.underwear) + '\n' +
           '\t\t' + 'Circlet: ' + conv(event.head) + '\n'
        )
        if(appliedInCombat || !m.settings.showWindow) {
            appliedInCombat = false
            return false
        }
    }

    function S_DUNGEON_CLEAR_COUNT_LIST(event) {
        if(m.game.me.playerId == event.pid) return // for some reason to game retrieves our own dungeon clears as well)
        console.log(' ' + name + '\'s dungeon skills:')

        for(let dungeon of event.dungeons) {
            let zone_string = dungeons[dungeon.id]
            if(m.settings[zone_string]) {
                let clearstring = (dungeon.rookie ? 'Rookie ' : 'Skilled') + ' - ' + zone_string
                if(m.settings.showDungeonSkills) m.command.message('\t' + clearstring)
                console.log('    ' + clearstring)
            }
        }
        console.log('\n')
    }

    function conv(s) {
        const data = m.game.data.items.get(s)
        return data ? data.name : "Undefined"
    }

    // ################ //
    // ### Commands ### //
    // ################ //

    m.command.add('inspect', (value) => {
        if(!value) {
            m.settings.enabled = !m.settings.enabled
            m.command.message(niceName + 'Inspector ' + (m.settings.enabled ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
            console.log('Inspector ' + (m.settings.enabled ? 'enabled' : 'disabled'))
        }
        else if(value == "clears" || value == "skills" || value == "skill") {
            m.settings.showDungeonSkills = !m.settings.showDungeonSkills
            m.command.message(niceName + 'Showing dungeon skills ' + (m.settings.showDungeonSkills ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
            console.log('[Inspect] Showing dungeon skills ' + (m.settings.showDungeonSkills ? 'enabled' : 'disabled'))
        }
        else if(value == "window") {
            m.settings.showWindow = !m.settings.showWindow
            m.command.message(niceName + 'Showing inspect window ' + (m.settings.showWindow ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
            console.log('[Inspect] Showing inspect window ' + (m.settings.showWindow ? 'enabled' : 'disabled'))
        }
        else if(Number.isInteger(value)) {
            m.settings.inspectDelay = value
        }
        else m.command.message('Commands:\n'
            + ' "inspect" (enable/disable Inspector),\n'
            + ' "inspect skills" (show/hide dungeon skills),\n'
            + ' "inspect window" (show/hide inspect window for applicants),\n'
            + ' "inspect [x]" (change inspect delay to x in ms, e.g. "inspect 2000")'
        )
    })
}