var actions = {
	collectEnergy: function(creep)
	{
		if (creep.memory.role == 'harvester')
		{
			var sources = creep.room.find(FIND_SOURCES_ACTIVE);
			if (creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(Game.getObjectById(creep.memory.source),
				{
					visualizePathStyle:
					{
						stroke: '#ffffff',
						lineStyle: 'dotted'
					}
				});
			}
		}
		else
		{
			var containersOrStorage = creep.room.find(FIND_STRUCTURES,
			{
				filter: (s) =>
					(s.structureType == STRUCTURE_CONTAINER ||
						s.structureType == STRUCTURE_STORAGE) &&
					s.store[RESOURCE_ENERGY] > 0
			});

			var spawnsOrExtensions = creep.room.find(FIND_STRUCTURES,
			{
				filter: (s) =>
					(s.structureType == STRUCTURE_EXTENSION ||
						s.structureType == STRUCTURE_SPAWN) &&
					s.energy <= s.energyCapacity
			});

			if (containersOrStorage.length)
			{
				if (creep.withdraw(containersOrStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
				{
					creep.moveTo(containersOrStorage[0],
					{
						visualizePathStyle:
						{
							stroke: '#ffffff'
						}
					});
				}
			}
			else if (spawnsOrExtensions.length)
			{
				if (creep.withdraw(spawnsOrExtensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
				{
					creep.moveTo(spawnsOrExtensions[0],
					{
						visualizePathStyle:
						{
							stroke: '#ffffff'
						}
					});
				}
			}
		}
	},

	depositEnergy: function(creep)
	{
		var spawnsOrExtensions = creep.room.find(FIND_STRUCTURES,
		{
			filter: (s) =>
				(s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_TOWER) &&
				s.energy < s.energyCapacity
		});

		var containers = creep.room.find(FIND_STRUCTURES,
		{
			filter: (s) =>
				(s.structureType == STRUCTURE_CONTAINER) &&
				s.store[RESOURCE_ENERGY] < 2000
		});

		var storage = creep.room.find(FIND_STRUCTURES,
		{
			filter: (s) =>
				(s.structureType == STRUCTURE_STORAGE) &&
				s.store[RESOURCE_ENERGY] < s.storeCapacity
		});

		if (spawnsOrExtensions.length)
		{
			if (creep.transfer(spawnsOrExtensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(spawnsOrExtensions[0],
				{
					visualizePathStyle:
					{
						stroke: '#00ff00',
						lineStyle: 'dotted'
					}
				});
			}
		}
		else if (containers.length)
		{
			if (creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(containers[0],
				{
					visualizePathStyle:
					{
						stroke: '#00ff00',
						lineStyle: 'dotted'
					}
				});
			}
		}
		else if (storage.length)
		{
			if (creep.transfer(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(storage[0],
				{
					visualizePathStyle:
					{
						stroke: '#00ff00',
						lineStyle: 'dotted'
					}
				});
			}
		}
	},

	upgradeSomething: function(creep)
	{
		if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
		{
			creep.moveTo(creep.room.controller,
			{
				visualizePathStyle:
				{
					stroke: '#00ff00'
				}
			});
		}
	},

	repairSomething: function(creep)
	{
		var repairTargets = this.getRepairTargets(creep);

		if (repairTargets.length)
		{
			if (creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(repairTargets[0],
				{
					visualizePathStyle:
					{
						stroke: '#00ff00'
					}
				});
			}
		}
		else
		{
			creep.memory.task = 'Death';
		}
	},

	repairWall: function(creep)
	{
		var repairWallTargets = this.getWallRepairTargets(creep);

		if (repairWallTargets.length)
		{
			if (creep.repair(repairWallTargets[0]) == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(repairWallTargets[0],
				{
					visualizePathStyle:
					{
						stroke: '#00ff00'
					}
				});
			}
		}
		else
		{
			creep.memory.task = 'Death';
		}
	},

	repairDefenses: function(creep)
	{
		var repairDefenseTargets = this.getDefenseRepairTargets(creep);

		if (repairDefenseTargets.length)
		{
			if (creep.repair(repairDefenseTargets[0]) == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(repairDefenseTargets[0],
				{
					visualizePathStyle:
					{
						stroke: '#00ff00'
					}
				});
			}
		}
		else
		{
			creep.memory.task = 'Death';
		}
	},

	buildSomething: function(creep)
	{
		var buildTargets = this.getBuildTargets(creep);
		if (buildTargets.length)
		{
			if (creep.build(buildTargets[0]) == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(buildTargets[0],
				{
					visualizePathStyle:
					{
						stroke: '#00ff00'
					}
				});
			}
		}
		else
		{
			creep.memory.task = 'Death';
		}
	},

	beRecycled: function(creep)
	{
		if (Game.spawns['Spawn1'].recycleCreep(creep) == ERR_NOT_IN_RANGE)
		{
			creep.moveTo(Game.spawns['Spawn1'].pos.x, Game.spawns['Spawn1'].pos.y);
			creep.say('🔄 bye');
		}
	},

	getRepairTargets: function(creep)
	{
		if (creep)
		{
			var targets = creep.room.find(FIND_STRUCTURES,
			{
				filter: (s) =>
					(((s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_ROAD) &&
						s.hits < s.hitsMax))
			});

			targets.sort((a, b) => a.hits - b.hits);

			let nearestTargets = _.sortBy(targets, s => creep.pos.getRangeTo(s));

			return nearestTargets;
		}
	},

	getWallRepairTargets: function(creep)
	{
		if (creep)
		{
			var targets = creep.room.find(FIND_STRUCTURES,
			{
				filter: (s) =>
					((s.structureType == STRUCTURE_WALL) &&
						s.hits < s.hitsMax)
			});

			targets.sort((a, b) => a.hits - b.hits);

			//let nearestTargets = _.sortBy(targets, s => creep.pos.getRangeTo(s));

			return targets; //nearestTargets;
		}
	},

	getDefenseRepairTargets: function(creep)
	{
		if (creep)
		{
			var targets = creep.room.find(FIND_STRUCTURES,
			{
				filter: (s) =>
					((s.structureType == STRUCTURE_TOWER || s.structureType == STRUCTURE_RAMPART) &&
						s.hits < s.hitsMax)
			});

			targets.sort((a, b) => a.hits - b.hits);

			//let nearestTargets = _.sortBy(targets, s => creep.pos.getRangeTo(s));

			return targets; //nearestTargets;
		}
	},

	getBuildTargets: function(creep)
	{
		if (creep)
		{
			var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);

			let sortedBuildTargets = _.sortBy(buildTargets, s => creep.pos.getRangeTo(s));

			return sortedBuildTargets;
		}
	}
}

module.exports = actions;
