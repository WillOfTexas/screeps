var actionFile = require('actions');

var roleWallRepairer = {
	run: function(creep)
	{
		if (creep.carry.energy == 0)
		{
			actionFile.collectEnergy(creep);
		}
		else
		{
			actionFile.repairWall(creep);
		}
	}
};

module.exports = roleWallRepairer;
