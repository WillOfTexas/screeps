var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleDefenseRepairer = require('role.defenseRepairer');
var actionFile = require('actions');
var controlLevel = require('RCL_GCL');
var roomInit = require('rooms');
var deathClock = require('deathClock');
var sourceFile = require('sources');
var slotFile = require('slots');
var defFile = require('defenses');

roomInit.init();

module.exports.loop = function()
{
	var myRoom = Game.rooms['E46S89'];
	var mySpawn = Game.rooms[myRoom.name].find(FIND_STRUCTURES,
	{
		filter: (s) =>
		{
			return (s.structureType == STRUCTURE_SPAWN);
		}
	})[0].name;

	var sources = Memory.rooms[myRoom.name].sources;

	sourceFile.countHarvesters(myRoom);
	defFile.run(myRoom);

	var myHarvesters = 0;
	var myUpgraders = 0;
	var myBuilders = 0;
	var myRepairers = 0;
	var myWallRepairers = 0;
	var myDefenseRepairers = 0;

	var minimumHarvesters = 7;
	var minimumUpgraders = 1;
	var minimumBuilders = 2;
	var minimumRepairers = 1;
	var minimumWallRepairers = 1;
	var minimumDefenseRepairers = 1;

	controlLevel.CL_Setup(myRoom, mySpawn);
	for (var name in Memory.creeps)
	{
		if (!Game.creeps[name])
		{
			delete Memory.creeps[name];
			//console.log('Clearing non-existing creep memory:', name);
		}
	}

	for (var name in Game.creeps)
	{
		var creep = Game.creeps[name];

		if ((creep.ticksToLive < deathClock.run(creep)) && !(creep.memory.task == 'Death'))
		{
			creep.memory.task = 'Death';
			sourceFile.decrementHarvesters(myRoom, creep);
		}

		if (creep.memory.task == 'Death')
		{
			actionFile.beRecycled(creep);
		}
		else
		{
			if (creep.carry.energy < creep.carryCapacity)
			{
				var droppedEnergy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 3);
				if (droppedEnergy.length)
				{
					creep.pickup(droppedEnergy[0]);
					//console.log('Found ' + droppedEnergy[0].energy + ' energy @ ', droppedEnergy[0].pos);
				}
			}

			switch (creep.memory.role)
			{
				case 'harvester':
					roleHarvester.run(creep);
					myHarvesters++;
					break;
				case 'upgrader':
					roleUpgrader.run(creep);
					myUpgraders++;
					break;
				case 'builder':
					roleBuilder.run(creep);
					myBuilders++;
					break;
				case 'repairer':
					roleRepairer.run(creep);
					myRepairers++;
					break;
				case 'wallRepairer':
					roleWallRepairer.run(creep);
					myWallRepairers++;
					break;
				case 'defenseRepairer':
					roleDefenseRepairer.run(creep);
					myDefenseRepairers++;
					break;
				default:
					break;
			};
		}
	}

	var tower = Game.getObjectById('TOWER_ID');
	if (tower)
	{
		roleTower.run(tower);
	}

	var name = undefined;
	var buildTargets = actionFile.getBuildTargets(creep);
	var repairTargets = actionFile.getRepairTargets(creep);
	var repairWallTargets = actionFile.getWallRepairTargets(creep);
	var repairDefenseTargets = actionFile.getDefenseRepairTargets(creep);

	if (myRoom.energyAvailable >= 250)
	{
		if (myHarvesters < minimumHarvesters)
		{
			name = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE], undefined,
			{
				role: 'harvester',
			});
			//console.log("Spawning Harvester: " + name);
		}
		else if (myUpgraders < minimumUpgraders)
		{
			name = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE], undefined,
			{
				role: 'upgrader',
			});
			//console.log("Spawning Upgrader: " + name);
		}
		else if ((myBuilders < minimumBuilders) && (buildTargets.length))
		{
			name = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined,
			{
				role: 'builder',
			});
			//console.log("Spawning Builder: " + name);
		}
		else if ((myRepairers < minimumRepairers) && (repairTargets.length))
		{
			name = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined,
			{
				role: 'repairer',
			});
			//console.log("Spawning Repairer: " + name);
		}
		else if ((myWallRepairers < minimumWallRepairers) && (repairWallTargets.length))
		{
			name = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined,
			{
				role: 'wallRepairer',
			});
			//console.log("Spawning Wall Repairer: " + name);
		}
		else if ((myDefenseRepairers < minimumDefenseRepairers) && (repairDefenseTargets.length))
		{
			name = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined,
			{
				role: 'defenseRepairer',
			});
			//console.log("Spawning Wall Repairer: " + name);
		}
	}

	if (Game.spawns.Spawn1.spawning)
	{
		var spawningCreep = Game.creeps[Game.spawns[mySpawn].spawning.name];
		Game.spawns[mySpawn].room.visual.text(
			'🛠 ' + spawningCreep.memory.role,
			Game.spawns.Spawn1.pos.x,
			Game.spawns.Spawn1.pos.y - 1,
			{
				align: 'center',
				opacity: 0.8
			});
		sourceFile.incrementHervesters(myRoom, spawningCreep);
	}
}
