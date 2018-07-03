var actionFile = require('actions');
var towerFile = require('tower');

module.exports = {
	run: function(myRoom)
	{
		var hostiles = Game.rooms[myRoom.name].find(FIND_HOSTILE_CREEPS);
		var towers = Game.rooms[myRoom.name].find(FIND_MY_STRUCTURES,
		{
			filter:
			{
				structureType: STRUCTURE_TOWER
			}
		});
		var attackCreeps;
		if (towers)
		{
			towers.forEach(tower => tower.attack(hostiles[0]));
		}
		else
		{
			Game.rooms[myRoom.name].controller.activateSafeMode();
		}
	}
};
