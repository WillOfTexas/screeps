var actionFile = require('actions');

module.exports = {
	heal: function(tower)
	{
		var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES,
		{
			filter: (structure) => structure.hits < structure.hitsMax
		});
		if (closestDamagedStructure)
		{
			tower.repair(closestDamagedStructure);
		}
	}
};
