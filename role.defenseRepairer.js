var actionFile = require('actions');

var roleDefenseRepairer = {
	run: function(creep)
	{
		if (creep.carry.energy == 0)
		{
			actionFile.collectEnergy(creep);
		}
		else
		{
			actionFile.repairDefenses(creep);
		}
	}
};

module.exports = roleDefenseRepairer;
